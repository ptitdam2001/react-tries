import { type Node, type Edge } from '@xyflow/react';
import { useFlowEditor } from '../components/Providers/FlowEditorProvider';

export const useAddConditionNodes = () => {
  const { addNodes, addEdges } = useFlowEditor();

  return (conditionId: string, positionX = 0, positionY = 0): void => {
    const nodes: Node[] = [
      {
        id: `${conditionId}-condition-start`,
        type: 'conditionStart',
        position: { x: positionX, y: positionY },
        data: {
          blockId: conditionId,
        },
      },
      {
        id: `${conditionId}-condition-end`,
        type: 'conditionEnd',
        position: { x: positionX, y: positionY + 100 },
        data: { blockId: conditionId },
      },
    ];

    const edges: Edge[] = [
      {
        id: `${conditionId}-source-start-false`,
        source: `${conditionId}-condition-start`,
        target: `${conditionId}-condition-end`,
        sourceHandle: 'false',
        data: { blockId: conditionId },
      },
      {
        id: `${conditionId}-source-start-true`,
        source: `${conditionId}-condition-start`,
        target: `${conditionId}-condition-end`,
        sourceHandle: 'true',
        data: { blockId: conditionId },
      },
    ];

    addNodes(nodes);
    addEdges(edges);
  };
};
