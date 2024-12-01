import ReactFlowNode from "../interfaces/ReactFlowNode";
import Node from "../interfaces/Node";
import { Edge } from "../interfaces/Edge";
import { MarkerType } from "@xyflow/react";

export const convertNodeToReactFlowNode = (
    node: Node,
    position: { x: number; y: number } = { x: 0, y: 0 } 
  ): ReactFlowNode => {
    return {
      id: node.name, 
      data: {
        label: node.name
      },
      position, 
      type: node.is_start
        ? 'input' 
        : node.is_end
        ? 'output' 
        : 'default', 
    };
  };


export const getReactFlowNodes = (nodes: Node[]): ReactFlowNode[] => {
    const result: ReactFlowNode[] = [];
    let x = 0
    let y = 0
    for (const node of nodes) {
        const reactFlowNode = convertNodeToReactFlowNode(node, { x: x, y: y });
        x+=100
        y+=100
        result.push(reactFlowNode);
    }
    return result;
};
 

export const getReactFlowEdges = (nodes: Node[]): Edge[] => {
    const result: Edge[] = [];
  
    for (const node of nodes) {
      if (node.to_nodes && node.to_nodes.length > 0) {
        for (const target of node.to_nodes) {
          result.push({
            id: `${node.name}-${target}`, 
            source: node.name, 
            target,
            markerEnd: {
              type: MarkerType.Arrow,
            },
          });
        }
      }

      else if (node.to_node) {
        result.push({
          id: `${node.name}-${node.to_node}`, 
          source: node.name,
          target: node.to_node,
          markerEnd: {
            type: MarkerType.Arrow,
          },
        });
      }
    }
  
    return result;
  };



  export const exampleNodes: Node[] = [
    {
        name: "haha",
        prompt: "Give me a random joke",
        is_start: true,
        to_node: "explain_joke",
        output_state_variable: "joke",
        is_end: false,
        is_structured: false,
        is_custom: false,
        is_router: false
    },
    {
        name: "explain_joke",
        prompt: "Explain this joke : {joke}",
        to_node: "router",
        output_state_variable: "joke_explanation",
        is_start: false,
        is_end: false,
        is_structured: false,
        is_custom: false,
        is_router: false
    },
    {
        name: "router",
        to_nodes: ["pirate_voice", "rapper_voice"],
        code: "\ndef route(state):\n    return \"pirate_voice\"\n",
        custom_function_name: "route",
        is_router: true,
        is_start: false,
        is_end: false,
        is_structured: false,
        output_state_variable: null,
        is_custom: false
    },
    {
        name: "pirate_voice",
        prompt: "Rewrite the joke like a pirate: {joke}",
        is_end: true,
        output_state_variable: "rewritten_joke",
        is_start: false,
        is_structured: false,
        is_custom: false,
        is_router: false
    },
    {
        name: "rapper_voice",
        prompt: "Rewrite this into a rap by a rapper : {joke}",
        is_end: true,
        output_state_variable: "rewritten_joke",
        is_start: false,
        is_structured: false,
        is_custom: false,
        is_router: false
    },
  ];

