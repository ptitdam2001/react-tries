import { Handle, Position, type Node, type NodeProps } from '@xyflow/react';
import { useRemoveConditionNodes } from '../../hooks/useRemoveConditionNodes';

type ConditionnalNodeData = Node<{ blockId: string }, 'blockId'>;

export const ConditionStartFlowNode = ({ data }: NodeProps<ConditionnalNodeData>) => {
  const deleteCondition = useRemoveConditionNodes();

  return (
    <div className="MainNode ConditionNode">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Condition Start node</label>
        <button onClick={() => deleteCondition(data.blockId)}>Delete</button>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="true"
        style={{ left: 25, background: 'green' }}
      />
      <Handle type="source" position={Position.Bottom} id="false" style={{ background: 'red' }} />
    </div>
  );
};
