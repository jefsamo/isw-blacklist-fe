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
  TextInput,
  NativeSelect,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    name: "Robert Wolfkisser",
    job: "Engineer",
    email: "rob_wolf@gmail.com",
    phone: "+44 (452) 886 09 12",
    bookId: 1,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    name: "Jill Jailbreaker",
    job: "Engineer",
    email: "jj@breaker.com",
    phone: "+44 (934) 777 12 76",
    bookId: 2,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    name: "Henry Silkeater",
    job: "Designer",
    email: "henry@silkeater.io",
    phone: "+44 (901) 384 88 34",
    bookId: 3,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png",
    name: "Bill Horsefighter",
    job: "Designer",
    email: "bhorsefighter@gmail.com",
    phone: "+44 (667) 341 45 22",
    bookId: 4,
  },
  {
    avatar:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png",
    name: "Jeremy Footviewer",
    job: "Manager",
    email: "jeremy@foot.dev",
    phone: "+44 (881) 245 65 65",
    bookId: 5,
  },
];

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "red",
};

const Manage = () => {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[item.job.toLowerCase()]} variant="light">
          {item.job}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {item.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{item.phone}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil
              onClick={() => {
                navigate(`/book/${item.bookId}`);
              }}
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
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
              <Table.Th>Book</Table.Th>
              <Table.Th>Title</Table.Th>
              <Table.Th>ISBN</Table.Th>
              <Table.Th>Genre</Table.Th>
              <Table.Th />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <Modal
        opened={opened}
        onClose={close}
        title="New Blacklist Item"
        centered
      >
        <TextInput label="Title" placeholder="Title" />
        <Space h="md" />
        <NativeSelect label="Category" data={["Music", "Movies", "Books"]} />
        <Space h="md" />
        <Button
          variant="filled"
          style={{ display: "flex", marginLeft: "auto" }}
        >
          Add
        </Button>
      </Modal>

      <Button
        leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}
        onClick={open}
      >
        Add Blacklist
      </Button>
    </div>
  );
};

export default Manage;
