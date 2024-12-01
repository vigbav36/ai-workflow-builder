from typing import TypedDict, Literal, Callable, Dict, List
from uuid import uuid1
from langgraph.graph import StateGraph, END
from pydantic import BaseModel
from typing import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from RestrictedPython import compile_restricted
from dotenv import load_dotenv
import os
import textwrap
import json

load_dotenv()

class Node(BaseModel):
    id: str = uuid1()
    name: str = id
    prompt: str = None
    is_start : bool =  False
    is_end : bool =  False
    to_node: str = None
    to_nodes: List[str] = None
    is_structured: bool = False
    output_state_variable : str = "result"
    is_custom : bool = False
    code : str = None
    custom_function_name : str = None
    is_router : bool = False


class WorkFlow(BaseModel):
    nodes: List[Node]
    state: Dict = {}

    @staticmethod
    def build(workflow: Dict) -> "WorkFlow":
        """
        Build a WorkFlow object from a dictionary.

        Args:
            workflow (Dict): Dictionary containing workflow data.

        Returns:
            WorkFlow: An instance of the WorkFlow class.
        """

        if "nodes" not in workflow or not isinstance(workflow["nodes"], list):
            raise ValueError("'workflow' must contain a 'nodes' key with a list of node dictionaries.")

        nodes = [Node(**node_data) for node_data in workflow["nodes"]]
        return WorkFlow(nodes=nodes, state=workflow.get("state", {}))



def getNodeFunction(node: Node, state):
    if node.is_router:
        return getRouterFunction(node, state)
    if node.is_custom:
        return getCustomFunction(node, state)
    return getAiFunction(node, state)

def getAiFunction(node: Node, state):
    def _call(state):
        model = ChatOpenAI(
            model="gpt-4o",
            temperature=0.1
        )
        chain = PromptTemplate.from_template(node.prompt) | model
        state[node.output_state_variable]=chain.invoke(state).content
        return state
    return _call

def getCustomFunction(node: Node, state):
    def _call(state):
        compiled_code = compile_restricted(node.code, filename=node.name, mode="exec")
        namespace = {'__builtins__': __builtins__, "_getitem_": lambda obj, key: obj[key]}
        exec(compiled_code, namespace)
        result = namespace[node.custom_function_name](state)
        state[node.output_state_variable] = result
        return state
    return _call

def getRouterFunction(node: Node, state):
    def _call(state):
        compiled_code = compile_restricted(node.code, filename=node.name, mode="exec")
        namespace = {'__builtins__': __builtins__, "_getitem_": lambda obj, key: obj[key]}
        exec(compiled_code, namespace)
        result = namespace[node.custom_function_name](state)
        return result
    return _call



def build_custom_workflow(workflow):

    StateDict = TypedDict("StateDict", {k: type(v) for k, v in workflow.state.items()})
    state: StateDict = workflow.state
    graph_builder = StateGraph(StateDict)
    node_map = {}
    nodes = workflow.nodes
    for node in nodes:
        if not node.is_router:
            graph_builder.add_node(node.name, getNodeFunction(node, state))
        node_map[node.name] = node

    for node in nodes:
        if node.is_start:
            graph_builder.add_edge(START, node.name)
        elif node.is_end:
            graph_builder.add_edge(node.name, END)

        if node.to_node:
            if node_map[node.to_node].is_router:
                graph_builder.add_conditional_edges(node.name, getNodeFunction(node_map[node.to_node], state), node_map[node.to_node].to_nodes)
            else:
                graph_builder.add_edge(node.name, node.to_node)

    graph = graph_builder.compile()
    graph.get_graph().print_ascii()
    result = graph.invoke(workflow.state)
    print(result)
    return result


file_name = "workflow.json"
with open(file_name, "r") as file:
    json_data = json.load(file)


workflow = WorkFlow.build(json_data)
build_custom_workflow(workflow)


