# validUpload [![BOWER version](https://badge-me.herokuapp.com/api/bower/mfrancois/validUpload.png)](http://badges.enytc.com/for/bower/mfrancois/validUpload) [![GH version](https://badge-me.herokuapp.com/api/gh/mfrancois/validUpload.png)](http://badges.enytc.com/for/gh/mfrancois/validUpload)

## Description
validUpload est basé sur plupload et validationEngine et twitter bootsrap.
Ce dernier est fait pour faciliter l'utilisation et la réutilisation des deux javascript.


* `validationEngine` pour la gestion des erreurs
* `plupload` pour la gestion des uploads
* `twitter bootsrap` pour la gestion de la barre de progression
* Validation à l'aide de validationEngine
* Affichage des erreurs plupload dans les éléments de validation de validationEngine
* Instaciantion automatique ou non du template
* Multi instances
* Upload multiple
* Supression dans la queue d'upload
* Upload simple
* Uniformise les instantiations

## Demo

[http://www.kezho.com/application/data/demo/validupload](http://www.kezho.com/application/data/demo/validupload)

![Exemple](http://www.kezho.com/application/data/demo/validupload/images/exemple.png)


## Installation

### Bower

```sh
    bower install
```

#### Dépendances

```json
   "jquery": "~1.10.2",
   "validationEngine": "~2.6.4",
   "plupload": "~2.0.0"
```

#### Dépendances de développement

Si vous voulez testez l'index il vous faudra des librairies en plus.
Pour ce faire installez les `devDependencies` :

```json

     "devDependencies": {
         "bootstrap": "~3.0.0",
        "SyntaxHighlighter": "~3.0.83"
     }

```

## Utilisation


### Exemple d'utilisation de base

![Simple](http://www.kezho.com/application/data/demo/validupload/images/simple.png)


```html
    <fieldset>
         <label>Single upload</label>
         <div class="uploader_conteneur"></div>
     </fieldset>
```

```js
         jQuery(document).ready(function () {
             jQuery('.uploader_conteneur').validUpload({
                 filters: [
                     {title: "Image files", extensions: "jpg,gif,png"},
                     {title: "Zip files", extensions: "zip"}
                 ]
             });
         });
```


### Exemple d'utilisation d'upload multiple

![Multiple](http://www.kezho.com/application/data/demo/validupload/images/multiple.png)


```html
    <fieldset>
        <label>Upload multiple</label>
        <div class="uploader_multiple"></div>
    </fieldset>
```

```js
         jQuery('.uploader_multiple').validUpload({
             dataUploader: {
                 runtimes: 'html5,flash,html4',
                 url: 'components/plupload/examples/upload.php',
                 flash_swf_url: 'components/plupload/js/Moxie.swf',
                 chunk_size: '1mb',
                 multi_selection: true,
                 unique_names: true
             }
         });
```


### Exemple d'initialisation de contenu


#### Upload simple

```html
    <fieldset>
        <label>Upload simple</label>
        <div class="uploader_conteneur_defaut"></div>
    </fieldset>
```

```js
         jQuery('.uploader_conteneur_defaut').validUpload({
             default_value:'test.jpg'
         });
```

#### Upload multiple

```html
    <fieldset>
        <label>Upload multiple</label>
        <div class="uploader_multiple_default"></div>
    </fieldset>
```

```js
         jQuery('.uploader_multiple_default').validUpload({
              dataUploader: {
                  runtimes: 'html5,flash,html4',
                  url: 'components/plupload/examples/upload.php',
                  flash_swf_url: 'components/plupload/js/Moxie.swf',
                  chunk_size: '1mb',
                  multi_selection: true,
                  unique_names: true
              },
              default_value:'test_1.jpg,test_2.png,test_3.tiff'
          });
```


### Events


Event | Param | Description
----- | ----- | -----------
`onFilesAdded` | Uploader (up),  information sur les fichiers (file) | Appelé à chaque fois qu'une personne ajoute un fichier.
`onUploadProgress` | Uploader (up),  information sur le fichier (file) | Appelé à chaque progression de l'uplaod de fichier.
`onUploadInit` | Uploader (up), paramètre d'instanciation du composant d'upload | Appelé une fois que le composant est initialisé.
`onFileUploaded` | Uploader (up), fichier conerné (file), et les informations sur le retour de l'upload (requête) | Appelé une fois que le fichier est uploadé correctement.
`onUploadError` | Uploader (up) et l'erreur (err) | Appelé une fois qu'une erreurs est lancé par le composant plupload..
`onInit` | Instance de l'objet (this) | Appelé une fois que l'objet est fini d'être instantié.
`onInitTemplate` | Instance de l'objet (this) | Appelé une fois que le template est injecté dans son conteneur.
`onInitDisplay` | Instance de l'objet (this) | Appelé une fois que les éléments sont masqués ou affichés (remove,finished...) en fonction du contenue de l'input.
`onInitEvent` | Appelé une fois que les évnèments sont initialisés.



#### Exemple d'implémentation d'évènement

```html
    <form class="form-inline" role="form">
        <fieldset>
            <label>Event upload</label>

            <div class="uploader_event"></div>
        </fieldset>
        <hr/>
        <pre class="console pre-scrollable">

        </pre>
    </form>
```

```js
    jQuery('.uploader_event').validUpload({
        onFilesAdded: function (up, file) {
            log(' ');
            log('---------------------------');
            log('START onFilesAdded');
            plupload.each(file, function (files) {
                log('File : ' + files.name);
            });
            log('END onFilesAdded');
            log('---------------------------');

        },
        onUploadProgress: function (up, file) {
            log(' ');
            log('---------------------------');
            log('START onUploadProgress');
            log('File : ' + file.name + " ======> " + file.percent + " %");
            log('END onUploadProgress');
            log('---------------------------');

        },
        onUploadInit: function (up, params) {
            log(' ');
            log('---------------------------');
            log('START onUploadInit');
            log('Runtime : ' + params.runtime);
            log('END onUploadInit');
            log('---------------------------');

        },
        onFileUploaded: function (up, file, info) {
            log(' ');
            log('---------------------------');
            log('START onFileUploaded');
            log('File : ' + file.name);
            log('END onFileUploaded');
            log('---------------------------');

        },
        onUploadError: function (up, err) {
            log(' ');
            log('---------------------------');
            log('START onFileUploaded');
            log('Error : ' + err);
            log('END onFileUploaded');
            log('---------------------------');
        },

        onInit: function (obj) {
            log(' ');
            log('---------------------------');
            log('START onInit');
            log('END onInit');
            log('---------------------------');
        },
        onInitTemplate: function (obj) {
            log(' ');
            log('---------------------------');
            log('START onInitTemplate');
            log('END onInitTemplate');
            log('---------------------------');
        },
        onInitData: function (obj) {
            log(' ');
            log('---------------------------');
            log('START onInitData');
            log('END onInitData');
            log('---------------------------');
        },
        onInitDisplay: function (obj) {
            log(' ');
            log('---------------------------');
            log('START onInitDisplay');
            log('END onInitDisplay');
            log('---------------------------');
        },
        onInitEvent: function (obj) {
            log(' ');
            log('---------------------------');
            log('START onInitEvent');
            log('END onInitEvent');
            log('---------------------------');
        }
    });
```


#### Exemple d'utilisation avec une file d'image

![File](http://www.kezho.com/application/data/demo/validupload/images/file.png)



```html
     <form class="form-inline" role="form">
        <fieldset>
            <label>Upload multiple</label>

            <div class="uploader_multiple_file"></div>
        </fieldset>
        <hr/>
    </form>
```

```js
    jQuery('.uploader_multiple_file').validUpload({
        dataUploader: {
            runtimes: 'html5,flash,html4',
            url: 'components/plupload/examples/upload.php',
            flash_swf_url: 'components/plupload/js/Moxie.swf',
            chunk_size: '1mb',
            multi_selection: true,
            unique_names: true,
            resize: {width: 320, height: 240, quality: 90},
            filters: [
                {title: "Images files", extensions: "jpg,jepg,tiff,gif,png,ico"}
            ]
        },
        default_value: 'image1.jpg,image2.jpg',
        onFileUploaded: function (up, file, info) {
            if (typeof(file.target_name) != 'undefined') {
                var tpl = '<img src="http://mon_url/' + file.target_name + '" alt="" />';
                var $elt = jQuery('#' + file.id).children("div:nth-child(2)");
                $elt.prepend(tpl);
            }
        },
        onAfterAddOneItem: function (file) {
            if (typeof(file.target_name) != 'undefined') {
                var tpl = '<img src="http://mon_url/' + file.target_name + '" alt="" />';
                var $elt = jQuery('#' + file.id).children("div:nth-child(2)");
                $elt.prepend(tpl);
            }
        }
    });
```

License
-------
MIT: http://kezho.mit-license.org/


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mfrancois/validupload/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

