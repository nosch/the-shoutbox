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
            messages: 3,
            deleted: 0
        };

        // Subscribe to create-event of the message module.
        notification.onCreateMessage($scope, function () {
            stats.messages++;
        });

        // Subscribe to delete-event of the message module.
        notification.onDeleteMessage($scope, function () {
            stats.deleted++;
        });

        $scope.stats = stats;
    });
