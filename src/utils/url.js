const environment = process.env.NODE_ENV || 'local';
console.log('envn is ', environment);
var url = 'https://app.mycfg.org/';
if (environment === 'development') {
  url = 'http://localhost:3690/';
}
if (environment === 'local') {
  url = 'http://localhost:3690/';
}

export default url;
