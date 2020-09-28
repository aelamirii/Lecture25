(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com" );



MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {

  var menu = this;


  {
  var promise = MenuCategoriesService.getMenuCategories();


  promise.then( function (response) {

    menu.categories = response.data;

  })
  .catch(function (errorMesssage) {
    console.log("Something went teribly wrong. ",errorMesssage.message);
  });

  }


  menu.logMenuItems = function (shortName) {
    var promise = MenuCategoriesService.getMenuForCategory(shortName);


    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };




};





MenuCategoriesService.$inject = ['$http', 'ApiBasePath']
function MenuCategoriesService($http, ApiBasePath) {


  var service = this;

  service.getMenuCategories = function () {

    var response = $http({
      method: "GET",
      // url: ("http://davids-restaurant.herokuapp.com/categories.json")
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {

    console.log("shortName :",shortName);

   var response = $http({
     method: "GET",
     // url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
     url: (ApiBasePath + "/menu_items.json"),
     params: {
       category: shortName
     }
   });

   return response;
 };



}



})();
