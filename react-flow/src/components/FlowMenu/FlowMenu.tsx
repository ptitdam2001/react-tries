import { AddConditionButton } from '../FlowActions';

export const FlowMenu = () => {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <li>
        <AddConditionButton />
      </li>
    </ul>
  );
};
