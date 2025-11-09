import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import CheckSymbol from "@/icons/CheckSymbol";
import XMark from "@/icons/XMark";
import { InfoIcon } from "lucide-react";
import React from "react";

const InputWithIconAndValidation = ({
	value,
	onChange,
	placeholder,
	icon,
	type = "text",
}: {
	value: string | undefined;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	icon: React.ReactNode;
	type?: string;
}) => {
	return (
		<div>
			<InputGroup>
				<InputGroupInput
					value={value ?? ""}
					onChange={onChange}
					placeholder={placeholder}
					type={type}
				/>
				<InputGroupAddon>{icon}</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					{!value ? (
						<XMark size={4} className="stroke-4 text-primaryred" />
					) : (
						<CheckSymbol size={4} className="stroke-4 text-primaryfreshgreen" />
					)}
					<InfoIcon />
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
};

export default InputWithIconAndValidation;
