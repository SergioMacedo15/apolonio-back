import { BaseStorage } from "./base";

export class SessionStorage extends BaseStorage {
  getItem<T>(key: string): T | null {
    const value = sessionStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  }

  setItem<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
