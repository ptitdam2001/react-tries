import { Handle, Position } from '@xyflow/react';

export const ConditionEndFlowNode = () => {
  return (
    <div className="MainNode ConditionNode">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Condition End node</label>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
