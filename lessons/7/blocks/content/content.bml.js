Beast
.decl('Content', {
    expand: function(){
        this.append(
            <newTweet/>,
            <Ad>
                <banner>
                    <thumb>/lessons/7/blocks/ad/i/market.png</thumb>
                    <text>Недорогие зеркалки для начинающих фотографов</text>
                </banner>
                <banner>
                    <thumb>/lessons/7/blocks/ad/i/kinopoisk.png</thumb>
                    <text>Как в Каннах освистывают кино</text>
                </banner>
                <banner>
                    <thumb>/lessons/7/blocks/ad/i/music.png</thumb>
                    <text>Победитель Евровидения</text>
                </banner>
                <banner>
                    <thumb>/lessons/7/blocks/ad/i/money.png</thumb>
                    <text>Скидка 50%, если штрафу нет 20 дней</text>
                </banner>
                <banner>
                    <thumb>/lessons/7/blocks/ad/i/taxi.png</thumb>
                    <text>Ровно по счётчику</text>
                </banner>
            </Ad>,
            this.get('stream')
        )
    }
})
.decl('Content__newTweet', {
    expand: function(){
        this.implementWith(<NewTweet/>)
    }
})
.decl('Content__stream', {
    expand: function(){
        this.implementWith(<Stream>{this.get()}</Stream>)
    }
})
