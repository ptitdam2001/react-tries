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
        <li style={{ listStyle: "none", padding: 0, margin: 0 }}>
          List of users
        </li>
        <hr />
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
