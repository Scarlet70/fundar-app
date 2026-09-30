import { useState, useMemo } from "react";
import { getAllocationTrend } from "@/utils/helpers";
import { useIncomeStore } from "@/stores/incomeStore";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   ResponsiveContainer,
   LineChart,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   Line,
} from "recharts";

const AllocationTrendChart = () => {
   const incomes = useIncomeStore((state) => state.incomes);
   const [selectedAllocation, setSelectedAllocation] =
      useState<string>("Savings");

   const allocationTrendData = useMemo(
      () => getAllocationTrend(incomes, selectedAllocation),
      [incomes, selectedAllocation],
   );

   const allocationOptions = Array.from(
      new Set(
         incomes.flatMap((income) =>
            income.allocations.map((allocation) => allocation.budgetName),
         ),
      ),
   );

   return (
      <section className="space-y-6">
         <h3 className="text-xl"> Allocation Trend over time</h3>
         <label
            htmlFor="allocation"
            className="block mb-3"
         >
            Choose an Allocation
         </label>
         <Select
            id="allocation"
            value={selectedAllocation}
            onValueChange={(value) => {
               if (value !== null) {
                  setSelectedAllocation(value);
               }
            }}
         >
            <SelectTrigger className="w-45">
               <SelectValue placeholder="Select allocation" />
            </SelectTrigger>

            <SelectContent>
               {allocationOptions.map((allocation) => (
                  <SelectItem
                     key={allocation}
                     value={allocation}
                  >
                     {allocation}
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
         <section>
            <ResponsiveContainer
               width="100%"
               height={350}
            >
               <LineChart data={allocationTrendData}>
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
                     dataKey="amount"
                     name={selectedAllocation}
                     stroke="#ea580c"
                     strokeWidth={3}
                     dot={{ r: 4 }}
                     activeDot={{ r: 6 }}
                  />
               </LineChart>
            </ResponsiveContainer>
         </section>
      </section>
   );
};

export default AllocationTrendChart;
