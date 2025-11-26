import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionComponentProps } from "@/types/components";

export function AccordionComponent({ items }: AccordionComponentProps) {
	const accordionItem = items.map((accordionContent, index) => {
		return (
			<AccordionItem value={`${index}`}>
				<AccordionTrigger className="cursor-pointer hover:no-underline transition-all">
					{accordionContent.title}
				</AccordionTrigger>
				<AccordionContent className="flex flex-col gap-4 text-balance">
					{accordionContent.content}
				</AccordionContent>
			</AccordionItem>
		);
	});
	return (
		<Accordion
			type="single"
			collapsible
			className="w-full border-2 p-4 border-primaryaccent rounded-2xl"
			defaultValue="item-1">
			{accordionItem}
		</Accordion>
	);
}
