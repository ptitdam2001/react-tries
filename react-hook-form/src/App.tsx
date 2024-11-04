import { useFieldArray, useForm } from "react-hook-form";

type FormData = {
  group: string;
  groupPeople: {
    firstName: string;
    lastName: string;
  }[];
};

export default function App() {
  const { register, setValue, handleSubmit, control } = useForm<FormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupPeople",
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div>
        <label htmlFor="group">Group</label>
        <select
          {...register("group")}
          onChange={() => {
            setValue("groupPeople", []);
          }}
        >
          <option value="A">Group A</option>
          <option value="B">Group B</option>
          <option value="C">Group C</option>
        </select>
      </div>

      <hr />

      <label htmlFor="groupPeople">People</label>

      {fields.map((field, index) => (
        <div key={field.id}>
          <label>First Name</label>
          <input {...register(`groupPeople.${index}.firstName`)} />
          <label>Last Name</label>
          <input {...register(`groupPeople.${index}.lastName`)} />
          <button
            type="button"
            onClick={() => {
              remove(index);
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          append({ firstName: "", lastName: "" });
        }}
      >
        Add
      </button>
      <hr />
      <button type="submit">Submit</button>
    </form>
  );
}
