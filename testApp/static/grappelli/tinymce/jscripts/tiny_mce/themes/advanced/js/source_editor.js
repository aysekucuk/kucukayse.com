tinyMCEPopup.requireLangPack();
tinyMCEPopup.onInit.add(onLoadInit);

function saveContent() {
	tinyMCEPopup.editor.setContent(document.getElementById('htmlSource').value, {source_view : true});
	tinyMCEPopup.close();
}

function onLoadInit() {
	tinyMCEPopup.resizeToInnerSize();

	// Remove Gecko spellchecking
	if (tinymce.isGecko)
		document.body.spellcheck = tinyMCEPopup.editor.getParam("gecko_spellcheck");

	document.getElementById('htmlSource').value = tinyMCEPopup.editor.getContent({source_view : true});

	if (tinyMCEPopup.editor.getParam("theme_advanced_source_editor_wrap", true)) {
<<<<<<< HEAD
		setWrap('soft');
=======
		turnWrapOn();
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
		document.getElementById('wraped').checked = true;
	}

	resizeInputs();
}

function setWrap(val) {
	var v, n, s = document.getElementById('htmlSource');

	s.wrap = val;

	if (!tinymce.isIE) {
		v = s.value;
		n = s.cloneNode(false);
		n.setAttribute("wrap", val);
		s.parentNode.replaceChild(n, s);
		n.value = v;
	}
}

<<<<<<< HEAD
function toggleWordWrap(elm) {
	if (elm.checked)
		setWrap('soft');
	else
		setWrap('off');
=======
function setWhiteSpaceCss(value) {
	var el = document.getElementById('htmlSource');
	tinymce.DOM.setStyle(el, 'white-space', value);
}

function turnWrapOff() {
	if (tinymce.isWebKit) {
		setWhiteSpaceCss('pre');
	} else {
		setWrap('off');
	}
}

function turnWrapOn() {
	if (tinymce.isWebKit) {
		setWhiteSpaceCss('pre-wrap');
	} else {
		setWrap('soft');
	}
}

function toggleWordWrap(elm) {
	if (elm.checked) {
		turnWrapOn();
	} else {
		turnWrapOff();
	}
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
}

function resizeInputs() {
	var vp = tinyMCEPopup.dom.getViewPort(window), el;

	el = document.getElementById('htmlSource');

	if (el) {
		el.style.width = (vp.w - 20) + 'px';
<<<<<<< HEAD
		el.style.height = (vp.h - 100) + 'px';
=======
		el.style.height = (vp.h - 65) + 'px';
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
	}
}
