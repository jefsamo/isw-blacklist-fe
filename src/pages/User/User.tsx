import {
  Button,
  Center,
  Loader,
  Select,
  Space,
  TextInput,
  rem,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  const { isLoading, user } = useUser();
  console.log(user);
  const [userEmail, setUserEmail] = useState(user?.data.email ?? "");
  const [firstName, setFirstName] = useState(user?.data.firstName ?? "");
  const [lastName, setLastName] = useState(user?.data.lastName ?? "");
  const [imageUrl, setImageUrl] = useState(user?.data.imageUrl ?? ""); // Assuming you want this to be controlled
  const [role, setRole] = useState(user?.data.role ?? "");

  const { updateUser, isPending } = useUpdateUser();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserEmail(e.target.value);
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setImageUrl(e.target.value);
  // const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //   setRole(e.target.value);

  const isEdit =
    firstName === user?.data.firstName &&
    lastName === user?.data.lastName &&
    imageUrl === user?.data.imageUrl;

  const handleUpdateUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      firstName === user?.data.firstName &&
      lastName === user?.data.lastName &&
      imageUrl === user?.data.imageUrl
    )
      return;
    updateUser(
      { firstName, lastName, imageUrl },
      {
        onSettled: () => {
          navigate("/users");
        },
      }
    );
  };

  if (isLoading)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );
  return (
    <div>
      <h2>User Details</h2>
      <p> UserID: {userId}</p>
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={icon}
        label="Email"
        placeholder="Your email"
        value={userEmail}
        w={300}
        disabled
        onChange={handleEmailChange}
      />
      <Space h="sm" />
      <TextInput
        label="First Name"
        placeholder="First Name"
        value={firstName}
        w={300}
        onChange={handleFirstNameChange}
      />
      <Space h="sm" />
      <TextInput
        label="Last Name"
        placeholder="Last Name"
        value={lastName}
        w={300}
        onChange={handleLastNameChange}
      />
      <Space h="sm" />
      <TextInput
        label="Image Url"
        placeholder="Image"
        value={imageUrl}
        w={300}
        onChange={handleImageUrlChange}
      />
      <Space h="sm" />
      <Select
        label="Role"
        placeholder="Pick role"
        data={["User", "BlacklistAdmin"]}
        w={300}
        value={role}
        onChange={setRole}
        disabled
        // onChange={handleRoleChange}
      />

      <Space h="md" />
      <Button
        disabled={isEdit}
        loading={isPending}
        onClick={(e) => {
          handleUpdateUser(e);
        }}
      >
        Update User
      </Button>
    </div>
  );
};

export default User;
