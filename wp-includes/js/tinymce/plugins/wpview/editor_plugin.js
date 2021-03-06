!function () {
    var a, b = tinymce.VK, c = tinymce.dom.TreeWalker;
    tinymce.create("tinymce.plugins.wpView", {init: function (d) {
        var e = this;
        "undefined" != typeof wp && wp.mce && (d.onPreInit.add(function (a) {
            a.schema.addValidElements("div[*],span[*]")
        }), d.onBeforeSetContent.add(function (a, b) {
            b.content && (b.content = wp.mce.view.toViews(b.content))
        }), d.onSetContent.add(function (a) {
            wp.mce.view.render(a.getDoc())
        }), d.onInit.add(function (a) {
            a.selection.onBeforeSetContent.add(function (b) {
                var d, f, g = e.getParentView(b.getNode());
                g && (!g.nextSibling || e.isView(g.nextSibling) ? (f = a.getDoc().createTextNode(""), a.dom.insertAfter(f, g)) : (d = new c(g.nextSibling, g.nextSibling), f = d.next()), b.select(f), b.collapse(!0))
            }), a.selection.onSetContent.add(function (a, b) {
                if (b.context) {
                    var c = a.getNode();
                    c.innerHTML && (c.innerHTML = wp.mce.view.toViews(c.innerHTML), wp.mce.view.render(c))
                }
            })
        }), d.onPostProcess.add(function (a, b) {
            (b.get || b.save) && b.content && (b.content = wp.mce.view.toText(b.content))
        }), d.onNodeChange.addToTop(function (a, b, c) {
            var d = e.getParentView(c);
            return d ? (e.select(d), !1) : (e.deselect(), void 0)
        }), d.onKeyDown.addToTop(function (c, d) {
            var f, g, h = d.keyCode;
            if (a) {
                if (f = e.getParentView(c.selection.getNode()), f !== a)return e.deselect(), void 0;
                (h === b.DELETE || h === b.BACKSPACE) && (g = wp.mce.view.instance(a)) && (g.remove(), e.deselect()), d.metaKey || d.ctrlKey || h >= 112 && 123 >= h || d.preventDefault()
            }
        }))
    }, getParentView: function (a) {
        for (; a;) {
            if (this.isView(a))return a;
            a = a.parentNode
        }
    }, isView: function (a) {
        return/(?:^|\s)wp-view-wrap(?:\s|$)/.test(a.className)
    }, select: function (b) {
        b !== a && (this.deselect(), a = b, wp.mce.view.select(a))
    }, deselect: function () {
        a && wp.mce.view.deselect(a), a = null
    }, getInfo: function () {
        return{longname: "WordPress Views", author: "WordPress", authorurl: "http://wordpress.org", infourl: "http://wordpress.org", version: "1.0"}
    }}), tinymce.PluginManager.add("wpview", tinymce.plugins.wpView)
}();