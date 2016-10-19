Beast.decl({
    Richtext__code: {
        noElems: true,
        expand: function(){
            var decodedSnippet = this.text().replace(/&amp;/g, '&')
            this.param('code', decodedSnippet)
            this.domAttr('class', this.selector() + ' lang-' + this.param('lang'))
        },
        domInit: function(){
            this.domNode().innerHTML = this.param('code')
            if (this.parentNode()._nodeName === 'pre'){
                var node = this
                Beast.onReady(function(){
                    hljs.highlightBlock(node.domNode())
                })
            }
        }
    },
    Richtext__a: {
        tag: 'a',
        expand: function(){
            this.domAttr('href', this.param('href'))
        }
    },
    Richtext__img: {
        tag: 'img',
        expand: function(){
            this.domAttr('src', this.param('src'))
        }
    }
})
