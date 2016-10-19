Beast
.decl('Ad', {
    param: {
        currentBanner: 0
    },
    expand: function(){
        this.append(
            this.get('banner'),
            <close/>
        )
        this.get('banner')[this.param('currentBanner')].mod('State', 'visible')
    }
})
.decl('Ad__banner', {
    mod: {
        State: 'hidden'
    },
    expand: function(){
        this.append(this.get('thumb', 'text'))
    }
})
.decl('Ad__thumb', {
    tag: 'img',
    expand: function(){
        this.domAttr('src', this.text())
        this.empty()
    }
})
.decl('Ad__close', {
    // Напишите код тут
    expand: function(){
        this.append('×')
    }
})
