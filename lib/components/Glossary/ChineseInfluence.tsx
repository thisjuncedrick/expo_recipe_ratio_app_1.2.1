import { Bold, Paragraph, Parenthesis } from './Utilities';

export const ChineseInfluence = () => {
	return (
		<>
			<Paragraph>
				Long before Spanish colonization, the Philippines had strong trade relations with China.
				Chinese traders introduced various ingredients and cooking techniques that would become
				essential to Filipino cuisine, including <Bold>noodles</Bold>, <Bold>soy sauce</Bold>,{' '}
				<Bold>tofu</Bold>, and <Bold>rice flour</Bold>.
			</Paragraph>
			<Paragraph>
				The arrival of the Chinese also introduced the practice of <Bold>stir-frying</Bold> and
				deep-frying, which led to dishes like <Bold>lumpia</Bold>{' '}
				<Parenthesis>spring rolls</Parenthesis> and <Bold>pancit</Bold>{' '}
				<Parenthesis>noodles</Parenthesis>, which are now integral parts of Filipino food
				culture. <Bold>Pancit Canton</Bold>, a noodle stir-fry, is a classic example of
				Filipino-Chinese fusion cuisine.
			</Paragraph>
		</>
	);
};
