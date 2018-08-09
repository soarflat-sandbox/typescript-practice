namespace AbstractClasses {
  abstract class Department {
    constructor(public name: string) {}

    printName(): void {
      console.log(`Department name: ${this.name}`);
    }

    // 抽象メソッド
    abstract printMeeting(): void;
  }

  class AccountingDepartment extends Department {
    constructor() {
      // 継承したクラスのコンストラクタ内で`super()`を必ず呼ばなけれいけない
      super('Accounting and Auditing');
    }

    printMeeting(): void {
      console.log('The Accounting Department meets each Monday at 10am.');
    }

    generateReports(): void {
      console.log('Generating accounting reports...');
    }
  }

  // 抽象型への参照を生成
  let department: Department;

  // 抽象クラスは直接インスタンス化できないためError
  // department = new Department();

  // 非抽象のサブクラスを生成する
  department = new AccountingDepartment();

  department.printName();
  department.printMeeting();

  // 抽象クラスで定義されていないためError
  // department.generateReports();
}
