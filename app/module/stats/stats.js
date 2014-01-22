/**
 * ng-pub-sub
 * @module stats
 */
angular.module('stats', [
        'service.notification'
    ])

    .controller('StatsCtrl', function ($scope, notification) {
        'use strict';

        var stats = {
            messageCount: 0,
            userCount: 0
        };

        // Subscribe to create-event of the message module.
        notification.onCreateMessage($scope, function () {
            stats.messageCount++;
            stats.userCount++;
        });

        // Subscribe to delete-event of the message module.
        notification.onDeleteMessage($scope, function () {
            stats.messageCount--;
            stats.userCount--;
        });

        $scope.stats = stats;
    });
