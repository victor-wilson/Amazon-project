import { currencyFormat } from '../../../../scripts/utils/money.js';

describe('test suite: format currency', () => {
  it ('converts cents into dollar',() => {
    expect(currencyFormat(2095)).toEqual('20.95');
  });

  it ('formats zero cents as zero dollars', () => {
    expect(currencyFormat(0)).toEqual('0.00');
  });

  it ('rounds cents before formatting the dollar amount', () => {
    expect(currencyFormat(2000.5)).toEqual('20.01');
  });
});


