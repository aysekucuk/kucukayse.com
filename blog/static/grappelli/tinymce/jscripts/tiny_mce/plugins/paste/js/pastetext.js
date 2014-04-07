<<<<<<< HEAD
tinyMCEPopup.requireLangPack();

function saveContent() {
	if (document.forms[0].htmlSource.value == '') {
		tinyMCEPopup.close();
		return false;
	}

	tinyMCEPopup.execCommand('mcePasteText', false, {
		html : document.forms[0].htmlSource.value,
		linebreaks : document.forms[0].linebreaks.checked
	});

	tinyMCEPopup.close();
}

function onLoadInit() {
	tinyMCEPopup.resizeToInnerSize();

	// Remove Gecko spellchecking
	if (tinymce.isGecko)
		document.body.spellcheck = tinyMCEPopup.getParam("gecko_spellcheck");

	resizeInputs();
}

var wHeight=0, wWidth=0, owHeight=0, owWidth=0;

function resizeInputs() {
	if (!tinymce.isIE) {
		wHeight = self.innerHeight-80;
		wWidth = self.innerWidth-17;
	} else {
		wHeight = document.body.clientHeight-80;
		wWidth = document.body.clientWidth-17;
	}

	document.forms[0].htmlSource.style.height = Math.abs(wHeight) + 'px';
	document.forms[0].htmlSource.style.width  = Math.abs(wWidth) + 'px';
}

tinyMCEPopup.onInit.add(onLoadInit);
=======
tinyMCEPopup.requireLangPack();

var PasteTextDialog = {
	init : function() {
		this.resize();
	},

	insert : function() {
		var h = tinyMCEPopup.dom.encode(document.getElementById('content').value), lines;

		// Convert linebreaks into paragraphs
		if (document.getElementById('linebreaks').checked) {
			lines = h.split(/\r?\n/);
			if (lines.length > 1) {
				h = '';
				tinymce.each(lines, function(row) {
					h += '<p>' + row + '</p>';
				});
			}
		}

		tinyMCEPopup.editor.execCommand('mceInsertClipboardContent', false, {content : h});
		tinyMCEPopup.close();
	},

	resize : function() {
		var vp = tinyMCEPopup.dom.getViewPort(window), el;

		el = document.getElementById('content');

		el.style.width  = (vp.w - 20) + 'px';
		el.style.height = (vp.h - 90) + 'px';
	}
};

tinyMCEPopup.onInit.add(PasteTextDialog.init, PasteTextDialog);
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
