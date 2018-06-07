"use strict";

const cartItems = {
    template: `
    <header>
        <button class="continue">Continue Shopping on PrepShop</button>
    </header>
    <h1 class="shopping-cart-title">Your Shopping Cart</h1>
    <h5 class="byline">Where Preppers Go To Shop</h5>
    <section class="shopping-notes">
    
    <section ng-repeat="item in $ctrl.cartItems" class="shopping-list">
        <input ng-blur="$ctrl.updateItem(item);" ng-model="item.product" placeholder="Update Product" class="item-title">
        <input ng-blur="$ctrl.updateItem(item);" ng-model="item.price" placeholder="Update Item Price" class="p">
        <input ng-blur="$ctrl.updateItem(item);" ng-model="item.quantity" placeholder="Update Item Quantity" class="p">
        <a href="" ng-click="$ctrl.deleteItem(item.id);" class="delete">Delete</a>
    </section>
   
    <form ng-submit="$ctrl.addItem($ctrl.newItem);" class="form">
        <h5 class="add-title">Add New Item</h5>
        <input type="text" placeholder="Name of Product" ng-model="$ctrl.newItem.product">
        <input type="text" placeholder="Price" ng-model="$ctrl.newItem.price">
        <input type="text" placeholder="Quantity" ng-model="$ctrl.newItem.quantity">
        <button>Add to List!</button>
    </form>

    </section>
    `,
    controller: ["CartService", function(CartService) {
        const vm = this;
        CartService.getAllItems().then((response) => {
            console.log("from response/component");
            vm.cartItems = response.data;
        });
        vm.addItem = (newItem) => {
            // pass arguments over to service and pass in inputs
            CartService.addItem(newItem).then((response) => {
              // reset item to equal response.data
              vm.cartItems = response.data;
            });
            vm.newItem = {};
          };

        vm.deleteItem = (id) => {
            console.log(id);
            console.log(typeof id);
            CartService.deleteItem(id).then((response) => {
              vm.cartItems = response.data;
            });
            
          };
    }]


};


angular
  .module("app")
  .component("cartItems", cartItems);