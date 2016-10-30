'use strict';

const myApp = angular.module("myApp", ['ngRoute'])

// controllers

myApp.controller("MainController", function($scope, $http, $location) {
  $scope.submitSearch = function(searchTerm) {
    $http.get(`http://www.omdbapi.com/?s=${searchTerm}`).then(function(object) {
      $scope.movies = object.data.Search
        $location.url('/movies')
        console.log($scope.movies);
      })
      return $scope.movies
  }
})

myApp.controller("SecondController", function($scope, $http, $location, $routeParams) {
  console.log('second');
  let id = $routeParams.id
  $http.get(`http://www.omdbapi.com/?i=${id}`).then(function(movie){
    $scope.movie = movie.data
    console.log($scope.movie);
  })
})

// routes

myApp.config(function($routeProvider) {
  $routeProvider

    .when('/movies', {
    templateUrl: './views/movies.html',
    controller: 'MainController'
  })

  .when('/movie/:id', {
    templateUrl: './views/movie.html',
    controller: 'SecondController'
  })
})
