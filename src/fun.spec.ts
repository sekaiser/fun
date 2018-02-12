import * as chai from 'chai';
import 'mocha';
import * as f from './fun';
import { renameKeys, rename } from './fun';

const expect = chai.expect;

describe('unit test fun', () => {
  it('renameKeys', () => {
    const arr = [['a', 1], ['b', 2]];
    const mapping = {
      a: 'foo',
      b: 'bar',
    };
    const result = renameKeys(mapping)(arr);
    expect(result[0][0]).to.be.equals('foo');
    expect(result[0][1]).to.be.equals(1);
  });

  it('renameKeys', () => {
    const arr = [['a', 1], ['b', 2]];
    const mapping = {
      a: 'a',
      b: 'bar',
    };
    const result = renameKeys(mapping)(arr);
    expect(result[0][0]).to.be.equals('a');
    expect(result[0][1]).to.be.equals(1);
  });

  const firstLetterToUpperCase = x => {
    if (x && x.length > 0) {
      return x.charAt(0).toUpperCase() + x.substring(1);
    }
    return x;
  };

  it('rename', () => {
    const val = {
      a: 'foo',
      b: 'bar',
    };
    const result = rename(val, firstLetterToUpperCase);
    expect(result.A).to.be.equals('foo');
  });

  it('rename', () => {
    const arr = [['a', 1], ['b', 2]];
    const result = rename(arr, firstLetterToUpperCase);
    console.log(result);
    expect(result[0][0]).to.be.equals('a');
    expect(result[0][1]).to.be.equals(1);
  });

  it('rename', () => {
    const val = {
      a: 'foo',
      b: {
        c: 1,
        d: false,
      },
    };
    const result = rename(val, firstLetterToUpperCase);
    expect(result.hasOwnProperty('B')).to.be.equals(true);
    expect(result.B.hasOwnProperty('C')).to.be.equals(true);
    expect(result.B.C).to.be.equals(1);
  });

  it('rename', () => {
    const val = {
      a: 'foo',
      b: [
        {
          c: 1,
          d: false,
        },
      ],
    };
    const result = rename(val, firstLetterToUpperCase);
    expect(result.hasOwnProperty('B')).to.be.equals(true);
    expect(result.B.length).to.be.equals(1);
    expect(result.B[0].hasOwnProperty('C')).to.be.equals(true);
    expect(result.B[0].C).to.be.equals(1);
  });
});
