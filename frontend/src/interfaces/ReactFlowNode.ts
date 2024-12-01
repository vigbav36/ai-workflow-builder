
export interface ReactFlowNode {
    id: string; 
    data: {
        label: string; 
    };
    position: {
        x: number; 
        y: number; 
    };
    type: string;
}
  
  
export default ReactFlowNode;