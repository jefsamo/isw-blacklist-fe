/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Badge,
  Table,
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

const ItemsonDashboard = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [reason, setReason] = useState("");
  const [itemId, setItemId] = useState("");
  const [searchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const [activePage, setPage] = useState(currentPage);

  const { itemsAll, isLoading } = useGetAllItems()!;
  const { isLoading: isLoadingAllItems } = useGetAllItems()!;

  const { allNonBlacklistItems } = useGetAllNonBlacklistItem()!;
  
  const totalItems = itemsAll?.data;

  const data2 = totalItems ? chunk(totalItems, 10) : [];

  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const { isPending, createBlacklist } = useBlacklistItem();

  const totalPages = itemsAll?.data?.totalPageCount;

  // if (isLoading)
  if (isLoading || isLoadingAllItems)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );

  const rows = data2[activePage - 1]?.map((item: any) => (
    <Table.Tr key={item.id} style={{ opacity: item.removalReason ? 0.5 : 1 }}>
      <>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={30} src={item.imageUrl} radius={30} />
            <Text fz="sm" fw={500}>
              {item?.name}
            </Text>
          </Group>
        </Table.Td>

        <Table.Td>
          <Badge color={jobColors[item.category]} variant="light">
            {item?.category}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Anchor component="button" size="sm">
            {item?.price}
          </Anchor>
        </Table.Td>
        <Table.Td>
          <Text fz="sm">{item.quantity}</Text>
        </Table.Td>
        <Table.Td style={{ opacity: item.removalReason ? 0.5 : 0 }}>
          <Badge color="red" variant="light">
           Blacklisted
          </Badge>
        </Table.Td>
        <Table.Td>
          {currentUser?.userRole !== "User" &&
            currentUser?.userRole !== "UserAdmin" && (
              <Group gap={0} justify="flex-end">
                <ActionIcon variant="subtle" color="gray">
                  <IconPencil
                    onClick={() => {
                      navigate(`/item/${item.id}`);
                    }}
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                </ActionIcon>
                <ActionIcon variant="subtle" color="red">
                  <IconArchive
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                    onClick={() => {
                      open();
                      setItemId(item?.id);
                    }}
                  />
                </ActionIcon>
              </Group>
            )}
        </Table.Td>
      </>
    </Table.Tr>
  ));

  return (
    <div style={{ padding: "0 10px" }}>
    
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Center ml={"-100"}>
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={setPage}
          mt="sm"
        />
      </Center>

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

const ItemCard = ({ item }) => (
  <Card
    shadow="xs"
    padding="sm"
    style={{ opacity: item.removalReason ? 0.5 : 1, marginBottom: "10px" }}
  >
    <Group align="flex-start">
      <Avatar size={30} src={item.imageUrl} radius={30} />
      <div style={{ flex: 1 }}>
        <Text fz="sm" fw={500}>
          {item.name}
        </Text>
        <Text fz="sm">{item.category}</Text>
        <Badge color={jobColors[item.category]} variant="light">
          {item.category}
        </Badge>
      </div>
      <div>
        <Anchor component="button" size="sm">
          {item.price}
        </Anchor>
        <Text fz="sm">{item.quantity}</Text>
        {item.removalReason && (
          <Badge color="red" variant="light">
            Blacklisted
          </Badge>
        )}
      </div>
      <div>
        <ActionIcon variant="subtle" color="gray">
          <IconPencil
            onClick={() => {
              navigate(`/item/${item.id}`);
            }}
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        </ActionIcon>
        <ActionIcon variant="subtle" color="red">
          <IconArchive
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
            onClick={() => {
              open();
              setItemId(item?.id);
            }}
          />
        </ActionIcon>
      </div>
    </Group>
  </Card>
);

const ItemsonDashboard = () => {
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

  const openModal = (id) => {
    open();
    setItemId(id);
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
    
      <div style={{ marginBottom: "20px" }}>{rows}</div>

      <Center ml={"-100"}>
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={setActivePage}
          mt="sm"
        />
      </Center>

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
