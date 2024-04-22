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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconArchive } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
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

const ItemCard = ({ item, navigate, openModal }: { item: Item; navigate: any; openModal: (id: string) => void }) => (
  <Card
    shadow="xs"
    padding="md"
    style={{ marginBottom: "20px", width: "250px", height: "300px", transition: "transform 0.3s", cursor: "pointer", opacity: item.removalReason ? 0.5 : 1 }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.05)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
    onClick={() => {
      if (item.removalReason) {
        navigate(`/item/${item.id}`);
      } else {
        openModal(item.id);
      }
    }}
  >
    <div style={{ height: "70%", overflow: "hidden" }}>
      <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
    <Space h={10}/>
    <div style={{ height: "30%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <Text fz="sm" fw={500}>
          {item.name}
        </Text>
        <Space h={5}/>
        <Badge color={jobColors[item.category]} variant="light">
          {item.category}
        </Badge>
      </div>
      <div>
        {item.removalReason && (
          <Badge color="red" variant="light">
            Blacklisted
          </Badge>
        )}
      </div>
    </div>
  </Card>
);

const ItemDescription = ({ item, close }: { item: Item; close: () => void }) => (
  <Modal
    opened={true}
    onClose={close}
    title={item.name}
    centered
    size="55%"
  >
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, height: "100%", overflow: "hidden" }}>
        <img src={item.imageUrl} alt={item.name} style={{ width: "100%", objectFit: "cover", height: "100%", minHeight: "300px" }} />
      </div>
      <Space w={20}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div>
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
          <Space h={5}/>
          <Badge color={jobColors[item.category]} variant="light">
            {item.category}
          </Badge>
        </div>
        <Space h={5}/>
        <div>
        <Text fz="sm" fw={500}>Price:</Text> 
          <Anchor component="button" size="sm">
        {item.price}
          </Anchor>
        </div>
        <Space h={5}/>
        <div>
        <Text fz="sm" fw={500}>Quantity:</Text> 
          <Text fz="sm">{item.quantity}</Text>
        </div>
        <div>
          {item.removalReason && (
            <Badge color="red" variant="light">
              Blacklisted
            </Badge>
          )}
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

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const [activePage, setActivePage] = useState(currentPage);

  const { itemsAll, isLoading: isLoadingItems } = useGetAllItems()!;
  const { allNonBlacklistItems, isLoading: isLoadingNonBlacklistItems } = useGetAllNonBlacklistItem()!;
  
  const totalItems = itemsAll?.data;

  const data2 = totalItems ? chunk(totalItems, 10) : [];

  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const { isPending, createBlacklist } = useBlacklistItem();

  const totalPages = itemsAll?.data?.totalPageCount;

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

  const rows = data2[activePage - 1]?.map((item: any) => (
    <ItemCard
      key={item.id}
      item={item}
      navigate={navigate}
      openModal={openModal}
    />
  ));

  return (
    <div style={{ padding: "0 10px" }}>
    
      <div style={{ marginBottom: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>{rows}</div>

      <Center ml={"-100"}>
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={setActivePage}
          mt="sm"
        />
      </Center>

      {opened && <ItemDescription item={totalItems.find((item: Item) => item.id === itemId)!} close={close} />}

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

export default ItemsonDashboard;
