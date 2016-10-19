Beast.decl({
    Start: {},
    Start__introduction: {
        expand: function(){
            this.implementWith(<Wiki>{this.get()}</Wiki>)
        }
    },
    Start__item: {
        expand: function(){
            this.append(
                <link href="{this.param('href')}">{this.get()}</link>
            )
        }
    },
    Start__link: {
        tag: 'a',
        expand: function(){
            this.domAttr('href', this.param('href'))
        }
    }
})
