import { useFlowEditor } from '../components/Providers/FlowEditorProvider';

export const useRemoveConditionNodes = () => {
  const { setEdges, setNodes, edges, nodes } = useFlowEditor();

  return (conditionId: string) => {
    const filteredEdges = edges.filter((edge) => edge?.data?.blockId !== conditionId);
    const filteredNodes = nodes.filter((node) => node.data.blockId !== conditionId);

    setEdges(filteredEdges);
    setNodes(filteredNodes);
  };
};
