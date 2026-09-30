import { useIncomeStore } from "@/stores/incomeStore";
import { useMemo } from "react";
import { getMonthlyGrossNetSummary } from "@/utils/helpers";
import {
   ResponsiveContainer,
   BarChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Bar,
   Legend,
} from "recharts";

const GrossNetComparisonChart = () => {
   const incomes = useIncomeStore((state) => state.incomes);
   const monthlyGrossNetData = useMemo(
      () => getMonthlyGrossNetSummary(incomes),
      [incomes],
   );
   return (
      <section className="space-y-6 lg:w-[calc(50%-1rem)]">
         <h3>Gross Income VS Net Income</h3>
         <ResponsiveContainer
            width="100%"
            height={350}
         >
            <BarChart data={monthlyGrossNetData}>
               <CartesianGrid strokeDasharray="3 3" />

               <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
               />

               <YAxis tick={{ fontSize: 12 }} />

               <Tooltip
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
               />

               <Legend />

               <Bar
                  dataKey="grossIncome"
                  name="Gross Income"
                  fill="#fed7aa"
                  radius={[8, 8, 0, 0]}
               />

               <Bar
                  dataKey="netIncome"
                  name="Net Income"
                  fill="#ea580c"
                  radius={[8, 8, 0, 0]}
               />
            </BarChart>
         </ResponsiveContainer>
      </section>
   );
};

export default GrossNetComparisonChart;
