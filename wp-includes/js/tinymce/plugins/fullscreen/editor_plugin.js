(function () {
    var b = tinymce.DOM;
    var a = function (d, f, e) {
        var c = function (g) {
            var i = d.controlManager.get(g);
            var h = f.controlManager.get(g);
            if (i && h) {
                h.displayColor(i.value)
            }
        };
        c("forecolor");
        c("backcolor");
        f.setContent(d.getContent({format: "raw"}), {format: "raw"});
        f.selection.moveToBookmark(e);
        if (d.plugins.spellchecker && f.plugins.spellchecker) {
            f.plugins.spellchecker.setLanguage(d.plugins.spellchecker.selectedLang)
        }
    };
    tinymce.create("tinymce.plugins.FullScreenPlugin", {init: function (i, c) {
        var l = this, m = {}, k = b.doc.documentElement, d, o, h, g, f, e, j;
        i.addCommand("mceFullScreen", function () {
            var q, r;
            if (i.getParam("fullscreen_is_enabled")) {
                if (i.getParam("fullscreen_new_window")) {
                    closeFullscreen()
                } else {
                    b.win.setTimeout(function () {
                        var t = i;
                        var s = tinyMCE.get(t.getParam("fullscreen_editor_id"));
                        s.plugins.fullscreen.saveState(t);
                        tinyMCE.remove(t)
                    }, 10)
                }
                return
            }
            if (i.getParam("fullscreen_new_window")) {
                l.fullscreenSettings = {bookmark: i.selection.getBookmark()};
                q = b.win.open(c + "/fullscreen.htm", "mceFullScreenPopup", "fullscreen=yes,menubar=no,toolbar=no,scrollbars=no,resizable=yes,left=0,top=0,width=" + screen.availWidth + ",height=" + screen.availHeight);
                try {
                    q.resizeTo(screen.availWidth, screen.availHeight)
                } catch (p) {
                }
            } else {
                o = b.getStyle(b.doc.body, "overflow", 1) || "auto";
                h = b.getStyle(k, "overflow", 1);
                d = b.getViewPort();
                g = d.x;
                f = d.y;
                if (tinymce.isOpera && o == "visible") {
                    o = "auto"
                }
                if (tinymce.isIE && o == "scroll") {
                    o = "auto"
                }
                if (tinymce.isIE && (h == "visible" || h == "scroll")) {
                    h = "auto"
                }
                if (o == "0px") {
                    o = ""
                }
                b.setStyle(b.doc.body, "overflow", "hidden");
                k.style.overflow = "hidden";
                d = b.getViewPort();
                b.win.scrollTo(0, 0);
                if (tinymce.isIE) {
                    d.h -= 1
                }
                if (tinymce.isIE6 || document.compatMode == "BackCompat") {
                    e = "absolute;top:" + d.y
                } else {
                    e = "fixed;top:0"
                }
                n = b.add(b.doc.body, "div", {id: "mce_fullscreen_container", style: "position:" + e + ";left:0;width:" + d.w + "px;height:" + d.h + "px;z-index:200000;"});
                b.add(n, "div", {id: "mce_fullscreen"});
                tinymce.each(i.settings, function (s, t) {
                    m[t] = s
                });
                m.id = "mce_fullscreen";
                m.width = n.clientWidth;
                m.height = n.clientHeight - 15;
                m.fullscreen_is_enabled = true;
                m.fullscreen_editor_id = i.id;
                m.theme_advanced_resizing = false;
                m.save_onsavecallback = function () {
                    i.setContent(tinyMCE.get(m.id).getContent());
                    i.execCommand("mceSave")
                };
                tinymce.each(i.getParam("fullscreen_settings"), function (t, s) {
                    m[s] = t
                });
                l.fullscreenSettings = {bookmark: i.selection.getBookmark(), fullscreen_overflow: o, fullscreen_html_overflow: h, fullscreen_scrollx: g, fullscreen_scrolly: f};
                if (m.theme_advanced_toolbar_location === "external") {
                    m.theme_advanced_toolbar_location = "top"
                }
                tinyMCE.oldSettings = tinyMCE.settings;
                l.fullscreenEditor = new tinymce.Editor("mce_fullscreen", m);
                l.fullscreenEditor.onInit.add(function () {
                    l.loadState(l.fullscreenEditor)
                });
                l.fullscreenEditor.render();
                l.fullscreenElement = new tinymce.dom.Element("mce_fullscreen_container");
                l.fullscreenElement.update();
                l.resizeFunc = tinymce.dom.Event.add(b.win, "resize", function () {
                    var v = tinymce.DOM.getViewPort(), t = l.fullscreenEditor, s, u;
                    s = t.dom.getSize(t.getContainer().getElementsByTagName("table")[0]);
                    u = t.dom.getSize(t.getContainer().getElementsByTagName("iframe")[0]);
                    t.theme.resizeTo(v.w - s.w + u.w, v.h - s.h + u.h)
                })
            }
        });
        i.addButton("fullscreen", {title: "fullscreen.desc", cmd: "mceFullScreen"});
        i.onNodeChange.add(function (q, p) {
            p.setActive("fullscreen", q.getParam("fullscreen_is_enabled"))
        });
        l.loadState = function (p) {
            if (!(p && l.fullscreenSettings)) {
                throw"No fullscreen editor to load to"
            }
            a(i, p, l.fullscreenSettings.bookmark);
            p.focus()
        };
        l.saveState = function (q) {
            if (!(q && l.fullscreenSettings)) {
                throw"No fullscreen editor to restore from"
            }
            var p = l.fullscreenSettings;
            a(q, i, q.selection.getBookmark());
            if (!i.getParam("fullscreen_new_window")) {
                tinymce.dom.Event.remove(b.win, "resize", l.resizeFunc);
                delete l.resizeFunc;
                b.remove("mce_fullscreen_container");
                b.doc.documentElement.style.overflow = p.fullscreen_html_overflow;
                b.setStyle(b.doc.body, "overflow", p.fullscreen_overflow);
                b.win.scrollTo(p.fullscreen_scrollx, p.fullscreen_scrolly)
            }
            tinyMCE.settings = tinyMCE.oldSettings;
            delete tinyMCE.oldSettings;
            delete l.fullscreenEditor;
            delete l.fullscreenElement;
            delete l.fullscreenSettings;
            b.win.setTimeout(function () {
                i.selection.moveToBookmark(j);
                i.focus()
            }, 10)
        }
    }, getInfo: function () {
        return{longname: "Fullscreen", author: "Moxiecode Systems AB", authorurl: "http://tinymce.moxiecode.com", infourl: "http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/fullscreen", version: tinymce.majorVersion + "." + tinymce.minorVersion}
    }});
    tinymce.PluginManager.add("fullscreen", tinymce.plugins.FullScreenPlugin)
})();