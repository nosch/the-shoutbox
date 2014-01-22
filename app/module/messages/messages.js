/**
 * ng-pub-sub
 * @module messages
 */
angular.module('messages', [
        'messages.config'
    ])

    .controller('MessageListCtrl', function ($scope, notification, storage, messages) {
        'use strict';

        $scope.heading = 'Recent posts';

        $scope.messages = messages;

        $scope.remove = function (index) {
            // Call storage service method.
            storage.removeMessage(index);
        };
    })

    .controller('MessageFormCtrl', function ($scope, $location, notification, storage) {
        'use strict';

        var message = {};

        var generateAlias = function () {
            var prefix = 'Anonymous';

            return prefix + Math.floor(Math.random() * 10000);
        };

        $scope.heading = 'Say it loud!';

        $scope.save = function () {
            if ($scope.shout !== undefined && $scope.shout !== '') {
                message.text = $scope.shout;
                message.user = $scope.name || generateAlias();
                message.date = new Date().toLocaleString('de-de');

                // Call storage service method.
                storage.addMessage(message);

                // Empty form fields.
                $scope.name = '';
                $scope.shout = '';

                // Redirect
                $location.path('/messages');
            }
        };
    });
