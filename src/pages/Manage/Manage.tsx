/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Button,
  Pagination,
  Center,
  Textarea,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetAllBlacklistItem } from "../../hooks/useGetAllBlacklistItem";
import { useGetAllBlacklist } from "../../hooks/useGetAllBlacklist";
import { useState } from "react";
// import { useDeleteBlacklist } from "../../hooks/useDeleteBlacklist";
import { useRemoveBlacklist } from "../../hooks/useRemoveBlacklist";

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const jobColors: Record<string, string> = {
  music: "blue",
  books: "cyan",
  designer: "red",
};

const Manage = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [itemId, setItemId] = useState("");
  const [reason, setReason] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user")!);

  const [searchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const [activePage, setPage] = useState(currentPage);

  const {
    // isLoading,
    allBlacklistItems,
  } = useGetAllBlacklistItem();
  const { isLoading: isLoadingAllBlacklist, allBlacklistItemsTotal } =
    useGetAllBlacklist();

  // const { isPending: isLoadingDelete, deleteBlacklist } = useDeleteBlacklist();
  const { isPending: isLoadingDelete, removeBlacklist } = useRemoveBlacklist();

  const totalPages = allBlacklistItems?.data.totalPageCount;

  const allBlacklistTotal = allBlacklistItemsTotal?.data;

  const data2 = allBlacklistTotal ? chunk(allBlacklistTotal, 10) : [];

  if (isLoadingAllBlacklist)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );

  const rows = data2[activePage - 1]?.map((item: any) => (
    <Table.Tr key={item.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.imageUrl} radius={30} />
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[item.category]} variant="light">
          {item.category}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {item.price}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.quantity}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil
              onClick={() => {
                navigate(`/blacklist/${item.id}`);
              }}
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
              onClick={() => {
                open();
                setItemId(item?.id);
              }}
            />
          </ActionIcon>
        </Group>
      </Table.Td>
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
        title="Reason for removal from blacklist"
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
          loading={isLoadingDelete}
          onClick={(e) => {
            e.preventDefault();

            if (!reason) return;

            removeBlacklist(
              {
                blacklistItemId: itemId,
                reason,
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

export default Manage;
