'use strict';

angular.module('NoteAPP').config(['$locationProvider', '$routeProvider', '$authProvider',
    function ($locationProvider, $routeProvider, $authProvider) {
        $authProvider.loginUrl = "http://localhost:3000/api/getUserToken";
        $authProvider.signupUrl = "http://localhost:3000/api/signup";
        $authProvider.tokenName = "token";
        $authProvider.tokenPrefix = "noteAPP";

        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/home', {
                templateUrl: 'notes/notes.html',
                controller: 'NotesController',
                controllerAs: 'nc'
            })
            .when('/signup', {
                templateUrl: 'login/signup.html',
                controller: 'LoginController',
                controllerAs: 'lc'
            })
            .when('/login', {
                templateUrl: 'login/login.html',
                controller: 'LoginController',
                controllerAs: 'lc'
            })
            .otherwise('/login');
    }
]);