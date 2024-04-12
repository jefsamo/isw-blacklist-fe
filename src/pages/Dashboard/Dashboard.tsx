import { Space } from "@mantine/core";
import { StatsGrid } from "./StatsGrid";

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
        {/* <Chart /> */}
      </div>
    </>
  );
};

export default Dashboard;
