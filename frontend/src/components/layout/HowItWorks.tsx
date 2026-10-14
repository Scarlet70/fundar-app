import HowItWorksvg from "../ui/HowItWorksvg";
import { TextAnimate } from "../ui/text-animate";
import { LightRays } from "../ui/light-rays";

const HowItWorks = () => {
    return (
        <section
            id="howitworks"
            className="flex flex-col gap-24 items-center relative py-16 shadow-xl shadow-fundar-brand-soft"
        >
            <article className="grid place-content-center lg:w-[70%] gap-8 p-4">
                <h3 className="text-center lg:text-6xl text-4xl">
                    <TextAnimate
                        animation="slideDown"
                        delay={0.2}
                    >
                        From Paycheck to financial clarity in 5 simple steps
                    </TextAnimate>
                </h3>

                <p className="text-center">
                    <TextAnimate
                        animation="blurIn"
                        delay={0.3}
                    >
                        Whether you receive one income or several, Fundar helps
                        you organize every dollar before you spend it, making
                        budgeting simple and stress-free.
                    </TextAnimate>
                </p>
                <LightRays
                    length="40vh"
                    count={7}
                    color="rgba(240, 160, 15, 0.1)"
                />
            </article>
            <HowItWorksvg />
        </section>
    );
};

export default HowItWorks;
