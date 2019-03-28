import Sub from './sub';

class Sub2 extends Sub {
  public valueB: number

  public constructor(value: number) {
    super(2);
    this.valueB = value;
  }
}

export default Sub2;
