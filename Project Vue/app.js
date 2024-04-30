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
        }
    },
    methods: {
        addItem: function(product) {
            this.cart.push(product)
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