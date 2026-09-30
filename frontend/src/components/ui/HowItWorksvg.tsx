import {
    BanknoteCheck,
    HandCoins,
    ListChecks,
    ChartPie,
    BadgeDollarSign,
} from "lucide-react";

import useWindowSize from "@/hooks/useWindowSize";

const HowItWorksvg = () => {
    const { width } = useWindowSize();

    if (width === undefined) return;

    let content =
        width >= 1024 ? (
            <article className="grid place-content-center w-full relative bg-pink-200 min-h-96">
                <svg
                    width="1225"
                    height="300"
                    viewBox="0 0 1225 300"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M60 150  C170 40, 260 40, 360 150 S550 260, 650 150 S840 40, 940 150 S1080 260, 1140 150"
                        stroke="#F97316"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill="none"
                    />
                </svg>

                <div className="flex flex-col gap-2 w-1/5 absolute bottom-5 left-5">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <BanknoteCheck />
                    </div>
                    <div className="text-sm">
                        <span>01</span>
                        <h4>Add Your Income</h4>
                        <p>
                            Record your salary, freelance earnings, business
                            income, gifts, or any other source of money.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/5 absolute -top-20.5 left-55">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <HandCoins />
                    </div>
                    <div className="text-sm">
                        <span>02</span>
                        <h4>Know Your Cash on Hand</h4>
                        <p>
                            Fundar automatically subtracts taxes and deductions
                            so you know exactly how much money is available to
                            allocate.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/5 absolute -bottom-9.5 left-111">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <BadgeDollarSign />
                    </div>
                    <div className="text-sm">
                        <span>03</span>
                        <h4>Allocate Every Dollar</h4>
                        <p>
                            Assign money to rent, food, transportation, savings,
                            investments, or any custom category using either
                            fixed amounts or percentages.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/5 absolute -top-12.5 left-180">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <ListChecks />
                    </div>
                    <div className="text-sm">
                        <span>04</span>
                        <h4>Record Expenses</h4>
                        <p>
                            Every expense automatically updates your remaining
                            allocation so you always know how much is left.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/5 absolute bottom-8.5 left-261">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <ChartPie />
                    </div>
                    <div className="text-sm">
                        <span>05</span>
                        <h4>Stay on Budget</h4>
                        <p>
                            Monitor your financial health with beautiful reports
                            and AI-powered recommendations.
                        </p>
                    </div>
                </div>
            </article>
        ) : (
            <article className="grid place-content-center w-full relative bg-pink-200 min-h-96">
                <svg
                    width="320"
                    height="1450"
                    viewBox="0 0 320 1450"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                >
                    <path
                        d="M160 60 V220 H80 V420 H240 V640 H120 V860 H260 V1080 H100 V1300"
                        stroke="#F97316"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />

                    <circle
                        cx="160"
                        cy="60"
                        r="10"
                        fill="#F97316"
                    />
                    <circle
                        cx="80"
                        cy="220"
                        r="10"
                        fill="#F97316"
                    />
                    <circle
                        cx="240"
                        cy="420"
                        r="10"
                        fill="#F97316"
                    />
                    <circle
                        cx="120"
                        cy="640"
                        r="10"
                        fill="#F97316"
                    />
                    <circle
                        cx="260"
                        cy="860"
                        r="10"
                        fill="#F97316"
                    />
                    <circle
                        cx="100"
                        cy="1080"
                        r="10"
                        fill="#F97316"
                    />
                    <circle
                        cx="100"
                        cy="1300"
                        r="10"
                        fill="#F97316"
                    />
                </svg>

                <div className="flex flex-col gap-2 w-1/2 absolute -top-20 left-[40%]">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <BanknoteCheck />
                    </div>
                    <div className="text-sm">
                        <span>01</span>
                        <h4>Add Your Income</h4>
                        <p>
                            Record your salary, freelance earnings, business
                            income, gifts, or any other source of money.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/2 absolute top-60 left-10">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <HandCoins />
                    </div>
                    <div className="text-sm">
                        <span>02</span>
                        <h4>Know Your Cash on Hand</h4>
                        <p>
                            Fundar automatically subtracts taxes and deductions
                            so you know exactly how much money is available to
                            allocate.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/2 absolute top-142 left-50">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <BadgeDollarSign />
                    </div>
                    <div className="text-sm">
                        <span>03</span>
                        <h4>Allocate Every Dollar</h4>
                        <p>
                            Assign money to rent, food, transportation, savings,
                            investments, or any custom category using either
                            fixed amounts or percentages.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/2 absolute top-220.5 left-10">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <ListChecks />
                    </div>
                    <div className="text-sm">
                        <span>04</span>
                        <h4>Record Expenses</h4>
                        <p>
                            Every expense automatically updates your remaining
                            allocation so you always know how much is left.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-1/2 absolute -bottom-8 left-40">
                    <div className="bg-slate-200 rounded-2xl p-4">
                        <ChartPie />
                    </div>
                    <div className="text-sm">
                        <span>05</span>
                        <h4>Stay on Budget</h4>
                        <p>
                            Monitor your financial health with beautiful reports
                            and AI-powered recommendations.
                        </p>
                    </div>
                </div>
            </article>
        );

    return content;
};

export default HowItWorksvg;
