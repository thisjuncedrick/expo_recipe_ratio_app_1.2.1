import { Bold, Paragraph, Parenthesis } from './Utilities';

export const SpanishColonization = () => {
	return (
		<>
			<Paragraph>
				The most significant and lasting influence on Filipino cuisine came during over 300
				years of Spanish colonization. Spanish settlers brought with them their cooking
				techniques, such as <Bold>roasting</Bold>, <Bold>braising</Bold>, and{' '}
				<Bold>sautéing</Bold>, as well as ingredients like <Bold>vinegar</Bold>,{' '}
				<Bold>garlic</Bold>, <Bold>onions</Bold>, <Bold>tomatoes</Bold>, and <Bold>citrus</Bold>
				.
			</Paragraph>
			<Paragraph>
				Several classic Filipino dishes were influenced by Spanish culinary traditions:
			</Paragraph>
			<Paragraph indent={false}>
				<Bold>Abodo</Bold>: While the term "adobo" comes from the Spanish word for marinade or
				sauce, the Filipino version incorporates local ingredients like <Bold>vinegar</Bold>,{' '}
				<Bold>soy sauce</Bold>, and <Bold>garlic</Bold>, combined with meats like pork and
				chicken.
			</Paragraph>
			<Paragraph indent={false}>
				<Bold>Lechon</Bold>: The Spanish influence of roasting a whole pig introduced{' '}
				<Bold>Lechon</Bold>, a central dish in Filipino celebrations. While the cooking method
				was adopted from the Spanish, the Filipino approach to marinating and seasoning the pig
				is unique.
			</Paragraph>
			<Paragraph indent={false}>
				<Bold>Kare-Kare</Bold>: A Filipino stew with peanut sauce, <Bold>Kare-Kare</Bold>{' '}
				combines local ingredients with Spanish influences. The use of peanut paste reflects the
				exchange of agricultural practices during the colonial period.
			</Paragraph>
			<Paragraph>
				The Spanish also introduced sweets such as turron{' '}
				<Parenthesis>sweetened banana fritters</Parenthesis> and bizcocho{' '}
				<Parenthesis>biscuits</Parenthesis>, which were adapted using local ingredients
			</Paragraph>
		</>
	);
};
