import { WalletCards } from "lucide-react";

const Footer = () => {
    return (
        <footer className="flex p-8 justify-around bg-slate-600 text-slate-50">
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
                    <li>Dashboard </li>
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
                    <li>GitHub</li>
                    <li>Documentation</li>
                    <li>Support</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
