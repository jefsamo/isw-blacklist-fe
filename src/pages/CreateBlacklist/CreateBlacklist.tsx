import { Button, InputBase, Space } from "@mantine/core";
import { useCreateUser } from "../../hooks/useCreateUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlacklist = () => {
  const { isPending, createUser } = useCreateUser();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user")!);

  return (
    <div style={{ width: "500px" }}>
      <InputBase
        label="Email"
        placeholder="email@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputBase
        label="Role"
        component="select"
        mt="md"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value={"BlacklistAdmin"}>Blacklist Admin</option>
        <option value={"User"}>User</option>
        {/* <option value="UserAdmin">User Admin</option> */}
      </InputBase>
      <Space h={10} />
      <Button
        loading={isPending}
        onClick={(e) => {
          e.preventDefault();

          if (!email || !role) return;

          createUser(
            {
              email,
              role,
              token: currentUser?.jwToken,
              userAdminId: currentUser?.id,
            },
            {
              onSettled: () => {
                setEmail("");
                setRole("");
                navigate("/users");
              },
            }
          );
        }}
      >
        Add user
      </Button>
    </div>
  );
};

export default CreateBlacklist;
