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

        var getAmount = function () {
            return storage.getMessageCount();
        };

        var stats = {
            amount: getAmount(),
            deleted: 0
        };

        // Subscribe to create-event of the message module.
        notification.onCreateMessage($scope, function () {
            stats.amount = getAmount();
        });

        // Subscribe to delete-event of the message module.
        notification.onDeleteMessage($scope, function () {
            stats.deleted++;
        });

        $scope.stats = stats;
    });
