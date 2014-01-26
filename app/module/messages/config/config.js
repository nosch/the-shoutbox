/**
 * ng-pub-sub
 * @module messages.config
 */
angular.module('messages.config', [
        'service.notification',
        'service.storage',
        'ngRoute'
    ])

    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/messages', {
                templateUrl: 'module/messages/view/message-list.tpl.html',
                controller: 'MessageListCtrl',
                index: 'messages',
                resolve: {
                    messages: function (storage) {
                        return storage.getMessages();
                    }
                }
            })
            .when('/shout', {
                templateUrl: 'module/messages/view/message-form.tpl.html',
                controller: 'MessageFormCtrl',
                index: 'shout'
            });
    });
