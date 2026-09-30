import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
    return (
        <section className="grid place-content-center text-center gap-8 mb-20">
            <h3 className="text-4xl lg:text-6xl">
                Take control of your finances today.
            </h3>
            <p className="w-1/2 mx-auto">
                Join Fundar and start planning every paycheck with confidence.
                Create smarter budgets, stay on track, and build healthier
                financial habits.
            </p>
            <div className="flex justify-center gap-4">
                <Link to={"/signup"}>
                    <Button className="p-6 rounded-4xl">
                        Create Free Account
                    </Button>
                </Link>
                <Link to={"/dashboard"}>
                    <Button
                        className="p-6 rounded-4xl"
                        variant="outline"
                    >
                        View Dashboard
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default CallToAction;
