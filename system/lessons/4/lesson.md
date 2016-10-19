# 4. Модификаторы

Теперь в каждый твит добавим кнопки ответа, ретвита и лайка. По сути кнопка — это один элемент в разных состояниях (модификациях).

Добавить модификаторы можно через BML-разметку. Модификаторы пишутся с большой буквы:

```js
Beast.decl('Tweet', {)
    expand: function(){
        this.append(
            ...
            <controls>
                <control Type="reply"/>
                <control Type="retweet"/>
                <control Type="like"/>
            </controls>
        )
    }
})
```

В итоге получится такой HTML:

```html
<div class="tweet__controls">
    <div class="tweet__control tweet__control_type_reply"></div>
    <div class="tweet__control tweet__control_type_retweet"></div>
    <div class="tweet__control tweet__control_type_like"></div>
</div>
```

Для получения и изменения модификатора в декларациях есть метод `.mod()`:

```js
Beast.decl('Tweet', {
    expand: function(){
        this.mod('Primary', 'yes') // установим блоку модификатор `Primary` со значением `yes`
        console.log(this.mod('Primary')) // в консоли отобразится текущее значение модификатора 'Primary' – `yes`
    }
})
```

Значение по-умолчанию можно задавать в параметрах декларации:

```js
Beast.decl('Tweet__control', {
    mod: {
        primary: 'no'
    },
    expand: function(){
        this.mod('Primary') // no
    }
})
```

## Задание

Откройте папку `lessons/4`. Найдите файл с данными и файл шаблона.

Добавьте к `<Profile>` модификатор `Verified`. По-умолчанию значение должно быть `no`. В разметке установите модификатор в значении `yes`.

Если всё сделали правильно — появится значёк верифицированного аккаунта на [этой странице](http://localhost:3052/lessons/4/task.html).
