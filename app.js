(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService);



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





MenuCategoriesService.$inject = ['$http']
function MenuCategoriesService($http) {


  var service = this;

  service.getMenuCategories = function () {

    var response = $http({
      method: "GET",
      url: ("http://davids-restaurant.herokuapp.com/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {

    console.log("shortName :",shortName);

   var response = $http({
     method: "GET",
     url: ("http://davids-restaurant.herokuapp.com/categories.json"),
     // url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),
     params: {
       short_name: shortName
     }
   });

   return response;
 };



}



})();
