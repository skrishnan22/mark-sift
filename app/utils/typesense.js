let client = null;
const Typesense = require('typesense');
const config = require('config');

module.exports.getClient = async function getClient() {
  if (client) {
    return client;
  }

  client = new Typesense.Client({
    nodes: [{ host: config.get('typesense.host'), port: config.get('typesense.port'), protocol: config.get('typesense.protocol') }],
    apiKey: config.get('typesense.apiKey')
  });
  return client;
};
