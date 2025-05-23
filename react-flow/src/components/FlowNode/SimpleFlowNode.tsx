import { Handle, Position } from '@xyflow/react';

export const SimpleFlowNode = () => {
  return (
    <div className="MainNode">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Simple Flow node</label>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
