export const randomBoolean = () => Math.random() >= 0.5;

export const getRandomInt = (min: number, max: number): number => {
	const minCeiled = Math.ceil(min);
	const maxFloored = Math.floor(max);
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

export const formatString = (str: string) => {
	// Insert a space before each uppercase letter (except the first one)
	const withSpaces = str.replace(/([A-Z])/g, " $1").trim();

	// Capitalize the first letter of the whole string
	return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};
