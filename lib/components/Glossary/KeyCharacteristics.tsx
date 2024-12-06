import { Bold, Paragraph, Parenthesis } from './Utilities';

export const KeyCharacteristics = () => {
	return (
		<>
			<Paragraph>
				Filipino cuisine is deeply rooted in the country's agricultural and maritime culture.
				The key characteristics of Filipino food include:
			</Paragraph>
			<Paragraph indent={false}>
				1. <Bold>Sourness</Bold>: Many dishes feature a sour component, whether from{' '}
				<Bold>tamarind</Bold>{' '}
				<Parenthesis>
					used in <Bold>sinigang</Bold>
				</Parenthesis>{' '}
				or <Bold>calamansi</Bold> <Parenthesis>Filipino lime</Parenthesis>, creating a unique
				balance of flavors.
			</Paragraph>
			<Paragraph indent={false}>
				2. <Bold>Sweet and Savory Combinations</Bold>: Filipino food is known for pairing sweet
				and savory elements, such as <Bold>tocino</Bold>{' '}
				<Parenthesis>sweet cured pork</Parenthesis> served with <Bold>garlic fried rice</Bold>{' '}
				and <Bold>egg</Bold> <Parenthesis>known as "Tocilog"</Parenthesis>.
			</Paragraph>
			<Paragraph indent={false}>
				3. <Bold>Use of Coconut</Bold>: The use of <Bold>coconut</Bold> in various forms —
				coconut milk, coconut water, and grated coconut — is a hallmark of Filipino cooking,
				especially in coastal regions. <Bold>Bicol Express</Bold> and <Bold>Laing</Bold> are
				examples of dishes heavily reliant on coconut milk.
			</Paragraph>
			<Paragraph indent={false}>
				4. <Bold>Fermented Foods</Bold>: <Bold>Bagoong</Bold>{' '}
				<Parenthesis>fermented shrimp paste</Parenthesis> and <Bold>fish</Bold>
				sauce <Parenthesis>patis</Parenthesis> are widely used in Filipino cuisine to enhance
				the umami flavor of dishes.
			</Paragraph>
		</>
	);
};
