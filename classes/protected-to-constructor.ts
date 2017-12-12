class Person {
  protected name: string;

  protected constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

// Personのインスタンスのため、Personのconstructorを実行できる。
let howard = new Employee("Howard", "Sales");

// Personのconstructorはprotectedのためエラーが発生する
let john = new Person('John');
