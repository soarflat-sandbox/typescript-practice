"use strict";
var GetterSetter;
(function (GetterSetter) {
    var Employee = /** @class */ (function () {
        function Employee(isAdministrator) {
            this._fullName = '';
            this._isAdministrator = false;
            this._isAdministrator = isAdministrator;
        }
        Object.defineProperty(Employee.prototype, "fullName", {
            get: function () {
                return this._fullName;
            },
            set: function (newName) {
                if (this._isAdministrator) {
                    this._fullName = newName;
                }
                else {
                    console.log('Error: You dont have the permission');
                }
            },
            enumerable: true,
            configurable: true
        });
        return Employee;
    }());
    var employee = new Employee(true);
    employee.fullName = 'Bob Smith';
    if (employee.fullName) {
        console.log(employee.fullName);
    }
})(GetterSetter || (GetterSetter = {}));
