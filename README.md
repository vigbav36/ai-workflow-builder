# AI Workflow Builder

This project provides a framework for defining complex AI workflows using JSON-based configurations. It abstracts the process of building and writing AI logic by leveraging simple definitions.

## Features

- **Workflow Definition**: Defines the state and nodes of the workflow through JSON.
- **Conditional Routing**: Supports conditional routing to control the flow based on specific conditions.
- **Custom Code Execution**: Allows custom code execution within the workflow for more flexibility.
- **LangGraph Integration**: Built on top of LangGraph, enhancing the workflow management.

## How It Works

1. **JSON-Based Workflow**: The workflows are defined in JSON format, making it easy to understand and modify.
2. **State and Nodes**: Each workflow consists of nodes that represent various steps or actions in the process. The state is used to define the current status of the workflow.
3. **Conditional Routing**: You can define conditions that route the workflow to different paths depending on the results or inputs.
4. **Custom Code**: You can add custom code within specific nodes to execute specialized actions that aren't natively supported by the framework.

## Example Workflow

```json
{
  "nodes": [
    {
      "name": "get_joke",
      "prompt": "Give me a random joke",
      "is_start": true,
      "to_node": "explain_joke",
      "output_state_variable": "joke"
    },
    {
      "name": "explain_joke",
      "prompt": "Explain this joke : {joke}",
      "to_node": "router",
      "output_state_variable": "joke_explanation"
    },
    {
      "name": "router",
      "to_nodes": [
        "pirate_voice",
        "rapper_voice"
      ],
      "code": "\ndef route(state):\n    return \"rapper_voice\"\n",
      "custom_function_name": "route",
      "is_router": true
    },
    {
      "name": "pirate_voice",
      "prompt": "Rewrite the joke like a pirate: {joke}",
      "is_end": true,
      "output_state_variable": "rewritten_joke"
    },
    {
      "name": "rapper_voice",
      "prompt": "Rewrite this into a rap by a rapper : {joke}",
      "is_end": true,
      "output_state_variable": "rewritten_joke"
    }
  ],
  "state" :{
    "joke": null,
    "joke_explanation" : null,
    "rewritten_joke" : null
  }
}
```


### ASCII Diagram of the generated Graph:
```plaintext
               +-----------+                  
               | __start__ |                  
               +-----------+                  
                      *                       
                      *                       
                      *                       
                +----------+                  
                | get_joke |                  
                +----------+                  
                      *                       
                      *                       
                      *                       
              +--------------+               
              | explain_joke |               
              +--------------+               
              ..            ..               
            ..                ..             
          ..                    ..           
+--------------+           +--------------+  
| pirate_voice |           | rapper_voice |  
+--------------+           +--------------+  
              **            **                
                **        **                  
                  **    **                    
                +---------+                   
                | __end__ |                   
                +---------+                   
```

### AI output of the workflow
```json
{
  "joke": "Why don't skeletons fight each other? They don't have the guts.",
  "joke_explanation": "This joke is a play on words and relies on a double meaning. The humor comes from the phrase \"they don't have the guts.\" \n\n1. **Literal Meaning**: Skeletons, by definition, are just bones and do not have any internal organs, including \"guts\" (intestines and other internal organs). So, literally, they don't have the physical guts to fight.\n\n2. **Figurative Meaning**: The phrase \"having the guts\" is also a common idiom meaning having courage or bravery. So, figuratively, the joke suggests that skeletons lack the courage to fight.\n\nThe humor arises from the clever use of this double meaning, combining the literal absence of guts in a skeleton with the figurative expression about courage.",
  "rewritten_joke": "(Verse 1)  \nYo, check it, in the graveyard, it's a quiet night,  \nSkeletons chillin', but they ain't gonna fight.  \nWhy's that? Let me break it down, no fuss,  \nThey ain't got the guts, so they just kick up dust.  \n\n(Chorus)  \nSkeletons in the dark, they ain't throwin' no blows,  \nNo guts in their chest, so the beef never grows.  \nIn the boneyard, they just rattle and roam,  \nNo guts, no glory, just chillin' at home.  \n\n(Verse 2)  \nBones on bones, but they ain't got the nerve,  \nNo organs inside, so they just observe.  \nThey might clatter and clink, but they ain't gonna brawl,  \n'Cause without the guts, they ain't got it at all.  \n\n(Chorus)  \nSkeletons in the dark, they ain't throwin' no blows,  \nNo guts in their chest, so the beef never grows.  \nIn the boneyard, they just rattle and roam,  \nNo guts, no glory, just chillin' at home.  \n\n(Outro)  \nSo next time you see 'em, just know what's up,  \nSkeletons stay cool, 'cause they ain't got the guts."
}
```

# Graph Based Frontend UI 

A work in progress, idea is to use react flow to build a graph UI to make it more easier to define AI workflows

![image](https://github.com/user-attachments/assets/4d46e13f-5836-4f4b-8a5e-4c6395e18861)


