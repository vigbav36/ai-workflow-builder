import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Row, Col } from 'antd';
import Node from '../interfaces/Node';
import { convertNodeToReactFlowNode } from '../services/NodesAdapter';

interface EditorProps {
    nodes: any[];
    setNodes: React.Dispatch<React.SetStateAction<any[]>>;
    edges: any[];
    setEdges: React.Dispatch<React.SetStateAction<any[]>>;
    worflowNodes: any[];
    setWorkflowNodes: React.Dispatch<React.SetStateAction<any[]>>;
  }

const Editor: React.FC<EditorProps> = ({ nodes, setNodes, edges, setEdges, worflowNodes, setWorkflowNodes }) => {
    const [form] = Form.useForm();
    const [isCustom, setIsCustom] = useState<boolean>(false); 
  
    const handleAddNode = () => {
      form.validateFields().then((values: any) => {
        const newNode: Node = {
          ...values,
          to_nodes: values.to_nodes ? values.to_nodes.split(',') : [],
        };
        worflowNodes.push(newNode)
        nodes.push(convertNodeToReactFlowNode(newNode))
        setNodes(nodes)
        setWorkflowNodes(worflowNodes)
      });
    };
  
    const handleIsCustomChange = (e: any) => {
      setIsCustom(e.target.checked);
    };
  
    return (
      <div>
        <Form form={form} layout="vertical" onFinish={handleAddNode}>
          <Form.Item
            name="name"
            label="Node Name"
            rules={[{ required: true, message: 'Please enter the node name!' }]}
          >
            <Input />
          </Form.Item>
        
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="is_router"
                label="Is Router"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="is_custom"
                label="Is Custom"
                valuePropName="checked"
              >
                <Checkbox onChange={handleIsCustomChange} />
              </Form.Item>
            </Col>
          </Row>

          {/* Layout for is_start and is_end on the same line */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="is_start"
                label="Is Start"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="is_end"
                label="Is End"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
            </Col>
          </Row>
  
          {!isCustom && (
            <>
              <Form.Item name="prompt" label="Prompt">
                <Input.TextArea />
              </Form.Item>
  
              <Form.Item
                name="is_structured"
                label="Is Structured"
                valuePropName="checked"
              >
                <Checkbox />
              </Form.Item>
  
              <Form.Item
                name="output_state_variable"
                label="Output State Variable"
                rules={[{ required: true, message: 'Please enter the output state variable!' }]}
              >
                <Input />
              </Form.Item>
            </>
          )}
  
          {isCustom && (
            <>
              <Form.Item name="code" label="Code">
                <Input.TextArea />
              </Form.Item>
  
              <Form.Item name="custom_function_name" label="Custom Function Name">
                <Input />
              </Form.Item>
            </>
          )}
  
          <Button type="primary" htmlType="submit">
            Add Node
          </Button>
        </Form>
  
        {worflowNodes && (
          <div>
            <h2>Node Details:</h2>
            <pre>{JSON.stringify(worflowNodes, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
  
  export default Editor;