/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function(app) {
  var convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function(req, res, next) {
    var input = req.query.input;
    var initNum = convertHandler.getNum(input);
    var initUnit = convertHandler.getUnit(input);
    var returnNum = convertHandler.convert(initNum, initUnit);
    var returnUnit = convertHandler.getReturnUnit(initUnit);
    var toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    // console.log('__________________________________________________');
    // console.log('response ->:', {
    //   initNum,
    //   initUnit,
    //   returnNum,
    //   returnUnit
    // });
    let response;

    if (initUnit === 'invalid unit' && !response) {
      response = 'invalid unit';
    }
    if (initNum === 'invalid number' && !response) {
      response = 'invalid number';
    }
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      response = 'invalid number and unit';
    }
    if (!response) {
      response = {
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: toString || ''
      };
    }

    // console.log('response :', response);

    res.send(response);
  });
};
