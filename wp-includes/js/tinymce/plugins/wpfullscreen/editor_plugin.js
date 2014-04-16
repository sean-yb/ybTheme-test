!function () {
    tinymce.create("tinymce.plugins.wpFullscreenPlugin", {resize_timeout: !1, init: function (a) {
        function b(b, d) {
            var e, f = tinymce.DOM, g = a.getBody(), h = f.get(a.id + "_ifr"), i = a.dom.win.scrollY;
            c.resize_timeout || (c.resize_timeout = !0, setTimeout(function () {
                c.resize_timeout = !1
            }, 500), e = g.scrollHeight > 300 ? g.scrollHeight : 300, e != h.scrollHeight && (f.setStyle(h, "height", e + "px"), a.getWin().scrollTo(0, 0)), d && "paste" == d.type && tinymce.isWebKit && setTimeout(function () {
                a.dom.win.scrollTo(0, i)
            }, 40))
        }

        var c = this, d = {}, e = tinymce.DOM;
        a.addCommand("wpFullScreenClose", function () {
            a.getParam("wp_fullscreen_is_enabled") && e.win.setTimeout(function () {
                tinymce.remove(a), e.remove("wp_mce_fullscreen_parent"), tinymce.settings = tinymce.oldSettings
            }, 10)
        }), a.addCommand("wpFullScreenSave", function () {
            var a, b = tinymce.get("wp_mce_fullscreen");
            b.focus(), a = tinymce.get(b.getParam("wp_fullscreen_editor_id")), a.setContent(b.getContent({format: "raw"}), {format: "raw"})
        }), a.addCommand("wpFullScreenInit", function () {
            var b, c, e;
            a = tinymce.activeEditor, b = a.getDoc(), c = b.body, tinymce.oldSettings = tinymce.settings, tinymce.each(a.settings, function (a, b) {
                d[b] = a
            }), d.id = "wp_mce_fullscreen", d.wp_fullscreen_is_enabled = !0, d.wp_fullscreen_editor_id = a.id, d.theme_advanced_resizing = !1, d.theme_advanced_statusbar_location = "none", d.content_css = d.content_css ? d.content_css + "," + d.wp_fullscreen_content_css : d.wp_fullscreen_content_css, d.height = tinymce.isIE ? c.scrollHeight : c.offsetHeight, tinymce.each(a.getParam("wp_fullscreen_settings"), function (a, b) {
                d[b] = a
            }), e = new tinymce.Editor("wp_mce_fullscreen", d), e.onInit.add(function (b) {
                var c = tinymce.DOM, d = c.select("a.mceButton", c.get("wp-fullscreen-buttons"));
                a.isHidden() ? b.setContent(switchEditors.wpautop(b.getElement().value)) : b.setContent(a.getContent()), setTimeout(function () {
                    b.onNodeChange.add(function () {
                        tinymce.each(d, function (a) {
                            var b, d;
                            (b = c.get("wp_mce_fullscreen_" + a.id.substr(6))) && (d = b.className, d && (a.className = d))
                        })
                    })
                }, 1e3), b.dom.addClass(b.getBody(), "wp-fullscreen-editor"), b.focus()
            }), e.render(), "undefined" != fullscreen && e.dom.bind(e.dom.doc, "mousemove", function (a) {
                fullscreen.bounder("showToolbar", "hideToolbar", 2e3, a)
            })
        }), a.addCommand("wpFullScreen", function () {
            "undefined" != typeof fullscreen && ("wp_mce_fullscreen" == a.id ? fullscreen.off() : fullscreen.on())
        }), a.addButton("wp_fullscreen", {title: "wordpress.wp_fullscreen_desc", cmd: "wpFullScreen"}), !a.getParam("fullscreen_is_enabled") && a.getParam("wp_fullscreen_is_enabled") && (a.onInit.add(function (a) {
            a.onChange.add(b), a.onSetContent.add(b), a.onPaste.add(b), a.onKeyUp.add(b), a.onPostRender.add(b), a.getBody().style.overflowY = "hidden"
        }), a.getParam("autoresize_on_init", !0) && a.onLoadContent.add(function () {
            setTimeout(function () {
                b()
            }, 1200)
        }), a.addCommand("wpAutoResize", b))
    }, getInfo: function () {
        return{longname: "WP Fullscreen", author: "WordPress", authorurl: "http://wordpress.org", infourl: "", version: "1.0"}
    }}), tinymce.PluginManager.add("wpfullscreen", tinymce.plugins.wpFullscreenPlugin)
}();