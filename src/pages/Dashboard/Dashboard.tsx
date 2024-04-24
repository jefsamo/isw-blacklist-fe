import { Space } from "@mantine/core";
import { StatsGrid } from "./StatsGrid";
import ItemsonDashboard from "@pages/Items/Itemsondashboard";

const Dashboard = () => {
  return (
    <>
      <div>
        <h3
          style={{
            color: "#495057",
            fontWeight: "700",
          }}
        >
          Dashboard
        </h3>
        <StatsGrid />
        <Space h="md" />
        <ItemsonDashboard />
        {/* <Chart /> */}
      </div>
    </>
  );
};

export default Dashboard;
