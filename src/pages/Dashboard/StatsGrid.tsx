import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { useUsers } from "../../hooks/useUsers";
import {
  IconUserPlus,
  IconDiscount2,
  IconBook,
  IconLockCancel,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";
import { useGetAllBlacklistItem } from "../../hooks/useGetAllBlacklistItem";
import { useGetAllItemsTotal } from "../../hooks/useGetAllItemsTotal";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconBook,
  coin: IconLockCancel,
};

export function StatsGrid() {
  const { users } = useUsers()!;
  const { allBlacklistItems } = useGetAllBlacklistItem();
  const { itemsAll } = useGetAllItemsTotal();
  const allBlacklistItemsCount = allBlacklistItems?.data?.totalCount ?? "--";

  const totalItems = itemsAll?.data.totalCount ?? "--";

  const data = [
    { title: "All Items", icon: "receipt", value: `${totalItems}`, diff: 34 },
    {
      title: "Blacklisted",
      icon: "coin",
      value: `${allBlacklistItemsCount}`,
      diff: -13,
    },
    {
      title: "All Users",
      icon: "discount",
      value: `${users?.data?.totalCount ?? "--"}`,
      diff: 18,
    },
    { title: "New customers", icon: "user", value: "--", diff: -30 },
  ] as const;

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    // const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          {/* <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text> */}
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}
