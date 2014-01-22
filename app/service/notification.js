/**
 * ng-pub-sub
 * @module service.notification
 */
angular.module('service.notification', [])
    .factory('notification', function ($rootScope) {
        'use strict';

        // Event names.
        var MESSAGE_CREATED = 'messageCreated';
        var MESSAGE_DELETED = 'messageDeleted';

        // Publish the create-message event.
        var createMessage = function (message) {
            $rootScope.$broadcast(MESSAGE_CREATED, {message: message});
        };

        // Subscribe to the create-message event.
        var onCreateMessage = function($scope, handler) {
            $scope.$on(MESSAGE_CREATED, function(event, args) {
                handler(args.message);
            });
        };

        // Publish the delete-message event.
        var deleteMessage = function (message) {
            $rootScope.$broadcast(MESSAGE_DELETED, {message: message});
        };

        // Subscribe to the delete-message event.
        var onDeleteMessage = function ($scope, handler) {
            $scope.$on(MESSAGE_DELETED, function (event, args) {
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
