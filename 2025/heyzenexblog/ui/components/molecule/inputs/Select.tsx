"use client";

import {
	Select as PrimitiveSelect,
	SelectContent as PrimitiveSelectContent,
	SelectItem as PrimitiveSelectItem,
	SelectTrigger as PrimitiveSelectTrigger,
	SelectValue as PrimitiveSelectValue,
} from "@/components/ui/select";

type SelectOption = {
	label: string;
	value: string;
};

type SelectProps = {
	ariaLabel: string;
	items: SelectOption[];
	value: string;
	onValueChange: (value: string | null) => void;
	formatValue: (value: string | null) => string;
	triggerClassName?: string;
	valueClassName?: string;
	contentClassName?: string;
};

const Select = ({
	ariaLabel,
	items,
	value,
	onValueChange,
	formatValue,
	triggerClassName,
	valueClassName,
	contentClassName,
}: SelectProps) => (
	<PrimitiveSelect items={items} value={value} onValueChange={onValueChange}>
		<PrimitiveSelectTrigger
			aria-label={ariaLabel}
			className={triggerClassName}>
			<PrimitiveSelectValue className={valueClassName}>
				{formatValue}
			</PrimitiveSelectValue>
		</PrimitiveSelectTrigger>
		<PrimitiveSelectContent className={contentClassName}>
			{items.map((item) => (
				<PrimitiveSelectItem key={item.value} value={item.value}>
					{item.label}
				</PrimitiveSelectItem>
			))}
		</PrimitiveSelectContent>
	</PrimitiveSelect>
);

export default Select;