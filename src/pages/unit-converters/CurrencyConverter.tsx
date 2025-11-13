import React, { useState } from 'react';
import Layout from '../../components/Layout';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');

  // Static exchange rates (in a real app, these would come from an API)
  const exchangeRates: { [key: string]: number } = {
    USD: 1.0,      // Base currency
    EUR: 0.85,     // Euro
    GBP: 0.73,     // British Pound
    JPY: 110.0,    // Japanese Yen
    CAD: 1.25,     // Canadian Dollar
    AUD: 1.35,     // Australian Dollar
    CHF: 0.92,     // Swiss Franc
    CNY: 6.45,     // Chinese Yuan
    INR: 74.5,     // Indian Rupee
    BRL: 5.2,      // Brazilian Real
    RUB: 73.5,     // Russian Ruble
    KRW: 1180.0,   // South Korean Won
    MXN: 20.1,     // Mexican Peso
    SGD: 1.35,     // Singapore Dollar
    NZD: 1.42,     // New Zealand Dollar
    ZAR: 14.8,     // South African Rand
    SEK: 8.6,      // Swedish Krona
    NOK: 8.9,      // Norwegian Krone
    DKK: 6.4,      // Danish Krone
    PLN: 3.9,      // Polish Zloty
    CZK: 21.5,     // Czech Koruna
    HUF: 295.0,    // Hungarian Forint
    TRY: 8.5,      // Turkish Lira
    ILS: 3.2,      // Israeli Shekel
    AED: 3.67,     // UAE Dirham
    SAR: 3.75,     // Saudi Riyal
    THB: 31.5,     // Thai Baht
    MYR: 4.15,     // Malaysian Ringgit
    IDR: 14250.0,  // Indonesian Rupiah
    PHP: 50.5,     // Philippine Peso
    VND: 23000.0,  // Vietnamese Dong
    EGP: 15.7,     // Egyptian Pound
    NGN: 411.0,    // Nigerian Naira
    KES: 108.0,    // Kenyan Shilling
    GHS: 6.1,      // Ghanaian Cedi
    MAD: 9.0,      // Moroccan Dirham
    TND: 2.8,      // Tunisian Dinar
    LKR: 200.0,    // Sri Lankan Rupee
    PKR: 170.0,    // Pakistani Rupee
    BDT: 85.0,     // Bangladeshi Taka
    NPR: 119.0,    // Nepalese Rupee
    MMK: 1850.0,   // Myanmar Kyat
    KHR: 4080.0,   // Cambodian Riel
    LAK: 9500.0,   // Lao Kip
    UZS: 10650.0,  // Uzbekistani Som
    KZT: 425.0,    // Kazakhstani Tenge
    AMD: 520.0,    // Armenian Dram
    GEL: 3.1,      // Georgian Lari
    AZN: 1.7,      // Azerbaijani Manat
    BYN: 2.5,      // Belarusian Ruble
    UAH: 27.0,     // Ukrainian Hryvnia
    MDL: 17.8,     // Moldovan Leu
    RON: 4.2,      // Romanian Leu
    BGN: 1.66,     // Bulgarian Lev
    HRK: 6.4,      // Croatian Kuna
    RSD: 100.0,    // Serbian Dinar
    BAM: 1.66,     // Bosnia and Herzegovina Convertible Mark
    MKD: 52.5,     // North Macedonian Denar
    ALL: 103.0,    // Albanian Lek
    EUR: 0.85      // Euro (repeated for clarity)
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', region: 'North America' },
    { code: 'EUR', name: 'Euro', symbol: '€', region: 'Europe' },
    { code: 'GBP', name: 'British Pound', symbol: '£', region: 'Europe' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', region: 'Asia' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', region: 'North America' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', region: 'Oceania' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', region: 'Europe' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', region: 'Asia' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', region: 'Asia' },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', region: 'South America' },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', region: 'Europe/Asia' },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', region: 'Asia' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', region: 'North America' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', region: 'Asia' },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', region: 'Oceania' },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', region: 'Africa' }
  ];

  const convertCurrency = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      setResult('');
      return;
    }

    const inputAmount = parseFloat(amount);
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    
    if (fromRate && toRate) {
      // Convert to USD first, then to target currency
      const usdAmount = inputAmount / fromRate;
      const convertedAmount = usdAmount * toRate;
      setResult(convertedAmount.toFixed(2));
    }
  };

  React.useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const clearAll = () => {
    setAmount('');
    setResult('');
  };

  const groupedCurrencies = currencies.reduce((acc, currency) => {
    if (!acc[currency.region]) {
      acc[currency.region] = [];
    }
    acc[currency.region].push(currency);
    return acc;
  }, {} as Record<string, typeof currencies>);

  return (
    <Layout title="Currency Converter" showBackButton>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="backdrop-blur-md bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
          <div className="text-yellow-400 font-medium mb-2">⚠️ Static Exchange Rates</div>
          <div className="text-white/70 text-sm">
            This converter uses static exchange rates for demonstration purposes. 
            For real-time rates, please use a live currency API or financial service.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Converter */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Currency Converter</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  step="0.01"
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">From</label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {Object.entries(groupedCurrencies).map(([region, currencyList]) => (
                      <optgroup key={region} label={region}>
                        {currencyList.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">To</label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {Object.entries(groupedCurrencies).map(([region, currencyList]) => (
                      <optgroup key={region} label={region}>
                        {currencyList.map(currency => (
                          <option key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={swapCurrencies}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Swap
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Clear
                </button>
              </div>

              {result && (
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      {currencies.find(c => c.code === toCurrency)?.symbol}{result}
                    </div>
                    <div className="text-white/70">
                      {currencies.find(c => c.code === fromCurrency)?.symbol}{amount} {fromCurrency} = {currencies.find(c => c.code === toCurrency)?.symbol}{result} {toCurrency}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Exchange Rate Info */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Exchange Rate Info</h3>
            
            <div className="space-y-4">
              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="text-white/70 text-sm mb-2">Current Rate (Static)</div>
                <div className="text-white font-mono text-lg">
                  1 {fromCurrency} = {(exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4)} {toCurrency}
                </div>
                <div className="text-white font-mono text-lg">
                  1 {toCurrency} = {(exchangeRates[fromCurrency] / exchangeRates[toCurrency]).toFixed(4)} {fromCurrency}
                </div>
              </div>

              <div className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-4">
                <div className="text-white/70 text-sm mb-2">Currency Details</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/70">From:</span>
                    <span className="text-white">{currencies.find(c => c.code === fromCurrency)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">To:</span>
                    <span className="text-white">{currencies.find(c => c.code === toCurrency)?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Symbol:</span>
                    <span className="text-white">
                      {currencies.find(c => c.code === fromCurrency)?.symbol} → {currencies.find(c => c.code === toCurrency)?.symbol}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <div className="text-white/70 text-sm mb-2">Quick Amounts</div>
                <div className="grid grid-cols-3 gap-2">
                  {[100, 500, 1000, 5000, 10000, 50000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount.toString())}
                      className="px-3 py-2 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all text-sm"
                    >
                      {quickAmount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Currency Pairs */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Currency Pairs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { from: 'USD', to: 'EUR', name: 'Dollar to Euro' },
              { from: 'USD', to: 'GBP', name: 'Dollar to Pound' },
              { from: 'USD', to: 'JPY', name: 'Dollar to Yen' },
              { from: 'EUR', to: 'GBP', name: 'Euro to Pound' },
              { from: 'USD', to: 'INR', name: 'Dollar to Rupee' },
              { from: 'USD', to: 'CNY', name: 'Dollar to Yuan' }
            ].map((pair, index) => (
              <div key={index} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-white font-medium">{pair.name}</div>
                    <div className="text-white/60 text-sm">
                      1 {pair.from} = {(exchangeRates[pair.to] / exchangeRates[pair.from]).toFixed(4)} {pair.to}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setFromCurrency(pair.from);
                      setToCurrency(pair.to);
                      setAmount('1');
                    }}
                    className="px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs rounded hover:opacity-90 transition-opacity"
                  >
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currency Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Currency Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Major Currencies</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">USD - US Dollar</div>
                  <div className="text-white/60">World's primary reserve currency</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">EUR - Euro</div>
                  <div className="text-white/60">Used by 19 EU countries</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">JPY - Japanese Yen</div>
                  <div className="text-white/60">Third most traded currency</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Exchange Rate Factors</h4>
              <div className="space-y-2 text-sm">
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Economic Indicators</div>
                  <div className="text-white/60">GDP, inflation, employment rates</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Political Stability</div>
                  <div className="text-white/60">Government policies and stability</div>
                </div>
                <div className="backdrop-blur-md bg-black/10 border border-glass rounded p-2">
                  <div className="text-white/70 font-medium">Market Sentiment</div>
                  <div className="text-white/60">Investor confidence and speculation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Table */}
        {amount && (
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {amount} {fromCurrency} in Different Currencies
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currencies.slice(0, 12).map((currency) => {
                const fromRate = exchangeRates[fromCurrency];
                const toRate = exchangeRates[currency.code];
                const convertedAmount = (parseFloat(amount) / fromRate) * toRate;
                
                return (
                  <div key={currency.code} className="backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3 text-center">
                    <div className="text-white font-bold">
                      {currency.symbol}{convertedAmount.toFixed(2)}
                    </div>
                    <div className="text-white/70 text-xs">{currency.code}</div>
                    <div className="text-white/50 text-xs">{currency.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CurrencyConverter;