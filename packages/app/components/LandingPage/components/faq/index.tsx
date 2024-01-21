import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@packrat/ui/src/shadcn/accordion';
import { FAQItems } from '../../constants';
export function FAQ() {
  return (
    <div className="justify-center flex items-center flex-col mx-auto max-w-screen-md space-y-10 mt-12">
      <span className="text-3xl font-bold font-serif">
        Frequently Asked Questions
      </span>
      <Accordion type="single" collapsible className="w-full">
        {FAQItems.map((item, index) => (
          <AccordionItem value={item.value}>
            <AccordionTrigger>{item.trigger}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
