import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { BadgeCheck } from "lucide-react";

const ProductPreview = () => {
    return (
        <section className="flex flex-col lg:flex-row justify-between mb-25 mt-50">
            <article className="lg:w-[calc(60%-1rem)] w-full">
                <h3>Dashboard Ui</h3>
            </article>
            <article className="lg:w-[calc(40%-1rem)] w-full flex flex-col gap-8 p-8">
                <h3 className="lg:text-6xl text-4xl">
                    Designed to make budgeting effortless.
                </h3>
                <p>
                    Every screen in Fundar is built to help you understand your
                    finances at a glance. Clean visuals, meaningful insights,
                    and powerful tools—all in one intuitive dashboard.
                </p>
                <ul className="flex flex-col gap-4">
                    <li className="flex gap-2">
                        {" "}
                        <BadgeCheck />
                        Real-time budget updates
                    </li>
                    <li className="flex gap-2">
                        {" "}
                        <BadgeCheck />
                        Multiple income tracking
                    </li>
                    <li className="flex gap-2">
                        {" "}
                        <BadgeCheck />
                        Smart allocation engine
                    </li>
                    <li className="flex gap-2">
                        {" "}
                        <BadgeCheck />
                        Simple Analytics
                    </li>
                    <li className="flex gap-2">
                        {" "}
                        <BadgeCheck />
                        AI-powered recommendations
                    </li>
                </ul>
                <Link to={"/signup"}>
                    <Button className="w-1/2 p-6 rounded-4xl">
                        Start Budgeting Today
                    </Button>
                </Link>
            </article>
        </section>
    );
};

export default ProductPreview;
