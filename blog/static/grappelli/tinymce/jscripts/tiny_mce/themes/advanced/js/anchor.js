tinyMCEPopup.requireLangPack();

var AnchorDialog = {
	init : function(ed) {
		var action, elm, f = document.forms[0];

		this.editor = ed;
		elm = ed.dom.getParent(ed.selection.getNode(), 'A');
<<<<<<< HEAD
		v = ed.dom.getAttrib(elm, 'name');
=======
		v = ed.dom.getAttrib(elm, 'name') || ed.dom.getAttrib(elm, 'id');
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

		if (v) {
			this.action = 'update';
			f.anchorName.value = v;
		}

		f.insert.value = ed.getLang(elm ? 'update' : 'insert');
	},

	update : function() {
<<<<<<< HEAD
		var ed = this.editor, elm, name = document.forms[0].anchorName.value;
=======
		var ed = this.editor, elm, name = document.forms[0].anchorName.value, attribName;
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

		if (!name || !/^[a-z][a-z0-9\-\_:\.]*$/i.test(name)) {
			tinyMCEPopup.alert('advanced_dlg.anchor_invalid');
			return;
		}

		tinyMCEPopup.restoreSelection();

		if (this.action != 'update')
			ed.selection.collapse(1);

<<<<<<< HEAD
		elm = ed.dom.getParent(ed.selection.getNode(), 'A');
		if (elm)
			elm.name = name;
		else
			ed.execCommand('mceInsertContent', 0, ed.dom.createHTML('a', {name : name, 'class' : 'mceItemAnchor'}, ''));
=======
		var aRule = ed.schema.getElementRule('a');
		if (!aRule || aRule.attributes.name) {
			attribName = 'name';
		} else {
			attribName = 'id';
		}

		elm = ed.dom.getParent(ed.selection.getNode(), 'A');
		if (elm) {
			elm.setAttribute(attribName, name);
			elm[attribName] = name;
			ed.undoManager.add();
		} else {
			// create with zero-sized nbsp so that in Webkit where anchor is on last line by itself caret cannot be placed after it
			var attrs =  {'class' : 'mceItemAnchor'};
			attrs[attribName] = name;
			ed.execCommand('mceInsertContent', 0, ed.dom.createHTML('a', attrs, '\uFEFF'));
			ed.nodeChanged();
		}
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8

		tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(AnchorDialog.init, AnchorDialog);
