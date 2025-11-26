import HastagSymbol from "@/icons/Hastag";
import { ChecklistItem } from "@/types/components";

export default function ItemList({ items }: { items: ChecklistItem[] }) {
	return (
		<div className="">
			<ul className="pl-4">
				{items.map((item, i) => (
					<li key={i} className="flex gap-2 items-center">
						<HastagSymbol className="text-primaryaccent stroke-2" size={3} />
						<span className="text-primaryText">{item.label}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
