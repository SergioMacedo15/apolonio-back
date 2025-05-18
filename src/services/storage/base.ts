export interface IStorage {
  getItem<T>(key: string): T | null;
  setItem<T>(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

export abstract class BaseStorage implements IStorage {
  abstract getItem<T>(key: string): T | null;
  abstract setItem<T>(key: string, value: T): void;
  abstract removeItem(key: string): void;
  abstract clear(): void;
}
