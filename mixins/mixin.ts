type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class User {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

// Create a new class by mixing "Timestamped" into "User"
const TimestampedUser = Timestamped(User);

// Instantiate the new "TimestampedUser" class
const user = new TimestampedUser("John Doe");

// We can now access properties from both the "User" class
// and our "Timestamped" mixin in a type-safe manner
console.log(user.name);
console.log(user.timestamp);