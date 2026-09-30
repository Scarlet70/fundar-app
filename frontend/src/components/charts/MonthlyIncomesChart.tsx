import { useMemo } from "react";
import { useIncomeStore } from "@/stores/incomeStore";
import { getMonthlyIncome } from "@/utils/helpers";
import { useAuthStore } from "@/stores/authStore";
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Rectangle,
} from "recharts";

const MonthlyIncomesChart = () => {
    const incomes = useIncomeStore((state) => state.incomes);
    const baseCurrency = useAuthStore((state) => state.settings?.baseCurrency);

    const monthlyIncomeData = useMemo(
        () => getMonthlyIncome(incomes, 5),
        [incomes],
    );

    const highestIncome = Math.max(
        ...monthlyIncomeData.map((item) => item.amount),
    );

    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <BarChart data={monthlyIncomeData}>
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                    dataKey="month"
                    style={{ fontSize: "0.7rem" }}
                />

                <YAxis style={{ fontSize: "0.8rem" }} />

                <Tooltip
                    content={({ active, payload, label }) => {
                        if (!active || !payload || !payload.length) {
                            return null;
                        }

                        const value = payload[0]?.value;

                        return (
                            <div className="rounded-lg border border-fundar-border bg-fundar-surface px-4 py-3 shadow-lg">
                                <p className="mb-1 text-sm text-fundar-brand">
                                    {label}
                                </p>

                                <p className="text-sm font-semibold text-fundar-text">
                                    Income: {baseCurrency?.symbol}
                                    {Number(value).toLocaleString()}
                                </p>
                            </div>
                        );
                    }}
                />

                <Bar
                    dataKey="amount"
                    name="Net Income"
                    barSize={40}
                    radius={[10, 10, 0, 0]}
                    shape={(props) => {
                        const { payload } = props;

                        return (
                            <Rectangle
                                {...props}
                                fill={
                                    payload.amount === highestIncome
                                        ? "#ea580c"
                                        : "#fed7aa"
                                }
                            />
                        );
                    }}
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthlyIncomesChart;
