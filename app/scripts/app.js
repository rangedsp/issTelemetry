'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
        'ngAnimate',
        'ngRoute',
        'ngTouch'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/game', {
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(["$route", function() {
        $(document.body).on("dragstart", "img", function(event) {
            event.preventDefault();
        });
        $(document.body).on("mousedown", "[data-tapeffect=\"true\"]", function() {
            $(this).addClass("tapped");
        });

        $(document.body).on("mouseup", "[data-tapeffect=\"true\"]", function() {
            $(this).removeClass("tapped");
        });

        $(document.body).on("mouseleave", "[data-tapeffect=\"true\"]", function() {
            $(this).removeClass("tapped");
        });
    }]);
