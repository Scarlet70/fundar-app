import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { DiaTextReveal } from "../ui/dia-text-reveal";
import { BellIcon, Share2Icon, FileText, Calendar1 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { Marquee } from "../ui/marquee";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { AnimatedListFundarUi } from "../animatedlistui";
import { AnimatedBeamMultipleOutputFundarUi } from "../animatedbeamui";
import { Particles } from "../ui/particles";

const incomes = [
    {
        name: "Freelance",
        body: "Professional freelance services tailored to your project needs, helping turn ideas into practical and polished solutions.",
    },
    {
        name: "Brand Identity Design",
        body: "Creating a distinctive visual identity for your brand through thoughtful logos, colors, typography, and cohesive design.",
    },
    {
        name: "Mobile App development",
        body: "Building responsive and user-friendly mobile applications designed to provide smooth experiences and solve real-world problems.",
    },
    {
        name: "Website Design",
        body: "Designing modern, responsive, and engaging websites that communicate your brand effectively and provide a great user experience.",
    },
    {
        name: "Stocks Trading",
        body: "Trading stocks with a focus on analyzing market opportunities, managing risk, and making informed investment decisions.",
    },
];

const features = [
    {
        Icon: FileText,
        name: "Create your Incomes",
        description: "Save an Income source with just a simple click",
        href: "/dashboard",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 mask-[linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
            >
                {incomes.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                            "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
                            "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15",
                            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">
                            {f.body}
                        </blockquote>
                    </figure>
                ))}
            </Marquee>
        ),
    },
    {
        Icon: BellIcon,
        name: "In App Notifications",
        description: "Get notified when something happens.",
        href: "/dashboard",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <AnimatedListFundarUi className="absolute top-4 right-2 h-75 w-full scale-75 border-none mask-[linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" />
        ),
    },
    {
        Icon: Share2Icon,
        name: "Allocations",
        description:
            "Supports multiple allocations from a single income source.",
        href: "/dashboard",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <AnimatedBeamMultipleOutputFundarUi className="absolute top-4 right-2 h-75 border-none mask-[linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-105" />
        ),
    },
    {
        Icon: Calendar1,
        name: "Date Sorting",
        description: "Use the calendar to add received dates to your income.",
        className: "col-span-3 lg:col-span-1",
        href: "/dashboard",
        cta: "Learn more",
        background: (
            <Calendar
                mode="single"
                selected={new Date(2022, 4, 11, 0, 0, 0)}
                className="absolute top-10 right-0 origin-top scale-75 rounded-md border mask-[linear-gradient(to_top,transparent_40%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90"
            />
        ),
    },
];

const Features = () => {
    return (
        <section className="flex flex-col lg:flex-row justify-between p-8 mb-60 overflow-hidden relative ">
            <Particles
                quantity={300}
                size={0.8}
                vx={0.1}
                vy={0.1}
                color="var(--fundar-surface)"
                className="absolute top-0 w-full h-full"
            />
            <article className="flex flex-col gap-8 lg:w-[50%] w-full lg:pt-32 p-4  lg:p-2 mb-60 space-y-6 lg:space-y-8">
                <h3 className="lg:text-[2.6rem] xl:text-[3.4rem] text-3xl text-slate-400">
                    Everything you need to <br />
                    <DiaTextReveal
                        className="w-full"
                        duration={1.5}
                        delay={0.45}
                        repeat
                        text={[
                            "plan your money with ease.",
                            "control your finances.",
                            "take charge of your money.",
                        ]}
                    />
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
            <article className="flex flex-col gap-4 lg:w-[50%] w-full p-4">
                <h3 className="text-center text-3xl text-underline">
                    CORE FEATURES
                </h3>
                <BentoGrid>
                    {features.map((feature, idx) => (
                        <BentoCard
                            key={idx}
                            {...feature}
                        />
                    ))}
                </BentoGrid>
            </article>
        </section>
    );
};

export default Features;
