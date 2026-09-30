import { Button } from "../ui/button";
import { Summary, Coins, Banknote } from "lucide-react";
import { Link } from "react-router-dom";

const Herosection = () => {
    return (
        <section className="flex flex-col xl:flex-row p-8 lg:p-12 mb-20">
            <article className="flex flex-col gap-8 lg:p-8 w-full lg:w-[calc(54%-1rem)]">
                <h1 className="lg:text-6xl text-4xl">
                    <span className="app-highlight">Plan </span>every income,{" "}
                    <br />
                    Spend with <span className="app-highlight">Confidence</span>
                </h1>
                <p className="xl:w-3/5">
                    Fundar helps you allocate every income to the things that
                    matter most. Set goals, create smart allocations, monitor
                    your budget, and stay in control all month long.
                </p>
                <div className="flex gap-4">
                    <Link to={"/signup"}>
                        <Button className="p-6 rounded-4xl">
                            Get Started Free{" "}
                        </Button>
                    </Link>
                    <Link to={"/login"}>
                        <Button
                            className="p-6 rounded-4xl"
                            variant="outline"
                        >
                            See How it Works
                        </Button>
                    </Link>
                </div>
                <div className="flex gap-4 text-xs">
                    <span className="bg-slate-300 p-1 px-2 rounded-xl">
                        smart allocations
                    </span>
                    <span className="bg-slate-300 p-1 px-2 rounded-xl">
                        multiple currencies
                    </span>
                    <span className="bg-slate-300 p-1 px-2 rounded-xl">
                        Secure Cloud sync
                    </span>
                    <span className="bg-slate-300 p-1 px-2 rounded-xl">
                        AI insights
                    </span>
                </div>
            </article>
            <article className="flex flex-col bg-slate-200 w-full lg:w-[calc(46%-1rem)] p-4 items-center">
                <div className="w-[80%] flex flex-col justify-center gap-4 bg-slate-100 p-2 rounded-2xl">
                    <section className="flex justify-evenly">
                        <div className="bg-white rounded-2xl p-2 text-[0.6rem] w-[calc(25%-0.5rem)]">
                            <h4>
                                {" "}
                                <Summary className="w-3 h-3" /> Total Income
                            </h4>
                            <span>$96,000</span>
                        </div>
                        <div className="bg-white rounded-2xl p-2 text-[0.6rem] w-[calc(25%-0.5rem)]">
                            <h4>
                                {" "}
                                <Banknote className="w-3 h-3" /> Current
                                Expenses
                            </h4>
                            <span>5</span>
                        </div>
                        <div className="bg-white rounded-2xl p-2 text-[0.6rem] w-[calc(25%-0.5rem)]">
                            <h4>
                                {" "}
                                <Coins className="w-3 h-3" /> Cash on Hand
                            </h4>
                            <span>$84,000</span>
                        </div>
                        <div className="bg-white rounded-2xl p-2 text-[0.6rem] w-[calc(25%-0.5rem)]">
                            <h4>
                                {" "}
                                <Summary className="w-3 h-3" /> Unallocated
                                Resources
                            </h4>
                            <span>$12,000</span>
                        </div>
                    </section>
                    <section className="flex flex-col gap-2">
                        <aside className="flex flex-row justify-center gap-2">
                            <div className="w-[48%] h-20 bg-slate-400/20 rounded-xl"></div>
                            <div className="w-[48%] h-20 bg-slate-400/20 rounded-xl"></div>
                        </aside>
                        <aside className="flex flex-row justify-center gap-2">
                            <div className="w-[48%] h-20 bg-slate-400/20 rounded-xl"></div>
                            <div className="w-[48%] h-20 bg-slate-400/20 rounded-xl"></div>
                        </aside>
                        <aside className="flex flex-row justify-center gap-2">
                            <div className="w-[48%] h-20 bg-slate-400/20 rounded-xl"></div>
                            <div className="w-[48%] h-20 bg-slate-400/20 rounded-xl"></div>
                        </aside>
                    </section>
                </div>
            </article>
        </section>
    );
};

export default Herosection;
