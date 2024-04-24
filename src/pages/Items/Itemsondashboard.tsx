import React, { useState, useEffect } from "react";
import {
  Badge,
  Card,
  Text,
  Anchor,
  Modal,
  Pagination,
  Center,
  Loader,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  description:string
};

type ItemsonDashboardProps = {
  filter: string;
};


const generateBackground = () => {
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
};

const ItemDescription = ({ item, close }: { item: Item; close: () => void }) => (
  <Modal opened={true} onClose={close} title={item.name} centered size="55%">
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, height: "100%", overflow: "hidden" }}>
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
                background: generateBackground(),
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

const ItemsonDashboard: React.FC<ItemsonDashboardProps> = ({filter}) => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [itemId, setItemId] = useState("");
  const [searchParams] = useSearchParams();
 // const [filter, setFilter] = useState("");
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
    setFilteredData(chunk(filteredItems, 12));
    setCurrentPage(1); // Reset to the first page when filter changes
    setTotalPages(Math.ceil(filteredItems.length / 12));
  }, [totalItems, filter]);


  if (isLoadingItems || isLoadingNonBlacklistItems)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );

  const openModal = (id: string) => {
    setItemId(id);
    open();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    navigate(`?${params.toString()}`);
  };
  
  const generateBackground = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
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
            navigate(`/blacklist/${item.id}`);
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
                background: generateBackground(),
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


  const rows = filteredData[currentPage - 1]?.map((item: any) => (
    <ItemCard
      key={item.id}
      item={item}
      navigate={navigate}
      openModal={openModal}
    />
  ));

  return (
    <div style={{ padding: "0 10px" }}>
      
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
