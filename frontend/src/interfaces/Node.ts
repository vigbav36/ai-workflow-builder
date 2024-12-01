export interface Node {
    name: string; 
    prompt?: string | null; 
    is_start: boolean | false; 
    is_end: boolean | false; 
    to_node?: string | null; 
    to_nodes?: string[] | null; 
    is_structured: boolean | false;
    output_state_variable: string | null; 
    is_custom: boolean | false;
    code?: string | null; 
    custom_function_name?: string | null; 
    is_router: boolean | false;
}

export default Node