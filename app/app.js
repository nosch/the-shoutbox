/**
 * ng-pub-sub
 * @module application
 */
angular.module('application', [
        'application.config'
    ])

    .run(function ($rootScope) {
        'use strict';

        // Initialize foundation JS on application start
        $rootScope.$on('$viewContentLoaded', function () {
            $(document).foundation();
        });
    })

    .controller('ApplicationCtrl', function ($scope, notification) {
        'use strict';

        // General
        $scope.app = {
            title: 'Shoutbox',
            icon: 'fi-megaphone'
        };

        // Notification handling
        $scope.notification = {
            message: 'WELCOME to Shoutbox!',
            type: 'info',
            active: true
        };

        var onMessageAdd = function (message) {
            $scope.notification.message =  '"' +
                message.user +
                '" added a new post!';
            $scope.notification.type = 'success';
            $scope.notification.active = true;
        };

        var onMessageRemove = function (message) {
            $scope.notification.message = 'A post from "' +
                message.user  +
                '" was removed from the list!';
            $scope.notification.type = 'warning';
            $scope.notification.active = true;
        };

        notification.onCreateMessage($scope, onMessageAdd);
        notification.onDeleteMessage($scope, onMessageRemove);
    })

    .controller('NavigationCtrl', function ($scope, NAV_ITEMS) {
        'use strict';

        $scope.navItems = NAV_ITEMS;

        $scope.$on('$routeChangeSuccess', function (eOpts, currentRoute) {
            if (currentRoute.$$route) {
                $scope.currentRoute = currentRoute.$$route;
            }
        });
    })

    .directive('alertBox', function ($timeout) {
        'use strict';

        var scopeObj = {
            message: '@',
            type: '@',
            isActive: '='
        };

        var linkFn = function (scope, element) {
            scope.$watch('isActive', function (value) {
                if (value === true) {
                    element.fadeIn();

                    $timeout(function () {
                        scope.isActive = false;
                    }, 2000);
                } else {
                    element.fadeOut();
                }
            });

            element.find('a.shut').on('click', function() {
                scope.isActive = false;
            });
        };

        // Reveal public API.
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'view/alert-box.tpl.html',
            scope: scopeObj,
            link: linkFn
        };
    });
