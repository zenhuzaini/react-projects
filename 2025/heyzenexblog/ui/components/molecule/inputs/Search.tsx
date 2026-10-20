"use client";

import { Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EMPTY_STRING } from "@/const/vars";
import { TEXT } from "@/const/text";

type SearchProps = {
	value: string;
	onValueChange: (value: string) => void;
	placeholder: string;
	ariaLabel: string;
	inputClassName?: string;
	iconClassName?: string;
	clearButtonClassName?: string;
};

const Search = ({
	value,
	onValueChange,
	placeholder,
	ariaLabel,
	inputClassName,
	iconClassName,
	clearButtonClassName,
}: SearchProps) => (
	<label className="relative flex w-full min-w-0 flex-1 items-center">
		<SearchIcon
			size={18}
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute left-3 text-primarygrey",
				iconClassName,
			)}
		/>
		<input
			type="text"
			role="searchbox"
			value={value}
			onChange={(event) => onValueChange(event.target.value)}
			placeholder={placeholder}
			aria-label={ariaLabel}
			className={cn(
				"h-11 w-full rounded-md border bg-primarywhite pl-10 pr-10 text-sm text-primaryebony outline-none transition-colors placeholder:text-primaryebony/50 focus:border-primaryaccent",
				inputClassName,
			)}
		/>
		{value && (
			<button
				type="button"
				aria-label={TEXT.common.clearSearch}
				onClick={() => onValueChange(EMPTY_STRING)}
				className={cn(
					"absolute right-2 inline-flex size-8 items-center justify-center rounded text-primaryebony hover:bg-primaryaccent hover:text-primarycream",
					clearButtonClassName,
				)}>
				<X size={16} />
			</button>
		)}
	</label>
);

export default Search;
