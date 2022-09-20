/*
 * igortrinidad/vue-number-format
 *
 * (c) Igor Trindade <igortrindade.me@gmail.com>
 *
 * Mostly of this file content was extracted from the v-money library https://github.com/vuejs-tips/v-money
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { type VueNumberFormatOptions } from './types/FormatOptions'

export const format = (input = 0, opt: VueNumberFormatOptions) => {
  if (typeof input === 'number' && !opt.isInteger) {
    input = input.toFixed(fixed(opt.precision))
  }
  const negative = isNegative(input, opt.acceptNegative)  ? '-' : ''
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, opt.precision)
  const parts = currency.toString().split('.')
  let integer = parts[0]
  const decimal = parts[1]
  integer = addThousandSeparator(integer, opt.thousand)
  return negative + opt.prefix + joinIntegerAndDecimal(integer, decimal, opt.decimal) + mergedOptions.suffix
}

export const unformat = (input = 0, opt = { precision: 2, isInteger: false, acceptNegative: true}) => {
  if(input === null) input = 0
  const mergedOptions = Object.assign({}, defaultOptions, opt)
  const negative = (isNegative(input, mergedOptions.acceptNegative)) ? -1 : 1
  const numbers = onlyNumbers(input)
  const currency = numbersToCurrency(numbers, mergedOptions.precision)
  if(mergedOptions.isInteger) {
    return parseInt(`${isNegative(input, mergedOptions.acceptNegative) ? '-' : ''}${numbers.toString()}`)
  }
  return parseFloat(currency) * negative
}

export const setCursor = (el: HTMLInputElement, position) => {
  const setSelectionRange = function () { el.setSelectionRange(position, position) }
  if (el === document.activeElement) {
    setTimeout(setSelectionRange, 1)
  }
}


export const setCursorPosition = (el, opt = defaultOptions) => {
  let positionFromEnd = el.value.length - el.selectionEnd
  el.value = format(el.value, opt)
  positionFromEnd = Math.max(positionFromEnd, opt.suffix.length)
  positionFromEnd = el.value.length - positionFromEnd
  positionFromEnd = Math.max(positionFromEnd, opt.prefix.length + 1)
  setCursor(el, positionFromEnd)
}


function onlyNumbers (input: any) {
  return input.toString().replace(/\D+/g, '') || '0'
}

// 123 RangeError: toFixed() digits argument must be between 0 and 20 at Number.toFixed
function fixed (precision: number) {
  return Math.max(0, Math.min(precision, 20))
}

function numbersToCurrency (numbers: string, precision: number) {
  const exp = Math.pow(10, precision)
  const float = parseFloat(numbers) / exp
  return float.toFixed(fixed(precision))
}

function addThousandSeparator (integer: string, separator: string) {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`)
}

function joinIntegerAndDecimal (integer: string, decimal: string, separator: string) {
  return decimal ? integer + separator + decimal : integer
}

function isNegative(string: any, acceptNegative = true) {
  if(!acceptNegative) return false
  if (typeof string != 'string') string = string.toString()
  const forcePositive = string.indexOf('+') >= 0
  const isNegative = (string !== 0 && string.indexOf('-') >= 0 || string[string.length-1] == '-') ? true : false
  return (!forcePositive && isNegative) ? true : false
}