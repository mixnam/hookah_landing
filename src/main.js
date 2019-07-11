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

    document.querySelectorAll('input[type="button"]').forEach(function(anchor){
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