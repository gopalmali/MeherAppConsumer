/**
 * Created by chirag on 25/09/15.
 */

/*angular.module('starter.controllers')

    .controller('postOrderCtrl', function($scope, $http, $stateParams,CartData,StoreData) {
      $scope.cartItems = CartData.getCart();
      $scope.StoreSelected = StoreData.getStore();
      $scope.CallTel = function(tel) {
        window.open('tel:'+'+91'+tel)
        //window.location.href = 'tel:'+ tel;
      }

    }); */
/**
 * Created by chirag on 25/09/15.
 */
angular.module('starter.controllers')

    .controller('postOrderCtrl', function($scope, $http, $stateParams,CartData,StoreData, $ionicPopup) {

      $scope.feedbackData={
        "timelyDeliver":true,
        "quality":true,
        "rating":3
      }

      $scope.timelyDeliverStatus="Yes";
      $scope.productQualityStatus="Awesome";

      $scope.showPopup = function() {
        $ionicPopup.prompt({
          title: 'Comment',
          template: 'Comment Here',
          inputType:'textbox',
          inputPlaceholder:'Type your comment here'

        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };
      $scope.changeDeliveryTime=function(u){

        if(u==true)
        {
          $scope.timelyDeliverStatus="Yes";
        }
        else{
          $scope.timelyDeliverStatus="No";
        }
      };

      $scope.changeProductQuality=function(a){
        if(a==true)
        {
          $scope.productQualityStatus="Awesome";
        }
        else{
          $scope.productQualityStatus="Average";
        }
      }
      $scope.cartItems = CartData.getCart();
      $scope.StoreSelected = StoreData.getStore();
      $scope.CallTel = function(tel) {
        window.open('tel:'+'+91'+tel)
        //window.location.href = 'tel:'+ tel;
      }

    });

