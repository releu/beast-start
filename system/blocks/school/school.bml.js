Beast.decl({
    School: {
        on: {
            click: function(){
                this.get('header/tableOfContents')[0].mod('State', 'inactive')
            }
        },
        setTitle: function(title) {
            this.elem('page')[0].append(title)
        },
        expand: function(){
            var lessonsCount = parseInt(this.param('lessons-count'))
            var lessonNumber = parseInt(this.param('lesson'))
            this.param('lessonNumber', lessonNumber)
            var prev = <prev/>

            if (lessonNumber > 1) {
                prev.mod('State', 'active')
                prev.param('href', '/lessons/' + (lessonNumber - 1))
            }
            var next = <next/>
            if ((lessonNumber + 1) <= lessonsCount ) {
                this.param('has-next-lesson', true)
                next.mod('State', 'active')
                next.param('href', '/lessons/' + (lessonNumber + 1))
            }

            this.append(
                <header>
                    <container>
                        {prev}
                        <page/>
                        {next}
                    </container>
                    <tableOfContents>
                        <tableOfContentsItem>1. Введение в Beast</tableOfContentsItem>
                        <tableOfContentsItem>2. Разметка</tableOfContentsItem>
                        <tableOfContentsItem>3. Шаблоны</tableOfContentsItem>
                        <tableOfContentsItem>4. Модификаторы</tableOfContentsItem>
                        <tableOfContentsItem>5. Параметры</tableOfContentsItem>
                        <tableOfContentsItem>6. Зверство</tableOfContentsItem>
                        <tableOfContentsItem>7. События</tableOfContentsItem>
                    </tableOfContents>
                </header>,
                <content>{this.get()}</content>
            )
        }
    },
    School__task: {
        expand: function(){
            this.parentBlock().setTitle(this.get('h1')[0].text())
            this.append(<RichText>{this.get()}</RichText>)
            if (this.parentBlock().param('has-next-lesson')){
                this.append(<nextLesson>Следующий урок<nextLessonArrow/></nextLesson>)
            }
        }
    },
    School__nextLesson: {
        on: {
            click: function(){
                this.parentBlock().get('header/container/next')[0].trigger('click')
            }
        }
    },
    School__next: {
        expand: function(){
            if (this.param('href')) {
                this.tag('a')
                this.domAttr('href', this.param('href'))
            }
        }
    },
    School__prev: {
        expand: function(){
            if (this.param('href')) {
                this.tag('a')
                this.domAttr('href', this.param('href'))
            }
        }
    },
    School__page: {
        on: {
            click: function(e){
                e.stopPropagation()
                this.parentBlock().get('header/tableOfContents')[0].toggleMod('State', 'inactive', 'active')
            }
        }
    },
    School__content: {
        mod: {
            state: 'default'
        }
    },
    School__tableOfContents: {
        on: {
            click: function(e){
                e.stopPropagation()
            }
        },
        mod: {
            state: 'inactive'
        },
        onMod: {
            state: {
                active: function(){
                    this.parentBlock().get('content')[0].mod('State', 'dissolved')
                },
                inactive: function(){
                    this.parentBlock().get('content')[0].mod('State', 'default')
                }
            }
        }
    },
    School__tableOfContentsItem: {
        tag: 'a',
        expand: function(){
            var num;
            this.parentNode().get('tableOfContentsItem').forEach(function(node, i){
                if (this == node) {
                    num = i + 1
                }
            }.bind(this))

            if (this.parentBlock().param('lessonNumber') == num) {
                this.mod('State', 'current')
            }

            this.domAttr('href', '/lessons/' + num)
        }
    }
})
