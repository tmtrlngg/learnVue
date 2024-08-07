<template>
  <div>
    <div id="page-wrap">
      <h1>Shopping Cart</h1>
      <ItemCart v-for="item in cartItems" :key="item.id" :item="item" v-on:remove-item="removeFromCart($event)"></ItemCart>
      <h3 id="total-price">Total: {{ totalPrice }}</h3>
      <button id="checkout-button">Checkout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ItemCart from '../../components/ItemCart.vue';

export default {
  components: {
    ItemCart
  },
  data() {
    return {
      cartItems: []
    }
  },
  methods: {
    async removeFromCart(product) {
      await axios.delete(`http://localhost:8000/api/orders/user/1/product/${product}`)

      let cartIndex = this.cartItems.map(item => item.code).indexOf(product)
      this.cartItems.splice(cartIndex, 1);
    }
  },
  async created() {
    const result = await axios.get(`http://localhost:8000/api/orders/user/1`);
    this.cartItems = result.data[0].products
    // let data = Object.assign({}, 
    //   ...(result.data.map(
    //       result => ({ 
    //         user_id: result.user_id,
    //         cart_items: result.products, 
    //       }) 
    //   ))
    // );
    // this.cartItems = data.cart_items
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce((accumulator, item) => accumulator + Number(item.price), 0)
    }
  }
};
</script>

<style scoped>
  h1 {
    border-bottom: 1px solid #41B883;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }
  #total-price {
    padding: 16px;
    text-align: right;
  }
  #checkout-button {
    width: 100%;
  }
</style>
