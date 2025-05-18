export interface IStorage<T> {
  getItem(key: string): T | null;
  setItem(key: string, value: T): void;
  removeItem(key: string): void;
  clear(): void;
}

export abstract class BaseStorage<T> implements IStorage<T> {
  abstract getItem(key: string): T | null;
  abstract setItem(key: string, value: T): void;
  abstract removeItem(key: string): void;
  abstract clear(): void;
}
