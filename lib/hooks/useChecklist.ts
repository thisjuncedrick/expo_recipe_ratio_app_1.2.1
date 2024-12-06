import { Ingredient } from '@/lib/types';
import { useCallback, useMemo, useState } from 'react';

interface ExtendedIngredients extends Ingredient {
	isCustom: boolean;
}

const useCheckList = (ingredients: ExtendedIngredients[] | null) => {
	const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

	const toggleChecked = useCallback((index: number) => {
		setCheckedItems((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	}, []);

	const allChecked = useMemo(() => {
		if (ingredients) {
			return ingredients.every((_, index) => checkedItems[index]);
		}
	}, [ingredients, checkedItems]);

	const checkAll = useCallback(() => {
		if (ingredients) {
			const allCheckedState = ingredients.reduce<Record<number, boolean>>((acc, _, index) => {
				acc[index] = true;
				return acc;
			}, {});
			setCheckedItems(allCheckedState);
		}
	}, [ingredients]);

	const uncheckAll = useCallback(() => {
		if (ingredients) {
			const allUncheckedState = ingredients.reduce<Record<number, boolean>>((acc, _, index) => {
				acc[index] = false;
				return acc;
			}, {});
			setCheckedItems(allUncheckedState);
		}
	}, [ingredients]);

	const toggleAll = useCallback(() => {
		if (allChecked) {
			uncheckAll();
		} else {
			checkAll();
		}
	}, [allChecked, checkAll, uncheckAll]);

	return { checkedItems, toggleChecked, toggleAll, allChecked };
};

export default useCheckList;
