window.Modal = (function(){
    function Modal () {
        this.modalBG = null;
        this.modalBox = null;
        this.modalText = null;
    }

    Modal.prototype = {
        init : function() {
            this.modalBG = document.querySelector('.modal');
            this.modalBox = document.querySelector('.modal__content');
            this.modalText = document.querySelector('.modal__content > span');
            document.addEventListener('modal.show', this.show.bind(this));
            document.addEventListener('modal.hide', this.hide.bind(this));
            this.modalBG.addEventListener('click', function() {
                document.dispatchEvent(new CustomEvent('modal.hide', {}));
            })
        }, 
        show : function(val) {
            this.modalText.innerHTML = val.detail;
            this.modalBG.style['display'] = 'flex';
            setTimeout((function(){
                this.modalBG.style['opacity'] = '1'
            }).bind(this), 1)
        },
        hide : function() {
            setTimeout((function(){
                this.modalBG.style['display'] = 'none';
            }).bind(this), 500);
            this.modalBG.style['opacity'] = '0'
        }
    }

    return Modal;
}())