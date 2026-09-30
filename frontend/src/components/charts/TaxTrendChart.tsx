import { useMemo } from "react";
import { useIncomeStore } from "@/stores/incomeStore";
import { getMonthlyTaxSummary } from "@/utils/helpers";
import {
   ResponsiveContainer,
   LineChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Line,
} from "recharts";

const TaxTrendChart = () => {
   const incomes = useIncomeStore((state) => state.incomes);
   const monthlyTaxData = useMemo(
      () => getMonthlyTaxSummary(incomes),
      [incomes],
   );

   return (
      <section className="space-y-6  lg:w-[calc(50%-1rem)]">
         <h3>Tax Trend over time</h3>
         <ResponsiveContainer
            width="100%"
            height={350}
         >
            <LineChart data={monthlyTaxData}>
               <CartesianGrid strokeDasharray="3 3" />

               <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
               />

               <YAxis tick={{ fontSize: 12 }} />

               <Tooltip
                  formatter={(value) => `$${Number(value).toLocaleString()}`}
               />

               <Line
                  type="monotone"
                  dataKey="taxAmount"
                  name="Tax Paid"
                  stroke="#ea580c"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
               />
            </LineChart>
         </ResponsiveContainer>
      </section>
   );
};

export default TaxTrendChart;
