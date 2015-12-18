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
      $scope.order= JSON.parse(window.localStorage['orderPost'] || '{}');

      $scope.feedbackData={
        "timelyDeliver":true,
        "quality":true,
        "rating":3
      }

      $scope.timelyDeliverStatus="Yes";
      $scope.productQualityStatus="Awesome";

      $scope.commentData=function(){
        $scope.order.feedback = $scope.feedbackData;
        console.log($scope.order);
        console.log($scope.feedbackData);
      };

      $scope.showPopup = function() {
        var promptPopup=$ionicPopup.prompt({
          title: 'Comment',
          template: 'Comment Here',
          inputType:'textbox',
          inputPlaceholder:'Type your comment here'

        });
        promptPopup.then(function(res) {
          if(res) {
            $scope.commentData();
            $scope.makePopup();

          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.makePopup = function() {
        var promptPopup=$ionicPopup.confirm({
          title: 'Comment',
          template: 'Your feedback is sent',


        });
        promptPopup.then(function(res) {
          if(res) {
           // console.log($scope.commit());
            //$scope.comment();
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

      $scope.buttonClicked = function(index){
        $scope.selectedIndex = index;
        $scope.$apply();
      }

      $scope.cartItems = CartData.getCart();
      $scope.StoreSelected = StoreData.getStore();
      $scope.CallTel = function(tel) {
        window.open('tel:'+'+91'+tel)
        //window.location.href = 'tel:'+ tel;
      }

    });

