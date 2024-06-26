import { BarChart } from "@mantine/charts";
import { data } from "./data";

const Chart = () => {
  return (
    <BarChart
      h={300}
      data={data}
      dataKey="month"
      type="stacked"
      series={[
        { name: "Smartphones", color: "violet.6" },
        { name: "Laptops", color: "blue.6" },
        { name: "Tablets", color: "teal.6" },
      ]}
    />
  );
};

export default Chart;
