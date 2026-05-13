// biome-ignore lint/suspicious/noExplicitAny: don't know
export const parseSteps = (input: string | any[]) => {
	if (typeof input === 'string') return [input];

	return input.flatMap((item) => {
		if (item['@type'] === 'HowToSection' || 'itemListElement' in item) {
			// consider making the HowToSection's name a special 'subheader' direction
			// return [{ text: item.name }, ...item.itemListElement];
			return item.itemListElement;
		}
		return item;
	});
};
