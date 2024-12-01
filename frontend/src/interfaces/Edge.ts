import { MarkerType } from "@xyflow/react";

export interface Edge {
    id: string; 
    source: string; 
    target: string; 
    markerEnd:{
        type: MarkerType; 
    };
}