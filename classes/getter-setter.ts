namespace GetterSetter {
  class Employee {
    private _fullName: string = '';
    private _isAdministrator: boolean = false;

    constructor(isAdministrator: boolean) {
      this._isAdministrator = isAdministrator;
    }

    get fullName(): string {
      return this._fullName;
    }

    set fullName(newName: string) {
      if (this._isAdministrator) {
        this._fullName = newName;
      } else {
        console.log('Error: You dont have the permission');
      }
    }
  }

  let employee = new Employee(true);
  employee.fullName = 'Bob Smith';
  if (employee.fullName) {
    console.log(employee.fullName);
  }
}
