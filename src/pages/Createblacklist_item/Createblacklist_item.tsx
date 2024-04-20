import {
  Badge,
  Button,
  FileButton,
  InputBase,
  Select,
  Space,
  Text,
  TextInput,
} from "@mantine/core";
import { useCreateItem } from "../../hooks/useCreateItem";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const CreateItem = () => {
  const { isPending, createItem } = useCreateItem();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [reason, setReason] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const navigate = useNavigate();

  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setImageUrl(e.target.value);

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(e.target.value);
    setCategory(e.target.value);
  };

  const handleNewCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setNewCategory(e.target.value);

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

  const handleCreateItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !imageUrl
    )
      return;

    createItem(
      {
        category,
        description,
        imageUrl,
        name,
        price,
        quantity,
        token: currentUser?.jwToken,
        reason, // Include reason for blacklisting
      },
      {
        onSettled: () => {
          navigate("/items");
        },
      }
    );
  };

  return (
    <div style={{ width: "500px" }}>
      <InputBase
        label="Title"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Space h={10} />
      <InputBase
        label="Description"
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Space h={10} />
      <InputBase
        label="Price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(+e.target.value)}
      />
      <Space h={10} />
      <Select
        label="Category"
        placeholder="Select a category or enter a new one"
        value={selectedCategory || newCategory}
        onChange={handleCategoryChange}
        data={[
          { label: "Electronics", value: "Electronics" },
          { label: "Clothing", value: "Clothing" },
          { label: "Books", value: "Books" },
          { label: "Others", value: "Others" },
        ]}
      />
      {selectedCategory === "Others" && (
        <>
          <Space h={10} />
          <InputBase
            label="New Category"
            placeholder="Enter new category"
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
        </>
      )}
      <Space h={10} />
      <InputBase
        label="Quantity"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(+e.target.value)}
      />
      <Space h={10} />
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
      <Space h={10} />
      <InputBase
        label="Reason for Blacklisting"
        placeholder="Enter reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Space h={10} />
      <Button
        loading={isPending}
        onClick={(e) => {
          handleCreateItem(e);
        }}
      >
        Add item
      </Button>
    </div>
  );
};

export default CreateItem;
