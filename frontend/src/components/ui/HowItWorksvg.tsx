import {
    BanknoteCheck,
    HandCoins,
    ListChecks,
    ChartPie,
    BadgeDollarSign,
} from "lucide-react";

import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
} from "motion/react";
import { useRef, useEffect, useState } from "react";

import useWindowSize from "@/hooks/useWindowSize";

const DESKTOP_PATH =
    "M60 150 C170 40, 260 40, 360 150 S550 260, 650 150 S840 40, 940 150 S1080 260, 1140 150";

const MOBILE_PATH =
    "M160 60 V220 H80 V420 H240 V640 H120 V860 H260 V1080 H100 V1330 H160";

const HowItWorksvg = () => {
    const steps = [
        {
            step: "one",
            value: "01",
            icon: BanknoteCheck,
            title: "Add Your Income",
            description:
                "Record your salary, freelance earnings, business income, gifts, or any other source of money.",
            positionXM: "left-[40%]",
            positionYM: "-top-20",
            positionXD: "-left-12",
            positionYD: "-bottom-1",
        },
        {
            step: "two",
            value: "02",
            icon: HandCoins,
            title: "Know Your Cash on Hand",
            description:
                "Fundar automatically subtracts taxes and deductions so you know exactly how much money is available to allocate.",
            positionXM: "left-10",
            positionYM: "top-60",
            positionXD: "left-55",
            positionYD: "-top-20.5",
        },
        {
            step: "three",
            value: "03",
            icon: BadgeDollarSign,
            title: "Allocate Every Dollar",
            description:
                "Allocate Every Dollar Assign money to rent, food, transportation, savings, investments, or any custom category using either fixed amounts or percentages.",
            positionXM: "left-50",
            positionYM: "top-142",
            positionXD: "left-119",
            positionYD: "-bottom-15.5",
        },
        {
            step: "four",
            value: "04",
            icon: ListChecks,
            title: "Record Expenses",
            description:
                "Every expense automatically updates your remaining allocation so you always know how much is left.",
            positionXM: "left-10",
            positionYM: "top-220.5",
            positionXD: "left-190",
            positionYD: "-top-12.5",
        },
        {
            step: "five",
            value: "05",
            icon: ChartPie,
            title: "Stay on Budget",
            description:
                "Monitor your financial health with beautiful reports and AI-powered recommendations.",
            positionXM: "left-40",
            positionYM: "-bottom-8",
            positionXD: "left-271",
            positionYD: "bottom-8.5",
        },
    ];
    const { width } = useWindowSize();
    const [dotPosition, setDotPosition] = useState({
        x: 0,
        y: 0,
    });
    const [activeStep, setActiveStep] = useState(0);

    const sectionRef = useRef<HTMLElement>(null);

    const pathRef = useRef<SVGPathElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const pathProgress = useTransform(scrollYProgress, [-0.05, 1], [0, 1]);

    useEffect(() => {
        const unsubscribe = pathProgress.on("change", (progress) => {
            if (!pathRef.current) return;

            const pathLength = pathRef.current.getTotalLength();

            const point = pathRef.current.getPointAtLength(
                progress * pathLength,
            );

            setDotPosition({
                x: point.x,
                y: point.y,
            });
        });

        return () => unsubscribe();
    }, [pathProgress]);

    const stepThresholds = [0, 0.16, 0.37, 0.63, 0.92];

    useMotionValueEvent(pathProgress, "change", (progress) => {
        let step = 0;

        for (let i = 0; i < stepThresholds.length; i++) {
            if (progress >= stepThresholds[i]) {
                step = i;
            }
        }

        setActiveStep(step);
    });

    if (width === undefined) return null;

    const isDesktop = width >= 1024;

    const path = isDesktop ? DESKTOP_PATH : MOBILE_PATH;

    return (
        <section
            ref={sectionRef}
            className={isDesktop ? "relative h-[450vh]" : "relative"}
        >
            <article
                className={
                    isDesktop
                        ? "sticky top-0 flex h-screen w-full items-center justify-center"
                        : "relative w-full"
                }
            >
                {/* =========================
                    DESKTOP CANVAS
                ========================== */}

                {isDesktop ? (
                    <div className="relative h-75 w-306.25 shrink-0">
                        <svg
                            width="1225"
                            height="300"
                            viewBox="0 0 1225 300"
                            className="absolute inset-0 h-full w-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Permanent gray path */}
                            <path
                                d={path}
                                pathLength={1}
                                stroke="#E5E7EB"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Scroll-controlled orange path */}
                            <motion.path
                                ref={pathRef}
                                d={path}
                                pathLength={1}
                                stroke="#F97316"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    pathLength: pathProgress,
                                }}
                            />
                            <motion.circle
                                cx={dotPosition.x}
                                cy={dotPosition.y}
                                r="8"
                                fill="#F97316"
                            />
                        </svg>

                        {/* =========================
                            DESKTOP CARDS
                        ========================== */}

                        {steps.map((step, index) => {
                            const isActive = index === activeStep;

                            return isActive ? (
                                <motion.div
                                    key={step.step}
                                    className={`absolute ${step.positionXD} ${step.positionYD} flex w-1/5 flex-col gap-2 rounded-2xl shadow-lg shadow-fundar-brand-soft border-3 border-t-fundar-brand border-r-fundar-brand p-2 [backdrop-filter:blur(8px)]`}
                                    animate={{
                                        scale: 1.03,
                                        y: -4,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                >
                                    <div className="flex gap-4 justify-around items-center rounded-2xl bg-fundar-brand-muted p-4">
                                        <step.icon size={30} />
                                        <span className="text-2xl font-extrabold">
                                            {step.value}
                                        </span>
                                    </div>

                                    <div className="text-sm">
                                        <h4 className="font-bold text-xl text-fundar-brand">
                                            {step.title}
                                        </h4>
                                        <p>{step.description}</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={step.step}
                                    className={`absolute ${step.positionXD} ${step.positionYD} flex w-1/5 flex-col gap-2 rounded-2xl shadow-xl p-2 [backdrop-filter:blur(8px)] opacity-80 blur-xs`}
                                >
                                    <div className="flex gap-4 justify-around items-center rounded-2xl bg-slate-200 p-4">
                                        <step.icon size={30} />
                                        <span className="text-2xl font-extrabold">
                                            {step.value}
                                        </span>
                                    </div>

                                    <div className="text-sm">
                                        <h4 className="font-bold text-lg">
                                            {step.title}
                                        </h4>
                                        <p>{step.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                ) : (
                    /* =========================
                       MOBILE CANVAS
                    ========================== */

                    <div className="relative h-362.5 w-[320px] shrink-0">
                        <svg
                            width="320"
                            height="1450"
                            viewBox="0 0 320 1450"
                            className="absolute inset-0 h-full w-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Permanent gray path */}
                            <path
                                ref={pathRef}
                                d={path}
                                pathLength={1}
                                stroke="#E5E7EB"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Scroll-controlled orange path */}
                            <motion.path
                                d={path}
                                pathLength={1}
                                stroke="#F97316"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                    pathLength: pathProgress,
                                }}
                            />
                            <motion.circle
                                cx={dotPosition.x}
                                cy={dotPosition.y}
                                r="10"
                                fill="#F97316"
                                className={"shadow-xl shadow-fundar-brand-soft"}
                            />
                        </svg>

                        {/* =========================
                            MOBILE CARDS
                        ========================== */}

                        {steps.map((step, index) => {
                            const isActive = index === activeStep;

                            return isActive ? (
                                <motion.div
                                    key={step.step}
                                    className={`absolute ${step.positionXM} ${step.positionYM} flex w-2/3 flex-col gap-2 shadow-2xl [backdrop-filter:blur(8px)] rounded-2xl p-2 border-3 border-t-fundar-brand border-r-fundar-brand shadow-fundar-brand-soft`}
                                    animate={{
                                        scale: 1.05,
                                        y: 4,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                >
                                    <div className="flex gap-4 items-center justify-around rounded-2xl bg-fundar-brand-muted p-4">
                                        <step.icon size={30} />
                                        <span className="text-2xl font-extrabold">
                                            {step.value}
                                        </span>
                                    </div>

                                    <div className="text-sm">
                                        <h4 className="text-xl font-semibold text-fundar-brand">
                                            {step.title}
                                        </h4>
                                        <p>{step.description}</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={step.step}
                                    className={`absolute ${step.positionXM} ${step.positionYM} flex w-2/3 flex-col gap-2 shadow-2xl [backdrop-filter:blur(8px)] rounded-2xl p-2 blur-xs`}
                                >
                                    <div className="flex gap-4 items-center justify-around rounded-2xl bg-slate-200 p-4">
                                        <step.icon size={30} />
                                        <span className="text-2xl font-extrabold">
                                            {step.value}
                                        </span>
                                    </div>

                                    <div className="text-sm">
                                        <h4 className="text-xl font-semibold">
                                            {step.title}
                                        </h4>
                                        <p>{step.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </article>
        </section>
    );
};

export default HowItWorksvg;
