/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	var each = tinymce.each;

	tinymce.create('tinymce.plugins.AdvListPlugin', {
		init : function(ed, url) {
			var t = this;

			t.editor = ed;

			function buildFormats(str) {
				var formats = [];

				each(str.split(/,/), function(type) {
					formats.push({
						title : 'advlist.' + (type == 'default' ? 'def' : type.replace(/-/g, '_')),
						styles : {
							listStyleType : type == 'default' ? '' : type
						}
					});
				});

				return formats;
			};

			// Setup number formats from config or default
			t.numlist = ed.getParam("advlist_number_styles") || buildFormats("default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman");
			t.bullist = ed.getParam("advlist_bullet_styles") || buildFormats("default,circle,disc,square");

			if (tinymce.isIE && /MSIE [2-7]/.test(navigator.userAgent))
				t.isIE7 = true;
		},

		createControl: function(name, cm) {
<<<<<<< HEAD
			var t = this, btn, format;
=======
			var t = this, btn, format, editor = t.editor;
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

			if (name == 'numlist' || name == 'bullist') {
				// Default to first item if it's a default item
				if (t[name][0].title == 'advlist.def')
					format = t[name][0];

				function hasFormat(node, format) {
					var state = true;

					each(format.styles, function(value, name) {
						// Format doesn't match
<<<<<<< HEAD
						if (t.editor.dom.getStyle(node, name) != value) {
=======
						if (editor.dom.getStyle(node, name) != value) {
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
							state = false;
							return false;
						}
					});

					return state;
				};

				function applyListFormat() {
<<<<<<< HEAD
					var list, ed = t.editor, dom = ed.dom, sel = ed.selection;
=======
					var list, dom = editor.dom, sel = editor.selection;
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

					// Check for existing list element
					list = dom.getParent(sel.getNode(), 'ol,ul');

					// Switch/add list type if needed
					if (!list || list.nodeName == (name == 'bullist' ? 'OL' : 'UL') || hasFormat(list, format))
<<<<<<< HEAD
						ed.execCommand(name == 'bullist' ? 'InsertUnorderedList' : 'InsertOrderedList');
=======
						editor.execCommand(name == 'bullist' ? 'InsertUnorderedList' : 'InsertOrderedList');
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

					// Append styles to new list element
					if (format) {
						list = dom.getParent(sel.getNode(), 'ol,ul');
						if (list) {
							dom.setStyles(list, format.styles);
							list.removeAttribute('data-mce-style');
						}
					}
<<<<<<< HEAD
					ed.focus();
=======

					editor.focus();
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
				};

				btn = cm.createSplitButton(name, {
					title : 'advanced.' + name + '_desc',
					'class' : 'mce_' + name,
					onclick : function() {
						applyListFormat();
					}
				});

				btn.onRenderMenu.add(function(btn, menu) {
<<<<<<< HEAD
					menu.onShowMenu.add(function() {
						var dom = t.editor.dom, list = dom.getParent(t.editor.selection.getNode(), 'ol,ul'), fmtList;
=======
					menu.onHideMenu.add(function() {
						if (t.bookmark) {
							editor.selection.moveToBookmark(t.bookmark);
							t.bookmark = 0;
						}
					});

					menu.onShowMenu.add(function() {
						var dom = editor.dom, list = dom.getParent(editor.selection.getNode(), 'ol,ul'), fmtList;
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

						if (list || format) {
							fmtList = t[name];

							// Unselect existing items
							each(menu.items, function(item) {
								var state = true;

								item.setSelected(0);

								if (list && !item.isDisabled()) {
									each(fmtList, function(fmt) {
										if (fmt.id == item.id) {
											if (!hasFormat(list, fmt)) {
												state = false;
												return false;
											}
										}
									});

									if (state)
										item.setSelected(1);
								}
							});

							// Select the current format
							if (!list)
								menu.items[format.id].setSelected(1);
						}
<<<<<<< HEAD
					});

					menu.add({id : t.editor.dom.uniqueId(), title : 'advlist.types', 'class' : 'mceMenuItemTitle', titleItem: true}).setDisabled(1);
=======
	
						editor.focus();

						// IE looses it's selection so store it away and restore it later
						if (tinymce.isIE) {
							t.bookmark = editor.selection.getBookmark(1);
						}
					});

					menu.add({id : editor.dom.uniqueId(), title : 'advlist.types', 'class' : 'mceMenuItemTitle', titleItem: true}).setDisabled(1);
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

					each(t[name], function(item) {
						// IE<8 doesn't support lower-greek, skip it
						if (t.isIE7 && item.styles.listStyleType == 'lower-greek')
							return;

<<<<<<< HEAD
						item.id = t.editor.dom.uniqueId();
=======
						item.id = editor.dom.uniqueId();
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

						menu.add({id : item.id, title : item.title, onclick : function() {
							format = item;
							applyListFormat();
						}});
					});
				});

				return btn;
			}
		},

		getInfo : function() {
			return {
				longname : 'Advanced lists',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/advlist',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('advlist', tinymce.plugins.AdvListPlugin);
})();