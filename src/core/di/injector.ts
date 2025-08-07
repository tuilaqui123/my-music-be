export class Injector {
  private container = new Map<Function, any>();

  constructor(providers: Array<new (...args: any[]) => unknown> = []) {
    for (const provider of providers) {
      this.register(provider);
    }
  }

  /**
   * Đăng ký một class vào container và tạo instance
   */
  register<T>(provider: new (...args: any[]) => T): void {
    if (this.container.has(provider)) return;

    // Tự động resolve các dependency từ constructor
    const paramTypes: Function[] =
      Reflect.getMetadata('design:paramtypes', provider) || [];

    const dependencies = paramTypes.map((dep) =>
      this.get(dep as new (...args: any[]) => unknown),
    );

    const instance = new provider(...dependencies);
    this.container.set(provider, instance);
  }

  /**
   * Lấy ra một instance từ container
   */
  get<T>(provider: new (...args: any[]) => T): T {
    const instance = this.container.get(provider);
    if (!instance) {
      throw new Error(`No provider found for ${provider.name}`);
    }
    return instance;
  }

  /**
   * Kiểm tra đã đăng ký chưa
   */
  has(provider: Function): boolean {
    return this.container.has(provider);
  }
}
