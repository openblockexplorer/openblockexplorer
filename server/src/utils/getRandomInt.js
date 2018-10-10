/**
 * @file getRandomInt
 * @copyright Copyright (c) 2018 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

const getRandomNumber = require('./getRandomNumber');

/**
 * Return a random integer between start and end.
 * @param {Number} start The starting number.
 * @param {Number} end The ending number.
 * @return {Number} The random integer.
 * @private
 */
module.exports = function getRandomInt(start, end) {
  return Math.floor(getRandomNumber(start, end));
}
