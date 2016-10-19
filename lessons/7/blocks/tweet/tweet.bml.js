Beast
.decl('Tweet', {
    expand: function(){
        this.append(
            <avatar/>,
            <content>
                <author>
                    {this.get('name')}
                    {this.get('login')}
                </author>
                {this.get('text')}
                <controls>
                    <control Type="reply"/>
                    <control Type="retweet"/>
                    <control Type="like"/>
                </controls>
            </content>
        )
    }
})
.decl('Tweet__login', {
    expand: function(){
        this.append('@' + this.text())
    }
})
