!function () {
    tinymce.create("tinymce.plugins.wpGallery", {init: function (a, b) {
        var c = this;
        c.url = b, c.editor = a, c._createButtons(), a.addCommand("WP_Gallery", function () {
            tinymce.isIE && a.selection.moveToBookmark(a.wpGalleryBookmark);
            var b, c = a.selection.getNode(), d = wp.media.gallery;
            "undefined" != typeof wp && wp.media && wp.media.gallery && "IMG" == c.nodeName && -1 != a.dom.getAttrib(c, "class").indexOf("wp-gallery") && (b = d.edit("[" + a.dom.getAttrib(c, "title") + "]"), b.state("gallery-edit").on("update", function (b) {
                var e = d.shortcode(b).string().slice(1, -1);
                a.dom.setAttrib(c, "title", e)
            }))
        }), a.onInit.add(function (a) {
            "ontouchstart"in window && a.dom.events.add(a.getBody(), "touchstart", function (b) {
                var c = b.target;
                "IMG" == c.nodeName && a.dom.hasClass(c, "wp-gallery") && (a.selection.select(c), a.dom.events.cancel(b), a.plugins.wordpress._hideButtons(), a.plugins.wordpress._showButtons(c, "wp_gallerybtns"))
            })
        }), a.onMouseDown.add(function (a, b) {
            "IMG" == b.target.nodeName && a.dom.hasClass(b.target, "wp-gallery") && (a.plugins.wordpress._hideButtons(), a.plugins.wordpress._showButtons(b.target, "wp_gallerybtns"))
        }), a.onBeforeSetContent.add(function (a, b) {
            b.content = c._do_gallery(b.content)
        }), a.onPostProcess.add(function (a, b) {
            b.get && (b.content = c._get_gallery(b.content))
        })
    }, _do_gallery: function (a) {
        return a.replace(/\[gallery([^\]]*)\]/g, function (a, b) {
            return'<img src="' + tinymce.baseURL + '/plugins/wpgallery/img/t.gif" class="wp-gallery mceItem" title="gallery' + tinymce.DOM.encode(b) + '" />'
        })
    }, _get_gallery: function (a) {
        function b(a, b) {
            return b = new RegExp(b + '="([^"]+)"', "g").exec(a), b ? tinymce.DOM.decode(b[1]) : ""
        }

        return a.replace(/(?:<p[^>]*>)*(<img[^>]+>)(?:<\/p>)*/g, function (a, c) {
            var d = b(c, "class");
            return-1 != d.indexOf("wp-gallery") ? "<p>[" + tinymce.trim(b(c, "title")) + "]</p>" : a
        })
    }, _createButtons: function () {
        var a, b, c, d = this, e = tinymce.activeEditor, f = tinymce.DOM;
        f.get("wp_gallerybtns") || (c = window.devicePixelRatio && window.devicePixelRatio > 1 || window.matchMedia && window.matchMedia("(min-resolution:130dpi)").matches, f.add(document.body, "div", {id: "wp_gallerybtns", style: "display:none;"}), a = f.add("wp_gallerybtns", "img", {src: c ? d.url + "/img/edit-2x.png" : d.url + "/img/edit.png", id: "wp_editgallery", width: "24", height: "24", title: e.getLang("wordpress.editgallery")}), tinymce.dom.Event.add(a, "mousedown", function () {
            var a = tinymce.activeEditor;
            a.wpGalleryBookmark = a.selection.getBookmark("simple"), a.execCommand("WP_Gallery"), a.plugins.wordpress._hideButtons()
        }), b = f.add("wp_gallerybtns", "img", {src: c ? d.url + "/img/delete-2x.png" : d.url + "/img/delete.png", id: "wp_delgallery", width: "24", height: "24", title: e.getLang("wordpress.delgallery")}), tinymce.dom.Event.add(b, "mousedown", function (a) {
            var b = tinymce.activeEditor, c = b.selection.getNode();
            "IMG" == c.nodeName && b.dom.hasClass(c, "wp-gallery") && (b.dom.remove(c), b.execCommand("mceRepaint"), b.dom.events.cancel(a)), b.plugins.wordpress._hideButtons()
        }))
    }, getInfo: function () {
        return{longname: "Gallery Settings", author: "WordPress", authorurl: "http://wordpress.org", infourl: "", version: "1.0"}
    }}), tinymce.PluginManager.add("wpgallery", tinymce.plugins.wpGallery)
}();