Beast
.decl('NewTweet', {
    mod: {
        state: 'collapsed'
    },
    onMod: {
        state: {
            collapsed: function(){
                this.get('field')[0].domNode().value = ''
            }
        }
    },
    expand: function(){
        this.append(<field/>, <button/>)
    }
})

.decl('NewTweet__field', {
    tag: 'textarea',
    on: {
        focus: function(){
            this.parentBlock().mod('State', 'expanded')
        }
    },
    expand: function(){
        this.domAttr('placeholder', 'What\'s happening?')
    }
})

.decl('NewTweet__button', {
    on: {
        click: function(){
            var text = this.get('../field')[0].domNode().value
            this.triggerWin('new-tweet-posted', text)
            this.parentBlock().mod('State', 'collapsed')
        }
    },
    expand: function(){
        this.append('Tweet')
    }
})
