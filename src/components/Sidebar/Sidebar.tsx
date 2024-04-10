import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  // IconSettings,
  // Icon2fa,
  // IconDatabaseImport,

  IconLogout,
  IconDashboard,
  IconPlus,
  IconListDetails,
  IconEditCircle,
} from "@tabler/icons-react";
import { Text } from "@mantine/core";
import { NavLink } from "react-router-dom";

import classes from "@pages/Dashboard/Dashboard.module.css";

const data = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "books", label: "All Books", icon: IconListDetails },
  { link: "manage", label: "Manage Blacklist", icon: IconEditCircle },
  { link: "new", label: "New Blacklist", icon: IconPlus },
];

type Active = "Dashboard" | "All Books" | "Manage Blacklist" | "New Blacklist";

const Sidebar = () => {
  const [active, setActive] = useState<Active>("Dashboard");

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={`/${item.link}`}
      key={item.label}
      onClick={() => {
        setActive(item.label as Active);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar} style={{ height: "100dvh" }}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text
            style={{
              color: "#495057",
              fontWeight: "700",
              paddingLeft: "20px",
            }}
          >
            ISW Blacklist
          </Text>

          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
