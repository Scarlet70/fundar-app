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
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useThemeStore } from "@/stores/themeStore";

const LandingPage = () => {
    const toggleMode = useThemeStore((state) => state.toggleMode);

    return (
        <main
            id="#home"
            className="fundar-font"
        >
            <header className="flex flex-row lg:justify-center gap-4 lg:gap-35 xl:gap-20 p-4 items-center fixed top-0 w-full [backdrop-filter:blur(8px)] z-50 justify-between ">
                <span className="flex flex-row gap-1 items-center text-xl">
                    <WalletCards size={18} />
                    <h2 className="font-semibold lg:text-[1.5rem] text-[0.9rem]">
                        Fundar
                    </h2>
                </span>
                <Navbar />
                <div className="flex flex-row xl:gap-4 gap-2 items-center">
                    <AnimatedThemeToggler onClick={toggleMode} />
                    <Link to={"/login"}>
                        <Button
                            variant={"outline"}
                            className="hover:no-underline text-xs xl:text-sm"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link to={"/signup"}>
                        <Button className="text-xs xl:text-sm bg-fundar-brand-soft text-fundar-brand">
                            Create Account
                        </Button>
                    </Link>
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
