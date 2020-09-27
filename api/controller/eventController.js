'use strict';

const { airtable } = require("../config/airtable");

exports.index = (req, res, next) => {
    airtable('events').select({
        maxRecords: 10
    })
    .eachPage((records, fetchNextPage) => {
        res.json({
            data : records.map(item => {
                return item._rawJson;
            })
        });

        fetchNextPage();
    })
}

exports.show = (req, res, next) => {
    airtable('events')
    .find(req.params.id, (err, record) => {
        if (err) {
            res.json({errors : err});
        }
        
        res.json({data : record._rawJson});
    });
}

exports.store = (req, res, next) => {
    airtable('events')
    .create([
        {
            "fields" : {
                "name" : req.body.data.name,
                "notes"  : req.body.data.notes,
                "images" : req.body.data.images,
                "start" : req.body.data.start
            }
        }
    ], (err, records) => {
        if (err) { 
            res.json({errors: err});
        }

        records.forEach(record => {
            res.json({data: record._rawJson});
        });
    });

}

exports.update = (req, res, next) => {
    airtable('events')
    .update([
        {
            "id" : req.params.id,
            "fields" : {
                "name" : req.body.data.name,
                "notes"  : req.body.data.notes,
                "images" : req.body.data.images,
                "start" : req.body.data.start
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
    airtable('events')
    .destroy([req.params.id], (err, result) => {
        if (err) {
            res.json({errors : err});
        }

        res.json({data : {
            message : "operation success"
        }});
    });
}
