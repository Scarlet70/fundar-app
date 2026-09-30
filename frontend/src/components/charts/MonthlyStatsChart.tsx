import { useIncomeStore } from "@/stores/incomeStore";
import { getMonthlyIncomeSummary } from "@/utils/helpers";
import { useMemo } from "react";
import {
   ResponsiveContainer,
   BarChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Legend,
   Bar,
} from "recharts";

const MonthlyStatsChart = () => {
   const incomes = useIncomeStore((state) => state.incomes);

   const monthlyData = useMemo(
      () => getMonthlyIncomeSummary(incomes),
      [incomes],
   );

   return (
      <ResponsiveContainer
         width="100%"
         height={350}
      >
         <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
               dataKey="month"
               style={{
                  fontSize: "0.7rem",
               }}
            />

            <YAxis
               style={{
                  fontSize: "0.8rem",
               }}
            />

            <Tooltip />

            <Legend />

            <Bar
               dataKey="netIncome"
               name="Net Income"
               fill="#8884d8"
            />

            <Bar
               dataKey="allocated"
               name="Allocated"
               fill="#82ca9d"
            />

            <Bar
               dataKey="unallocated"
               name="Unallocated"
               fill="#ffc658"
            />
         </BarChart>
      </ResponsiveContainer>
   );
};

export default MonthlyStatsChart;
