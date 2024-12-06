import { Styles } from '@/lib/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { TextStyle, ToastAndroid, View } from 'react-native';
import { Button, Checkbox, Divider, Text, TextInput, useTheme } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { BottomSheetContainer } from './BottomSheetContainer';

interface AddIngredientsProps {
	isVisible: boolean;
	onClose: () => void;
	onAddIngredients: (data: { name: string; quantity: string; unit: string }) => void;
}

const CustomTextInput = ({
	label,
	onValueChange,
	keyboard = 'default',
}: {
	label: string;
	onValueChange: (value: string) => void;
	keyboard?: 'default' | 'number-pad';
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	return (
		<TextInput
			label={label}
			mode='outlined'
			style={Styles.mb_md as TextStyle}
			onChangeText={(text) => setInputValue(text)}
			onBlur={() => onValueChange(inputValue)}
			keyboardType={keyboard}
		/>
	);
};

const AddIngredients = ({ isVisible, onClose, onAddIngredients }: AddIngredientsProps) => {
	const { colors } = useTheme();
	const [name, setName] = useState<string>('');
	const [quantity, setQuantity] = useState<string>('');
	const [isCustomUnit, setCustomUnit] = useState<boolean>(false);
	const [unit, setUnit] = useState<string | undefined>('');

	useEffect(() => {
		setUnit('');
	}, [isCustomUnit]);

	const handleCancel = () => {
		setName('');
		setQuantity('');
		setUnit('');
		setCustomUnit(false);
		onClose();
	};

	const handleSave = () => {
		if (name && quantity && unit) {
			onAddIngredients({ name: name, quantity: quantity, unit: unit });
			onClose();
		} else {
			ToastAndroid.show(
				'Please check all inputs. All inputs must have values',
				ToastAndroid.LONG
			);
		}
	};

	const commonUnits = useMemo(
		() => [
			{ label: 'Gram (g)', value: 'g' },
			{ label: 'Kilogram (kg)', value: 'kg' },
			{ label: 'Milligram (mg)', value: 'mg' },
			{ label: 'Ounce (oz)', value: 'oz' },
			{ label: 'Pound (lb)', value: 'lb' },
			{ label: 'Fluid Ounce (fl oz)', value: 'fl oz' },
			{ label: 'Gallon (gal)', value: 'gal' },
			{ label: 'Liter (L)', value: 'L' },
			{ label: 'Milliliter (mL)', value: 'mL' },
			{ label: 'Pint (pt)', value: 'pt' },
			{ label: 'Quart (qt)', value: 'qt' },
			{ label: 'Cup', value: 'cup' },
			{ label: 'Tablespoon (tbsp)', value: 'tbsp' },
			{ label: 'Teaspoon (tsp)', value: 'tsp' },
			{ label: 'Dash', value: 'dash' },
			{ label: 'Pinch', value: 'pinch' },
			{ label: 'Piece (pc)', value: 'pc' },
		],
		[]
	);

	return (
		<BottomSheetContainer
			isVisible={isVisible}
			onClose={handleCancel}
			snapToIndex={2}
			showIndicator={false}
			panDownToClose={true}>
			<View style={Styles.ph_md}>
				<Text variant='titleMedium' style={{ color: colors.primary }}>
					Add Ingredient
				</Text>
				<Text>Please provide ingredients for a single serving.</Text>
			</View>
			<Divider style={Styles.mv_sm} />
			<View style={Styles.ph_md}>
				<CustomTextInput label='Ingredient Name' onValueChange={(value) => setName(value)} />
				<CustomTextInput
					label='Quantity'
					onValueChange={(value) => setQuantity(value)}
					keyboard='number-pad'
				/>
				<View style={Styles.flex_wide}>
					<Text>Custom Unit</Text>
					<Checkbox
						status={isCustomUnit ? 'checked' : 'unchecked'}
						onPress={() => setCustomUnit(!isCustomUnit)}
					/>
				</View>
				{!isCustomUnit ? (
					<View style={Styles.mb_md}>
						<Dropdown
							label='Unit'
							placeholder='Select unit'
							options={commonUnits}
							value={unit}
							onSelect={(value) => setUnit(value)}
							mode='outlined'
						/>
					</View>
				) : (
					<>
						<CustomTextInput label='Custom Unit' onValueChange={(value) => setUnit(value)} />
					</>
				)}

				<View style={{ rowGap: Number(Styles.m_sm.margin) }}>
					<Button mode='contained' onPress={handleSave}>
						Add Ingredient
					</Button>
					<Button mode='text' onPress={handleCancel}>
						Cancel
					</Button>
				</View>
			</View>
		</BottomSheetContainer>
	);
};

export default AddIngredients;
