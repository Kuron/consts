
# Consts

A collection of constants.

## Install

```
npm install @kurons/consts
```

## Usage

```javascript
import { TIME, from } from '@kurons/consts/time';
console.info(`year: ${TIME.SECOND} ms`); // year: 60_000 ms
console.info(`day2sec: ${from(1).days.to.seconds} s`); // day2sec: 86400 s
console.info(`hr2min: ${from(2).hours.to.minutes} m`); // hr2min: 120 m
```

