'use strict';

angular.module('xxxApp', [
]).run(function($rootScope) {

  })
  .factory('socket', function($rootScope) {
    var socket = io('http://127.0.0.1:8989/');
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

      var styleClass = 'alert-info';
      //info, debug, notice, warning, error
      //<div class="alert alert-success" role="alert">...</div>
      //<div class="alert alert-info" role="alert">...</div>
      //<div class="alert alert-warning" role="alert">...</div>
      //<div class="alert alert-danger" role="alert">...</div>
      if (data.level == 'info') {
          styleClass = 'alert-success';
      } else if (data.level == 'debug') {
          styleClass = 'alert-info';
      } else if (data.level == 'notice') {
          styleClass = 'alert-info';
      } else if (data.level == 'warning') {
          styleClass = 'alert-warning';
      } else if (data.level == 'error') {
          styleClass = 'alert-danger';
      }
      $scope.logs.push({
        seq: seq,
        content: $sce.trustAsHtml(data.message),
        level: data.level,
        styleClass: styleClass,
        type: data.type,
        timestamp: dt.toString()
      });
      seq++;
      setTimeout(function() {
        window.scrollTo(0, document.body.scrollHeight);
      }, 100);
    });
  });
