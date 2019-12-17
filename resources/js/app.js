require('./bootstrap');

window.Vue = require('vue');
Vue.component('example-component', require('./components/ExampleComponent.vue').default);

class Errors {
    constructor() {
        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    record(errors) {
        this.errors = errors.errors;
    }
}

const app = new Vue({
    el: '#app',
    data: {
        fields: {},
        errors: new Errors(),
        errorStatus: false,
    },
    methods: {
        submit() {
            axios.post('/register', this.fields).then(response => {
                console.log('Success');
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors.record(error.response.data) || {};
                    this.errorStatus = true;
                }
            });
        }
    }
});
