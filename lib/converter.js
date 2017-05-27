import Money from './money'

/**
 * MoneyConverter
 */
class Converter
{
    const exchangeRates = {};

    /**
     * @param   {object}    
     * @param   {function}
     */
    constructor(exchangeRates, customRateResolver = null) {
        this.exchangeRates = exchangeRates;
        this.resolveExchangeRate = customRateResolver || (baseCurrency, quoteCurrency, exchangeRates) => {
            return exchangeRates[baseCurrency.code + quoteCurrency.code];
        }
    }

    convert(money, quoteCurrency) {
        const baseCurrency = Money[money.getCurrency()],
            quoteCurrency = Money[(typeof currency == 'string' ? currency : currency.code)],
            baseCurrencyDecimalDigits = baseCurrency.decimal_digits,
            quoteCurrencyDecimalDigits = quoteCurrency.decimal_digits,
            decimalDigitsDifference = baseCurrencyDecimalDigits - quoteCurrencyDecimalDigits,
            rawRatio = this.resolveExchangeRate(baseCurrency, quoteCurrency, this.exchangeRates),
            ratio = rawRatio ? rawRatio / Math.pow(10, decimalDigitsDifference) : null,
            quoteCurrency = money.multiply(ratio);

        return new Money(quoteCurrency->getAmount(), quoteCurrency);
    }
}

export default MoneyConverter
