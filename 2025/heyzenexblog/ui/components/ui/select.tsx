"use client";

import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = BaseSelect.Root;
const SelectValue = BaseSelect.Value;

function SelectTrigger({
	className,
	children,
	...props
}: React.ComponentProps<typeof BaseSelect.Trigger>) {
	return (
		<BaseSelect.Trigger
			data-slot="select-trigger"
			className={cn(
				"inline-flex h-10 w-full items-center justify-between gap-2 rounded-md border border-primarybrown/25 bg-primarywhite px-3 text-sm text-primaryText outline-none transition-colors focus-visible:border-secondaryforestgreen focus-visible:ring-2 focus-visible:ring-secondaryforestgreen/20 disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}>
			{children}
			<BaseSelect.Icon className="shrink-0 text-primarygrey">
				<ChevronDown size={16} />
			</BaseSelect.Icon>
		</BaseSelect.Trigger>
	);
}

function SelectContent({
	className,
	children,
	...props
}: React.ComponentProps<typeof BaseSelect.Popup>) {
	return (
		<BaseSelect.Portal>
			<BaseSelect.Positioner sideOffset={4} className="z-50">
				<BaseSelect.Popup
					data-slot="select-content"
					className={cn(
						"min-w-(--anchor-width) overflow-hidden rounded-md border border-primarybrown/20 bg-primarywhite p-1 text-primaryText shadow-lg outline-none",
						className,
					)}
					{...props}>
					<BaseSelect.List className="max-h-64 overflow-y-auto">
						{children}
					</BaseSelect.List>
				</BaseSelect.Popup>
			</BaseSelect.Positioner>
		</BaseSelect.Portal>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof BaseSelect.Item>) {
	return (
		<BaseSelect.Item
			data-slot="select-item"
			className={cn(
				"relative flex min-h-9 w-full cursor-default items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none data-highlighted:bg-secondarywhite data-highlighted:text-primaryText data-disabled:pointer-events-none data-disabled:opacity-50",
				className,
			)}
			{...props}>
			<BaseSelect.ItemText>{children}</BaseSelect.ItemText>
			<BaseSelect.ItemIndicator className="absolute right-2 inline-flex items-center justify-center">
				<Check size={15} />
			</BaseSelect.ItemIndicator>
		</BaseSelect.Item>
	);
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
