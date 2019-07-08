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

    var imagesUrl = [
        'assets/wrapper.jpg',
        'assets/wrapper.jpg',
        'assets/wrapper.jpg',
        'assets/wrapper.jpg'
    ]
    var caorusel = new Caorusel();
    caorusel.init('caorusel', imagesUrl);
}

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
        root.className = 'caorusel';
        this.body = root;

        //init imagesNodes
        this.activeNode = imagesUrl.length / 2 | 0;
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

        //init arrows    
        var f = this.activate.bind(this); 
        f(this.activeNode);
        setTimeout(function() {
            f(1)
        }, 3000)
    },
    activate : function(index) {
        var activeNode = this.imageNodes[index];
        var currentOffset = activeNode.offsetLeft + activeNode.offsetWidth / 2;
        var targetOffset = document.body.offsetWidth / 2;

        var newMargin = targetOffset - currentOffset;
        if (newMargin > 0) {
            while (currentOffset <= targetOffset) {
                this.body.style['margin-left'] = Number.parseInt(this.body.style['margin-left']) + 1 + 'px';
                currentOffset = activeNode.offsetLeft + activeNode.offsetWidth / 2;
            };
        }
        this.body.style['margin-left'] = newMargin + 'px';
        activeNode.classList.remove('caorusel__image_inactive');
        // this.activeNode.classList.add('caorusel__image_inactive');
    }
}