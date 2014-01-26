/**
 * ng-pub-sub
 * @module stats
 */
angular.module('stats', [
        'service.notification',
        'service.storage'
    ])

    .controller('StatsCtrl', function ($scope, notification, storage) {
        'use strict';

        // Default stats data.
        var stats = {
            new: storage.getMessageCount(),
            deleted: 0
        };

        // Subscribe to create-event of the message module.
        notification.onCreateMessage($scope, function () {
            stats.new++;
        });

        // Subscribe to delete-event of the message module.
        notification.onDeleteMessage($scope, function () {
            stats.deleted++;
        });

        $scope.stats = stats;
    });
