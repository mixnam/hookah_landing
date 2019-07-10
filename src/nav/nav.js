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

                nav__links.style['visibility'] = current_visibility === 'hidden' ? 'visible' : 'hidden';
                nav__links.style['opacity'] = current_opacity === '0' ? '1' : '0';
            })
        }
    }

    return Nav
})()