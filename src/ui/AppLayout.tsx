import Sidebar from "@components/Sidebar/Sidebar";
import SidebarUser from "@components/Sidebar/SidebarUser";
import SidebarUserAdmin from "@components/Sidebar/SidebarUserAdmin";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  const currentUser = JSON.parse(localStorage.getItem("user")!);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        gap: "20px",
      }}
    >
      {currentUser?.userRole === "UserAdmin" && <SidebarUserAdmin />}
      {currentUser?.userRole === "BlacklistAdmin" && <Sidebar />}
      {currentUser?.userRole === "User" && <SidebarUser />}
      {/* <Sidebar /> */}
      <div style={{ padding: "10px 10px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
