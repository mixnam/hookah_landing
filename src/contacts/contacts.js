window.Form = (function() {
    function Form() {
        this.button  = null;
        this.phone = null;
        this.name = null;
        this.details = null;
    }

    Form.prototype = {
        init : function() {
            this.phone = document.querySelector('#phone');
            this.name = document.querySelector('#name');
            this.details = document.querySelector('#details');
            document.querySelector('.form__button').addEventListener('click', (function () {
                this.parse().then(function(parsedMsg){
                    console.log(parsedMsg);
                })
            }).bind(this))
        },
        parse : function() {
            var p = new Promise((function(resolve, reject) {
                this.cleanErrors();
                var msg = {
                    phone : (this.phone.value && this.phone.value.match(/^((\+7|7|8)+([0-9]){10})$/)) ? this.phone.value : reject(this.phone),
                    name : (this.name.value !== '' && this.name.value) ? this.name.value : reject(this.name),
                    details : (this.details.value !== '' && this.details.value) ? this.details.value : reject(this.details)
                }
                resolve(JSON.stringify(msg));
            }).bind(this)).catch(function(errorEl){
                errorEl.style['background-color'] = "#f9d0d0";
            })
            return p;
        },
        cleanErrors : function() {
            this.phone.style = {};
            this.name.style = {};
            this.details.style = {};
        }
    }
    
    return Form
}())
