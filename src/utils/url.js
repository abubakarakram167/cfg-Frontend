const environment = process.env.NODE_ENV || 'local';
console.log('envn is ', environment);
var url = 'https://app.mycfg.org/';
if (environment === 'local') {
  url = 'http://localhost:3690/';

} else {
  url = 'https://app.mycfg.org/';

}

export default url;
