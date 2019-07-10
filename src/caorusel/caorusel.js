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