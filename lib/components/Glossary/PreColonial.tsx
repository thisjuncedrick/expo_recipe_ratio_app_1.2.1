import { Bold, Paragraph, Parenthesis } from './Utilities';

export const PreColonial = () => {
	return (
		<>
			<Paragraph>
				Before the arrival of foreign settlers, Filipino cuisine was primarily influenced by the
				indigenous ways of cooking, shaped by the country's agricultural and maritime
				environment. Rice, root crops like sweet potatoes, and tropical fruits were staples. The
				use of local ingredients like <Bold>coconut</Bold>, <Bold>taro</Bold>,{' '}
				<Bold>banana</Bold>, <Bold>fish</Bold>, and <Bold>seafood</Bold> was common, as the
				Philippines is surrounded by seas rich in marine life.
			</Paragraph>

			<Paragraph>
				Indigenous cooking methods included <Bold>boiling</Bold>, <Bold>grilling</Bold>,{' '}
				<Bold>steaming</Bold>, and <Bold>fermentation</Bold>, using tools like earthenware pots
				and bamboo. Dishes were often flavored with natural ingredients such as{' '}
				<Bold>tamarind</Bold> for sourness{' '}
				<Parenthesis>
					used in <Bold>sinigang</Bold>
				</Parenthesis>
				, <Bold>bagoong</Bold> <Parenthesis>fermented shrimp paste</Parenthesis>, and{' '}
				<Bold>salt</Bold>.
			</Paragraph>
			<Paragraph>
				The use of <Bold>bamboo</Bold> for steaming and grilling, as well as the practice of
				fermenting fish and vegetables, was widespread. <Bold>Suman</Bold>{' '}
				<Parenthesis>sticky rice cakes</Parenthesis> and <Bold>sinigang</Bold>{' '}
				<Parenthesis>sour soups</Parenthesis> are examples of dishes that have their roots in
				this period
			</Paragraph>
		</>
	);
};
