var app = new Vue({
    el: "#app",
    data: {
        maximum: 50,
        products: null
    },
    mounted: function() {
        fetch('https://hplussport.com/api/products/order/price')
        .then(res => res.json())
        .then(data => {
            this.products = data;
        })
    }
})