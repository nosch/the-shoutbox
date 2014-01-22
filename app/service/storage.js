/**
 * ng-pub-sub
 * @module service.storage
 */
angular.module('service.storage', [
        'service.notification'
    ])

    .factory('storage', function (notification) {
        'use strict';

        var collection = [
            {user: 'willy1968', text: 'Hallo Norbert!', date: '22.1.2014 10:40:10'},
            {user: 'Norbert', text: 'Hallo Blödmann!', date: '22.1.2014 11:36:45'},
            {user: 'willy1968', text: 'Fresse!', date: '22.1.2014 11:53:03'}
        ];

        var get = function () {
            if (angular.isArray(collection)) {
                return collection;
            }

           throw new Error('Could not read items from message storage!');
        };

        var add = function (item) {
            if (angular.isObject(item) && !angular.isArray(item)) {
                notification.createMessage(item);

                return collection.push(item);
            }

            throw new Error('Could not add item to message storage!');
        };

        var remove = function (index) {
            if (
                angular.isDefined(index) &&
                angular.isObject(collection[index]) &&
                !angular.isArray(collection[index])
            ) {
                notification.deleteMessage(collection[index]);

                return collection.splice(index, 1);
            }

            throw new Error('Could not delete item from message storage!');
        };

        // Reveal public API.
        return {
            getMessages: get,
            addMessage: add,
            removeMessage: remove
        };
    });
