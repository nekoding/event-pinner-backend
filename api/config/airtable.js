const Airtable = require('airtable');

const airtable = new Airtable({
    apiKey: "API_KEY",
    endpointUrl: "AIRTABLE_ENDPOINT",
}).base("AIRTABLE_BASE");

exports.airtable = airtable;