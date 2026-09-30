import MonthlyStatsChart from "@/components/charts/MonthlyStatsChart";
import StackedAllocationChart from "@/components/charts/StackedAllocationChart";
import IncomesComparisonChart from "@/components/charts/IncomesComparisonChart";
import AllocationTrendChart from "@/components/charts/AllocationTrendChart";
import TaxTrendChart from "@/components/charts/TaxTrendChart";
import GrossNetComparisonChart from "@/components/charts/GrossNetComparisonChart";

const AnalyticsPage = () => {
   return (
      <section>
         <h2 className="font-semibold text-xl">Fundar Analytics</h2>
         <section className="p-4 flex flex-col space-y-12">
            <article className="p-4">
               <h3 className="font-semibold">
                  Monthly Allocation Stats Comparison
               </h3>
               <MonthlyStatsChart />
            </article>
            <hr />
            <article className="p-4">
               <h3 className="mb-12 font-semibold text-xl">Allocation Stats</h3>
               <section className="flex flex-col gap-6 lg:flex-row justify-between">
                  <section className="w-full lg:w-[calc(50%-1rem)]">
                     <h3 className="font-semibold mb-8">
                        Allocated VS Unallocated
                     </h3>
                     <StackedAllocationChart />
                  </section>
                  <section className="w-full lg:w-[calc(50%-1rem)]">
                     <h3 className="font-semibold mb-8">Top Income Sources</h3>
                     <IncomesComparisonChart />
                  </section>
               </section>
            </article>
            <hr />
            <article className="p-4 space-y-10">
               <AllocationTrendChart />
            </article>
            <hr />
            <article className="flex flex-col lg:flex-row gap-8 justify-between">
               <TaxTrendChart />
               <GrossNetComparisonChart />
            </article>
         </section>
      </section>
   );
};

export default AnalyticsPage;
