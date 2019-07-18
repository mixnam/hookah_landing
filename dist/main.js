//onload
window.onload = function() {
    console.log('loaded');
    document.querySelector('#scrollDown').addEventListener('click', function(){
        document.querySelector('.nav').scrollIntoView({behavior : 'smooth'});
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
        anchor.addEventListener('click', (function (a) {
            return function (e) {
                e.preventDefault();
                var target = document.querySelector(a.getAttribute('href'))
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                })
            }
        })(anchor));
    });

    document.querySelectorAll('.price-list__item > button').forEach(function(anchor){
        anchor.addEventListener('click', (function (a) {
            return function (e) {
                e.preventDefault();
                var target = document.querySelector('#contacts');
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                })
            }
        })(anchor));
    });

    //init Modal
    var modal = new Modal();
    modal.init();

    //init Form
    var form = new Form();
    form.init();

    //init Paralax 
    window.Paralax();

    //init Nav
    var nav = new Nav();
    nav.init();

    //init Caorusel
    var imagesUrl = [
        '../assets/wrapper.jpg',
        '../assets/wrapper.jpg',
        '../assets/wrapper.jpg',
        '../assets/wrapper.jpg'
    ]
    var caorusel = new Caorusel();
    caorusel.init('caorusel', imagesUrl);
}
window.Caorusel = (function() {
    function Caorusel() {
        this.body = null;
        this.imageNodes = null;
        this.left = null;
        this.right = null;
        this.activeNode = null;
    }
    
    Caorusel.prototype = {
        init : function(rootID, imagesUrl) {
            //init body of the caorusel
            var root = document.getElementById(rootID);
            root.classList.add('caorusel');
            this.body = root;
    
            //init imagesNodes
            activeNode = imagesUrl.length / 2 | 0;
            this.imageNodes = imagesUrl.map(function(imageUrl) {
                var imageNode = document.createElement('img');
                imageNode.className = 'caorusel__image';
                imageNode.setAttribute('src', imageUrl);
                imageNode.classList.add('caorusel__image_inactive');
                return imageNode
            })
            for (var i = 0; i < this.imageNodes.length; i++) {
                this.body.appendChild(this.imageNodes[i]);
            }
    
            var counter = activeNode;
            var f = this.activate.bind(this);
            f(counter % 4)
            setInterval(function() {
                counter++;
                f(counter % 4);
            }, 3000)
        },
        activate : function(index) {
            var activeNode = this.imageNodes[index];
            var currentOffset = activeNode.offsetLeft + activeNode.offsetWidth / 2;
            var targetOffset = document.body.offsetWidth / 2;
    
            var newMargin = targetOffset - currentOffset;
            var currentMargin = this.body.style['margin-left'] 
                                     ? Number.parseInt(this.body.style['margin-left'])
                                     : 0;
            this.body.style['margin-left'] = currentMargin + newMargin + 'px';
            activeNode.classList.remove('caorusel__image_inactive');
            if (this.activeNode !== null) {
                this.imageNodes[this.activeNode].classList.add('caorusel__image_inactive');
            }
            this.activeNode = index;
        }
    }

    return Caorusel;
})()
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

!function(){"use strict";function o(){var o=window,t=document;if(!("scrollBehavior"in t.documentElement.style&&!0!==o.__forceSmoothScrollPolyfill__)){var l,e=o.HTMLElement||o.Element,r=468,i={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,elementScroll:e.prototype.scroll||n,scrollIntoView:e.prototype.scrollIntoView},s=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now,c=(l=o.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(l)?1:0);o.scroll=o.scrollTo=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?h.call(o,t.body,void 0!==arguments[0].left?~~arguments[0].left:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:o.scrollY||o.pageYOffset):i.scroll.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:o.scrollX||o.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:o.scrollY||o.pageYOffset))},o.scrollBy=function(){void 0!==arguments[0]&&(f(arguments[0])?i.scrollBy.call(o,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==f(arguments[0])){var o=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===o?this.scrollLeft:~~o,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==f(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):i.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==f(arguments[0])){var l=function(o){for(;o!==t.body&&!1===(e=p(l=o,"Y")&&a(l,"Y"),r=p(l,"X")&&a(l,"X"),e||r);)o=o.parentNode||o.host;var l,e,r;return o}(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(h.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),"fixed"!==o.getComputedStyle(l).position&&o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}else i.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function n(o,t){this.scrollLeft=o,this.scrollTop=t}function f(o){if(null===o||"object"!=typeof o||void 0===o.behavior||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+o.behavior+" is not a valid value for enumeration ScrollBehavior.")}function p(o,t){return"Y"===t?o.clientHeight+c<o.scrollHeight:"X"===t?o.clientWidth+c<o.scrollWidth:void 0}function a(t,l){var e=o.getComputedStyle(t,null)["overflow"+l];return"auto"===e||"scroll"===e}function d(t){var l,e,i,c,n=(s()-t.startTime)/r;c=n=n>1?1:n,l=.5*(1-Math.cos(Math.PI*c)),e=t.startX+(t.x-t.startX)*l,i=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,i),e===t.x&&i===t.y||o.requestAnimationFrame(d.bind(o,t))}function h(l,e,r){var c,f,p,a,h=s();l===t.body?(c=o,f=o.scrollX||o.pageXOffset,p=o.scrollY||o.pageYOffset,a=i.scroll):(c=l,f=l.scrollLeft,p=l.scrollTop,a=n),d({scrollable:c,method:a,startTime:h,startX:f,startY:p,x:e,y:r})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:o}:o()}();
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
window.Nav = (function(){
    function Nav() {

    }
    
    Nav.prototype = {
        init : function() {
            var nav__menu = window.document.querySelector('.nav__menu');
            nav__menu.addEventListener('click', function() {
                var nav__links = document.querySelector('.nav__links');
                var current_visibility = nav__links.style['visibility'];
                var current_opacity = nav__links.style['opacity'];

                nav__links.style['visibility'] = (!current_visibility || current_visibility === 'hidden') 
                                                 ? 'visible' : 'hidden';
                nav__links.style['opacity'] = (!current_opacity || current_opacity === '0')
                                                 ? '1' : '0';
            })
        }
    }

    return Nav
})()
window.Paralax = function() {
    //init PARALAX
    document.addEventListener('scroll', function() {
        var elements = document.querySelectorAll('.paralax')
        var scrolledHeight = window.pageYOffset

        for (var i = 0; i < elements.length; i++) {
            var parallax = elements[i];
            var limit = parallax.offsetTop + parallax.offsetHeight;

            if(scrolledHeight > parallax.offsetTop && scrolledHeight <= limit) {
                parallax.style.backgroundPositionY=  (scrolledHeight - parallax.offsetTop) /1.5+ "px";
            } else {
                parallax.style.backgroundPositionY=  "0";
            }
        }
    })
}