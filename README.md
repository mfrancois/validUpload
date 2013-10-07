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


