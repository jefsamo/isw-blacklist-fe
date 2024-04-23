import React, { useState, useEffect } from "react";
import {
  Avatar,
  Badge,
  Card,
  Group,
  Text,
  ActionIcon,
  Anchor,
  rem,
  Modal,
  Textarea,
  Button,
  Pagination,
  Center,
  Loader,
  Space,
  InputBase,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconArchive } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useItems } from "../../hooks/useItems";
import { useBlacklistItem } from "../../hooks/useBlacklistItem";
import { useGetAllNonBlacklistItem } from "../../hooks/useGetAllNonBlacklistItem";
import { useGetAllItems } from "../../hooks/useGetAllItems";

const jobColors: Record<string, string> = {
  music: "blue",
  books: "cyan",
  designer: "red",
};

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

type Item = {
  id: string;
  imageUrl: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
  removalReason?: string;
};

type ItemsonDashboardProps = {};

const ItemDescription = ({ item, close }: { item: Item; close: () => void }) => (
  <Modal opened={true} onClose={close} title={item.name} centered size="55%">
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, height: "100%", overflow: "hidden" }}>
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: "100%",
            objectFit: "cover",
            height: "100%",
            minHeight: "300px",
          }}
        />
      </div>
      <Space w={20} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div>
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
          <Space h={5} />
          <Badge color={jobColors[item.category]} variant="light">
            {item.category}
          </Badge>
        </div>
        <Space h={5} />
        <div>
          <Text fz="sm" fw={500}>
            Description:
          </Text>
          <Text fz="sm">{item.description}</Text>
        </div>
        <Space h={5} />
        <div>
          <Text fz="sm" fw={500}>
            Price:
          </Text>
          <Anchor component="button" size="sm">
            {item.price}
          </Anchor>
        </div>
        <Space h={5} />
        <div>
          <Text fz="sm" fw={500}>
            Quantity:
          </Text>
          <Text fz="sm">{item.quantity}</Text>
        </div>
      </div>
    </div>
  </Modal>
);

const ItemsonDashboard: React.FC<ItemsonDashboardProps> = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [reason, setReason] = useState("");
  const [itemId, setItemId] = useState("");
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState<Item[][]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { itemsAll, isLoading: isLoadingItems } = useGetAllItems()!;
  const {
    allNonBlacklistItems,
    isLoading: isLoadingNonBlacklistItems,
  } = useGetAllNonBlacklistItem()!;

  const nonblacklisteditems = allNonBlacklistItems?.data;
  let totalItems = itemsAll?.data;

  useEffect(() => {
    if (!totalItems) return;
    const filteredItems = totalItems.filter((item: any) =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(chunk(filteredItems, 10));
    setCurrentPage(1); // Reset to the first page when filter changes
    setTotalPages(Math.ceil(filteredItems.length / 10)); // Recalculate total pages
  }, [totalItems, filter]);
  
  //...

  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const { isPending, createBlacklist } = useBlacklistItem();

  if (isLoadingItems || isLoadingNonBlacklistItems)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );

  const openModal = (id: string) => {
    const item = totalItems.find((item: Item) => item.id === id);
    setItemId(id);
    open();
  };

  const generateImageUrl = (name: string) => {
    const firstLetters = name.slice(0, 5).toUpperCase();
    const randomColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    const imageUrl = `https://dummyimage.com/300x300/${randomColor}/ffffff&text=${firstLetters}`;
    return imageUrl;
  };

  const ItemCard = ({
    item,
    navigate,
    openModal,
  }: {
    item: Item;
    navigate: any;
    openModal: (id: string) => void;
  }) => {
    const isBlacklisted =
      nonblacklisteditems &&
      nonblacklisteditems.find((i: Item) => i.id === item.id);
    const opacity = isBlacklisted ? 1 : 0.5;

    return (
      <Card
        shadow="xs"
        padding="md"
        style={{
          marginBottom: "20px",
          width: "250px",
          height: "300px",
          transition: "transform 0.3s",
          cursor: "pointer",
          opacity: opacity,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onClick={() => {
          if (!isBlacklisted) {
            navigate(`/item/${item.id}`);
          } else {
            openModal(item.id);
          }
        }}
      >
        <div style={{ height: "70%", overflow: "hidden" }}>
          {item.imageUrl && isUrlValid(item.imageUrl) ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: generateBackground(item.name),
              }}
            >
              <span
                style={{
                  fontSize: "50px",
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                {item.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <Space h={10} />
        <div
          style={{
            height: "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Text fz="sm" fw={500}>
              {item.name}
            </Text>
            <Space h={5} />
            <Badge color={jobColors[item.category]} variant="light">
              {item.category}
            </Badge>
          </div>
          <div>
            {!isBlacklisted && (
              <Badge color="red" variant="light">
                Blacklisted
              </Badge>
            )}
          </div>
        </div>
      </Card>
    );
  };

  const handlePageChange = (page: number) => {
    const here ='5'
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    navigate(`?${params.toString()}`);
  };
  

  const generateBackground = (name: string) => {
    const firstLetters = name.slice(0, 5).toUpperCase();
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  const rows = filteredData[currentPage - 1]?.map((item: any) => (
    <ItemCard
      key={item.id}
      item={{ ...item, imageUrl: item.imageUrl || generateImageUrl(item.name) }}
      navigate={navigate}
      openModal={openModal}
    />
  ));

  return (
    <div style={{ padding: "0 10px" }}>
      <Center>
        <InputBase
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginBottom: "20px", width: "50%" }}
        />
      </Center>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {rows}
      </div>

      <Center ml={"-100"}>
        <Pagination
          total={totalPages}
          value={currentPage}
          onChange={handlePageChange}
          mt="sm"
        />
      </Center>

      {opened && (
        <ItemDescription
          item={totalItems.find((item: Item) => item.id === itemId)!}
          close={close}
        />
      )}

      <Modal
        opened={opened}
        onClose={close}
        title="Reason for blacklist"
        centered
        size="55%"
      >
        <Textarea
          placeholder="Reason..."
          m="0 0 30 0"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Button
          variant="filled"
          style={{ display: "flex", marginLeft: "auto" }}
          loading={isPending}
          onClick={(e) => {
            e.preventDefault();

            if (!reason) return;

            createBlacklist(
              {
                itemId: itemId,
                reason: reason,
                token: currentUser?.jwToken,
              },
              {
                onSettled: () => {
                  setReason("");
                  close();
                  navigate("/items");
                },
              }
            );
          }}
        >
          Add
        </Button>
      </Modal>
    </div>
  );
};

function isUrlValid(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

export default ItemsonDashboard;
