/**
 * container.ts — Lightweight Typed Dependency Injection Container (Core Layer)
 */

export interface ServiceToken<T> {
  readonly id: symbol;
  readonly label: string;
  readonly _type?: T;
}

export function createServiceToken<T>(label: string): ServiceToken<T> {
  return { id: Symbol(label), label };
}

type StoredEntry = { readonly value: object };
type StoredFactory = () => object;

class ServiceContainer {
  private readonly factories = new Map<symbol, StoredFactory>();
  private readonly singletons = new Map<symbol, StoredEntry>();

  public registerSingleton<T extends object>(token: ServiceToken<T>, factory: () => T): void {
    this.factories.set(token.id, factory);
    this.singletons.delete(token.id);
  }

  public registerInstance<T extends object>(token: ServiceToken<T>, instance: T): void {
    this.singletons.set(token.id, { value: instance });
    this.factories.set(token.id, () => instance);
  }

  public resolve<T extends object>(token: ServiceToken<T>): T {
    const cached = this.singletons.get(token.id);
    if (cached) {
      // SAFETY: `token.id` is a unique symbol paired with `T` at registration time in registerSingleton/registerInstance.
      return cached.value as T;
    }
    const factory = this.factories.get(token.id);
    if (!factory) {
      throw new Error(`Service token "${token.label}" is not registered in ServiceContainer.`);
    }
    const instance = factory();
    this.singletons.set(token.id, { value: instance });
    // SAFETY: `factory` was registered under the typed `ServiceToken<T>` symbol.
    return instance as T;
  }

  public has<T extends object>(token: ServiceToken<T>): boolean {
    return this.singletons.has(token.id) || this.factories.has(token.id);
  }

  public resetInstances(): void {
    this.singletons.clear();
  }
}

export const serviceContainer = new ServiceContainer();
