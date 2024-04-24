import { useState } from "react";
import { Space } from "@mantine/core";
import { StatsGrid } from "./StatsGrid";
import ItemsonDashboard from "@pages/Items/Itemsondashboard";
import { InputBase, Center } from "@mantine/core";

const Dashboard = () => {
  const [filter, setFilter] = useState("");
  return (
    <>
     <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-between",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{
              color: "#495057",
              fontWeight: "700",
              marginRight: "20px",
            }}
          >
            Dashboard
          </h3>
          <Center style={{ width: "50%" }}>
            <InputBase
              type="text"
              placeholder="Search..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ width: "100%" }}
            />
          </Center>
        </div>
      <div>
       
        <StatsGrid />
        <Space h="md" />
        <ItemsonDashboard filter={filter} />
      </div>
    </>
  );
};

export default Dashboard;
