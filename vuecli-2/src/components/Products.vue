<template>
    <div>
        <h1>IDShop</h1>
        <navbar :cart="cart" :cartQty="cartQty" :cartTotal="cartTotal" @toggle-slide="toggleSlider"
            @delete-item="deleteItem">
        </navbar>
        <price-slider :maximum.sync="maximum" :sliderStatus="sliderStatus"></price-slider>
        <product-list :products="products" :maximum="maximum" @add-item="addItem"></product-list>
    </div>
</template>

<script>
import productList from "./productList.vue";
import priceSlider from "./priceSlider.vue";
import navbar from "./navbar.vue";

export default {
    name: "products",
    props: [
        "products",
        "maximum",
        "cart",
        "cartQty",
        "cartTotal",
        "sliderStatus",
        "sliderState"
    ],
    components: {
        navbar, priceSlider, productList
    },
    methods: {
        toggleSlider: function () {
            this.$emit('toggle');
        },
        addItem: function (item) {
            this.$emit('add', item)
        },
        deleteItem: function (index) {
            this.$emit('delete', index)
        }
    }
}
</script>