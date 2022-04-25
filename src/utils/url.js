const environment = process.env.NODE_ENV || 'development';
var url = '';
if (environment === 'development') {
  url = 'http://devapp.mycfg.org/';
} else url = 'https://app.mycfg.org/';

export default url;
