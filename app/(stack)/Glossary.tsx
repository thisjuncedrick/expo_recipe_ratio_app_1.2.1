import { Container } from '@/lib/components';
import { Styles } from '@/lib/ui';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { List } from 'react-native-paper';

import * as GlossaryArticles from '@/lib/components/Glossary';

const Glossary = () => {
	const Articles = useMemo(
		() => [
			{
				title: 'History of Filipino Cuisine',
				icon: 'history',
				content: GlossaryArticles.History,
			},
			{
				title: 'Pre-Colonial Filipino Cuisine',
				icon: 'skip-previous',
				content: GlossaryArticles.PreColonial,
			},
			{
				title: 'The Influence of Chinese Traders',
				icon: 'card-account-details-star-outline',
				subtitle: '10th to 16th Century',
				content: GlossaryArticles.ChineseInfluence,
			},
			{
				title: 'Spanish Colonization',
				icon: 'ship-wheel',
				subtitle: '1565-1898',
				content: GlossaryArticles.SpanishColonization,
			},
			{
				title: 'American Influence',
				icon: 'hamburger',
				subtitle: '1898-1946',
				content: GlossaryArticles.AmericanInfluence,
			},
			{
				title: 'Post-War and Modern Filipino Cuisine',
				icon: 'fast-forward',
				subtitle: '1946-Present',
				content: GlossaryArticles.PostWar,
			},
			{
				title: 'Key Characteristics of Filipino Cuisine',
				icon: 'key',
				content: GlossaryArticles.KeyCharacteristics,
			},
		],
		[]
	);

	return (
		<Container>
			<ScrollView>
				<List.AccordionGroup>
					{Articles.map((article, index) => {
						const Content = article.content;
						return (
							<List.Accordion
								key={article.title.replace(' ', '_')}
								title={article.title}
								description={article.subtitle}
								id={index}
								left={(props) => <List.Icon {...props} icon={article.icon} />}>
								<List.Item
									title={article.title}
									description={article.subtitle}
									left={() => null}
									titleNumberOfLines={3}
									titleStyle={Styles.textBold}
								/>
								<List.Item title={() => <Content />} left={() => null} />
							</List.Accordion>
						);
					})}
				</List.AccordionGroup>
			</ScrollView>
		</Container>
	);
};

export default Glossary;
