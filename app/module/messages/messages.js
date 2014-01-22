/**
 * ng-pub-sub
 * @module messages
 */
angular.module('messages', [
        'service.notification'
    ])

    .constant('SHOUT_LIST', [
        {user: 'willy1968', text: 'Hallo Norbert!', date: '22.1.2014 10:40:10'},
        {user: 'Norbert', text: 'Hallo Blödmann!', date: '22.1.2014 11:36:45'},
        {user: 'willy1968', text: 'Fresse!', date: '22.1.2014 11:53:03'}
    ])

    .controller('MessagesCtrl', function ($scope, notification, SHOUT_LIST) {
        'use strict';

        var generateAlias = function () {
            var prefix = 'Anonymous';

            return prefix + Math.floor(Math.random() * 10000);
        };

        $scope.heading = 'Say it loud!';

        $scope.messages = SHOUT_LIST;

        $scope.save = function () {
            var message = {};

            if ($scope.shout !== undefined && $scope.shout !== '') {
                message.text = $scope.shout;
                message.user = $scope.name || generateAlias();
                message.date = new Date().toLocaleString('de-de');

                // Add message to list.
                $scope.messages.push(message);

                // Send application-wide notification.
                notification.createMessage(message);

                // Empty form fields.
                $scope.name = '';
                $scope.shout = '';
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
    });
