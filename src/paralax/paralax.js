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