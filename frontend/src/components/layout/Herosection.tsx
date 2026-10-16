import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Link } from "react-router-dom";
import { BlurFade } from "../ui/blur-fade";
import { AuroraText } from "../ui/aurora-text";
import { RainbowButton } from "../ui/rainbow-button";
import DarkUi1 from "../../assets/darkui1.png";
import LightUi1 from "../../assets/lightui1.png";
import { useThemeStore } from "@/stores/themeStore";
import { FundarGradientText } from "../reusables/AnimatedGradientText";
import FloatingCards from "../reusables/FloatingCards";

const Herosection = () => {
    const currentMode = useThemeStore((state) => state.mode);

    return (
        <section
            id="hero"
            className="flex flex-col p-4 lg:p-12 mb-60 pt-32 lg:pt-32 scroll-mt-25 relative z-10"
        >
            <article className="flex flex-col gap-8 lg:p-8 w-full text-center ">
                <FundarGradientText />
                <BlurFade
                    delay={0.25}
                    inView
                >
                    <h1 className="lg:text-[4rem] text-[2rem] font-semibold">
                        <span className="app-highlight">Plan </span>every{" "}
                        <AuroraText> income,</AuroraText> <br />
                        <span className="text-nowrap">
                            {" "}
                            Spend with{" "}
                            <span className="app-highlight">Confidence</span>
                        </span>
                    </h1>
                </BlurFade>
                <BlurFade
                    delay={0.25 * 2}
                    inView
                >
                    <p className="text-[0.8rem] lg:text-lg lg:w-2/3 text-center mx-auto">
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
                            <RainbowButton
                                variant={"outline"}
                                className="p-6 rounded-2xl shadow-lg"
                            >
                                Get Started Free{" "}
                            </RainbowButton>
                        </Link>
                        <Link to={"/login"}>
                            <Button className="p-6 rounded-2xl shadow-lg bg-fundar-brand-soft text-fundar-brand">
                                See How it Works
                            </Button>
                        </Link>
                    </div>
                </BlurFade>
                <BlurFade
                    delay={0.25 * 4}
                    inView
                >
                    <div className="flex justify-center gap-2 lg:gap-4">
                        <Badge
                            className="lg:px-3 px-1 py-0 text-[0.5rem] lg:text-xs "
                            variant={"fundar"}
                        >
                            smart allocations
                        </Badge>
                        <Badge
                            className="lg:px-3 px-1 py-0 text-[0.5rem] lg:text-xs"
                            variant={"blue"}
                        >
                            multiple currencies
                        </Badge>
                        <Badge
                            className="lg:px-3 px-1 py-0 text-[0.5rem] lg:text-xs"
                            variant={"positive"}
                        >
                            secure cloud sync
                        </Badge>
                        <Badge
                            className="lg:px-3 text-[0.5rem] lg:text-xs"
                            variant={"tech"}
                        >
                            AI insights
                        </Badge>
                    </div>
                </BlurFade>
            </article>
            <article className="relative w-full xl:w-[calc(80%-1rem)] mx-auto mt-20 p-4 sm:p-6">
                {/* Ambient glow behind the frame */}
                <div className="absolute inset-8 rounded-[2rem] bg-orange-400/20 blur-3xl" />

                {/* Outer glass frame */}
                <section className="relative rounded-3xl border border-white/40 bg-white/30 p-2 shadow-2xl shadow-orange-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-white/4 sm:p-3">
                    {/* Inner frame */}
                    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-inner dark:border-white/10 dark:bg-neutral-950/70">
                        {/* Browser-style header */}
                        <div className="flex items-center justify-between border-b border-black/5 bg-white/50 px-4 py-3 dark:border-white/10 dark:bg-white/3">
                            <div className="flex items-center gap-1.5">
                                <span className="size-2.5 rounded-full bg-red-400/80" />
                                <span className="size-2.5 rounded-full bg-yellow-400/80" />
                                <span className="size-2.5 rounded-full bg-green-400/80" />
                            </div>

                            <div className="hidden items-center gap-2 rounded-full border border-black/5 bg-white/60 px-4 py-1 text-xs text-muted-foreground sm:flex dark:border-white/10 dark:bg-white/5">
                                <span className="size-1.5 rounded-full bg-green-500" />
                                fundar.app/dashboard
                            </div>

                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <span className="size-1 rounded-full bg-current" />
                                <span className="size-1 rounded-full bg-current" />
                                <span className="size-1 rounded-full bg-current" />
                            </div>
                        </div>

                        {/* Dashboard image */}
                        <div className="relative bg-orange-50/30 p-2 dark:bg-neutral-950/40 sm:p-3">
                            <img
                                src={
                                    currentMode === "dark" ? DarkUi1 : LightUi1
                                }
                                alt="Fundar dashboard interface showing personal budget and spending overview"
                                loading="lazy"
                                className="block h-auto w-full rounded-lg object-contain"
                            />
                        </div>
                    </div>
                    <FloatingCards />
                </section>

                {/* Caption */}
                <div className="relative mt-4 flex items-center justify-between px-2">
                    <div>
                        <h3 className="text-sm font-semibold tracking-tight sm:text-base">
                            Dashboard UI
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                            Your finances, at a glance.
                        </p>
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full border border-orange-500/15 bg-orange-500/5 px-3 py-1.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                        <span className="size-1.5 rounded-full bg-orange-500" />
                        Live preview
                    </div>
                </div>
            </article>
        </section>
    );
};

export default Herosection;
