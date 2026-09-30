import { useIncomeStore } from "@/stores/incomeStore";
import { useMemo } from "react";
import { getIncomeBySource } from "@/utils/helpers";
import {
   ResponsiveContainer,
   BarChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Bar,
} from "recharts";

const IncomesComparisonChart = () => {
   const incomes = useIncomeStore((state) => state.incomes);

   const incomeSourceData = useMemo(
      () => getIncomeBySource(incomes),
      [incomes],
   );

   return (
      <ResponsiveContainer
         width="100%"
         height={350}
      >
         <BarChart
            data={incomeSourceData}
            layout="vertical"
            width={50}
         >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
               type="number"
               tick={{ fontSize: 12 }}
            />

            <YAxis
               type="category"
               dataKey="source"
               tick={{ fontSize: 12 }}
               width={170}
            />

            <Tooltip
               formatter={(value) => `$${Number(value).toLocaleString()}`}
            />

            <Bar
               dataKey="amount"
               name="Net Income"
               fill="#ea580c"
               radius={[0, 8, 8, 0]}
            />
         </BarChart>
      </ResponsiveContainer>
   );
};

export default IncomesComparisonChart;
