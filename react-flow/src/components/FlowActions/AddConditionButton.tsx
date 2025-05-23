import { useAddConditionNodes } from '../../hooks/useAddConditionNodes';
import { v4 as uuid } from 'uuid';

export const AddConditionButton = () => {
  const addCondition = useAddConditionNodes();
  const handleClick = () => {
    addCondition(uuid(), 0, 200);
  };

  return (
    <button className="Action" onClick={handleClick}>
      + IF
    </button>
  );
};
