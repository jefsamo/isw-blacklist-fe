import { useState } from "react";
import { Group, Code } from "@mantine/core";
import {
  IconLogout,
  IconDashboard,
  IconPlus,
  IconEyePlus,
  IconListDetails,
} from "@tabler/icons-react";
import { Text } from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";

import classes from "@pages/Dashboard/Dashboard.module.css";

const data = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "users", label: "All Users", icon: IconListDetails },
  { link: "items", label: "All Items", icon: IconListDetails },
  { link: "create-user", label: "New User", icon: IconPlus },
  { link: "create-item", label: "New Item", icon: IconEyePlus },
];

type Active = "Dashboard" | "All Users" | "New User";

const SidebarUserAdmin = () => {
  const currentActive = localStorage.getItem("active") ?? "Dashboard";
  const [active, setActive] = useState<string>(currentActive);
  const navigate = useNavigate();
  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={`/${item.link}`}
      key={item.label}
      onClick={() => {
        setActive(item.label as Active);
        localStorage.setItem("active", item.label);
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
          onClick={(event) => {
            event.preventDefault();
            localStorage.removeItem("user");
            localStorage.removeItem("active");
            navigate("/login", { replace: true });
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
};

export default SidebarUserAdmin;
