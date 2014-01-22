/**
 * ng-pub-sub
 * @module application.config
 */
angular.module('application.config', [
        'service.notification',
        'messages',
        'stats',
        'ngRoute'
    ])

    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/', {
                redirectTo: '/messages'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
