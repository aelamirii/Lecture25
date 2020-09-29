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
  .catch(function (errorMessage) {
    console.log("ErrorMessage :",errorMessage);
  });

  menu.logMenuItems = function (Short_Name) {

    var promise = MenuCategoriesService.getMenuForCategory(Short_Name);

    promise.then(function (response) {

      var Items = [];



// console.log("ddddddd "+response.data.menu_items.length);
//       for( var i = 0; i < response.data.menu_items.length ; i++)
//       {
//         console.log("aaaaaaaaaa :",response.data.menu_items[i].name, ":");
//           if(response.data.menu_items[i].short_name.indexOf(Short_Name) !== -1)
//           {
//             console.log("response.data.items["+i+"]",response.data.menu_items[i].short_name);
//           }
//       }

      console.log(response.data);
    })
    .catch(function (errorMessage) {
      console.log("Error Message 1 :", errorMessage);
    })

  };



};






MenuCategoriesService.$înject = ['$http'];
function MenuCategoriesService($http) {

  var service = this;

  service.getMenuCategories = function() {

    var response = $http({
      method: "GET",
      // url: "https://www.encodedna.com/angularjs/tutorial/birds.json",
      url: ("http://davids-restaurant.herokuapp.com/categories.json"),
      dataType: 'json',
      contentType: "application/json"

    });

    return response;
  };


  service.getMenuForCategory = function (ShortName) {

    var response = $http({
      method: "GET",
      // url: "http://localhost:3000/menu_items.json",
      // url: ("https://jsonplaceholder.typicode.com/comments"),
      // url: ("http://davids-restaurant.herokuapp.com/categories.json"),
      url: "http://davids-restaurant.herokuapp.com/menu_items.json",
      params: {
        category: ShortName
      }

    });

    return response;
  };

}




})();
