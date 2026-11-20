/**
 * container.ts — Lightweight Typed Dependency Injection Container (Core Layer)
 *
 * Allows Application and Presentation layers to resolve Platform, Storage, and
 * Repository ports by token, while enabling clean deterministic test doubles.
 */

export interface ServiceToken<T> {
  readonly id: symbol;
  readonly label: string;
  readonly _type?: T;
}

export function createServiceToken<T>(label: string): ServiceToken<T> {
  return { id: Symbol(label), label };
}

export class ServiceContainer {
  private readonly factories = new Map<symbol, () => unknown>();
  private readonly singletons = new Map<symbol, unknown>();

  public registerSingleton<T>(token: ServiceToken<T>, factory: () => T): void {
    this.factories.set(token.id, factory);
    this.singletons.delete(token.id);
  }

  public registerInstance<T>(token: ServiceToken<T>, instance: T): void {
    this.singletons.set(token.id, instance);
    this.factories.set(token.id, () => instance);
  }

  public resolve<T>(token: ServiceToken<T>): T {
    if (this.singletons.has(token.id)) {
      return this.singletons.get(token.id) as T;
    }
    const factory = this.factories.get(token.id);
    if (!factory) {
      throw new Error(`Service token "${token.label}" is not registered in ServiceContainer.`);
    }
    const instance = factory() as T;
    this.singletons.set(token.id, instance);
    return instance;
  }

  public has<T>(token: ServiceToken<T>): boolean {
    return this.singletons.has(token.id) || this.factories.has(token.id);
  }

  public resetInstances(): void {
    this.singletons.clear();
  }
}

export const serviceContainer = new ServiceContainer();
