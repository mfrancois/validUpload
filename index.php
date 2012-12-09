
<!doctype html>
<!--[if lt IE 7]> <html dir="ltr" lang="fr" class="ie7" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if IE 7]>    <html dir="ltr" lang="fr" class="ie7" xmlns="http://www.w3.org/1999/xhtml"><![endif]-->
<!--[if lt IE 8]>    <html dir="ltr" lang="fr" class="ie7" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if IE 8]>    <html dir="ltr" lang="fr" class="ie8" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if IE 9]>    <html dir="ltr" lang="fr" class="ie9" xmlns="http://www.w3.org/1999/xhtml"> <![endif]-->
<!--[if gt IE 9]><!--> <html dir="ltr" lang="fr" xmlns="http://www.w3.org/1999/xhtml"> <!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <title>ValidUpload Demo</title>
    <link rel="stylesheet" href="/css/jqueryui/jquery-ui-1.8.21.custom.css" type="text/css" media="all"/>
    <link rel="stylesheet" href="/css/style.css" type="text/css" media="all"/>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js" type="text/javascript"></script>
    <script src="/js/uploader/plupload.js"></script>
    <script src="/js/uploader/plupload.full.js"></script>
    <script src="/js/validation/jquery.validationEngine.js"></script>
    <script src="/js/validation/jquery.validationEngine-en.js"></script>
    <script src="/js/validUpload.js"></script>
    <link rel="shortcut icon" type="image/png" href="favicon.ico" />
</head>

<body id="body" class="">
    <div id="global">
        <form id="mainForm">
            <fieldset>
                <div id="contener_1" class="empty">
                    <span class="picto upload-ok" title="Ok">Ok</span>
                    <a href="#" class="picto upload-delete" title="Remove">Remove</a>
                    <div class="filelist empty"></div>
                    <div class="clearfix">
                        <div class="btn btn-orange">
                            <a id="id_browse" href="javascript:;">Parcourir</a>
                        </div>
                    </div>
                    <input type="text" class="elementUploaded validate[required]" id="test_1" name="test_1" style="opacity: 0;" value="" />
                    <div class="progressUploader"></div>
                </div>
                <script type="text/javascript">
                    $(document).ready(function(){
                        $('#contener_1').validUpload({
                            browse_button:'id_browse',
                            container:'contener_1',
                            filters:[{title:"Image files", extensions:"jpg,gif,png"}, {title:"Zip files", extensions:"zip"} ]
                        });
                    });

                    $('form').validationEngine();
                </script>
            </fieldset>
            <input type="submit" value="submit" />
        </form>
    </div>

</body>
</html>