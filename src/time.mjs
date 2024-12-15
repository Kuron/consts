
const DEF = {
  MILLISECOND: { value: 1, symbols: ['MS'] },
  SECOND: { value: 1_000, symbols: ['S'] },
  MINUTE: { value: 60_000, symbols: ['MIN'] },
  HOUR: { value: 3_600_000, symbols: ['H'] },
  DAY: { value: 86_400_000, symbols: ['D'] },
  WEEK: { value: 604_800_000, symbols: ['W'] },
  MONTH: { value: 2_592_000_000, symbols: ['M'] },
  YEAR: { value: 31_536_000_000, symbols: ['Y', 'YR'] },
};

export const TIME = (() =>
  Object.keys(DEF)
    .map(key => [[key, DEF[key].value]]
      .concat(DEF[key].symbols
        .map(symbol =>
          [symbol, DEF[key].value]
        )
      )
    )
    .flat()
    .reduce((a, [key, value]) => (a[key] = value, a), {})
)();

const converters = function (value) { this.value = value; };
const allowedMathMethods = ['ceil', 'floor', 'round'];

Object.keys(TIME)
  .reduce((a, key) => {
    Object.defineProperty(a, `${key.toLowerCase()}s`, {
      get() {
        const result = this.value / TIME[key];
        return this.math && this.math in Math && allowedMathMethods.includes(this.math)
          ? Math[this.math](result)
          : result;
      },
    });
    return a;
  }, converters.prototype);

Object.defineProperties(converters.prototype, {
  down: { get() { this.math = (this.math === 'round' && 'floor') || null; return this; } },
  rounded: { get() { this.math = 'round'; return this; } },
  up: { get() { this.math = (this.math === 'round' && 'ceil') || null; return this; } },
});

const normalizer = function (value) { this.value = value; };

Object.keys(TIME)
  .reduce((a, key) => {
    Object.defineProperty(a, `${key.toLowerCase()}s`, {
      get() { return { to: new converters(this.value * TIME[key]) }; },
    });
    return a;
  }, normalizer.prototype);

export const from = value => new normalizer(value);

