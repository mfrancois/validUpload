(function (jQuery) {

    jQuery.validUpload = function (e, o) {
        this.settings = jQuery.extend(true, {}, jQuery.validUpload.defaults, o);
        this.element = e;
        this.init();
    }

    jQuery.extend(jQuery.validUpload, {
        defaults: {
            browse_button: 'browse',
            selectorInput: '.elementUploaded',
            selectorUploadDelete: '.upload-delete',
            selectorUploadItemDelete: '.upload-item-delete',
            selectorUploadFinish: '.finished',
            selectorProgress: '.progress-bar',
            selectorProgressContener: '.progressUploader',
            selectorInjection: '.filelist',
            filters: [
            ],
            dataUploader: {
                runtimes: 'html5,flash,html4',
                url: 'components/plupload/examples/upload.php',
                flash_swf_url: 'components/plupload/js/Moxie.swf',
                chunk_size: '1mb',
                multi_selection: false,
                max_file_count: 1,
                unique_names: true
            },

            language: {
                placeholder: 'Chose file',
                remove: 'Remove'
            },

            use_template: true,

            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------

            onInit: function () {
            },
            onInitTemplate: function () {
            },
            onInitData: function () {
            },
            onInitDisplay: function () {
            },
            onInitEvent: function () {
            },

            // CALLBACKS UPLOAD

            onFilesAdded: function () {
            },
            onUploadProgress: function () {
            },
            onUploadInit: function () {
            },
            onFileUploaded: function () {
            },
            onUploadError: function () {
            },

            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------


            template_single: '' +
                '<div class="row">' +
                '<div class="col-md-8">' +
                '<input type="text" class="form-control elementUploaded validate[required]" id="{{input_id}}" name="{{input_name}}" value="" placeholder="{{placeholder}}"/>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<a id="{{id_browse}}"  href="javascript:;" class="glyphicon glyphicon-open"></a>' +
                '<a href="#" class="glyphicon glyphicon-remove upload-delete" title="{{remove}}"></a>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-8">' +
                '<div class="progressUploader progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<span class=" finished glyphicon glyphicon-ok-sign"></span>' +
                '</div>' +
                '</div>',

            // --------------------------------------------------------------------------------------------

            template_multiple: '' +
                '<div class="row">' +
                '<div class="col-md-8">' +
                '<input type="text" class="form-control elementUploaded validate[required]" id="{{input_id}}" name="{{input_name}}" value="" style="opacity: 0;" placeholder="{{placeholder}}"/>' +
                '<div class="filelist"></div>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<a id="{{id_browse}}"  href="javascript:;" class="glyphicon glyphicon-open"></a>' +
                '<a href="#" class="glyphicon glyphicon-remove upload-delete" title="{{remove}}"></a>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="col-md-8">' +
                '<div class="progressUploader progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>' +
                '</div>' +
                '</div>' +
                '<div class="col-md-4">' +
                '<span class=" finished glyphicon glyphicon-ok-sign"></span>' +
                '</div>' +
                '</div>',

            template_one_item: '' +
                '<div id="{{id_div}}">' +
                '<div class="row">' +
                '<div class="col-md-8" data-targetname="{{id}}">' +
                '{{file_name}}' +
                '</div>' +
                '<div class="col-md-4">' +
                '<a href="#" class="glyphicon glyphicon-remove upload-item-delete" title="{{remove}}"></a>' +
                '</div>' +
                '</div>' +
                '<div class="row">' +
                '<div class="progressUploader progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>' +
                '</div>' +
                '</div>' +
                '</div>'

        },
        timeout: '',
        prototype: {
            init: function () {

                this.initTemplate();
                this.initData();
                this.initDisplay();
                this.initEvent();

                this.elementUploader.init();
                this.settings.onInit(this);
            },

            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------

            initTemplate: function () {

                //Check use integrating templating
                //
                if (!this.settings.use_template) {
                    return false;
                }

                var prefix = '';
                if (typeof(this.element.id) != 'undefined' && this.element.id != '') {
                    prefix = this.element.id;
                } else {
                    prefix = (Math.random() + '').replace('0.', '');
                    this.element.id = prefix;
                }

                var tpl = '';

                if (!this.settings.dataUploader.multi_selection) {
                    tpl = this.settings.template_single;
                } else {
                    tpl = this.settings.template_multiple;
                }


                // Overide option for templating
                //
                this.settings.browse_button = prefix + '_browse';

                //Init object template
                //
                var obj = {
                    'input_id': prefix + '_input_upload',
                    'input_name': prefix + '_input_upload',
                    'id_browse': this.settings.browse_button,
                    'placeholder': this.settings.language.placeholder,
                    'remove': this.settings.language.remove
                };


                //Parse object value for templating
                //
                for (var i in obj) {
                    tpl = tpl.replace('{{' + i + '}}', obj[i]);
                }

                //Add template
                //
                jQuery(this.element).html(tpl);

                this.settings.onInitTemplate(this);

                return true;

            },

            // --------------------------------------------------------------------------------------------
            formatingTemplateItem: function (file) {

                var obj = {
                    'file_name': file.name,
                    'id': file.id,
                    'id_div': file.id,
                    'remove': this.settings.language.remove
                };

                var tpl = this.settings.template_one_item;


                //Parse object value for templating
                //
                for (var i in obj) {
                    tpl = tpl.replace('{{' + i + '}}', obj[i]);
                }

                return tpl;
            },

            injectTemplateItem: function (tpl) {
                if (typeof(tpl) != 'undefined' && tpl != null && tpl != '') {
                    jQuery(this.settings.selectorInjection, this.element).append(tpl);
                    this.initEventItem();
                }
            },

            initEventItem: function () {
                jQuery(this.settings.selectorUploadItemDelete, this.element).off('click').on('click', jQuery.proxy(this.removeOneItem, this));
            },

            addOneItem: function (file) {
                this.injectTemplateItem(this.formatingTemplateItem(file));
            },

            removeOneItem: function (evt) {
                evt.preventDefault();

                var $target = jQuery(evt.target);
                var tabChilds = $target.parent().parent().children();

                for (var i = 0; i < tabChilds.length; i++) {
                    var targetName = jQuery(tabChilds[i]).data('targetname');


                    if (typeof(targetName) != 'undefined' && targetName != null && targetName != '') {
                        var targetRealName = jQuery(tabChilds[i]).html();
                        var targetExtentionName = this.fileExtention(targetRealName);

                        if (targetExtentionName != '') {
                            targetName = targetName + '.' + targetExtentionName;
                        }
                        $target.parent().parent().remove();
                        this.removeFileInInput(targetName);
                    }
                }
            },

            fileExtention: function (file) {
                var tabFile = file.split('.');

                return tabFile[tabFile.length - 1];
            },

            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------

            addFileInInput: function (file) {
                var valInput = jQuery(this.settings.selectorInput, this.element).val();

                if (valInput == '') {
                    valInput = file;
                } else {
                    valInput = valInput + ',' + file;
                }

                jQuery(this.settings.selectorInput, this.element).val(valInput);
            },

            removeFileInInput: function (file) {
                var valInput = jQuery(this.settings.selectorInput, this.element).val();

                if (valInput == '') {
                    return false;
                } else {
                    valInput = valInput.split(',');

                    var tabTmp = [];

                    for (var i in valInput) {
                        if (valInput[i] == file) {
                            continue;
                        }

                        tabTmp.push(valInput[i]);
                    }

                    valInput = tabTmp.join(',');
                }

                jQuery(this.settings.selectorInput, this.element).val(valInput);

                this.tooglRemove();
                this.toogleFinish();
                return true;

            },

            // --------------------------------------------------------------------------------------------


            // --------------------------------------------------------------------------------------------

            initData: function () {

                var data = this.settings.dataUploader;

                data.browse_button = this.settings.browse_button;
                data.container = this.element.id;
                data.filters = this.settings.filters;

                this.elementUploader = new plupload.Uploader(data);
                jQuery(this.element).parents('form').validationEngine();

                this.settings.onInitData(this);
            },

            // --------------------------------------------------------------------------------------------

            initDisplay: function () {

                jQuery(this.settings.selectorProgressContener, this.element).hide();
                this.tooglRemove();
                this.toogleFinish();

                this.settings.onInitDisplay(this);
            },

            // --------------------------------------------------------------------------------------------

            initEvent: function () {


                this.elementUploader.unbind('FilesAdded');
                this.elementUploader.bind('FilesAdded', jQuery.proxy(this.addFile, this));

                this.elementUploader.unbind('UploadProgress');
                this.elementUploader.bind('UploadProgress', jQuery.proxy(this.progress, this));

                this.elementUploader.unbind('Init');
                this.elementUploader.bind('Init', jQuery.proxy(this.initUploader, this));

                this.elementUploader.unbind('FileUploaded');
                this.elementUploader.bind('FileUploaded', jQuery.proxy(this.endUpload, this));

                this.elementUploader.unbind('Error');
                this.elementUploader.bind('Error', jQuery.proxy(this.errorUpload, this));

                jQuery(this.settings.selectorUploadDelete, this.element).click(jQuery.proxy(this.removeElement, this));


                this.settings.onInitEvent(this);


            },


            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------

            tooglRemove: function () {
                var valInput = jQuery(this.settings.selectorInput, this.element).val();
                if (valInput == '') {
                    jQuery(this.settings.selectorUploadDelete, this.element).hide();
                } else {
                    jQuery(this.settings.selectorUploadDelete, this.element).show();
                }

            },

            // --------------------------------------------------------------------------------------------

            toogleFinish: function () {
                var valInput = jQuery(this.settings.selectorInput, this.element).val();
                if (valInput == '') {
                    jQuery(this.settings.selectorUploadFinish, this.element).hide();
                } else {
                    jQuery(this.settings.selectorUploadFinish, this.element).show();
                }
            },


            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------
            // --------------------------------------------------------------------------------------------

            errorUpload: function (up, err) {

                this.settings.onUploadError(up, err);

                if (this.timeout != '') {
                    clearTimeout(this.timeout);
                }

                jQuery(this.element).validationEngine('showPrompt', err.message);
                jQuery(this.settings.selectorProgressContener, this.element).hide();
            },

            // --------------------------------------------------------------------------------------------

            endUpload: function (up, file, info) {

                this.settings.onFileUploaded(up, file, info);
                this.addFileInInput(file.target_name);
                this.initDisplay();
            },

            // --------------------------------------------------------------------------------------------

            removeElement: function (e) {
                e.preventDefault();
                jQuery(this.settings.selectorInjection, this.element).html('');
                jQuery(this.settings.selectorInput, this.element).val('');
                this.initDisplay();

                return false;
            },

            // --------------------------------------------------------------------------------------------

            initUploader: function (up, params) {

                this.settings.onUploadInit(up, params);
            },

            // --------------------------------------------------------------------------------------------

            addFile: function (up, files) {
                this.settings.onFilesAdded(up, files);
                plupload.each(files, jQuery.proxy(this.addOneItem, this));
                jQuery(this.element).validationEngine('hide');
                this.timeout = setTimeout(jQuery.proxy(this.startUpload, this), 200);
            },

            // --------------------------------------------------------------------------------------------

            startUpload: function () {

                jQuery(this.settings.selectorProgressContener, this.element).show();
                this.elementUploader.start();
            },

            // --------------------------------------------------------------------------------------------

            progress: function (up, file) {
                this.settings.onUploadProgress(up, file);

                if (!this.settings.dataUploader.multi_selection) {
                    jQuery(this.settings.selectorProgress, this.element).css({
                        width: file.percent + "%"
                    });
                } else {
                    jQuery(this.settings.selectorProgress, "#" + file.id).css({
                        width: file.percent + "%"
                    });
                }


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