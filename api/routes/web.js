'use strict';

module.exports = function (web) {
    const user = require('../controller/usersController');
    const event = require('../controller/eventController');

    web.route('/users')
        .get(user.index)
        .post(user.store);

    web.route('/users/:id')
        .get(user.show)
        .put(user.update)
        .delete(user.destroy);

    web.route('/events')
        .get(event.index)
        .post(event.store);
    
    web.route('/events/:eventId')
        .get(event.show)
        .put(event.update)
        .delete(event.destroy);
}


