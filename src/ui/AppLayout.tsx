import Sidebar from "@components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gridTemplateRows: "auto 1fr",
        gap: "20px",
      }}
    >
      <Sidebar />
      <div style={{ padding: "10px 10px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
