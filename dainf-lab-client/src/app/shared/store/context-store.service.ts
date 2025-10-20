import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContextStore {
  private readonly _contexts = signal<Record<string, any>>({});

  // For debug or dev tools if needed
  readonly contexts = this._contexts.asReadonly();

  set(key: string, data: any) {
    this._contexts.update(ctx => ({ ...ctx, [key]: data }));
  }

  consume<T = any>(key: string): T | null {
    const ctx = this._contexts();
    const value = ctx[key] ?? null;
    if (value !== null) {
      const { [key]: _, ...rest } = ctx;
      this._contexts.set(rest);
    }
    return value;
  }

  clear(key?: string) {
    if (!key) {
      this._contexts.set({});
      return;
    }
    const ctx = this._contexts();
    const { [key]: _, ...rest } = ctx;
    this._contexts.set(rest);
  }
}
