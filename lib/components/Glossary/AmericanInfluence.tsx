import { Bold, Paragraph, Parenthesis } from './Utilities';

export const AmericanInfluence = () => {
	return (
		<>
			<Paragraph>
				Following the Spanish-American War in 1898, the Philippines came under American rule,
				which brought new culinary influences. The American presence introduced new foods such
				as <Bold>hamburgers</Bold>, <Bold>hot dogs</Bold>, and <Bold>fried chicken</Bold>, which
				were adapted into Filipino cooking. While fast food chains like McDonald's became
				prevalent in later years, during the American occupation, processed foods and canned
				goods were introduced and became widely available.
			</Paragraph>
			<Paragraph>
				American influence also encouraged a more standardized and commercialized food culture,
				with products like <Bold>spam</Bold> becoming integrated into Filipino dishes, resulting
				in the creation of the well-loved breakfast dish <Bold>tapsilog</Bold>{' '}
				<Parenthesis>
					a combination of <Bold>tocino</Bold>, garlic fried rice, and egg
				</Parenthesis>{' '}
				and other <Bold>silog</Bold> <Parenthesis>breakfast</Parenthesis> meals
			</Paragraph>
		</>
	);
};
