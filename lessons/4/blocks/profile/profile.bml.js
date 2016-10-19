Beast
.decl('Profile', {
    expand: function(){
        this.append(
            this.get('cover'),
            <author>
                {this.get('name')}
                {this.get('login')}
            </author>,
            <stats>
                <statsItem>
                    <caption>Tweets</caption>
                    <value>{this.get('tweets')[0].text()}</value>
                </statsItem>
                <statsItem>
                    <caption>Following</caption>
                    <value>{this.get('following')[0].text()}</value>
                </statsItem>
                <statsItem>
                    <caption>Followers</caption>
                    <value>{this.get('followers')[0].text()}</value>
                </statsItem>
            </stats>
        )
    }
})

.decl('Profile__login', {
    tag: 'a',
    domAttr: {
        href: 'http://yandex.ru'
    }
})

.decl('Profile__cover', {
    expand: function(){
        this.css('backgroundImage', 'url(' + this.text() + ')')
        this.empty()
    }
})
