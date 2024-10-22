import { browser } from '$app/environment';

export const buttonDelay = 80;
export function fromLocalStorage(storageKey: string, fallbackValue: string | null): string | null {
	if (browser) {
		const storeVal = window.localStorage.getItem(storageKey);
		if (storeVal == null) return fallbackValue;
		else return storeVal;
	}

	return fallbackValue;
}

export function toLocalStorage(storageKey: string, value: string) {
	if (browser) {
		window.localStorage.setItem(storageKey, value);
	}
}
