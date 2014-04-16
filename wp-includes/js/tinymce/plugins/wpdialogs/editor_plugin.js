!function () {
    tinymce.create("tinymce.plugins.WPDialogs", {init: function (a) {
        tinymce.create("tinymce.WPWindowManager:tinymce.InlineWindowManager", {WPWindowManager: function (a) {
            this.parent(a)
        }, open: function (a, b) {
            var c, d = this;
            return a.wpDialog ? (a.id && (c = jQuery("#" + a.id), c.length && (d.features = a, d.params = b, d.onOpen.dispatch(d, a, b), d.element = d.windows[a.id] = c, d.bookmark = d.editor.selection.getBookmark(1), c.data("wpdialog") || c.wpdialog({title: a.title, width: a.width, height: a.height, modal: !0, dialogClass: "wp-dialog", zIndex: 3e5}), c.wpdialog("open"))), void 0) : this.parent(a, b)
        }, close: function () {
            return this.features.wpDialog ? (this.element.wpdialog("close"), void 0) : this.parent.apply(this, arguments)
        }}), a.onBeforeRenderUI.add(function () {
            a.windowManager = new tinymce.WPWindowManager(a)
        })
    }, getInfo: function () {
        return{longname: "WPDialogs", author: "WordPress", authorurl: "http://wordpress.org", infourl: "http://wordpress.org", version: "0.1"}
    }}), tinymce.PluginManager.add("wpdialogs", tinymce.plugins.WPDialogs)
}();