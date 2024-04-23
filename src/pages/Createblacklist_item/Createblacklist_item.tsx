import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  FileButton,
  InputBase,
  Space,
  Text,
  TextInput,
  Select,
} from "@mantine/core";
import { useCreateblacklistItem } from "../../hooks/useCreateblacklistItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useGetCategories } from "../../hooks/useGetCategories";

const CreateblacklistItem = () => {
  const { isPending, createblacklistItem } = useCreateblacklistItem();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [reason, setReason] = useState("");
  const [categoryExists, setCategoryExists] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user")!);

  const { getCategory } = useGetCategories();

  const totalItems = ["NEWCATEGORY", ...(getCategory?.data || [])];

  useEffect(() => {
    setCategoryExists(totalItems.map(cat => cat.toLowerCase()).includes(newCategory.toLowerCase()));
  }, [newCategory, getCategory]);

  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setImageUrl(e.target.value);

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

    if (!name || !description || !price || !category || !quantity || !imageUrl || !reason)
      return;

    createblacklistItem(
      {
        category: category === "NEWCATEGORY" ? newCategory : category,
        description,
        imageUrl,
        name,
        price,
        quantity,
        token: currentUser?.jwToken,
        reason: reason 
      },
      {/*{
        onSettled: () => {
          navigate("/items");
        },
      }*/}
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
        type="number"
        onChange={(e) => setPrice(+e.target.value)}
      />
      <Space h={10} />
      <Select
        label="Category"
        placeholder="Select category"
        value={category}
        onChange={(value) => setCategory(value as string)}
        data={totalItems.map((categoryName: any) => ({
          value: categoryName,
          label: categoryName,
        }))}
      />
      {category === "NEWCATEGORY" && (
        <>
          <Space h={10} />
          <InputBase
            label={categoryExists ? "Category Already Exists" : "Enter New Category"}
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => {
              setNewCategory(e.target.value);
              setCategoryExists(totalItems.map(cat => cat.toLowerCase()).includes(e.target.value.toLowerCase()));
            }}
          />
        </>
      )}
      <Space h={10} />
      <InputBase
        label="Reason for Blacklisting"
        placeholder="Reason for blacklisting..."
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <Space h={10} />
      <InputBase
        label="Quantity"
        placeholder="Quantity"
        value={quantity}
        type="number"
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
                Choose photo
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
      <Button loading={isPending} onClick={handleCreateItem}>
        Add New Blacklist Item
      </Button>
    </div>
  );
};

export default CreateblacklistItem;
