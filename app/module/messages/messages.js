/**
 * ng-pub-sub
 * @module messages
 */
angular.module('messages', [
        'service.notification'
    ])

    .controller('MessagesCtrl', function ($scope, notification) {
        'use strict';

        $scope.heading = 'Post a message!';

        $scope.messages = [];

        $scope.save = function () {
            var message = {};

            if ($scope.message !== '') {
                message.text = $scope.message;

                // Add message to list.
                $scope.messages.push(message);

                // Send application-wide notification.
                notification.createMessage($scope.message);

                // Empty form field.
                $scope.message = '';
            }
        };

        $scope.remove = function (index) {
            if (index !== undefined) {
                // Send application-wide notification.
                notification.deleteMessage($scope.messages[index]);

                // Delete message from list.
                $scope.messages.splice(index, 1);
            }
        };
    })

    .controller('MessageListCtrl', function ($scope) {
        'use strict';

       var generateUser = function () {
            var prefix = 'User';

            return prefix + Math.floor(Math.random() * 10000);
        };

        $scope.user = generateUser();
    });
