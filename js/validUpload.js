(function ($) {

    $.validUpload = function (e, o) {
        this.settings = $.extend(true, {}, $.validUpload.defaults, o);
        this.element = e;
        this.init();
    }

    var $validUpload = $.validUpload;
    $.extend($.validUpload, {
        defaults:{
            browse_button:'pickfiles',
            container:'container',
            selectorInput:'.elementUploaded',
            classEmpty:'empty',
            classUplaoded:'uploaded',
            selectorUploadDelete:'.upload-delete',
            selectorProgress:'.progressUploader',
            selectorInjection:'.filelist',
            filters:[
            ],
            dataUploader:{
                runtimes:'html5,flash,html4',
                url:'/upload/upload.php',
                flash_swf_url:'/js/uploader/plupload.flash.swf',
                chunk_size:'1mb',
                multi_selection:false,
                max_file_count:1,
                unique_names:true
            }
        },
        prototype:{
            init:function () {
                this.timeout = '';
                this.initData();
                this.initEvent();

                this.elementUploader.init();
            },

            initData:function () {
                var data = this.settings.dataUploader;

                data.browse_button = this.settings.browse_button;
                data.container = this.settings.container;
                data.filters = this.settings.filters;

                this.elementUploader = new plupload.Uploader(data);

            },
            initEvent:function () {
                this.elementUploader.unbind('FilesAdded');
                this.elementUploader.bind('FilesAdded', $.proxy(this.addFile, this));

                this.elementUploader.unbind('UploadProgress');
                this.elementUploader.bind('UploadProgress', $.proxy(this.progresse, this));

                this.elementUploader.unbind('Init');
                this.elementUploader.bind('Init', $.proxy(this.initUploader, this));

                this.elementUploader.unbind('FileUploaded');
                this.elementUploader.bind('FileUploaded', $.proxy(this.endUpload, this));

                this.elementUploader.unbind('Error');
                this.elementUploader.bind('Error', $.proxy(this.errorUpload, this));

                $(this.settings.selectorUploadDelete,this.element).click($.proxy(this.removeElement, this))

            },

            errorUpload: function(up, err){
                if(this.timeout != ''){
                    clearTimeout(this.timeout);
                }
                $(this.element).validationEngine('showPrompt',err.message);
                $(this.settings.selectorProgress, this.element).hide('slow');
            },

            endUpload: function(up, file, info){
                $(this.settings.selectorInput,this.element).val(file.target_name);
                $(this.settings.selectorInjection,this.element).html(file.target_name);
                $(this.settings.selectorProgress, this.element).hide('slow');
                $(this.element).removeClass(this.settings.classEmpty).addClass(this.settings.classUplaoded);
                $(this.settings.selectorInjection,this.element).removeClass(this.settings.classEmpty).addClass(this.settings.classUplaoded);
            },

            removeElement:function(e){
                e.preventDefault();
                $(this.element).removeClass(this.settings.classUplaoded).addClass(this.settings.classEmpty);
                $(this.settings.selectorInjection,this.element).html('');
                $(this.settings.selectorInjection,this.element).removeClass(this.settings.classUplaoded).addClass(this.settings.classEmpty);
                $(this.settings.selectorInput,this.element).val('');

                return false;
            },

            initUploader:function (up, params) {
            },

            addFile:function (up, files) {
                $(this.element).removeClass(this.settings.classUplaoded).addClass(this.settings.classEmpty);
                $(this.settings.selectorInjection,this.element).removeClass(this.settings.classUplaoded).addClass(this.settings.classEmpty);
                $(this.element).validationEngine('hidePrompt');
                this.timeout = setTimeout($.proxy(this.startUpload, this),200);
            },

            startUpload:function(){
                $(this.settings.selectorProgress, this.element).show('slow');
                this.elementUploader.start();
            },
            progresse:function (up, file) {
                $(this.settings.selectorProgress, this.element).progressbar({
                    value:file.percent
                });
            }
        }
    });

    $.fn.validUpload = function(options)
    {
        return this.each(function()
        {
            if (undefined == $(this).data('validUpload'))
            {
                $(this).data('validUpload', new $.validUpload(this, options));
            }
        });
    };

})(jQuery);