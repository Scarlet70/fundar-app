import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { HexagonPattern } from "../ui/hexagon-pattern";
import { cn } from "@/lib/utils";
import { faqs } from "@/data/FAQSData";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { AuroraText } from "../ui/aurora-text";
import Landing9 from "../../assets/landing9.svg";

const questions = faqs.filter((item) => item.category === "Getting Started");

const FAQs = () => {
    return (
        <section
            id="faqs"
            className="p-8 py-26 h-full mb-60 relative shadow-xl shadow-fundar-brand-soft space-y-6"
        >
            <h3 className="lg:text-4xl text-3xl mb-10">
                Questions? We've got answers! <br /> -{" "}
                <AuroraText>Fundar FAQs</AuroraText>
            </h3>
            <article className="flex justify-between flex-col xl:flex-row">
                <section className="xl:w-[calc(55%-0.5rem)] w-full ">
                    <Accordion
                        defaultValue={[4]}
                        className={"xl:mt-20"}
                    >
                        {questions.map((question) => (
                            <AccordionItem
                                key={question.id}
                                value={question.id}
                                className={"px-4 py-2"}
                            >
                                <AccordionTrigger
                                    className={"lg:text-md text-sm font-light"}
                                >
                                    {question.question}
                                </AccordionTrigger>
                                <AccordionContent
                                    className={
                                        "px-3 [word-spacing:0.2rem] tracking-[0.05rem]"
                                    }
                                >
                                    {question.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <InteractiveHoverButton className="my-10 p-4 w-1/2">
                        Explore all FAQs
                    </InteractiveHoverButton>
                </section>
                <section className="xl:w-[calc(45%-0.5rem)] w-full grid place-content-center">
                    <img
                        className="w-80 h-80 xl:w-110 xl:h-110"
                        src={Landing9}
                        alt="fundar landing image"
                    />
                </section>
            </article>
            <HexagonPattern
                radius={60}
                gap={10}
                className={cn(
                    "mask-[linear-gradient(to_top_left,white,transparent)]",
                )}
            />
        </section>
    );
};

export default FAQs;
