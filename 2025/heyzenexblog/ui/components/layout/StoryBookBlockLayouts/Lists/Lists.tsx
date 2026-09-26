import { ChecklistItem } from "@/types/components";
import { ReactNode } from "react";

export default function Checklist({ items }: { items: ChecklistItem[] }) {
	return (
		<div className="p-4 rounded-2xl border-2  border-primaryaccent">
			<ul className="space-y-3">
				{items.map((item, i) => (
					<li key={i} className="flex items-start gap-2">
						<input
							type="checkbox"
							checked={item.done}
							readOnly
							className="w-5 h-5 rounded-md accent-primaryaccent"
						/>
						<span className="text-primaryText">{item.label}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
