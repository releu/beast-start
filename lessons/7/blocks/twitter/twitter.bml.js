Beast
.decl('Twitter', {
    expand: function(){
        this.append(
            <header>{this.get('profile/avatar')[0].clone()}</header>,
            <container>
                <sidebar>
                    {this.get('profile')}
                    {this.get('trends')}
                </sidebar>
                <content>
                    {this.get('stream')}
                </content>
            </container>
        )
    }
})
.decl('Twitter__header', {
    expand: function(){
        this.implementWith(<Header>{this.get()}</Header>)
    }
})
.decl('Twitter__sidebar', {
    expand: function(){
        this.implementWith(
            <Sidebar>
                {this.get('profile')}
                {this.get('trends')}
            </Sidebar>
        )
    }
})
.decl('Twitter__content', {
    expand: function(){
        this.implementWith(<Content>{this.get()}</Content>)
    }
})
