(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService);



MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {

  var menu = this;

  var promise = MenuCategoriesService.getMenuCategories();

  promise.then(function (response) {
    menu.categories = response.data;
  })
  .catch(function (error) {
    console.log("Error message :",error.message);
  });


  menu.logMenuItems = function (Short_Name) {

    var promise = MenuCategoriesService.getMenuForCategory(Short_Name);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      "Error message :",error.message
    })

  };



};




MenuCategoriesService.$inject = ['$http'];
function MenuCategoriesService($http) {

  var service = this;

  service.getMenuCategories = function () {

    var response = $http({
      method: "GET",
      url: "http://davids-restaurant.herokuapp.com/categories.json"
    });

    return response;
  };


  service.getMenuForCategory =  function(Short_Name) {

    var response = $http({
      method: "GET",
      url: "http://davids-restaurant.herokuapp.com/menu_items.json",
      params: {
        category: Short_Name
      }
    });
    return response;
  };



}





})();
