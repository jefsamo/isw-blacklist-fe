import {
  Button,
  Center,
  Loader,
  Select,
  Space,
  TextInput,
  rem,
  Badge,
  FileButton,
  Text,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";

import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import axios from "axios";
import { BASE_URL } from "../../constants";

const User = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const icon = <IconAt style={{ width: rem(16), height: rem(16) }} />;

  const { updateUser, isPending } = useUpdateUser();
  const { isLoading, user } = useUser();

  const [userEmail, setUserEmail] = useState(user?.data.email);
  const [firstName, setFirstName] = useState(user?.data.firstName);
  const [lastName, setLastName] = useState(user?.data.lastName);
  const [imageUrl, setImageUrl] = useState(user?.data.imageUrl);
  const [role, setRole] = useState(user?.data.role ?? "");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserEmail(e.target.value);
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFirstName(e.target.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setLastName(e.target.value);
  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setImageUrl(e.target.value);
  const [isUploading, setIsUploading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const currentUser = JSON.parse(localStorage.getItem("user")!);

  const isEdit =
    firstName === user?.data.firstName &&
    lastName === user?.data.lastName &&
    imageUrl === user?.data.imageUrl;

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      try {
        setIsUploading(true);
        const response = await axios.post<{ url: string }>(
          `${BASE_URL}/items/photo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${currentUser?.jwToken}`,
            },
          }
        );
        setIsUploading(false);
        setImageUrl(response.data.url);
      } catch (error) {
        setIsUploading(false);
        console.error("Error uploading image:", error);
      }
    }
  };

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
      <div style={{ display: "flex", alignItems: "center" }}>
        <TextInput
          label="Image Url"
          placeholder="Image"
          value={imageUrl}
          w={300}
          onChange={handleImageUrlChange}
        />
        <div style={{ display: "flex", alignItems: "center" }}>
          <FileButton
            onChange={setFile}
            accept="image/png,image/jpeg,image/jpg"
          >
            {(props) => (
              <Badge
                {...props}
                color="blue"
                style={{ marginTop: "20px", cursor: "pointer" }}
              >
                choose photo
              </Badge>
            )}
          </FileButton>
          {file && (
            <Text size="sm" ta="center" mt="sm">
              {file.name}
            </Text>
          )}
          <Button
            style={{ marginTop: "20px" }}
            onClick={handleUpload}
            loading={isUploading}
            disabled={!file}
          >
            Upload
          </Button>
        </div>
      </div>

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
