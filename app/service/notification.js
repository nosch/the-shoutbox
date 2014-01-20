/**
 * ng-pub-sub
 * @module service.notification
 */
angular.module('service.notification', [])
    .factory('notification', function ($rootScope) {
        'use strict';

        // Internal notifications.
        var MESSAGE_CREATED = 'messageCreated';
        var MESAGE_DELETED = 'messageDeleted';

        // Publish: create-message notification.
        var createMessage = function (message) {
            $rootScope.$broadcast(MESSAGE_CREATED, {message: message});
        };

        // Subscribe: create-message notification.
        var onCreateMessage = function($scope, handler) {
            $scope.$on(MESSAGE_CREATED, function(event, args) {
                handler(args.message);
            });
        };

        // Publish: delete-message notification.
        var deleteMessage = function (message) {
            $rootScope.$broadcast(MESAGE_DELETED, {message: message});
        };

        // Subscribe: delete-message notification.
        var onDeleteMessage = function ($scope, handler) {
            $scope.$on(MESAGE_DELETED, function (event, args) {
                handler(args.message);
            });
        };

        // Reveal public API.
        return {
            createMessage: createMessage,
            onCreateMessage: onCreateMessage,
            deleteMessage: deleteMessage,
            onDeleteMessage: onDeleteMessage
        };
    });
