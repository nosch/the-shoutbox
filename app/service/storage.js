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

           throw new Error('Storage is not readable!');
        };

        var add = function (item) {
            if (angular.isObject(item) && !angular.isArray(item)) {
                try {
                    collection.push(item);
                    notification.createMessage(item);
                } catch (e) {
                    throw e;
                }
            } else {
                throw new TypeError('Can not add item - storage item has to be an object.');
            }
        };

        var remove = function (index) {
            if (
                angular.isObject(collection[index]) &&
                !angular.isArray(collection[index])
            ) {
                try {
                    var item = collection[index];

                    collection.splice(index, 1);
                    notification.deleteMessage(item);
                } catch (e) {
                    throw e;
                }
            } else {
                throw new TypeError('Can not delete item - storage item has to be an object.');
            }
        };

        // Reveal public API.
        return {
            getMessages: get,
            addMessage: add,
            removeMessage: remove
        };
    });
