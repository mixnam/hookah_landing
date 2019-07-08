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

document.addEventListener('scroll', function() {
    var nav = document.querySelector('.nav');
    var headerHeight = document.querySelector('.header').offsetHeight; 
    if (headerHeight <= window.pageYOffset) {
        nav.classList.add('nav_sticky');
    } else {
        nav.classList.remove('nav_sticky');
    }
})

window.onload = function() {
    console.log('loaded');
    document.querySelector('#scrollDown').addEventListener('click', function(){
        document.querySelector('.nav').scrollIntoView({behavior : 'smooth'});
    })
}