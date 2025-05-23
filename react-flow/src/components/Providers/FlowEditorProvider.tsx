import type { Edge, Node } from '@xyflow/react';
import { createStateContext } from 'react-use';

type FlowEditorContext = {
  nodes: Node[];
  edges: Edge[];
};

const [useFlowEditorState, FlowEditorProviderComponent] = createStateContext<FlowEditorContext>({
  nodes: [],
  edges: [],
});

type FlowEditorProviderProps = FlowEditorContext & {
  children: React.ReactNode;
};

const FlowEditorProvider: React.FC<FlowEditorProviderProps> = ({ children, nodes, edges }) => {
  return (
    <FlowEditorProviderComponent initialValue={{ nodes, edges }}>
      {children}
    </FlowEditorProviderComponent>
  );
};

const useFlowEditor = () => {
  const [state, setState] = useFlowEditorState();

  const addNodes = (nodes: Node[]) => {
    setState((prev) => ({
      ...prev,
      nodes: [...prev.nodes, ...nodes],
    }));
  };

  const addEdges = (edges: Edge[]) => {
    setState((prev) => ({
      ...prev,
      edges: [...prev.edges, ...edges],
    }));
  };

  const setNodes = (nodes: Node[] | ((prev: Node[]) => Node[])) => {
    setState((prev) => ({
      ...prev,
      nodes: typeof nodes === 'function' ? nodes(prev.nodes) : nodes,
    }));
  };

  const setEdges = (edges: Edge[] | ((prev: Edge[]) => Edge[])) => {
    setState((prev) => ({
      ...prev,
      edges: typeof edges === 'function' ? edges(prev.edges) : edges,
    }));
  };

  return {
    nodes: state.nodes,
    edges: state.edges,
    addNodes,
    addEdges,
    setNodes,
    setEdges,
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export { FlowEditorProvider, useFlowEditor };
