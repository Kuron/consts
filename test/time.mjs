
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

describe('time', async () => {
  const m = await import('../src/time.mjs');

  it('should have 2 exports', () => assert.equal(Object.keys(m).length, 2));
  
  it('should have the exports and values', () => {
    // Symbols
    assert.equal(m.TIME.MS, 1);
    assert.equal(m.TIME.S, 1_000);
    assert.equal(m.TIME.MIN, 60_000);
    assert.equal(m.TIME.H, 3_600_000);
    assert.equal(m.TIME.D, 86_400_000);
    assert.equal(m.TIME.W, 604_800_000);
    assert.equal(m.TIME.M, 2_592_000_000);
    assert.equal(m.TIME.Y, 31_536_000_000);
    assert.equal(m.TIME.YR, 31_536_000_000);

    // Names
    assert.equal(m.TIME.MILLISECOND, 1);
    assert.equal(m.TIME.SECOND, 1_000);
    assert.equal(m.TIME.MINUTE, 60_000);
    assert.equal(m.TIME.HOUR, 3_600_000);
    assert.equal(m.TIME.DAY, 86_400_000);
    assert.equal(m.TIME.WEEK, 604_800_000);
    assert.equal(m.TIME.MONTH, 2_592_000_000);
    assert.equal(m.TIME.YEAR, 31_536_000_000);
  });
  
  it('should convert from 1 hour', () => {
    assert.equal(m.from(1).hours.to.milliseconds, m.TIME.HOUR);
    assert.equal(m.from(1).hours.to.seconds, 3_600);
    assert.equal(m.from(1).hours.to.minutes, 60);
    assert.equal(m.from(1).hours.to.hours, 1);
  });

  it('should convert from 6 months', () => {
    assert.equal(m.from(6).months.to.milliseconds, 15_552_000_000);
    assert.equal(m.from(6).months.to.seconds, 15_552_000);
    assert.equal(m.from(6).months.to.minutes, 259_200);
    assert.equal(m.from(6).months.to.hours, 4_320);
    assert.equal(m.from(6).months.to.days, 180);
    assert.equal(m.from(6).months.to.weeks, 25.714285714285715);
    assert.equal(m.from(6).months.to.months, 6);
    assert.equal(m.from(6).months.to.years, 0.4931506849315068);
    assert.equal(m.from(6).months.to.rounded.weeks, 26);
    assert.equal(m.from(6).months.to.rounded.up.years, 1);
    assert.equal(m.from(6).months.to.rounded.down.years, 0);
  });

  it('should convert from 1 year', () => {
    assert.equal(m.from(1).years.to.milliseconds, m.TIME.YEAR);
    assert.equal(m.from(1).years.to.seconds, 31_536_000);
    assert.equal(m.from(1).years.to.minutes, 525_600);
    assert.equal(m.from(1).years.to.hours, 8_760);
    assert.equal(m.from(1).years.to.days, 365);
    assert.equal(m.from(1).years.to.weeks, 52.142857142857146);
    assert.equal(m.from(1).years.to.months, 12.166666666666666);
    assert.equal(m.from(1).years.to.years, 1);
    assert.equal(m.from(1).years.to.rounded.weeks, 52);
    assert.equal(m.from(1).years.to.rounded.months, 12);
  });

  it('should ignore up and down if called without rounded', () => {
    assert.equal(m.from(6).months.to.up.years, 0.4931506849315068);
    assert.equal(m.from(6).months.to.down.years, 0.4931506849315068);
  });
});

