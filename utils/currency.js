export const formatMoney = (amount, options = {}) => {
  const number = Number(amount)
  if (isNaN(number)) {
    return amount
  }
  const defaultOptions = getCurrencyDefaultOptions(options.currency)
  const { currency, symbol, precision } = Object.assign(
    {},
    defaultOptions,
    options
  )

  const absNumber = Math.abs(number)
  const price = formatNumberWithCommas(absNumber, currency, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision
  })
  return `${number < 0 ? '-' : ''}${symbol} ${price}`
}

export const formatNumberWithCommas = (number, currency, options) => {
  const localeOptions = Object.assign(
    {
      minimumFractionDigits: 0,
      maximumFractionDigits: 20
    },
    options
  )
  return Number(number).toLocaleString(currency, localeOptions)
}

export const getCurrencyDefaultOptions = (currency = 'PHP') => {
  switch (currency) {
    case 'PH':
    case 'PHP':
      return {
        currency: 'PHP',
        symbol: '₱',
        precision: 2
      }
    case 'ID':
    case 'IDR':
      return {
        currency: 'IDR',
        symbol: 'Rp',
        precision: 2
      }
    default:
      return {
        currency,
        symbol: '$',
        precision: 2
      }
  }
}
