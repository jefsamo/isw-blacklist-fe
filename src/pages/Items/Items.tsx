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

const Items = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const [reason, setReason] = useState("");
  const [itemId, setItemId] = useState("");
  const [searchParams] = useSearchParams();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const [activePage, setPage] = useState(currentPage);

  const { items, isLoading } = useItems()!;
  const { isLoading: isLoadingAllItems } = useGetAllItems()!;

  const { allNonBlacklistItems } = useGetAllNonBlacklistItem()!;

  const totalItems = allNonBlacklistItems?.data;

  const data2 = totalItems ? chunk(totalItems, 10) : [];

  const currentUser = JSON.parse(localStorage.getItem("user")!);
  const { isPending, createBlacklist } = useBlacklistItem();

  const totalPages = items?.data?.totalPageCount;

  // if (isLoading)
  if (isLoading || isLoadingAllItems)
    return (
      <Center h={"100dvh"}>
        <Loader />
      </Center>
    );

  const rows = data2[activePage - 1]?.map((item: any) => (
    <Table.Tr key={item.id}>
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

export default Items;
