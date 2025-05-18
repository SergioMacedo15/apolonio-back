import { BaseStorage } from "./base";

export class MemoryStorage<T> extends BaseStorage<T> {
  private storage = new Map<string, any>();

  getItem(key: string): T | null {
    const value = this.storage.get(key);
    return value !== undefined ? (value as T) : null;
  }
  setItem(key: string, value: T): void {
    this.storage.set(key, value);
  }
  removeItem(key: string): void {
    this.storage.delete(key);
  }
  clear(): void {
    this.storage.clear();
  }
}
