import { getMonthlyIncomeSummary } from "@/utils/helpers";
import { useMemo } from "react";
import { useIncomeStore } from "@/stores/incomeStore";
import {
   ResponsiveContainer,
   BarChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Bar,
} from "recharts";

const StackedAllocationChart = () => {
   const incomes = useIncomeStore((state) => state.incomes);

   const monthlyIncomeSummary = useMemo(
      () => getMonthlyIncomeSummary(incomes),
      [incomes],
   );

   return (
      <ResponsiveContainer
         width="100%"
         height={350}
      >
         <BarChart
            data={monthlyIncomeSummary}
            layout="vertical"
         >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
               type="number"
               tick={{ fontSize: 12 }}
            />

            <YAxis
               type="category"
               dataKey="month"
               tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Bar
               dataKey="allocated"
               name="Allocated"
               stackId="income"
               fill="#ea580c"
            />

            <Bar
               dataKey="unallocated"
               name="Unallocated"
               stackId="income"
               fill="#fed7aa"
            />
         </BarChart>
      </ResponsiveContainer>
   );
};

export default StackedAllocationChart;
