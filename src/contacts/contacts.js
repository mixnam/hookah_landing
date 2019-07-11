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
                    fetch('https://us-central1-hookah-catering-69873.cloudfunctions.net/newOrder',
                        {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                                'Content-Type': 'application/json'
                            },
                            body: parsedMsg
                        }).then(function(resp){
                            document.dispatchEvent(new CustomEvent('modal.show', {detail : 'Ваша заявка успешно отправленна !<br>Мы перезвоним вам в ближайшее веремя'}))
                        }).catch(function(e){
                            document.dispatchEvent(new CustomEvent('modal.show', {detail : 'Заявка не была оправленна !<br>Попробуйте отправить форму еще раз<br>Приносим извенения за неудобства'}))
                        })
                }).catch(function(errorEl){
                    errorEl.style['background-color'] = "#f9d0d0";
                })
            }).bind(this))
        },
        parse : function() {
            var p = new Promise((function(resolve, reject) {
                this.cleanErrors();
                var phone = this.phone.value.replace(/[\(\)\s]/g, '');
                var msg = {
                    phone : (phone && phone.match(/^((\+7|7|8)+([0-9]){10})$/)) ? phone : reject(this.phone),
                    name : (this.name.value !== '' && this.name.value) ? this.name.value : reject(this.name),
                    details : (this.details.value !== '' && this.details.value) ? this.details.value : reject(this.details)
                }
                resolve(JSON.stringify(msg));
            }).bind(this))
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
