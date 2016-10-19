Beast
.decl('Sidebar', {
    expand: function(){
        this.append(
            this.get('profile'),
            this.get('trends')
        )
    }
})
.decl('Sidebar__profile', {
    expand: function(){
        this.implementWith(<Profile>{this.get()}</Profile>)
    }
})
.decl('Sidebar__trends', {
    expand: function(){
        this.implementWith(<Trends>{this.get()}</Trends>)
    }
})
