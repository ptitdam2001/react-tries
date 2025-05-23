import { FlowEditor } from '../components/FlowEditor/FlowEditor';
import { FlowLayout } from '../components/Layouts/FlowLayout';

export const Home = () => {
  return (
    <div>
      <h1>React Flow Example</h1>
      <FlowLayout>
        <FlowEditor />
      </FlowLayout>
    </div>
  );
};
