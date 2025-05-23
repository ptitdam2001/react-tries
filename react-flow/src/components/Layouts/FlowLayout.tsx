import type React from 'react';

import { FlowMenu } from '../FlowMenu/FlowMenu';
import { FlowEditorProvider } from '../Providers/FlowEditorProvider';
import type { Edge, Node } from '@xyflow/react';

type FlowLayoutProps = {
  children: React.ReactNode;
};

export const FlowLayout: React.FC<FlowLayoutProps> = ({ children }) => {
  const initialNodes: Node[] = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start' }, type: 'input' },
    { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, type: 'simple' },
    // { id: '3', position: { x: 0, y: 200 }, data: { label: 'Condition 1' }, type: 'condition' },

    // { id: '4', position: { x: -150, y: 300 }, data: { label: 'Ok' }, type: 'simple' },
    // { id: '5', position: { x: 150, y: 300 }, data: { label: 'Ko' }, type: 'simple' },

    // Group
    {
      id: 'A',
      type: 'group',
      data: { label: null },
      position: { x: -150, y: 300 },
      style: {
        width: 170,
        height: 140,
      },
    },
    {
      id: 'B',
      type: 'simple',
      data: { label: 'child node 1' },
      position: { x: 10, y: 10 },
      parentId: 'A',
      extent: 'parent',
    },
    {
      id: 'C',
      type: 'simple',
      data: { label: 'child node 2' },
      position: { x: 10, y: 90 },
      parentId: 'A',
      extent: 'parent',
    },
  ];
  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    // { id: 'e2-3', source: '2', target: '3' },
    // { id: 'e3-true', source: '3', target: '4', sourceHandle: 'true' },
    // { id: 'e3-false', source: '3', target: '5', sourceHandle: 'false' },
    // { id: 'e3-true-block', source: '3', target: 'A', sourceHandle: 'true' },
  ];

  return (
    <FlowEditorProvider nodes={initialNodes} edges={initialEdges}>
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
        <section style={{ borderRight: '1px solid #5c5c5c', paddingInline: '0.5rem', margin: 0 }}>
          <FlowMenu />
        </section>
        <section style={{ flexGrow: 1 }}>{children}</section>
      </div>
    </FlowEditorProvider>
  );
};
