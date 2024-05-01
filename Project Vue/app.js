Vue.component('price', {
    data: function() {
        return {
            prefix: 'Rp',
            precision: 2
        }
    },
    props:['value'],
    template: '<span>{{ this.prefix + Number.parseFloat(this.value).toFixed(this.precision) }}</span>'
})

var app = new Vue({
    el: "#app",
    data: {
        maximum: 50,
        products: null,
        cart: [],
        style: {
            label: ['font-weight-bold', 'mr-2'],
            inputWidth: 60,
            sliderStatus: false
        }
    },
    mounted: function() {
        fetch('https://hplussport.com/api/products/order/price')
        .then(res => res.json())
        .then(data => {
            this.products = data;
        })
    },
    filters: {
        currencyFormat: function (value) {
            return 'Rp' + Number.parseFloat(value).toFixed(2);
        }
    },
    computed: {
        sliderState: function() {
            return this.style.sliderStatus ? 'd-flex' : 'd-none';
        },
        cartTotal: function() {
            var total = 0
            this.cart.forEach(item => {
                var totalPerItem = Number(item.qty) * Number(item.product.price)
                total += totalPerItem
            });
            return total
        },
        cartQty: function() {
            var qty = 0
            this.cart.forEach(item => {
                qty += Number(item.qty) 
            });
            return qty
        }
    },
    methods: {
        addItem: function(product) {
            var productIndex;
            var productExist = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                    productIndex= index
                    return true
                } else {
                    return false
                }
            });

            if (productExist.length) {
                this.cart[productIndex].qty++
            } else {
                this.cart.push({product: product, qty: 1});
            }
        },
        deleteItem: function(key) {
            if (this.cart[key].qty > 1) {
                this.cart[key].qty--;
            } else {
                this.cart.splice(key, 1);
            }
        },
        before: function(el) {
            el.className = 'd-none'
        },
        enter: function(el) {
            var delay = el.dataset.index * 100
            setTimeout(function () {
                el.className = "row d-flex mb-3 align-items-center animate__animated animate__fadeInRight"
            }, delay);
        },
        leave: function(el) {
            var delay = el.dataset.index * 100
            setTimeout(function () {
                el.className = "row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight"
            }, delay);
        }
    }
})