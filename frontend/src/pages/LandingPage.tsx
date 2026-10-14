import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Herosection from "@/components/layout/Herosection";
import Features from "@/components/layout/Features";
import HowItWorks from "@/components/layout/HowItWorks";
import ProductPreview from "@/components/layout/ProductPreview";
import FAQs from "@/components/layout/FAQs";
import CallToAction from "@/components/layout/CallToAction";
import Footer from "@/components/layout/Footer";
import { WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useThemeStore } from "@/stores/themeStore";

const LandingPage = () => {
    const toggleMode = useThemeStore((state) => state.toggleMode);

    return (
        <main
            id="#home"
            className="fundar-font"
        >
            <header className="flex flex-row justify-center lg:gap-35 gap-20 p-4 items-center fixed top-0 w-full [backdrop-filter:blur(8px)] z-50">
                <span className="flex flex-row gap-1 items-center text-xl">
                    <WalletCards />
                    <h2 className="font-semibold lg:text-[1.5rem] text-[1.1rem]">
                        Fundar
                    </h2>
                </span>
                <Navbar />
                <div className="flex flex-row xl:gap-4 gap-2 items-center">
                    <Link to={"/login"}>
                        <Button
                            variant="outline"
                            size="lg"
                            className="hover:no-underline"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link to={"/signup"}>
                        <ShimmerButton className="bg-transparent py-1 rounded-lg">
                            Create Account
                        </ShimmerButton>
                    </Link>
                    <AnimatedThemeToggler onClick={toggleMode} />
                </div>
            </header>
            <AnimatedGridPattern className="pointer-events-none absolute inset-0 z-0" />
            <Herosection />
            <Features />
            <HowItWorks />
            <ProductPreview />
            <FAQs />
            <CallToAction />
            <Footer />
        </main>
    );
};

export default LandingPage;
