<template>
  <div id="app" class="container mt-5">
  <router-view
  :cart="cart"
  :cartQty="cartQty"
  :cartTotal="cartTotal"
  :maximum.sync="maximum"
  :products="products"
  :sliderStatus="sliderStatus"
  @toggle="toggleSliderStatus"
  @add="addItem"
  @delete="deleteItem"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      maximum: 50,
      products: [],
      cart: [],
      sliderStatus: false
    }
  },
  mounted: function () {
    fetch('https://hplussport.com/api/products/order/price')
      .then(res => res.json())
      .then(data => {
        this.products = data;
      })
  },
  computed: {
    cartTotal: function () {
      let total = 0
      this.cart.forEach(item => {
        var totalPerItem = Number(item.qty) * Number(item.product.price)
        total += totalPerItem
      });
      return total
    },
    cartQty: function () {
      var qty = 0
      this.cart.forEach(item => {
        qty += Number(item.qty)
      });
      return qty
    }
  },
  methods: {
    toggleSliderStatus: function () {
      this.sliderStatus = !this.sliderStatus
    },
    addItem: function (product) {
      let productIndex;
      let productExist = this.cart.filter(function (item, index) {
        if (item.product.id == Number(product.id)) {
          productIndex = index
          return true
        } else {
          return false
        }
      });

      if (productExist.length) {
        this.cart[productIndex].qty++
      } else {
        this.cart.push({ product: product, qty: 1 });
      }
    },
    deleteItem: function (key) {
      if (this.cart[key].qty > 1) {
        this.cart[key].qty--;
      } else {
        this.cart.splice(key, 1);
      }
    },
  }
};
</script>

