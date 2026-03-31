import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  GEOLOCATION_PERMISSION: 'geolocation_permission',
  NOTIFICATION_PERMISSION: 'notification_permission',
  BRAND_INTRO_SHOWN: 'brand_intro_shown',
  FAVORITES: 'favorites',
  BOOKINGS: 'bookings',
  CART: 'cart',
  USER_PROFILE: 'user_profile',
} as const;

export async function getFlag(key: string): Promise<boolean> {
  const value = await AsyncStorage.getItem(key);
  return value === 'true';
}

export async function setFlag(key: string, value: boolean): Promise<void> {
  await AsyncStorage.setItem(key, value ? 'true' : 'false');
}

export async function getJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setJSON<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export { KEYS };
