<<<<<<< HEAD
tinyMCEPopup.requireLangPack();

var oldWidth, oldHeight, ed, url;

if (url = tinyMCEPopup.getParam("media_external_list_url"))
	document.write('<script language="javascript" type="text/javascript" src="' + tinyMCEPopup.editor.documentBaseURI.toAbsolute(url) + '"></script>');

function init() {
	var pl = "", f, val;
	var type = "flash", fe, i;

	ed = tinyMCEPopup.editor;

	tinyMCEPopup.resizeToInnerSize();
	f = document.forms[0]

	fe = ed.selection.getNode();
	if (/mceItem(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)/.test(ed.dom.getAttrib(fe, 'class'))) {
		pl = fe.title;

		switch (ed.dom.getAttrib(fe, 'class')) {
			case 'mceItemFlash':
				type = 'flash';
				break;

			case 'mceItemFlashVideo':
				type = 'flv';
				break;

			case 'mceItemShockWave':
				type = 'shockwave';
				break;

			case 'mceItemWindowsMedia':
				type = 'wmp';
				break;

			case 'mceItemQuickTime':
				type = 'qt';
				break;

			case 'mceItemRealMedia':
				type = 'rmp';
				break;
		}

		document.forms[0].insert.value = ed.getLang('update', 'Insert', true); 
	}

	document.getElementById('filebrowsercontainer').innerHTML = getBrowserHTML('filebrowser','src','media','media');
	document.getElementById('qtsrcfilebrowsercontainer').innerHTML = getBrowserHTML('qtsrcfilebrowser','qt_qtsrc','media','media');
	document.getElementById('bgcolor_pickcontainer').innerHTML = getColorPickerHTML('bgcolor_pick','bgcolor');

	var html = getMediaListHTML('medialist','src','media','media');
	if (html == "")
		document.getElementById("linklistrow").style.display = 'none';
	else
		document.getElementById("linklistcontainer").innerHTML = html;

	// Resize some elements
	if (isVisible('filebrowser'))
		document.getElementById('src').style.width = '230px';

	// Setup form
	if (pl != "") {
		pl = tinyMCEPopup.editor.plugins.media._parse(pl);

		switch (type) {
			case "flash":
				setBool(pl, 'flash', 'play');
				setBool(pl, 'flash', 'loop');
				setBool(pl, 'flash', 'menu');
				setBool(pl, 'flash', 'swliveconnect');
				setStr(pl, 'flash', 'quality');
				setStr(pl, 'flash', 'scale');
				setStr(pl, 'flash', 'salign');
				setStr(pl, 'flash', 'wmode');
				setStr(pl, 'flash', 'base');
				setStr(pl, 'flash', 'flashvars');
			break;

			case "qt":
				setBool(pl, 'qt', 'loop');
				setBool(pl, 'qt', 'autoplay');
				setBool(pl, 'qt', 'cache');
				setBool(pl, 'qt', 'controller');
				setBool(pl, 'qt', 'correction');
				setBool(pl, 'qt', 'enablejavascript');
				setBool(pl, 'qt', 'kioskmode');
				setBool(pl, 'qt', 'autohref');
				setBool(pl, 'qt', 'playeveryframe');
				setBool(pl, 'qt', 'tarsetcache');
				setStr(pl, 'qt', 'scale');
				setStr(pl, 'qt', 'starttime');
				setStr(pl, 'qt', 'endtime');
				setStr(pl, 'qt', 'tarset');
				setStr(pl, 'qt', 'qtsrcchokespeed');
				setStr(pl, 'qt', 'volume');
				setStr(pl, 'qt', 'qtsrc');
			break;

			case "shockwave":
				setBool(pl, 'shockwave', 'sound');
				setBool(pl, 'shockwave', 'progress');
				setBool(pl, 'shockwave', 'autostart');
				setBool(pl, 'shockwave', 'swliveconnect');
				setStr(pl, 'shockwave', 'swvolume');
				setStr(pl, 'shockwave', 'swstretchstyle');
				setStr(pl, 'shockwave', 'swstretchhalign');
				setStr(pl, 'shockwave', 'swstretchvalign');
			break;

			case "wmp":
				setBool(pl, 'wmp', 'autostart');
				setBool(pl, 'wmp', 'enabled');
				setBool(pl, 'wmp', 'enablecontextmenu');
				setBool(pl, 'wmp', 'fullscreen');
				setBool(pl, 'wmp', 'invokeurls');
				setBool(pl, 'wmp', 'mute');
				setBool(pl, 'wmp', 'stretchtofit');
				setBool(pl, 'wmp', 'windowlessvideo');
				setStr(pl, 'wmp', 'balance');
				setStr(pl, 'wmp', 'baseurl');
				setStr(pl, 'wmp', 'captioningid');
				setStr(pl, 'wmp', 'currentmarker');
				setStr(pl, 'wmp', 'currentposition');
				setStr(pl, 'wmp', 'defaultframe');
				setStr(pl, 'wmp', 'playcount');
				setStr(pl, 'wmp', 'rate');
				setStr(pl, 'wmp', 'uimode');
				setStr(pl, 'wmp', 'volume');
			break;

			case "rmp":
				setBool(pl, 'rmp', 'autostart');
				setBool(pl, 'rmp', 'loop');
				setBool(pl, 'rmp', 'autogotourl');
				setBool(pl, 'rmp', 'center');
				setBool(pl, 'rmp', 'imagestatus');
				setBool(pl, 'rmp', 'maintainaspect');
				setBool(pl, 'rmp', 'nojava');
				setBool(pl, 'rmp', 'prefetch');
				setBool(pl, 'rmp', 'shuffle');
				setStr(pl, 'rmp', 'console');
				setStr(pl, 'rmp', 'controls');
				setStr(pl, 'rmp', 'numloop');
				setStr(pl, 'rmp', 'scriptcallbacks');
			break;
		}

		setStr(pl, null, 'src');
		setStr(pl, null, 'id');
		setStr(pl, null, 'name');
		setStr(pl, null, 'vspace');
		setStr(pl, null, 'hspace');
		setStr(pl, null, 'bgcolor');
		setStr(pl, null, 'align');
		setStr(pl, null, 'width');
		setStr(pl, null, 'height');

		if ((val = ed.dom.getAttrib(fe, "width")) != "")
			pl.width = f.width.value = val;

		if ((val = ed.dom.getAttrib(fe, "height")) != "")
			pl.height = f.height.value = val;

		oldWidth = pl.width ? parseInt(pl.width) : 0;
		oldHeight = pl.height ? parseInt(pl.height) : 0;
	} else
		oldWidth = oldHeight = 0;

	selectByValue(f, 'media_type', type);
	changedType(type);
	updateColor('bgcolor_pick', 'bgcolor');

	TinyMCE_EditableSelects.init();
	generatePreview();
}

function insertMedia() {
	var fe, f = document.forms[0], h;

	tinyMCEPopup.restoreSelection();

	if (!AutoValidator.validate(f)) {
		tinyMCEPopup.alert(ed.getLang('invalid_data'));
		return false;
	}

	f.width.value = f.width.value == "" ? 100 : f.width.value;
	f.height.value = f.height.value == "" ? 100 : f.height.value;

	fe = ed.selection.getNode();
	if (fe != null && /mceItem(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)/.test(ed.dom.getAttrib(fe, 'class'))) {
		switch (f.media_type.options[f.media_type.selectedIndex].value) {
			case "flash":
				fe.className = "mceItemFlash";
				break;

			case "flv":
				fe.className = "mceItemFlashVideo";
				break;

			case "shockwave":
				fe.className = "mceItemShockWave";
				break;

			case "qt":
				fe.className = "mceItemQuickTime";
				break;

			case "wmp":
				fe.className = "mceItemWindowsMedia";
				break;

			case "rmp":
				fe.className = "mceItemRealMedia";
				break;
		}

		if (fe.width != f.width.value || fe.height != f.height.value)
			ed.execCommand('mceRepaint');

		fe.title = serializeParameters();
		fe.width = f.width.value;
		fe.height = f.height.value;
		fe.style.width = f.width.value + (f.width.value.indexOf('%') == -1 ? 'px' : '');
		fe.style.height = f.height.value + (f.height.value.indexOf('%') == -1 ? 'px' : '');
		fe.align = f.align.options[f.align.selectedIndex].value;
	} else {
		h = '<img src="' + tinyMCEPopup.getWindowArg("plugin_url") + '/img/trans.gif"' ;

		switch (f.media_type.options[f.media_type.selectedIndex].value) {
			case "flash":
				h += ' class="mceItemFlash"';
				break;

			case "flv":
				h += ' class="mceItemFlashVideo"';
				break;

			case "shockwave":
				h += ' class="mceItemShockWave"';
				break;

			case "qt":
				h += ' class="mceItemQuickTime"';
				break;

			case "wmp":
				h += ' class="mceItemWindowsMedia"';
				break;

			case "rmp":
				h += ' class="mceItemRealMedia"';
				break;
		}

		h += ' title="' + serializeParameters() + '"';
		h += ' width="' + f.width.value + '"';
		h += ' height="' + f.height.value + '"';
		h += ' align="' + f.align.options[f.align.selectedIndex].value + '"';

		h += ' />';

		ed.execCommand('mceInsertContent', false, h);
	}

	tinyMCEPopup.close();
}

function updatePreview() {
	var f = document.forms[0], type;

	f.width.value = f.width.value || '320';
	f.height.value = f.height.value || '240';

	type = getType(f.src.value);
	selectByValue(f, 'media_type', type);
	changedType(type);
	generatePreview();
}

function getMediaListHTML() {
	if (typeof(tinyMCEMediaList) != "undefined" && tinyMCEMediaList.length > 0) {
		var html = "";

		html += '<select id="linklist" name="linklist" style="width: 250px" onchange="this.form.src.value=this.options[this.selectedIndex].value;updatePreview();">';
		html += '<option value="">---</option>';

		for (var i=0; i<tinyMCEMediaList.length; i++)
			html += '<option value="' + tinyMCEMediaList[i][1] + '">' + tinyMCEMediaList[i][0] + '</option>';

		html += '</select>';

		return html;
	}

	return "";
}

function getType(v) {
	var fo, i, c, el, x, f = document.forms[0];

	fo = ed.getParam("media_types", "flash=swf;flv=flv;shockwave=dcr;qt=mov,qt,mpg,mp3,mp4,mpeg;shockwave=dcr;wmp=avi,wmv,wm,asf,asx,wmx,wvx;rmp=rm,ra,ram").split(';');

	// YouTube
	if (v.match(/watch\?v=(.+)(.*)/)) {
		f.width.value = '425';
		f.height.value = '350';
		f.src.value = 'http://www.youtube.com/v/' + v.match(/v=(.*)(.*)/)[0].split('=')[1];
		return 'flash';
	}

	// Google video
	if (v.indexOf('http://video.google.com/videoplay?docid=') == 0) {
		f.width.value = '425';
		f.height.value = '326';
		f.src.value = 'http://video.google.com/googleplayer.swf?docId=' + v.substring('http://video.google.com/videoplay?docid='.length) + '&hl=en';
		return 'flash';
	}

	for (i=0; i<fo.length; i++) {
		c = fo[i].split('=');

		el = c[1].split(',');
		for (x=0; x<el.length; x++)
		if (v.indexOf('.' + el[x]) != -1)
			return c[0];
	}

	return null;
}

function switchType(v) {
	var t = getType(v), d = document, f = d.forms[0];

	if (!t)
		return;

	selectByValue(d.forms[0], 'media_type', t);
	changedType(t);

	// Update qtsrc also
	if (t == 'qt' && f.src.value.toLowerCase().indexOf('rtsp://') != -1) {
		alert(ed.getLang("media_qt_stream_warn"));

		if (f.qt_qtsrc.value == '')
			f.qt_qtsrc.value = f.src.value;
	}
}

function changedType(t) {
	var d = document;

	d.getElementById('flash_options').style.display = 'none';
	d.getElementById('flv_options').style.display = 'none';
	d.getElementById('qt_options').style.display = 'none';
	d.getElementById('shockwave_options').style.display = 'none';
	d.getElementById('wmp_options').style.display = 'none';
	d.getElementById('rmp_options').style.display = 'none';

	if (t)
		d.getElementById(t + '_options').style.display = 'block';
}

function serializeParameters() {
	var d = document, f = d.forms[0], s = '';

	switch (f.media_type.options[f.media_type.selectedIndex].value) {
		case "flash":
			s += getBool('flash', 'play', true);
			s += getBool('flash', 'loop', true);
			s += getBool('flash', 'menu', true);
			s += getBool('flash', 'swliveconnect', false);
			s += getStr('flash', 'quality');
			s += getStr('flash', 'scale');
			s += getStr('flash', 'salign');
			s += getStr('flash', 'wmode');
			s += getStr('flash', 'base');
			s += getStr('flash', 'flashvars');
		break;

		case "qt":
			s += getBool('qt', 'loop', false);
			s += getBool('qt', 'autoplay', true);
			s += getBool('qt', 'cache', false);
			s += getBool('qt', 'controller', true);
			s += getBool('qt', 'correction', false, 'none', 'full');
			s += getBool('qt', 'enablejavascript', false);
			s += getBool('qt', 'kioskmode', false);
			s += getBool('qt', 'autohref', false);
			s += getBool('qt', 'playeveryframe', false);
			s += getBool('qt', 'targetcache', false);
			s += getStr('qt', 'scale');
			s += getStr('qt', 'starttime');
			s += getStr('qt', 'endtime');
			s += getStr('qt', 'target');
			s += getStr('qt', 'qtsrcchokespeed');
			s += getStr('qt', 'volume');
			s += getStr('qt', 'qtsrc');
		break;

		case "shockwave":
			s += getBool('shockwave', 'sound');
			s += getBool('shockwave', 'progress');
			s += getBool('shockwave', 'autostart');
			s += getBool('shockwave', 'swliveconnect');
			s += getStr('shockwave', 'swvolume');
			s += getStr('shockwave', 'swstretchstyle');
			s += getStr('shockwave', 'swstretchhalign');
			s += getStr('shockwave', 'swstretchvalign');
		break;

		case "wmp":
			s += getBool('wmp', 'autostart', true);
			s += getBool('wmp', 'enabled', false);
			s += getBool('wmp', 'enablecontextmenu', true);
			s += getBool('wmp', 'fullscreen', false);
			s += getBool('wmp', 'invokeurls', true);
			s += getBool('wmp', 'mute', false);
			s += getBool('wmp', 'stretchtofit', false);
			s += getBool('wmp', 'windowlessvideo', false);
			s += getStr('wmp', 'balance');
			s += getStr('wmp', 'baseurl');
			s += getStr('wmp', 'captioningid');
			s += getStr('wmp', 'currentmarker');
			s += getStr('wmp', 'currentposition');
			s += getStr('wmp', 'defaultframe');
			s += getStr('wmp', 'playcount');
			s += getStr('wmp', 'rate');
			s += getStr('wmp', 'uimode');
			s += getStr('wmp', 'volume');
		break;

		case "rmp":
			s += getBool('rmp', 'autostart', false);
			s += getBool('rmp', 'loop', false);
			s += getBool('rmp', 'autogotourl', true);
			s += getBool('rmp', 'center', false);
			s += getBool('rmp', 'imagestatus', true);
			s += getBool('rmp', 'maintainaspect', false);
			s += getBool('rmp', 'nojava', false);
			s += getBool('rmp', 'prefetch', false);
			s += getBool('rmp', 'shuffle', false);
			s += getStr('rmp', 'console');
			s += getStr('rmp', 'controls');
			s += getStr('rmp', 'numloop');
			s += getStr('rmp', 'scriptcallbacks');
		break;
	}

	s += getStr(null, 'id');
	s += getStr(null, 'name');
	s += getStr(null, 'src');
	s += getStr(null, 'align');
	s += getStr(null, 'bgcolor');
	s += getInt(null, 'vspace');
	s += getInt(null, 'hspace');
	s += getStr(null, 'width');
	s += getStr(null, 'height');

	s = s.length > 0 ? s.substring(0, s.length - 1) : s;

	return s;
}

function setBool(pl, p, n) {
	if (typeof(pl[n]) == "undefined")
		return;

	document.forms[0].elements[p + "_" + n].checked = pl[n] != 'false';
}

function setStr(pl, p, n) {
	var f = document.forms[0], e = f.elements[(p != null ? p + "_" : '') + n];

	if (typeof(pl[n]) == "undefined")
		return;

	if (e.type == "text")
		e.value = pl[n];
	else
		selectByValue(f, (p != null ? p + "_" : '') + n, pl[n]);
}

function getBool(p, n, d, tv, fv) {
	var v = document.forms[0].elements[p + "_" + n].checked;

	tv = typeof(tv) == 'undefined' ? 'true' : "'" + jsEncode(tv) + "'";
	fv = typeof(fv) == 'undefined' ? 'false' : "'" + jsEncode(fv) + "'";

	return (v == d) ? '' : n + (v ? ':' + tv + ',' : ":\'" + fv + "\',");
}

function getStr(p, n, d) {
	var e = document.forms[0].elements[(p != null ? p + "_" : "") + n];
	var v = e.type == "text" ? e.value : e.options[e.selectedIndex].value;

	if (n == 'src')
		v = tinyMCEPopup.editor.convertURL(v, 'src', null);

	return ((n == d || v == '') ? '' : n + ":'" + jsEncode(v) + "',");
}

function getInt(p, n, d) {
	var e = document.forms[0].elements[(p != null ? p + "_" : "") + n];
	var v = e.type == "text" ? e.value : e.options[e.selectedIndex].value;

	return ((n == d || v == '') ? '' : n + ":" + v.replace(/[^0-9]+/g, '') + ",");
}

function jsEncode(s) {
	s = s.replace(new RegExp('\\\\', 'g'), '\\\\');
	s = s.replace(new RegExp('"', 'g'), '\\"');
	s = s.replace(new RegExp("'", 'g'), "\\'");

	return s;
}

function generatePreview(c) {
	var f = document.forms[0], p = document.getElementById('prev'), h = '', cls, pl, n, type, codebase, wp, hp, nw, nh;

	p.innerHTML = '<!-- x --->';

	nw = parseInt(f.width.value);
	nh = parseInt(f.height.value);

	if (f.width.value != "" && f.height.value != "") {
		if (f.constrain.checked) {
			if (c == 'width' && oldWidth != 0) {
				wp = nw / oldWidth;
				nh = Math.round(wp * nh);
				f.height.value = nh;
			} else if (c == 'height' && oldHeight != 0) {
				hp = nh / oldHeight;
				nw = Math.round(hp * nw);
				f.width.value = nw;
			}
		}
	}

	if (f.width.value != "")
		oldWidth = nw;

	if (f.height.value != "")
		oldHeight = nh;

	// After constrain
	pl = serializeParameters();

	switch (f.media_type.options[f.media_type.selectedIndex].value) {
		case "flash":
			cls = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
			codebase = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0';
			type = 'application/x-shockwave-flash';
			break;

		case "shockwave":
			cls = 'clsid:166B1BCA-3F9C-11CF-8075-444553540000';
			codebase = 'http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0';
			type = 'application/x-director';
			break;

		case "qt":
			cls = 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B';
			codebase = 'http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0';
			type = 'video/quicktime';
			break;

		case "wmp":
			cls = ed.getParam('media_wmp6_compatible') ? 'clsid:05589FA1-C356-11CE-BF01-00AA0055595A' : 'clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6';
			codebase = 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701';
			type = 'application/x-mplayer2';
			break;

		case "rmp":
			cls = 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA';
			codebase = 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701';
			type = 'audio/x-pn-realaudio-plugin';
			break;
	}

	if (pl == '') {
		p.innerHTML = '';
		return;
	}

	pl = tinyMCEPopup.editor.plugins.media._parse(pl);

	if (!pl.src) {
		p.innerHTML = '';
		return;
	}

	pl.src = tinyMCEPopup.editor.documentBaseURI.toAbsolute(pl.src);
	pl.width = !pl.width ? 100 : pl.width;
	pl.height = !pl.height ? 100 : pl.height;
	pl.id = !pl.id ? 'obj' : pl.id;
	pl.name = !pl.name ? 'eobj' : pl.name;
	pl.align = !pl.align ? '' : pl.align;

	// Avoid annoying warning about insecure items
	if (!tinymce.isIE || document.location.protocol != 'https:') {
		h += '<object classid="' + cls + '" codebase="' + codebase + '" width="' + pl.width + '" height="' + pl.height + '" id="' + pl.id + '" name="' + pl.name + '" align="' + pl.align + '">';

		for (n in pl) {
			h += '<param name="' + n + '" value="' + pl[n] + '">';

			// Add extra url parameter if it's an absolute URL
			if (n == 'src' && pl[n].indexOf('://') != -1)
				h += '<param name="url" value="' + pl[n] + '" />';
		}
	}

	h += '<embed type="' + type + '" ';

	for (n in pl)
		h += n + '="' + pl[n] + '" ';

	h += '></embed>';

	// Avoid annoying warning about insecure items
	if (!tinymce.isIE || document.location.protocol != 'https:')
		h += '</object>';

	p.innerHTML = "<!-- x --->" + h;
}

tinyMCEPopup.onInit.add(init);
=======
(function() {
	var url;

	if (url = tinyMCEPopup.getParam("media_external_list_url"))
		document.write('<script language="javascript" type="text/javascript" src="' + tinyMCEPopup.editor.documentBaseURI.toAbsolute(url) + '"></script>');

	function get(id) {
		return document.getElementById(id);
	}

	function clone(obj) {
		var i, len, copy, attr;

		if (null == obj || "object" != typeof obj)
			return obj;

		// Handle Array
		if ('length' in obj) {
			copy = [];

			for (i = 0, len = obj.length; i < len; ++i) {
				copy[i] = clone(obj[i]);
			}

			return copy;
		}

		// Handle Object
		copy = {};
		for (attr in obj) {
			if (obj.hasOwnProperty(attr))
				copy[attr] = clone(obj[attr]);
		}

		return copy;
	}

	function getVal(id) {
		var elm = get(id);

		if (elm.nodeName == "SELECT")
			return elm.options[elm.selectedIndex].value;

		if (elm.type == "checkbox")
			return elm.checked;

		return elm.value;
	}

	function setVal(id, value, name) {
		if (typeof(value) != 'undefined' && value != null) {
			var elm = get(id);

			if (elm.nodeName == "SELECT")
				selectByValue(document.forms[0], id, value);
			else if (elm.type == "checkbox") {
				if (typeof(value) == 'string') {
					value = value.toLowerCase();
					value = (!name && value === 'true') || (name && value === name.toLowerCase());
				}
				elm.checked = !!value;
			} else
				elm.value = value;
		}
	}

	window.Media = {
		init : function() {
			var html, editor, self = this;

			self.editor = editor = tinyMCEPopup.editor;

			// Setup file browsers and color pickers
			get('filebrowsercontainer').innerHTML = getBrowserHTML('filebrowser','src','media','media');
			get('qtsrcfilebrowsercontainer').innerHTML = getBrowserHTML('qtsrcfilebrowser','quicktime_qtsrc','media','media');
			get('bgcolor_pickcontainer').innerHTML = getColorPickerHTML('bgcolor_pick','bgcolor');
			get('video_altsource1_filebrowser').innerHTML = getBrowserHTML('video_filebrowser_altsource1','video_altsource1','media','media');
			get('video_altsource2_filebrowser').innerHTML = getBrowserHTML('video_filebrowser_altsource2','video_altsource2','media','media');
			get('audio_altsource1_filebrowser').innerHTML = getBrowserHTML('audio_filebrowser_altsource1','audio_altsource1','media','media');
			get('audio_altsource2_filebrowser').innerHTML = getBrowserHTML('audio_filebrowser_altsource2','audio_altsource2','media','media');
			get('video_poster_filebrowser').innerHTML = getBrowserHTML('filebrowser_poster','video_poster','image','media');

			html = self.getMediaListHTML('medialist', 'src', 'media', 'media');
			if (html == "")
				get("linklistrow").style.display = 'none';
			else
				get("linklistcontainer").innerHTML = html;

			if (isVisible('filebrowser'))
				get('src').style.width = '230px';

			if (isVisible('video_filebrowser_altsource1'))
				get('video_altsource1').style.width = '220px';

			if (isVisible('video_filebrowser_altsource2'))
				get('video_altsource2').style.width = '220px';

			if (isVisible('audio_filebrowser_altsource1'))
				get('audio_altsource1').style.width = '220px';

			if (isVisible('audio_filebrowser_altsource2'))
				get('audio_altsource2').style.width = '220px';

			if (isVisible('filebrowser_poster'))
				get('video_poster').style.width = '220px';

			editor.dom.setOuterHTML(get('media_type'), self.getMediaTypeHTML(editor));

			self.setDefaultDialogSettings(editor);
			self.data = clone(tinyMCEPopup.getWindowArg('data'));
			self.dataToForm();
			self.preview();

			updateColor('bgcolor_pick', 'bgcolor');
		},

		insert : function() {
			var editor = tinyMCEPopup.editor;

			this.formToData();
			editor.execCommand('mceRepaint');
			tinyMCEPopup.restoreSelection();
			editor.selection.setNode(editor.plugins.media.dataToImg(this.data));
			tinyMCEPopup.close();
		},

		preview : function() {
			get('prev').innerHTML = this.editor.plugins.media.dataToHtml(this.data, true);
		},

		moveStates : function(to_form, field) {
			var data = this.data, editor = this.editor,
				mediaPlugin = editor.plugins.media, ext, src, typeInfo, defaultStates, src;

			defaultStates = {
				// QuickTime
				quicktime_autoplay : true,
				quicktime_controller : true,

				// Flash
				flash_play : true,
				flash_loop : true,
				flash_menu : true,

				// WindowsMedia
				windowsmedia_autostart : true,
				windowsmedia_enablecontextmenu : true,
				windowsmedia_invokeurls : true,

				// RealMedia
				realmedia_autogotourl : true,
				realmedia_imagestatus : true
			};

			function parseQueryParams(str) {
				var out = {};

				if (str) {
					tinymce.each(str.split('&'), function(item) {
						var parts = item.split('=');

						out[unescape(parts[0])] = unescape(parts[1]);
					});
				}

				return out;
			};

			function setOptions(type, names) {
				var i, name, formItemName, value, list;

				if (type == data.type || type == 'global') {
					names = tinymce.explode(names);
					for (i = 0; i < names.length; i++) {
						name = names[i];
						formItemName = type == 'global' ? name : type + '_' + name;

						if (type == 'global')
						list = data;
					else if (type == 'video' || type == 'audio') {
							list = data.video.attrs;

							if (!list && !to_form)
							data.video.attrs = list = {};
						} else
						list = data.params;

						if (list) {
							if (to_form) {
								setVal(formItemName, list[name], type == 'video' || type == 'audio' ? name : '');
							} else {
								delete list[name];

								value = getVal(formItemName);
								if ((type == 'video' || type == 'audio') && value === true)
									value = name;

								if (defaultStates[formItemName]) {
									if (value !== defaultStates[formItemName]) {
										value = "" + value;
										list[name] = value;
									}
								} else if (value) {
									value = "" + value;
									list[name] = value;
								}
							}
						}
					}
				}
			}

			if (!to_form) {
				data.type = get('media_type').options[get('media_type').selectedIndex].value;
				data.width = getVal('width');
				data.height = getVal('height');

				// Switch type based on extension
				src = getVal('src');
				if (field == 'src') {
					ext = src.replace(/^.*\.([^.]+)$/, '$1');
					if (typeInfo = mediaPlugin.getType(ext))
						data.type = typeInfo.name.toLowerCase();

					setVal('media_type', data.type);
				}

				if (data.type == "video" || data.type == "audio") {
					if (!data.video.sources)
						data.video.sources = [];

					data.video.sources[0] = {src: getVal('src')};
				}
			}

			// Hide all fieldsets and show the one active
			get('video_options').style.display = 'none';
			get('audio_options').style.display = 'none';
			get('flash_options').style.display = 'none';
			get('quicktime_options').style.display = 'none';
			get('shockwave_options').style.display = 'none';
			get('windowsmedia_options').style.display = 'none';
			get('realmedia_options').style.display = 'none';
			get('embeddedaudio_options').style.display = 'none';

			if (get(data.type + '_options'))
				get(data.type + '_options').style.display = 'block';

			setVal('media_type', data.type);

			setOptions('flash', 'play,loop,menu,swliveconnect,quality,scale,salign,wmode,base,flashvars');
			setOptions('quicktime', 'loop,autoplay,cache,controller,correction,enablejavascript,kioskmode,autohref,playeveryframe,targetcache,scale,starttime,endtime,target,qtsrcchokespeed,volume,qtsrc');
			setOptions('shockwave', 'sound,progress,autostart,swliveconnect,swvolume,swstretchstyle,swstretchhalign,swstretchvalign');
			setOptions('windowsmedia', 'autostart,enabled,enablecontextmenu,fullscreen,invokeurls,mute,stretchtofit,windowlessvideo,balance,baseurl,captioningid,currentmarker,currentposition,defaultframe,playcount,rate,uimode,volume');
			setOptions('realmedia', 'autostart,loop,autogotourl,center,imagestatus,maintainaspect,nojava,prefetch,shuffle,console,controls,numloop,scriptcallbacks');
			setOptions('video', 'poster,autoplay,loop,muted,preload,controls');
			setOptions('audio', 'autoplay,loop,preload,controls');
			setOptions('embeddedaudio', 'autoplay,loop,controls');
			setOptions('global', 'id,name,vspace,hspace,bgcolor,align,width,height');

			if (to_form) {
				if (data.type == 'video') {
					if (data.video.sources[0])
						setVal('src', data.video.sources[0].src);

					src = data.video.sources[1];
					if (src)
						setVal('video_altsource1', src.src);

					src = data.video.sources[2];
					if (src)
						setVal('video_altsource2', src.src);
                } else if (data.type == 'audio') {
                    if (data.video.sources[0])
                        setVal('src', data.video.sources[0].src);
                    
                    src = data.video.sources[1];
                    if (src)
                        setVal('audio_altsource1', src.src);
                    
                    src = data.video.sources[2];
                    if (src)
                        setVal('audio_altsource2', src.src);
				} else {
					// Check flash vars
					if (data.type == 'flash') {
						tinymce.each(editor.getParam('flash_video_player_flashvars', {url : '$url', poster : '$poster'}), function(value, name) {
							if (value == '$url')
								data.params.src = parseQueryParams(data.params.flashvars)[name] || data.params.src || '';
						});
					}

					setVal('src', data.params.src);
				}
			} else {
				src = getVal("src");

				// YouTube Embed
				if (src.match(/youtube\.com\/embed\/\w+/)) {
					data.width = 425;
					data.height = 350;
					data.params.frameborder = '0';
					data.type = 'iframe';
					setVal('src', src);
					setVal('media_type', data.type);
				} else {
					// YouTube *NEW*
					if (src.match(/youtu\.be\/[a-z1-9.-_]+/)) {
						data.width = 425;
						data.height = 350;
						data.params.frameborder = '0';
						data.type = 'iframe';
						src = 'http://www.youtube.com/embed/' + src.match(/youtu.be\/([a-z1-9.-_]+)/)[1];
						setVal('src', src);
						setVal('media_type', data.type);
					}

					// YouTube
					if (src.match(/youtube\.com(.+)v=([^&]+)/)) {
						data.width = 425;
						data.height = 350;
						data.params.frameborder = '0';
						data.type = 'iframe';
						src = 'http://www.youtube.com/embed/' + src.match(/v=([^&]+)/)[1];
						setVal('src', src);
						setVal('media_type', data.type);
					}
				}

				// Google video
				if (src.match(/video\.google\.com(.+)docid=([^&]+)/)) {
					data.width = 425;
					data.height = 326;
					data.type = 'flash';
					src = 'http://video.google.com/googleplayer.swf?docId=' + src.match(/docid=([^&]+)/)[1] + '&hl=en';
					setVal('src', src);
					setVal('media_type', data.type);
				}
				
				// Vimeo
				if (src.match(/vimeo\.com\/([0-9]+)/)) {
					data.width = 425;
					data.height = 350;
					data.params.frameborder = '0';
					data.type = 'iframe';
					src = 'http://player.vimeo.com/video/' + src.match(/vimeo.com\/([0-9]+)/)[1];
					setVal('src', src);
					setVal('media_type', data.type);
				}
            
				// stream.cz
				if (src.match(/stream\.cz\/((?!object).)*\/([0-9]+)/)) {
					data.width = 425;
					data.height = 350;
					data.params.frameborder = '0';
					data.type = 'iframe';
					src = 'http://www.stream.cz/object/' + src.match(/stream.cz\/[^/]+\/([0-9]+)/)[1];
					setVal('src', src);
					setVal('media_type', data.type);
				}
				
				// Google maps
				if (src.match(/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/)) {
					data.width = 425;
					data.height = 350;
					data.params.frameborder = '0';
					data.type = 'iframe';
					src = 'http://maps.google.com/maps/ms?msid=' + src.match(/msid=(.+)/)[1] + "&output=embed";
					setVal('src', src);
					setVal('media_type', data.type);
				}

				if (data.type == 'video') {
					if (!data.video.sources)
						data.video.sources = [];

					data.video.sources[0] = {src : src};

					src = getVal("video_altsource1");
					if (src)
						data.video.sources[1] = {src : src};

					src = getVal("video_altsource2");
					if (src)
						data.video.sources[2] = {src : src};
                } else if (data.type == 'audio') {
                    if (!data.video.sources)
                        data.video.sources = [];
                    
                    data.video.sources[0] = {src : src};
                    
                    src = getVal("audio_altsource1");
                    if (src)
                        data.video.sources[1] = {src : src};
                    
                    src = getVal("audio_altsource2");
                    if (src)
                        data.video.sources[2] = {src : src};
				} else
					data.params.src = src;

				// Set default size
                setVal('width', data.width || (data.type == 'audio' ? 300 : 320));
                setVal('height', data.height || (data.type == 'audio' ? 32 : 240));
			}
		},

		dataToForm : function() {
			this.moveStates(true);
		},

		formToData : function(field) {
			if (field == "width" || field == "height")
				this.changeSize(field);

			if (field == 'source') {
				this.moveStates(false, field);
				setVal('source', this.editor.plugins.media.dataToHtml(this.data));
				this.panel = 'source';
			} else {
				if (this.panel == 'source') {
					this.data = clone(this.editor.plugins.media.htmlToData(getVal('source')));
					this.dataToForm();
					this.panel = '';
				}

				this.moveStates(false, field);
				this.preview();
			}
		},

		beforeResize : function() {
            this.width = parseInt(getVal('width') || (this.data.type == 'audio' ? "300" : "320"), 10);
            this.height = parseInt(getVal('height') || (this.data.type == 'audio' ? "32" : "240"), 10);
		},

		changeSize : function(type) {
			var width, height, scale, size;

			if (get('constrain').checked) {
                width = parseInt(getVal('width') || (this.data.type == 'audio' ? "300" : "320"), 10);
                height = parseInt(getVal('height') || (this.data.type == 'audio' ? "32" : "240"), 10);

				if (type == 'width') {
					this.height = Math.round((width / this.width) * height);
					setVal('height', this.height);
				} else {
					this.width = Math.round((height / this.height) * width);
					setVal('width', this.width);
				}
			}
		},

		getMediaListHTML : function() {
			if (typeof(tinyMCEMediaList) != "undefined" && tinyMCEMediaList.length > 0) {
				var html = "";

				html += '<select id="linklist" name="linklist" style="width: 250px" onchange="this.form.src.value=this.options[this.selectedIndex].value;Media.formToData(\'src\');">';
				html += '<option value="">---</option>';

				for (var i=0; i<tinyMCEMediaList.length; i++)
					html += '<option value="' + tinyMCEMediaList[i][1] + '">' + tinyMCEMediaList[i][0] + '</option>';

				html += '</select>';

				return html;
			}

			return "";
		},

		getMediaTypeHTML : function(editor) {
			function option(media_type, element) {
				if (!editor.schema.getElementRule(element || media_type)) {
					return '';
				}

				return '<option value="'+media_type+'">'+tinyMCEPopup.editor.translate("media_dlg."+media_type)+'</option>'
			}

			var html = "";

			html += '<select id="media_type" name="media_type" onchange="Media.formToData(\'type\');">';
			html += option("video");
			html += option("audio");
			html += option("flash", "object");
			html += option("quicktime", "object");
			html += option("shockwave", "object");
			html += option("windowsmedia", "object");
			html += option("realmedia", "object");
			html += option("iframe");

			if (editor.getParam('media_embedded_audio', false)) {
				html += option('embeddedaudio', "object");
			}

			html += '</select>';
			return html;
		},

		setDefaultDialogSettings : function(editor) {
			var defaultDialogSettings = editor.getParam("media_dialog_defaults", {});
			tinymce.each(defaultDialogSettings, function(v, k) {
				setVal(k, v);
			});
		}
	};

	tinyMCEPopup.requireLangPack();
	tinyMCEPopup.onInit.add(function() {
		Media.init();
	});
})();
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
