import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Herosection from "@/components/layout/Herosection";
import Features from "@/components/layout/Features";
import HowItWorks from "@/components/layout/HowItWorks";
import ProductPreview from "@/components/layout/ProductPreview";
import CallToAction from "@/components/layout/CallToAction";
import Footer from "@/components/layout/Footer";
import { WalletCards } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
   return (
      <main className="fundar-font">
         <header className="flex flex-row justify-between p-4 px-8 items-center">
            <span className="flex flex-row gap-1 text-xl">
               <WalletCards />
               <h2 className="font-semibold ">Fundar</h2>
            </span>
            <Navbar />
            <div className="flex flex-row gap-4 items-center">
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
                  <Button
                     size="lg"
                     className="rounded-2xl"
                  >
                     Create Account
                  </Button>
               </Link>
            </div>
         </header>
         <Herosection />
         <Features />
         <HowItWorks />
         <ProductPreview />
         <CallToAction />
         <Footer />
      </main>
   );
};

export default LandingPage;
