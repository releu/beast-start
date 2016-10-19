Beast
.decl('Header', {
    expand: function(){
        this.append(
            <container>
                <tabs>
                    <tab State='selected'>Home</tab>
                    <tab>Notifications</tab>
                    <tab>Messages</tab>
                </tabs>
                <logo/>
                {this.get('avatar')}
            </container>
        )
    }
})
.decl('Header__tab', {
    mod: {
        state: 'default'
    }
})
.decl('Header__avatar', {
    expand: function(){
        this.css('background-image', 'url("' + this.text() + '")')
        this.empty()
    }
})
