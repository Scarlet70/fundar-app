import HowItWorksvg from "../ui/HowItWorksvg";

const HowItWorks = () => {
    return (
        <section className="flex flex-col gap-24 items-center mb-40">
            <article className="grid place-content-center lg:w-[70%] gap-8 p-4">
                <h3 className="text-center lg:text-6xl text-4xl">
                    From Paycheck to financial clarity in 5 simple steps
                </h3>
                <p className="text-center">
                    Whether you receive one income or several, Fundar helps you
                    organize every dollar before you spend it, making budgeting
                    simple and stress-free.
                </p>
            </article>
            <HowItWorksvg />
        </section>
    );
};

export default HowItWorks;
