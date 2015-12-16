/**
 * Created by chirag on 18/09/15.
 */
angular.module('starter.controllers')

    .controller('storeCtrl', function($scope, $http, $stateParams,CartData,StoreData,$ionicLoading,$ionicSlideBoxDelegate,$location) {
      $scope.storelistId = ($stateParams.storelistId);
      $scope.storeId = ($stateParams.storeId);
      $scope.cartItems = CartData.getCart();
      $scope.StoreSelected = StoreData.getStore();
      $scope.StoreDistance = StoreData.getStoreDistance();
      $scope.customProduct = {};
      $scope.storeCategory = window.category;
      $scope.productCatalog = window.category.productCategory;


      $scope.$on("$ionicView.enter", function () {
        $scope.checkExisting();
      });

      $scope.slideHasChanged = function (index){
        $scope.checkExisting();
      };

      $scope.CallTel = function(tel) {
        window.open('tel:'+tel)
      };


      $scope.$on('someEvent', function(event,productItem)

      {
       // alert(JSON.stringify(productItem.name));
       //$scope.checkExisting();
        $scope.practice(productItem);


      });

      $scope.practice=function(productItem){
        $scope.currentObj =productItem ;
        console.log( '************');
        console.log( $scope.currentObj);
       var existingItems = $scope.productCatalog[$ionicSlideBoxDelegate.selected()].products;
        var i;
        for (i = 0; i < existingItems.length; i++) {
          if ($scope.currentObj.$$hashKey == existingItems[i].$$hashKey) {
            alert("matched")
            console.log($scope.currentObj)
            $scope.productCatalog[$ionicSlideBoxDelegate.selected()].products[i].ordernow = false;
            break;
          }
        }

        };

      $scope.untick = function(obj) {
        alert("lets utick first")
      };

      $scope.$watchCollection('cartItems', function(newValue, oldValue) {
        if (newValue !== oldValue)
        {
          //console.log("@@@@@@@@@ called");
          //CartData.setCart(newValue);
          console.log(CartData.getCart())
        }
      });

      $scope.updateCart = function(productItem) {
        console.log("UPDATE!!!!!!!!");
        $scope.cartItems = $scope.cartItems.filter(function( obj ) {
          //console.log(obj);
          if (obj.$$hashKey == productItem.$$hashKey)
          {
            console.log(obj);
            obj.quantity = productItem.quantity;
            obj.price = productItem.price;
          }
          return obj;
        });
        CartData.copyCart($scope.cartItems);
        console.log(CartData.getCart());
      };

      $scope.increaseQuantity = function(productItem) {
        if (productItem.quantity > 0){
          productItem.price = productItem.price + (productItem.price /productItem.quantity);
          productItem.quantity = productItem.quantity + 1;
        }
        else{
          productItem.quantity = productItem.quantity + 1;
          productItem.price = productItem.price * productItem.quantity ;
        }
        $scope.updateCart(productItem)
      };

      $scope.decreaseQuantity = function(productItem) {
        if (productItem.quantity > 1){
          productItem.price = productItem.price - (productItem.price /productItem.quantity);
          productItem.quantity = productItem.quantity - 1;
          $scope.updateCart(productItem)
        }
      };

      $scope.addcustomProduct = function() {
        var matches = true;
        var message = "";
        angular.forEach($scope.cartItems, function(item) {
          if (item.customQuantity)
            if ($scope.customProduct.name === item.name && $scope.customProduct.customQuantity === item.customQuantity) {
              matches = false;
              message = 'You have already selected to withdraw this item!';
            }
        });

        // add item to collection
        if (matches != false) {
          $scope.cartItems.push($scope.customProduct);
          message = 'Item Added!';
          $scope.customProduct ={};
        }
        $ionicLoading.show({ template: message, noBackdrop: true, duration: 2000 });
        console.log($scope.cartItems);
      };

      $scope.showProduct = function(storelistId,storeId,sublink,productLink) {
        $location.path('/app/categories/'+storelistId+'/'+storeId+'/'+sublink+'/'+productLink);
      };

      $scope.checkExisting = function () {
        $scope.cartItems = CartData.getCart();
        console.log($scope.cartItems)
        var existingItems = ($scope.productCatalog[$ionicSlideBoxDelegate.selected()].products);
        var i,j;
        for (i = 0; i < existingItems.length; i++) {
          for (j = 0; j < $scope.cartItems.length; j++) {
            $scope.productCatalog[$ionicSlideBoxDelegate.selected()].products[i].ordernow = false;
            if ($scope.cartItems[j].$$hashKey == existingItems[i].$$hashKey) {
              $scope.productCatalog[$ionicSlideBoxDelegate.selected()].products[i].ordernow = true;
              break;
            }
          }
        }
      };


      $scope.addToCart = function(productItem,checkStatus,index) {
        console.log(productItem);
        if(checkStatus){
          console.log("adding");
          $scope.cartItems.push(productItem);
          console.log($scope.cartItems);
          CartData.setCart($scope.cartItems);
          console.log(CartData.getCart());
        }
        else{
          console.log("removing")
          if (productItem.quantity>1){
            productItem.price = productItem.price / productItem.quantity;
            productItem.quantity =1;
          }

          for (var i in $scope.cartItems) {
            if ($scope.cartItems [i] === productItem) {
              $scope.cartItems.splice(i, 1);
            }
          }
          CartData.setCart($scope.cartItems);
          //CartData.copyCart($scope.cartItems);
          console.log(CartData.getCart());
        }
      };


      $scope.scrollCheck = function(index) {
        if ($ionicSlideBoxDelegate.selected() == index && $scope.productCatalog[$ionicSlideBoxDelegate.selected()].loadMore == true){
          return true;
        }
        else{
          return false;
        }
      };

      var once = true;
      $scope.loadMoreProducts = function() {
        console.log("called");
        if($scope.productCatalog[$ionicSlideBoxDelegate.selected()])
        if(once == true && $scope.productCatalog[$ionicSlideBoxDelegate.selected()].loadMore == true) {
          once=false;
          var index = $ionicSlideBoxDelegate.selected();
          var productCategory = $scope.productCatalog[index].link;
          var pageNumber = $scope.productCatalog[index].pageNumber
          $scope.getProducts(productCategory, pageNumber).then(function (response) {
            if (response.data.length >0 ){
              angular.forEach(response.data, function (value, key) {
                value.ordernow = false;
                $scope.productCatalog[index].products.push(value);
              });
              $scope.productCatalog[index].pageNumber++;
            }
            else{
              $scope.productCatalog[index].loadMore = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
            once = true;
          })
        }
      };

      $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMoreProducts();
      });


      $scope.getProducts = function(productCategory,pageNumber) {
        return $http.get('http://getmeher.com:3000/'+productCategory+'/'+'page'+'/'+pageNumber)
      };


    });