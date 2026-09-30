import {
    BrainCircuit,
    Brain,
    BanknoteArrowUp,
    Cpu,
    CircleDollarSign,
    ChartNoAxesCombined,
    MoveRight,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Features = () => {
    return (
        <section className="flex flex-col lg:flex-row justify-between p-4 mb-25">
            <article className="flex flex-col gap-8 lg:w-[calc(40%-1rem)] w-full lg:pt-32 p-4 lg:p-8 mb-20">
                <h3 className="lg:text-6xl text-4xl">
                    Everything you need to plan your money with confidence.
                </h3>
                <p>
                    Fundar helps you plan every paycheck, allocate money
                    intelligently, monitor your spending, and build healthier
                    financial habits—all in one place.
                </p>
                <Link to={"/dashboard"}>
                    <Button className="w-1/2 p-6 rounded-4xl">
                        Explore the App <MoveRight />
                    </Button>
                </Link>
            </article>
            <article className="flex flex-col gap-4 lg:w-[calc(60%-1rem)] w-full p-4">
                <h3 className="text-center text-3xl text-underline">
                    CORE FEATURES
                </h3>
                <section className="grid grid-cols-1 lg:grid-cols-3  gap-2">
                    <div className="bg-slate-500 p-8 rounded-md lg:row-span-2">
                        <Brain />
                        <h4>Smart Income Planning</h4>
                        <p className="text-sm">
                            Add salaries, freelance earnings, gifts, or any
                            income source and instantly know how much is
                            available after taxes.
                        </p>
                    </div>
                    <div className="bg-slate-500 p-8 rounded-md lg:col-span-2 row-span-1">
                        <BrainCircuit />
                        <h4>Intelligent Fund Allocation</h4>
                        <p className="text-sm">
                            Allocate money by amount or percentage. Fundar
                            automatically calculates the rest so every dollar
                            has a purpose.
                        </p>
                    </div>
                    <div className="bg-slate-500 p-8 rounded-md">
                        <BanknoteArrowUp />
                        <h4>Multiple Income Sources</h4>
                        <p className="text-sm">
                            Manage salaries, side hustles, gifts, and business
                            income separately while keeping one complete
                            financial overview.
                        </p>
                    </div>
                    <div className="bg-slate-500 p-8 rounded-md">
                        <Cpu />
                        <h4>AI Budget Insights</h4>
                        <p className="text-sm">
                            Receive personalized recommendations that help
                            improve your budgeting habits and make better
                            financial decisions.
                        </p>
                    </div>
                    <div className="bg-slate-500 p-8 rounded-md lg:col-span-2">
                        <CircleDollarSign />
                        <h4>Multi-Currency Support</h4>
                        <p className="text-sm">
                            Track income and expenses in different currencies
                            while Fundar keeps everything organized using your
                            preferred base currency.
                        </p>
                    </div>
                    <div className="bg-slate-500 p-8 rounded-md">
                        <ChartNoAxesCombined />
                        <h4>Budget Analytics</h4>
                        <p className="text-sm">
                            Understand your financial habits through beautiful
                            charts, comparisons, and monthly budget summaries.
                        </p>
                    </div>
                </section>
            </article>
        </section>
    );
};

export default Features;
