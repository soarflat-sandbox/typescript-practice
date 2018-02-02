class A<T> {
  public value: T;

  constructor(t: T) {
    this.value = t;
  }

  public getValue(): T {
    return this.value;
  }
}

const aTypeString: A<string> = new A('instance of A');
console.log(aTypeString.getValue()); // => instance of A

const aTypeString2 = new A<string>('instance of A');
console.log(aTypeString2.getValue()); // => instance of A

const aTypeNumber = new A<number>(793);
console.log(aTypeNumber.getValue()); // => 793
