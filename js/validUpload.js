(function (jQuery) {

    jQuery.validUpload = function (e, o) {
        this.settings = jQuery.extend(true, {}, jQuery.validUpload.defaults, o);
        this.element = e;
        this.init();
    }

    var jQueryvalidUpload = jQuery.validUpload;
    jQuery.extend(jQuery.validUpload, {
        defaults: {
            browse_button: 'browse',
            selectorInput: '.elementUploaded',
            classEmpty: 'empty',
            classUplaoded: 'uploaded',
            selectorUploadDelete: '.upload-delete',
            selectorUploadFinish: '.finished',
            selectorProgress: '.progress-bar',
            selectorProgressContener: '.progressUploader',
            selectorInjection: '.filelist',
            filters: [
            ],
            dataUploader: {
                runtimes: 'html5,flash,html4',
                url: 'upload/upload.php',
                flash_swf_url: '/js/uploader/plupload.flash.swf',
                chunk_size: '1mb',
                multi_selection: false,
                max_file_count: 1,
                unique_names: true
            }
        },
        prototype: {
            init: function () {
                this.timeout = '';
                this.initData();
                this.initDisplay();
                this.initEvent();

                this.elementUploader.init();
            },

            initData: function () {
                var data = this.settings.dataUploader;

                data.browse_button = this.settings.browse_button;
                data.container = this.element.id;
                data.filters = this.settings.filters;

                this.elementUploader = new plupload.Uploader(data);

            },

            initDisplay: function () {
                jQuery(this.settings.selectorProgressContener, this.element).hide();
                this.tooglRemove();
                this.toogleFinish();
            },

            tooglRemove: function () {
                var valInput = jQuery(this.settings.selectorInput, this.element).val();
                if (valInput == '') {
                    jQuery(this.settings.selectorUploadDelete, this.element).hide();
                } else {
                    jQuery(this.settings.selectorUploadDelete, this.element).show();
                }

            },
            toogleFinish: function () {
                var valInput = jQuery(this.settings.selectorInput, this.element).val();
                if (valInput == '') {
                    jQuery(this.settings.selectorUploadFinish, this.element).hide();
                } else {
                    jQuery(this.settings.selectorUploadFinish, this.element).show();
                }
            },

            initEvent: function () {
                this.elementUploader.unbind('FilesAdded');
                this.elementUploader.bind('FilesAdded', jQuery.proxy(this.addFile, this));

                this.elementUploader.unbind('UploadProgress');
                this.elementUploader.bind('UploadProgress', jQuery.proxy(this.progresse, this));

                this.elementUploader.unbind('Init');
                this.elementUploader.bind('Init', jQuery.proxy(this.initUploader, this));

                this.elementUploader.unbind('FileUploaded');
                this.elementUploader.bind('FileUploaded', jQuery.proxy(this.endUpload, this));

                this.elementUploader.unbind('Error');
                this.elementUploader.bind('Error', jQuery.proxy(this.errorUpload, this));

                jQuery(this.settings.selectorUploadDelete, this.element).click(jQuery.proxy(this.removeElement, this))

            },

            errorUpload: function (up, err) {
                if (this.timeout != '') {
                    clearTimeout(this.timeout);
                }
                jQuery(this.element).validationEngine('showPrompt', err.message);
                jQuery(this.settings.selectorProgressContener, this.element).hide();
                console.log(err);
            },

            endUpload: function (up, file, info) {
                jQuery(this.settings.selectorInput, this.element).val(file.target_name);
                jQuery(this.settings.selectorInjection, this.element).html(file.target_name);
                this.initDisplay();
            },

            removeElement: function (e) {
                e.preventDefault();
                jQuery(this.settings.selectorInjection, this.element).html('');
                jQuery(this.settings.selectorInput, this.element).val('');
                this.initDisplay();

                return false;
            },

            initUploader: function (up, params) {
            },

            addFile: function (up, files) {
                jQuery(this.element).validationEngine('hide');
                this.timeout = setTimeout(jQuery.proxy(this.startUpload, this), 200);
            },

            startUpload: function () {
                jQuery(this.settings.selectorProgressContener, this.element).show();
                this.elementUploader.start();
            },
            progresse: function (up, file) {
                jQuery(this.settings.selectorProgress, this.element).css({
                    width: file.percent + "%"
                });

            }
        }
    });

    jQuery.fn.validUpload = function (options) {
        return this.each(function () {
            if (undefined == jQuery(this).data('validUpload')) {
                jQuery(this).data('validUpload', new jQuery.validUpload(this, options));
            }
        });
    };

})(jQuery);