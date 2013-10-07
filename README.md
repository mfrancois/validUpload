# validUpload

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
* Uniformise les instantiations

## Installation

### Bower

    bower install


#### Dépendances

    "jquery": "~1.10.2",
    "validationEngine": "~2.6.4",
    "plupload": "~2.0.0",
    "bootstrap": "~3.0.0"




## Utilisation


### Exemple d'utilisation de base

    <fieldset>
         <label>Single upload</label>
         <div class="uploader_conteneur"></div>
     </fieldset>


     <script type="text/javascript">
         jQuery(document).ready(function () {
             jQuery('.uploader_conteneur').validUpload({
                 filters: [
                     {title: "Image files", extensions: "jpg,gif,png"},
                     {title: "Zip files", extensions: "zip"}
                 ]
             });
         });
     </script>


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

    <form class="form-inline" role="form">
        <fieldset>
            <label>Event upload</label>

            <div class="uploader_event"></div>
        </fieldset>
        <hr/>
        <pre class="console pre-scrollable">

        </pre>
    </form>


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