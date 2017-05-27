/**
 * Converter
 */
function Converter(exchangeRates, customRateResolver = null) {
    this.exchangeRates = exchangeRates;

    if (typeof customRateResolver == 'function') {
        this.resolveExchangeRate = customRateResolver;
    }
}

Converter.prototype = {
    convert: function(money, quoteCurrency) {
        var baseCurrency = Money[money.getCurrency()],
            quoteCurrency = Money[(typeof quoteCurrency == 'string' ? quoteCurrency : quoteCurrency.code)],
            baseCurrencyDecimalDigits = baseCurrency.decimal_digits,
            quoteCurrencyDecimalDigits = quoteCurrency.decimal_digits,
            decimalDigitsDifference = baseCurrencyDecimalDigits - quoteCurrencyDecimalDigits,
            rawRatio = this.resolveExchangeRate(baseCurrency, quoteCurrency, this.exchangeRates),
            ratio = rawRatio ? rawRatio / Math.pow(10, decimalDigitsDifference) : null,
            quoteCurrency = money.multiply(ratio);

        return new Money(quoteCurrency.getAmount(), quoteCurrency);
    },

    resolveExchangeRate: function(baseCurrency, quoteCurrency, exchangeRates) {
        return exchangeRates[baseCurrency.code + quoteCurrency.code];
    }
};

module.exports = Converter;
