const environment = process.env.NODE_ENV || 'development';
var url = '';
if (environment === 'development') {
  url = 'http://localhost:3690/';
} else url = 'https://app.mycfg.org/';

export default url;
