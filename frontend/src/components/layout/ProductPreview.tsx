import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import { TextAnimate } from "../ui/text-animate";
import { AuroraText } from "../ui/aurora-text";
import { cn } from "@/lib/utils";
import { DotPattern } from "../ui/dot-pattern";
import { BlurFade } from "../ui/blur-fade";
import DarkUi2 from "../../assets/darkui2.png";
import LightUi2 from "../../assets/lightui2.png";
import { useThemeStore } from "@/stores/themeStore";

const features = [
    {
        id: 1,
        delay: 0.05,
        name: "Real-time budget updates",
    },
    {
        id: 2,
        delay: 0.15,
        name: "Multiple income tracking",
    },
    {
        id: 3,
        delay: 0.3,
        name: "Smart allocation engine",
    },
    {
        id: 4,
        delay: 0.45,
        name: "Simple Analytics",
    },
    {
        id: 5,
        delay: 0.6,
        name: "AI-powered recommendations",
    },
];

const ProductPreview = () => {
    const currentMode = useThemeStore((state) => state.mode);

    return (
        <section
            id="preview"
            className="flex flex-col lg:flex-row justify-between mb-25 mt-80 relative"
        >
            <article className="relative w-full lg:w-[calc(60%-1rem)] p-4 sm:p-6">
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
                                fundar.app/analytics
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
                                    currentMode === "dark" ? DarkUi2 : LightUi2
                                }
                                alt="Fundar dashboard interface showing personal budget and spending overview"
                                loading="lazy"
                                className="block h-auto w-full rounded-lg object-contain"
                            />
                        </div>
                    </div>
                </section>

                {/* Caption */}
                <div className="relative mt-4 flex items-center justify-between px-2">
                    <div>
                        <h3 className="text-sm font-semibold tracking-tight sm:text-base">
                            Analytics UI
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

            <article className="lg:w-[calc(40%-1rem)] w-full flex flex-col gap-8 p-8">
                <h3 className="lg:text-5xl text-4xl">
                    <BlurFade
                        delay={0.5}
                        inView
                        duration={0.9}
                        blur="16px"
                    >
                        Designed to make <AuroraText>budgeting</AuroraText>{" "}
                        effortless.
                    </BlurFade>
                </h3>

                <TextAnimate delay={0.25}>
                    Every screen in Fundar is built to help you understand your
                    finances at a glance. Clean visuals, meaningful insights,
                    and powerful tools—all in one intuitive dashboard.
                </TextAnimate>

                <ul className="flex flex-col gap-8">
                    {features.map((item) => (
                        <li
                            key={item.id}
                            className="flex gap-2 items-center"
                        >
                            <BadgeCheck />
                            <TextAnimate animation="blurIn">
                                {item.name}
                            </TextAnimate>
                        </li>
                    ))}
                </ul>
                <Link to={"/signup"}>
                    <RainbowButton
                        className="w-1/2 p-6 rounded-4xl"
                        variant={"outline"}
                    >
                        Start Budgeting Today
                    </RainbowButton>
                </Link>
            </article>
            <DotPattern
                width={20}
                height={20}
                cr={2}
                className={cn(
                    "mask-[linear-gradient(to_bottom_right,white,transparent,transparent)]",
                )}
            />
        </section>
    );
};

export default ProductPreview;
