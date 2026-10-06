import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { BlurFade } from "../ui/blur-fade";
import { AuroraText } from "../ui/aurora-text";

const Herosection = () => {
    return (
        <section className="flex flex-col xl:flex-row p-8 lg:p-12 mb-60 pt-32 lg:pt-32 scroll-mt-25 relative z-10">
            <article className="flex flex-col gap-8 lg:p-8 w-full text-center ">
                <BlurFade
                    delay={0.25}
                    inView
                >
                    <h1 className="lg:text-[4rem] text-4xl font-bold">
                        <span className="app-highlight">Plan </span>every{" "}
                        <AuroraText> income,</AuroraText> <br />
                        Spend with{" "}
                        <span className="app-highlight">Confidence</span>
                    </h1>
                </BlurFade>
                <BlurFade
                    delay={0.25 * 2}
                    inView
                >
                    <p className="lg:text-lg lg:w-2/3 text-center mx-auto">
                        Fundar helps you allocate every income to the things
                        that matter most. Set goals, create smart allocations,
                        monitor your budget, and stay in control all month long.
                    </p>
                </BlurFade>
                <BlurFade
                    delay={0.25 * 3}
                    inView
                >
                    <div className="flex justify-center gap-4">
                        <Link to={"/signup"}>
                            <Button className="p-6 rounded-4xl shadow-lg">
                                Get Started Free{" "}
                            </Button>
                        </Link>
                        <Link to={"/login"}>
                            <Button
                                className="p-6 rounded-4xl shadow-lg"
                                variant="outline"
                            >
                                See How it Works
                            </Button>
                        </Link>
                    </div>
                </BlurFade>
                <BlurFade
                    delay={0.25 * 4}
                    inView
                >
                    <div className="flex justify-center gap-2 lg:gap-4 text-xs">
                        <Badge
                            className="px-3"
                            variant={"fundar"}
                        >
                            smart allocations
                        </Badge>
                        <Badge
                            className="px-3"
                            variant={"blue"}
                        >
                            multiple currencies
                        </Badge>
                        <Badge
                            className="px-3"
                            variant={"positive"}
                        >
                            secure cloud sync
                        </Badge>
                        <Badge
                            className="px-3"
                            variant={"tech"}
                        >
                            AI insights
                        </Badge>
                    </div>
                </BlurFade>
            </article>
        </section>
    );
};

export default Herosection;
