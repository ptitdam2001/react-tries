import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from '@xyflow/react';

import { useCallback } from 'react';
import { SimpleFlowNode } from '../FlowNode/SimpleFlowNode';

import '@xyflow/react/dist/style.css';
import './MainNode.css';

// Nodes
import { ConditionStartFlowNode } from '../FlowNode/ConditionStartFlowNode';
import { ConditionEndFlowNode } from '../FlowNode/ConditionEndFlowNode';
import { useFlowEditor } from '../Providers/FlowEditorProvider';

const nodeTypes = {
  simple: SimpleFlowNode,
  conditionStart: ConditionStartFlowNode,
  conditionEnd: ConditionEndFlowNode,
};

const rfStyle = {
  backgroundColor: '#B8CEFF',
};

export const FlowEditor = () => {
  const { nodes, edges, setNodes, setEdges } = useFlowEditor();

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => setNodes((nds: Node[]) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100%', height: '65vh', backgroundColor: '#f0f0f0' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={rfStyle}
      >
        <Controls style={{ color: '#c0c0c0' }} />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1.5} />
      </ReactFlow>
    </div>
  );
};
