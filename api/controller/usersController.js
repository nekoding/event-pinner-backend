'use strict';

const { airtable } = require("../config/airtable");

exports.index = (req, res, next) => {
    airtable('users').select({
        fields: ['telegram_id', 'role'],
        maxRecords: 10
    })
    .eachPage((records, fetchNextPage) => {
        res.json({
            "data" : records.map(item => {
                return item._rawJson;
            })
        });

        fetchNextPage();
    })
}

exports.show = (req, res, next) => {
    airtable('users')
    .find(req.params.id, (err, record) => {
        if (err) {
            res.json({errors : err});
        }
        
        res.json({data : record._rawJson});
    });
}

exports.store = (req, res, next) => {
    airtable('users')
    .create([
        {
            "fields" : {
                "telegram_id" : req.body.data.telegram_id,
                "role"  : "contributors"
            }
        }
    ], (err, records) => {
        if (err) { 
            res.json({errors: err});
        }

        records.forEach(record => {
            res.send(record._rawJson);
        });
    });

}

exports.update = (req, res, next) => {
    airtable('users')
    .update([
        {
            "id" : req.params.id,
            "fields" : {
                "telegram_id" : req.body.data.telegram_id,
                "role" : req.body.data.role
            }
        }
    ],
    (err, records) => {
        if (err) {
            res.json({errors : err});
        }

        res.json(records.map(record => {
            return record._rawJson;
        }));
    });
}

exports.destroy = (req, res, next) => {
    airtable('users')
    .destroy([req.params.id], (err, result) => {
        if (err) {
            res.json({errors : err});
        }

        res.json({data : {
            message : "operation success"
        }});
    });
}
