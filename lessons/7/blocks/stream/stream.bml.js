Beast
.decl('Stream', {
    onWin: {
        'NewTweet:new-tweet-posted': function(e){
            var text = e.detail
            this.prepend(
                <item>
                    <name>Мистер Икс</name>
                    <login>donateater</login>
                    <text>{text}</text>
                </item>
            )
        }
    }
})
.decl('Stream__item', {
    expand: function(){
        this.implementWith(<Tweet>{this.get()}</Tweet>)
    }
})
