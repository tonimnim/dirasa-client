import { FAQ } from "@/components/landing/content";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions schools ask us"
        description="The short answers. Your school's administrator can tell you how your school has set things up."
      />
      <Accordion className="mx-auto mt-12 max-w-3xl">
        {FAQ.map(({ question, answer }) => (
          <AccordionItem key={question} value={question}>
            <AccordionTrigger className="text-base">{question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
