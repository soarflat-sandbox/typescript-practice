// https://msdn.microsoft.com/ja-jp/magazine/mt791799.aspx
namespace PersonWithDecorator {
  // Decorator Factory
  export function log() {
    // Decorator
    return function(
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {
      // Save a reference to the original method
      const originalMethod = descriptor.value;

      descriptor.value = function(...args: any[]) {
        const argsLog = args.map(a => JSON.stringify(a)).join();
        const result = originalMethod.apply(this, args);
        const resultLog = JSON.stringify(result);
        console.log(`Call: ${propertyKey}(${argsLog}) => ${resultLog}`);
        return result;
      };

      // Return edited descriptor instead of overwriting
      // the descriptor by returning a new descriptor
      return descriptor;
    };
  }

  export interface Person {
    firstName: string;
    lastName: string;
    greet(): string;
    fullName: string;
  }

  class NormalPerson implements Person {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }

    greet(): string {
      return `${this.fullName} says hello!`;
    }

    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  }

  class Manager extends NormalPerson {
    constructor(firstName: string, lastName: string) {
      super(firstName, lastName);
    }

    @log()
    greet(): string {
      return `${this.fullName} says let's dialogue about common synergies!`;
    }
  }

  const ted = new Manager('Ted', 'Neward');
  console.log(ted.greet());
}
