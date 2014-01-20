/**
 * ng-pub-sub
 * @module application
 */
angular.module('application', [
        'service.notification',
        'messages'
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
            title: 'AngularJS Pub/Sub Pattern'
        };

        // Notification handling
        $scope.notification = {
            message: 'Application launched successfully!',
            type: 'success',
            active: true
        };

        var onMessageAdd = function (message) {
            $scope.notification.message = 'A new message was added to the list!';
            $scope.notification.type = 'success';
            $scope.notification.active = true;
        };

        var onMessageRemove = function (message) {
            $scope.notification.message = 'A message was removed from the list!';
            $scope.notification.type = 'warning';
            $scope.notification.active = true;
        };

        notification.onCreateMessage($scope, onMessageAdd);
        notification.onDeleteMessage($scope, onMessageRemove);
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
                    }, 1500);
                } else {
                    element.fadeOut();
                }
            });

            element.find('a.close').on('click', function() {
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
