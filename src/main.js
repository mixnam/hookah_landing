//onload
window.onload = function() {
    console.log('loaded');
    document.querySelector('#scrollDown').addEventListener('click', function(){
        document.querySelector('.nav').scrollIntoView({behavior : 'smooth'});
    })

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