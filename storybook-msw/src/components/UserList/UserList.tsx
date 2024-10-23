import { useGetUsers } from "../../sdk/operations";
import "./UserList.css";

export const UserList = () => {
  const { data, isLoading } = useGetUsers();

  console.log(data);
  if (isLoading || !data) {
    return <div>Loading</div>;
  } else {
    return (
      <ul>
        {Array.isArray(data) &&
          data.map((user) => (
            <li key={user.id}>
              {user.lastname} - {user.firstname} ({user.id})
            </li>
          ))}
      </ul>
    );
    // return <div>charged</div>;
  }
};
