/**
 * @file getHashString
 * @copyright Copyright (c) 2018-2019 Dylan Miller and dfinityexplorer contributors
 * @license MIT License
 */

/**
 * Return a string containing the hash which has been modified for display.
 * @param {String} hash The hash to modify for display.
 * @param {Number} maxLength The maximum length of the hash string.
 * @return {Array} A string containing the hash which has been modified for display.
 * @protected
 */
export default function getHashString(hash, maxLength) {
  if (maxLength === undefined)
    maxLength = 24;
  hash = "0x" + hash;
  if (maxLength !== 0 && hash.length > maxLength) {
    const first = hash.substring(0, maxLength - 4);
    const last = hash.substr(hash.length - 4);
    return first + "..." + last;
  }
  else
    return hash;
}

