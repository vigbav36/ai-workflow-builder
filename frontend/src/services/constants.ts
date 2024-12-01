const workflow = {
    "nodes": [
      {
        "name": "haha",
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
        "code": "\ndef route(state):\n    return \"pirate_voice\"\n",
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
  
export default workflow;