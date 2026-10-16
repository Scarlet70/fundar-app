import { Link } from "react-router-dom";
import { Floating3DParticles } from "../ui/floating-3d-particles";
import { RainbowButton } from "../ui/rainbow-button";
import { AuroraText } from "../ui/aurora-text";
import { ShimmerButton } from "../ui/shimmer-button";
import { useThemeStore } from "@/stores/themeStore";

const CallToAction = () => {
    const appMode = useThemeStore((state) => state.mode);

    const bubbleColor = appMode === "light" ? "#333" : "#fff";
    return (
        <section
            id="cta"
            className="grid place-content-center text-center h-60vh p-16 gap-8 mb-40 relative shadow-xl shadow-fundar-brand-soft"
        >
            <h3 className="text-4xl lg:text-6xl">
                Take control of your{" "}
                <span className="text-nowrap">
                    {" "}
                    <AuroraText>finances</AuroraText> today.
                </span>
            </h3>
            <p className="mx-auto">
                Join Fundar and start planning every paycheck with confidence.
                Create smarter budgets, stay on track, and build healthier
                financial habits.
            </p>
            <div className="flex justify-center items-center gap-4 mt-4">
                <Link to={"/signup"}>
                    <RainbowButton
                        variant={"outline"}
                        className="p-6 rounded-2xl"
                    >
                        Create Free Account
                    </RainbowButton>
                </Link>
                <Link to={"/dashboard"}>
                    <ShimmerButton className="rounded-2xl shadow-xl shadow-fundar-brand-soft p-4 px-6">
                        View Dashboard
                    </ShimmerButton>
                </Link>
            </div>
            <Floating3DParticles
                color={bubbleColor}
                depth={0.7}
            />
        </section>
    );
};

export default CallToAction;
