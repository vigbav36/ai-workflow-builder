import '@xyflow/react/dist/style.css';
import Workflow from './components/Workflow';
import Editor from './components/Editor';
import "./styles/App.css"
import { useState } from 'react';
import { exampleNodes, getReactFlowEdges, getReactFlowNodes } from './services/NodesAdapter';
import Node from './interfaces/Node';
import { Edge } from './interfaces/Edge';


const initialNodes = getReactFlowNodes(exampleNodes);
const initialEdges = getReactFlowEdges(exampleNodes);

console.log("Adapted Nodes:", initialNodes);
console.log("Adapted Edges:", initialEdges);

const App: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>(initialNodes); 
  const [edges, setEdges] = useState<any[]>(initialEdges); 
  const [worflowNodes, setWorkflowNodes] = useState<any[]>(exampleNodes); 
  return (
    <div className="container">
      <div className="workflow">
        <Workflow nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
      </div>
      <div className="editor">
        <Editor nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} worflowNodes={worflowNodes} setWorkflowNodes={setWorkflowNodes} />
      </div>
    </div>
  );
};

export default App;