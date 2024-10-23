import type { Meta, StoryObj } from "@storybook/react";
import { UserList } from "./UserList";
import { getMock } from "../../sdk/operations";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/UserList",
  component: UserList,
  parameters: {
    layout: "centered",
    // msw: {
    //   //   handlers: getMock(),
    //   handlers: [
    //     // http.get("http://localhost:6006/api/v1/users", async () => {
    //     //   console.log(">>>>>>");
    //     //   return new HttpResponse(JSON.stringify(getGetUsersResponseMock()), {
    //     //     status: 200,
    //     //     headers: { "Content-Type": "application/json" },
    //     //   });
    //     // }),
    //     http.get("/api/v1/users", () => {
    //       console.log("-----");
    //       return HttpResponse.json([]);
    //     }),
    //   ],
    // },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    msw: {
      handlers: getMock(),
    },
  },
};
