/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

const conversion = {
  gal: {
    string: 'gallons',
    to: 'l',
    factor: 3.78541
  },
  l: {
    string: 'liters',
    to: 'gal',
    factor: 0.264172
  },
  mi: {
    string: 'miles',
    to: 'km',
    factor: 1.60934
  },
  km: {
    string: 'kilometers',
    to: 'mi',
    factor: 0.621371
  },
  lbs: {
    string: 'pounds',
    to: 'kg',
    factor: 0.453592
  },
  kg: {
    string: 'kilograms',
    to: 'lbs',
    factor: 2.20462
  }
};
const units = [
  'gal',
  'l',
  'mi',
  'km',
  'lbs',
  'kg',
  'GAL',
  'L',
  'MI',
  'KM',
  'LBS',
  'KG'
];
function ConvertHandler() {
  this.getNum = function(input) {
    // console.log('input :', input);
    let result;

    // if there is no input, return null
    if (!input) return null;

    // find the index of the first letter in input string
    const letters = input.match(/[a-zA-Z]/);

    // slice off the numbers from the input string
    const numbers = input.slice(0, letters.index).trim();

    // if there is no numbers, return 1
    if (!numbers) return 1;

    // console.log('numbers :', numbers);
    result = numbers;
    // check for fractional
    const fractional = numbers.match(/\//);
    // console.log('fractional :', fractional);

    //if it is a fractional
    if (fractional) {
      //get the both parts of the fractional
      const first = numbers.slice(0, fractional.index);
      const second = numbers.slice(fractional.index + 1);

      // console.log('first, second :', first, second);
      // console.log('first / second :', first / second);

      // calculate the result
      result = first / second;
    }

    //if result is not a number, return invalid number
    if (isNaN(result)) {
      return 'invalid number';
    }

    // return converted numbers
    return parseFloat(result);
  };

  this.getUnit = function(input) {
    // Array of units to check against

    // find the index of the first letter in input string
    const letters = input.match(/[a-zA-Z]/);

    // slice off the unit from the input string
    const unit = input.slice(letters.index).trim();
    // console.log('unit :', unit);

    // if there is no unit, or it is not included in the units array, return 'invalid unit'
    if (!unit || !units.includes(unit)) {
      return 'invalid unit';
    }

    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    // console.log('initNum, initUnit :', initNum, initUnit);

    //if the inital unit is invalid, return 'invalid unit'
    if (initUnit == 'invalid unit') return 'invalid unit';

    // if it is valid, convert it
    var result = conversion[initUnit.toLowerCase()].to;
    // console.log('getReturnUnit result :', result);
    return result;
  };

  this.spellOutUnit = function(unit) {
    // if there is no unit, or it is not included in the units array, return 'invalid unit'
    if (!unit || !units.includes(unit)) {
      return 'invalid unit';
    }
    // console.log('spellOutUnit result :', result);

    // if there is a unit, spell out the string
    return conversion[unit.toLowerCase()].string;
  };

  this.convert = function(initNum, initUnit) {
    // console.log('initNum, initUnit :', initNum, initUnit);

    // if the unit is valid AND the initNum is valid, calculate and return the result
    if (initUnit != 'invalid unit' && initNum != 'invalid number') {
      const result = initNum * conversion[initUnit.toLowerCase()].factor;
      return parseFloat(result.toFixed(5));
    }
    // else return 'invalid number'
    return 'invalid number';
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    // round the returnNum to 5 digits
    const roundedReturnNum = parseFloat(returnNum).toFixed(5);

    result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${roundedReturnNum} ${this.spellOutUnit(returnUnit)}`;
    // console.log('result :', result);

    // return the string
    return result;
  };
}

module.exports = ConvertHandler;
