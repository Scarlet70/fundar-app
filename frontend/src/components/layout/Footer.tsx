import { WalletCards } from "lucide-react";
import { Meteors } from "../ui/meteors";

const Footer = () => {
    return (
        <footer
            id="footer"
            className="p-4 space-y-8"
        >
            <div className="flex flex-col gap-2">
                <h4 className="font-bold flex gap-2">
                    <WalletCards /> Fundar
                </h4>
                <p className="text-sm text-nowrap text-slate-400">
                    Helping you budget with confidence.
                </p>
            </div>
            <section className="flex flex-wrap gap-4 p-4 justify-around overflow-hidden text-fundar-text relative ">
                <Meteors />
                <div className="flex flex-col gap-8 xl:w-[calc(25%-1rem)] w-[calc(50%-0.5rem)]">
                    <h4 className="font-bold">Product</h4>
                    <ul>
                        <li>Features</li>
                        <li>
                            <a href="/dashboard">Dashboard</a>
                        </li>
                        <li>Roadmap</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-8 xl:w-[calc(25%-1rem)] w-[calc(50%-0.5rem)]">
                    <h4 className="font-bold">Company</h4>
                    <ul>
                        <li>About</li>
                        <li>Privacy</li>
                        <li>Terms</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-8 xl:w-[calc(25%-1rem)] w-[calc(50%-0.5rem)]">
                    <h4 className="font-bold">Resources</h4>
                    <ul>
                        <li>
                            <a href="https://github.com/scarlet70/fundar-app">
                                Github
                            </a>
                        </li>
                        <li>Documentation</li>
                        <li>
                            {" "}
                            <a href="mailto:chetadev01@gmail.com">Support</a>
                        </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-1 xl:w-[calc(25%-1rem)] w-[calc(50%-0.5rem)] justify-end lg:justify-start">
                    <p>copyright &copy; 2026</p>
                    <a
                        href="https://fundar-webapp-two.vercel.app"
                        className="text-sm text-slate-400"
                    >
                        @fundar.app
                    </a>
                    <p className="text-sm text-slate-400">scarletlabs</p>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
