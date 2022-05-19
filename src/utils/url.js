const environment = process.env.NODE_ENV || 'development';
var url = '';
if (environment === 'development') {
  url = 'http://localhost:3690/';
} else url = 'https://testapp.aaenterpris.com/';

export default url;
