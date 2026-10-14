import { WalletCards } from "lucide-react";
import { Meteors } from "../ui/meteors";

const Footer = () => {
    return (
        <footer
            id="footer"
            className="flex p-8 justify-around overflow-hidden text-fundar-text relative"
        >
            <div className="w-[calc(25%-1rem)] flex flex-col gap-8">
                <h4 className="font-bold flex gap-2">
                    <WalletCards /> Fundar
                </h4>
                <p>Helping you budget with confidence.</p>
            </div>
            <div className="flex flex-col gap-8">
                <h4 className="font-bold">Product</h4>
                <ul>
                    <li>Features</li>
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>Roadmap</li>
                </ul>
            </div>
            <div className="flex flex-col gap-8">
                <h4 className="font-bold">Company</h4>
                <ul>
                    <li>About</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                </ul>
            </div>
            <div className="flex flex-col gap-8">
                <h4 className="font-bold">Resources</h4>
                <ul>
                    <li>
                        <a href="https://github.com/scarlet70/fundar-app">
                            GitHub
                        </a>
                    </li>
                    <li>Documentation</li>
                    <li>
                        {" "}
                        <a href="mailto:chetadev01@gmail.com">Support</a>
                    </li>
                </ul>
            </div>
            <Meteors angle={189} />
        </footer>
    );
};

export default Footer;
