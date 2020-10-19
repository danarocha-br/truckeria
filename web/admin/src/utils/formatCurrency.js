const formatCurrency = (value) =>
  new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' })
    .format(value)
    .replace(/\u00A0/, ' ');

export default formatCurrency;
