Beast
.decl('Trends', {
    expand: function(){
        this.append(
            <title>Moscow Trends</title>,
            <items>
                {this.get('item')}
            </items>
        )
    }
})
