import { FontAwesome5, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite';
import { useEffect, useState } from 'react';

const useLoadResources = () => {
	const [isAssetsLoaded, setAssetsLoaded] = useState<boolean>(false);
	const [isDbLoaded, setIsDbLoaded] = useState<boolean>(false); // Track DB loading status
	const [loadingComplete, setLoadingComplete] = useState(false);

	// Load fonts
	const [fontsLoaded, error] = useFonts({
		...MaterialCommunityIcons.font,
		...FontAwesome5.font,
		...FontAwesome6.font,
	});

	// Handle font loading errors
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	// Function to load assets asynchronously
	const loadAssetsAsync = async () => {
		try {
			await Asset.loadAsync([
				require('@/assets/images/dish-8723519_1920-min.jpg'),
				require('@/assets/images/adaptive-icon.png'),
				require('@/assets/images/icon.png'),
				require('@/assets/images/blank_image_placeholder.png'),
				require('@/assets/audio/bedside-clock-alarm-95792.mp3'),
			]);
			setAssetsLoaded(true);
		} catch (error) {
			console.error('Error loading assets:', error);
		}
	};

	const resetDatabase = async () => {
		const assetPath = `${FileSystem.documentDirectory}/SQLite/DB_Recipe_Ratio`;

		try {
			// Check if the database exists
			const fileInfo = await FileSystem.getInfoAsync(assetPath);
			if (fileInfo.exists) {
				// Delete the existing database file
				await FileSystem.deleteAsync(assetPath, { idempotent: true });
				console.log('Database deleted:', assetPath);
			} else {
				console.log('No existing database found to delete.');
			}

			// Confirm deletion
			const deletedFileInfo = await FileSystem.getInfoAsync(assetPath);
			if (!deletedFileInfo.exists) {
				console.log('Database confirmed deleted.');
			} else {
				console.error('Failed to delete the database. It still exists.');
				return; // Exit if deletion failed
			}
		} catch (error: any) {
			console.error('Error resetting database:', error.message || error);
		}
	};

	const initDatabase = async () => {
		const assetPath = `${FileSystem.documentDirectory}/SQLite/DB_Recipe_Ratio.db`;

		// Ensure the directory exists
		await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/SQLite`, {
			intermediates: true,
		});

		try {
			// Open (create) the database
			const db = await SQLite.openDatabaseAsync('DB_Recipe_Ratio.db');
			console.log('Database opened successfully from path:', assetPath);

			// Create the table
			await db.execAsync(`
				CREATE TABLE IF NOT EXISTS "Ingredients" (
					"id" INTEGER NOT NULL,
					"recipe_id" INTEGER,
					"name" TEXT,
					"quantity" NUMERIC,
					"unit" TEXT,
					PRIMARY KEY("id" AUTOINCREMENT)
				);
			`);

			setIsDbLoaded(true);
		} catch (error: any) {
			console.error('Error during database initialization:', error.message || error);
			setIsDbLoaded(false);
		}
	};

	// Load assets when fonts are loaded
	useEffect(() => {
		const loadResources = async () => {
			if (!isAssetsLoaded) await loadAssetsAsync();
			if (!isDbLoaded) await initDatabase();
			if (fontsLoaded && isAssetsLoaded && isDbLoaded) {
				console.log('All resources loaded!');
				setLoadingComplete(true);
			}
		};

		loadResources();
	}, [fontsLoaded, isAssetsLoaded, isDbLoaded]);

	// Return asset loading status
	return loadingComplete;
};

export default useLoadResources;
