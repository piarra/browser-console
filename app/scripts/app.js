'use strict';

angular.module('xxxApp', [
]).run(function($rootScope) {

  })
  .factory('socket', function($rootScope) {
    var socket = io('http://127.0.0.1:8980/');
    return {
        on: function(type, listener) {
            socket.on(type, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    listener.apply(socket, args);
                });
            });
        },
        emit: function(type, data, listener) {
            socket.emit(type, data, function() {
                var args = arguments;
                if (listener) {
                    $rootScope.$apply(function() {
                        listener.apply(socket, args);
                    });
                }
            });
        }
    };
  })
  .controller('ConsoleCtrl', function($scope, $http, $sce, $location, socket) {
    $scope.aaa = 'aaa';
    $scope.logs = [];

    var seq = 0;
    socket.on('notify', function(data) {
      var dt = new Date();
      $scope.logs.push({seq: seq, content: $sce.trustAsHtml(data.message), timestamp: dt.toString()});
      seq++;

      setTimeout(function() {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    });
  });
