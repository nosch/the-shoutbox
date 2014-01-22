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

    .constant('DEV_MODE', true)

    .config(function ($provide, DEV_MODE) {
        'use strict';

        $provide.decorator('$exceptionHandler',
            function ($delegate, $window) {
                return function(exception, cause) {
                    if (DEV_MODE) {
                        $delegate(exception, cause);
                    } else {
                        $window.location.href = '#/error';
                    }
                };
            });
    })

    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/', {
                redirectTo: '/messages'
            })
            .when('/error', {
                templateUrl: 'view/error.tpl.html'
            })
            .when('/404', {
                templateUrl: 'view/404.tpl.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    });
