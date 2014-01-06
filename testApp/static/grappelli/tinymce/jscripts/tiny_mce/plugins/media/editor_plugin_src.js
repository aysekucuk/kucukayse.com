<<<<<<< HEAD
/**
 * $Id: editor_plugin_src.js 906 2008-08-24 16:47:29Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright © 2004-2008, Moxiecode Systems AB, All rights reserved.
 */

(function() {
	var each = tinymce.each;

	tinymce.create('tinymce.plugins.MediaPlugin', {
		init : function(ed, url) {
			var t = this;
			
			t.editor = ed;
			t.url = url;

			function isMediaElm(n) {
				return /^(mceItemFlash|mceItemShockWave|mceItemWindowsMedia|mceItemQuickTime|mceItemRealMedia)$/.test(n.className);
			};

			ed.onPreInit.add(function() {
				// Force in _value parameter this extra parameter is required for older Opera versions
				ed.serializer.addRules('param[name|value|_value]');
			});

			// Register commands
			ed.addCommand('mceMedia', function() {
				ed.windowManager.open({
					file : url + '/media.htm',
					width : 430 + parseInt(ed.getLang('media.delta_width', 0)),
					height : 470 + parseInt(ed.getLang('media.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register buttons
			ed.addButton('media', {title : 'media.desc', cmd : 'mceMedia'});

			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('media', n.nodeName == 'IMG' && isMediaElm(n));
			});

			ed.onInit.add(function() {
				var lo = {
					mceItemFlash : 'flash',
					mceItemShockWave : 'shockwave',
					mceItemWindowsMedia : 'windowsmedia',
					mceItemQuickTime : 'quicktime',
					mceItemRealMedia : 'realmedia'
				};

				ed.selection.onSetContent.add(function() {
					t._spansToImgs(ed.getBody());
				});

				ed.selection.onBeforeSetContent.add(t._objectsToSpans, t);

				if (ed.settings.content_css !== false)
					ed.dom.loadCSS(url + "/css/content.css");

				if (ed.theme.onResolveName) {
					ed.theme.onResolveName.add(function(th, o) {
						if (o.name == 'img') {
							each(lo, function(v, k) {
								if (ed.dom.hasClass(o.node, k)) {
									o.name = v;
									o.title = ed.dom.getAttrib(o.node, 'title');
									return false;
								}
							});
						}
					});
				}

				if (ed && ed.plugins.contextmenu) {
					ed.plugins.contextmenu.onContextMenu.add(function(th, m, e) {
						if (e.nodeName == 'IMG' && /mceItem(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)/.test(e.className)) {
							m.add({title : 'media.edit', icon : 'media', cmd : 'mceMedia'});
						}
					});
				}
			});

			ed.onBeforeSetContent.add(t._objectsToSpans, t);

			ed.onSetContent.add(function() {
				t._spansToImgs(ed.getBody());
			});

			ed.onPreProcess.add(function(ed, o) {
				var dom = ed.dom;

				if (o.set) {
					t._spansToImgs(o.node);

					each(dom.select('IMG', o.node), function(n) {
						var p;

						if (isMediaElm(n)) {
							p = t._parse(n.title);
							dom.setAttrib(n, 'width', dom.getAttrib(n, 'width', p.width || 100));
							dom.setAttrib(n, 'height', dom.getAttrib(n, 'height', p.height || 100));
						}
					});
				}

				if (o.get) {
					each(dom.select('IMG', o.node), function(n) {
						var ci, cb, mt;

						if (ed.getParam('media_use_script')) {
							if (isMediaElm(n))
								n.className = n.className.replace(/mceItem/g, 'mceTemp');

							return;
						}

						switch (n.className) {
							case 'mceItemFlash':
								ci = 'd27cdb6e-ae6d-11cf-96b8-444553540000';
								cb = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0';
								mt = 'application/x-shockwave-flash';
								break;

							case 'mceItemShockWave':
								ci = '166b1bca-3f9c-11cf-8075-444553540000';
								cb = 'http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0';
								mt = 'application/x-director';
								break;

							case 'mceItemWindowsMedia':
								ci = ed.getParam('media_wmp6_compatible') ? '05589fa1-c356-11ce-bf01-00aa0055595a' : '6bf52a52-394a-11d3-b153-00c04f79faa6';
								cb = 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701';
								mt = 'application/x-mplayer2';
								break;

							case 'mceItemQuickTime':
								ci = '02bf25d5-8c17-4b23-bc80-d3488abddc6b';
								cb = 'http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0';
								mt = 'video/quicktime';
								break;

							case 'mceItemRealMedia':
								ci = 'cfcdaa03-8be4-11cf-b84b-0020afbbccfa';
								cb = 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0';
								mt = 'audio/x-pn-realaudio-plugin';
								break;
						}

						if (ci) {
							dom.replace(t._buildObj({
								classid : ci,
								codebase : cb,
								type : mt
							}, n), n);
						}
					});
				}
			});

			ed.onPostProcess.add(function(ed, o) {
				o.content = o.content.replace(/_value=/g, 'value=');
			});

			if (ed.getParam('media_use_script')) {
				function getAttr(s, n) {
					n = new RegExp(n + '=\"([^\"]+)\"', 'g').exec(s);

					return n ? ed.dom.decode(n[1]) : '';
				};

				ed.onPostProcess.add(function(ed, o) {
					o.content = o.content.replace(/<img[^>]+>/g, function(im) {
						var cl = getAttr(im, 'class');

						if (/^(mceTempFlash|mceTempShockWave|mceTempWindowsMedia|mceTempQuickTime|mceTempRealMedia)$/.test(cl)) {
							at = t._parse(getAttr(im, 'title'));
							at.width = getAttr(im, 'width');
							at.height = getAttr(im, 'height');
							im = '<script type="text/javascript">write' + cl.substring(7) + '({' + t._serialize(at) + '});</script>';
						}

						return im;
					});
				});
			}
		},

		getInfo : function() {
			return {
				longname : 'Media',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/media',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},

		// Private methods
		_objectsToSpans : function(ed, o) {
			var t = this, h = o.content;

			h = h.replace(/<script[^>]*>\s*write(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)\(\{([^\)]*)\}\);\s*<\/script>/gi, function(a, b, c) {
				var o = t._parse(c);

				return '<img class="mceItem' + b + '" title="' + ed.dom.encode(c) + '" src="' + t.url + '/img/trans.gif" width="' + o.width + '" height="' + o.height + '" />'
			});

			h = h.replace(/<object([^>]*)>/gi, '<span class="mceItemObject" $1>');
			h = h.replace(/<embed([^>]*)\/?>/gi, '<span class="mceItemEmbed" $1></span>');
			h = h.replace(/<embed([^>]*)>/gi, '<span class="mceItemEmbed" $1>');
			h = h.replace(/<\/(object)([^>]*)>/gi, '</span>');
			h = h.replace(/<\/embed>/gi, '');
			h = h.replace(/<param([^>]*)>/gi, function(a, b) {return '<span ' + b.replace(/value=/gi, '_value=') + ' class="mceItemParam"></span>'});
			h = h.replace(/\/ class=\"mceItemParam\"><\/span>/gi, 'class="mceItemParam"></span>');

			o.content = h;
		},

		_buildObj : function(o, n) {
			var ob, ed = this.editor, dom = ed.dom, p = this._parse(n.title);

			p.width = o.width = dom.getAttrib(n, 'width') || 100;
			p.height = o.height = dom.getAttrib(n, 'height') || 100;

			ob = dom.create('span', {
				mce_name : 'object',
				classid : "clsid:" + o.classid,
				codebase : o.codebase,
				width : o.width,
				height : o.height
			});

			if (p.src)
				p.src = ed.convertURL(p.src, 'src', n);

			each (p, function(v, k) {
				if (!/^(width|height|codebase|classid|_cx|_cy)$/.test(k)) {
					// Use url instead of src in IE for Windows media
					if (o.type == 'application/x-mplayer2' && k == 'src')
						k = 'url';

					if (v)
						dom.add(ob, 'span', {mce_name : 'param', name : k, '_value' : v});
				}
			});

			dom.add(ob, 'span', tinymce.extend({mce_name : 'embed', type : o.type}, p));

			return ob;
		},

		_spansToImgs : function(p) {
			var t = this, dom = t.editor.dom, im, ci;

			each(dom.select('span', p), function(n) {
				// Convert object into image
				if (dom.getAttrib(n, 'class') == 'mceItemObject') {
					ci = dom.getAttrib(n, "classid").toLowerCase().replace(/\s+/g, '');

					switch (ci) {
						case 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000':
							dom.replace(t._createImg('mceItemFlash', n), n);
							break;

						case 'clsid:166b1bca-3f9c-11cf-8075-444553540000':
							dom.replace(t._createImg('mceItemShockWave', n), n);
							break;

						case 'clsid:6bf52a52-394a-11d3-b153-00c04f79faa6':
						case 'clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95':
						case 'clsid:05589fa1-c356-11ce-bf01-00aa0055595a':
							dom.replace(t._createImg('mceItemWindowsMedia', n), n);
							break;

						case 'clsid:02bf25d5-8c17-4b23-bc80-d3488abddc6b':
							dom.replace(t._createImg('mceItemQuickTime', n), n);
							break;

						case 'clsid:cfcdaa03-8be4-11cf-b84b-0020afbbccfa':
							dom.replace(t._createImg('mceItemRealMedia', n), n);
							break;

						default:
							dom.replace(t._createImg('mceItemFlash', n), n);
					}
					
					return;
				}

				// Convert embed into image
				if (dom.getAttrib(n, 'class') == 'mceItemEmbed') {
					switch (dom.getAttrib(n, 'type')) {
						case 'application/x-shockwave-flash':
							dom.replace(t._createImg('mceItemFlash', n), n);
							break;

						case 'application/x-director':
							dom.replace(t._createImg('mceItemShockWave', n), n);
							break;

						case 'application/x-mplayer2':
							dom.replace(t._createImg('mceItemWindowsMedia', n), n);
							break;

						case 'video/quicktime':
							dom.replace(t._createImg('mceItemQuickTime', n), n);
							break;

						case 'audio/x-pn-realaudio-plugin':
							dom.replace(t._createImg('mceItemRealMedia', n), n);
							break;

						default:
							dom.replace(t._createImg('mceItemFlash', n), n);
					}
				}			
			});
		},

		_createImg : function(cl, n) {
			var im, dom = this.editor.dom, pa = {}, ti = '';

			// Create image
			im = dom.create('img', {
				src : this.url + '/img/trans.gif',
				width : dom.getAttrib(n, 'width') || 100,
				height : dom.getAttrib(n, 'height') || 100,
				'class' : cl
			});

			// Setup base parameters
			each(['id', 'name', 'width', 'height', 'bgcolor', 'align', 'flashvars', 'src', 'wmode', 'allowfullscreen', 'quality'], function(na) {
				var v = dom.getAttrib(n, na);

				if (v)
					pa[na] = v;
			});

			// Add optional parameters
			each(dom.select('span', n), function(n) {
				if (dom.hasClass(n, 'mceItemParam'))
					pa[dom.getAttrib(n, 'name')] = dom.getAttrib(n, '_value');
			});

			// Use src not movie
			if (pa.movie) {
				pa.src = pa.movie;
				delete pa.movie;
			}

			delete pa.width;
			delete pa.height;

			im.title = this._serialize(pa);

			return im;
		},

		_parse : function(s) {
			return tinymce.util.JSON.parse('{' + s + '}');
		},

		_serialize : function(o) {
			return tinymce.util.JSON.serialize(o).replace(/[{}]/g, '');
		}
	});

	// Register plugin
	tinymce.PluginManager.add('media', tinymce.plugins.MediaPlugin);
})();
=======
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
	var rootAttributes = tinymce.explode('id,name,width,height,style,align,class,hspace,vspace,bgcolor,type'), excludedAttrs = tinymce.makeMap(rootAttributes.join(',')), Node = tinymce.html.Node,
		mediaTypes, scriptRegExp, JSON = tinymce.util.JSON, mimeTypes;

	// Media types supported by this plugin
	mediaTypes = [
		// Type, clsid:s, mime types, codebase
		["Flash", "d27cdb6e-ae6d-11cf-96b8-444553540000", "application/x-shockwave-flash", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
		["ShockWave", "166b1bca-3f9c-11cf-8075-444553540000", "application/x-director", "http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0"],
		["WindowsMedia", "6bf52a52-394a-11d3-b153-00c04f79faa6,22d6f312-b0f6-11d0-94ab-0080c74c7e95,05589fa1-c356-11ce-bf01-00aa0055595a", "application/x-mplayer2", "http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701"],
		["QuickTime", "02bf25d5-8c17-4b23-bc80-d3488abddc6b", "video/quicktime", "http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0"],
		["RealMedia", "cfcdaa03-8be4-11cf-b84b-0020afbbccfa", "audio/x-pn-realaudio-plugin", "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"],
		["Java", "8ad9c840-044e-11d1-b3e9-00805f499d93", "application/x-java-applet", "http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0"],
		["Silverlight", "dfeaf541-f3e1-4c24-acac-99c30715084a", "application/x-silverlight-2"],
		["Iframe"],
		["Video"],
		["EmbeddedAudio"],
		["Audio"]
	];

	function normalizeSize(size) {
		return typeof(size) == "string" ? size.replace(/[^0-9%]/g, '') : size;
	}

	function toArray(obj) {
		var undef, out, i;

		if (obj && !obj.splice) {
			out = [];

			for (i = 0; true; i++) {
				if (obj[i])
					out[i] = obj[i];
				else
					break;
			}

			return out;
		}

		return obj;
	};

	tinymce.create('tinymce.plugins.MediaPlugin', {
		init : function(ed, url) {
			var self = this, lookup = {}, i, y, item, name;

			function isMediaImg(node) {
				return node && node.nodeName === 'IMG' && ed.dom.hasClass(node, 'mceItemMedia');
			};

			self.editor = ed;
			self.url = url;

			// Parse media types into a lookup table
			scriptRegExp = '';
			for (i = 0; i < mediaTypes.length; i++) {
				name = mediaTypes[i][0];

				item = {
					name : name,
					clsids : tinymce.explode(mediaTypes[i][1] || ''),
					mimes : tinymce.explode(mediaTypes[i][2] || ''),
					codebase : mediaTypes[i][3]
				};

				for (y = 0; y < item.clsids.length; y++)
					lookup['clsid:' + item.clsids[y]] = item;

				for (y = 0; y < item.mimes.length; y++)
					lookup[item.mimes[y]] = item;

				lookup['mceItem' + name] = item;
				lookup[name.toLowerCase()] = item;

				scriptRegExp += (scriptRegExp ? '|' : '') + name;
			}

			// Handle the media_types setting
			tinymce.each(ed.getParam("media_types",
				"video=mp4,m4v,ogv,webm;" +
				"silverlight=xap;" +
				"flash=swf,flv;" +
				"shockwave=dcr;" +
				"quicktime=mov,qt,mpg,mpeg;" +
				"shockwave=dcr;" +
				"windowsmedia=avi,wmv,wm,asf,asx,wmx,wvx;" +
				"realmedia=rm,ra,ram;" +
				"java=jar;" +
				"audio=mp3,ogg"
			).split(';'), function(item) {
				var i, extensions, type;

				item = item.split(/=/);
				extensions = tinymce.explode(item[1].toLowerCase());
				for (i = 0; i < extensions.length; i++) {
					type = lookup[item[0].toLowerCase()];

					if (type)
						lookup[extensions[i]] = type;
				}
			});

			scriptRegExp = new RegExp('write(' + scriptRegExp + ')\\(([^)]+)\\)');
			self.lookup = lookup;

			ed.onPreInit.add(function() {
				// Allow video elements
				ed.schema.addValidElements('object[id|style|width|height|classid|codebase|*],param[name|value],embed[id|style|width|height|type|src|*],video[*],audio[*],source[*]');

				// Convert video elements to image placeholder
				ed.parser.addNodeFilter('object,embed,video,audio,script,iframe', function(nodes) {
					var i = nodes.length;

					while (i--)
						self.objectToImg(nodes[i]);
				});

				// Convert image placeholders to video elements
				ed.serializer.addNodeFilter('img', function(nodes, name, args) {
					var i = nodes.length, node;

					while (i--) {
						node = nodes[i];
						if ((node.attr('class') || '').indexOf('mceItemMedia') !== -1)
							self.imgToObject(node, args);
					}
				});
			});

			ed.onInit.add(function() {
				// Display "media" instead of "img" in element path
				if (ed.theme && ed.theme.onResolveName) {
					ed.theme.onResolveName.add(function(theme, path_object) {
						if (path_object.name === 'img' && ed.dom.hasClass(path_object.node, 'mceItemMedia'))
							path_object.name = 'media';
					});
				}

				// Add contect menu if it's loaded
				if (ed && ed.plugins.contextmenu) {
					ed.plugins.contextmenu.onContextMenu.add(function(plugin, menu, element) {
						if (element.nodeName === 'IMG' && element.className.indexOf('mceItemMedia') !== -1)
							menu.add({title : 'media.edit', icon : 'media', cmd : 'mceMedia'});
					});
				}
			});

			// Register commands
			ed.addCommand('mceMedia', function() {
				var data, img;

				img = ed.selection.getNode();
				if (isMediaImg(img)) {
					data = ed.dom.getAttrib(img, 'data-mce-json');
					if (data) {
						data = JSON.parse(data);

						// Add some extra properties to the data object
						tinymce.each(rootAttributes, function(name) {
							var value = ed.dom.getAttrib(img, name);

							if (value)
								data[name] = value;
						});

						data.type = self.getType(img.className).name.toLowerCase();
					}
				}

				if (!data) {
					data = {
						type : 'flash',
						video: {sources:[]},
						params: {}
					};
				}

				ed.windowManager.open({
					file : url + '/media.htm',
					width : 430 + parseInt(ed.getLang('media.delta_width', 0)),
					height : 500 + parseInt(ed.getLang('media.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url,
					data : data
				});
			});

			// Register buttons
			ed.addButton('media', {title : 'media.desc', cmd : 'mceMedia'});

			// Update media selection status
			ed.onNodeChange.add(function(ed, cm, node) {
				cm.setActive('media', isMediaImg(node));
			});
		},

		convertUrl : function(url, force_absolute) {
			var self = this, editor = self.editor, settings = editor.settings,
				urlConverter = settings.url_converter,
				urlConverterScope = settings.url_converter_scope || self;

			if (!url)
				return url;

			if (force_absolute)
				return editor.documentBaseURI.toAbsolute(url);

			return urlConverter.call(urlConverterScope, url, 'src', 'object');
		},

		getInfo : function() {
			return {
				longname : 'Media',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/media',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},

		/**
		 * Converts the JSON data object to an img node.
		 */
		dataToImg : function(data, force_absolute) {
			var self = this, editor = self.editor, baseUri = editor.documentBaseURI, sources, attrs, img, i;

			data.params.src = self.convertUrl(data.params.src, force_absolute);

			attrs = data.video.attrs;
			if (attrs)
				attrs.src = self.convertUrl(attrs.src, force_absolute);

			if (attrs)
				attrs.poster = self.convertUrl(attrs.poster, force_absolute);

			sources = toArray(data.video.sources);
			if (sources) {
				for (i = 0; i < sources.length; i++)
					sources[i].src = self.convertUrl(sources[i].src, force_absolute);
			}

			img = self.editor.dom.create('img', {
				id : data.id,
				style : data.style,
				align : data.align,
				hspace : data.hspace,
				vspace : data.vspace,
				src : self.editor.theme.url + '/img/trans.gif',
				'class' : 'mceItemMedia mceItem' + self.getType(data.type).name,
				'data-mce-json' : JSON.serialize(data, "'")
			});

			img.width = data.width = normalizeSize(data.width || (data.type == 'audio' ? "300" : "320"));
			img.height = data.height = normalizeSize(data.height || (data.type == 'audio' ? "32" : "240"));

			return img;
		},

		/**
		 * Converts the JSON data object to a HTML string.
		 */
		dataToHtml : function(data, force_absolute) {
			return this.editor.serializer.serialize(this.dataToImg(data, force_absolute), {forced_root_block : '', force_absolute : force_absolute});
		},

		/**
		 * Converts the JSON data object to a HTML string.
		 */
		htmlToData : function(html) {
			var fragment, img, data;

			data = {
				type : 'flash',
				video: {sources:[]},
				params: {}
			};

			fragment = this.editor.parser.parse(html);
			img = fragment.getAll('img')[0];

			if (img) {
				data = JSON.parse(img.attr('data-mce-json'));
				data.type = this.getType(img.attr('class')).name.toLowerCase();

				// Add some extra properties to the data object
				tinymce.each(rootAttributes, function(name) {
					var value = img.attr(name);

					if (value)
						data[name] = value;
				});
			}

			return data;
		},

		/**
		 * Get type item by extension, class, clsid or mime type.
		 *
		 * @method getType
		 * @param {String} value Value to get type item by.
		 * @return {Object} Type item object or undefined.
		 */
		getType : function(value) {
			var i, values, typeItem;

			// Find type by checking the classes
			values = tinymce.explode(value, ' ');
			for (i = 0; i < values.length; i++) {
				typeItem = this.lookup[values[i]];

				if (typeItem)
					return typeItem;
			}
		},

		/**
		 * Converts a tinymce.html.Node image element to video/object/embed.
		 */
		imgToObject : function(node, args) {
			var self = this, editor = self.editor, video, object, embed, iframe, name, value, data,
				source, sources, params, param, typeItem, i, item, mp4Source, replacement,
				posterSrc, style, audio;

			// Adds the flash player
			function addPlayer(video_src, poster_src) {
				var baseUri, flashVars, flashVarsOutput, params, flashPlayer;

				flashPlayer = editor.getParam('flash_video_player_url', self.convertUrl(self.url + '/moxieplayer.swf'));
				if (flashPlayer) {
					baseUri = editor.documentBaseURI;
					data.params.src = flashPlayer;

					// Convert the movie url to absolute urls
					if (editor.getParam('flash_video_player_absvideourl', true)) {
						video_src = baseUri.toAbsolute(video_src || '', true);
						poster_src = baseUri.toAbsolute(poster_src || '', true);
					}

					// Generate flash vars
					flashVarsOutput = '';
					flashVars = editor.getParam('flash_video_player_flashvars', {url : '$url', poster : '$poster'});
					tinymce.each(flashVars, function(value, name) {
						// Replace $url and $poster variables in flashvars value
						value = value.replace(/\$url/, video_src || '');
						value = value.replace(/\$poster/, poster_src || '');

						if (value.length > 0)
							flashVarsOutput += (flashVarsOutput ? '&' : '') + name + '=' + escape(value);
					});

					if (flashVarsOutput.length)
						data.params.flashvars = flashVarsOutput;

					params = editor.getParam('flash_video_player_params', {
						allowfullscreen: true,
						allowscriptaccess: true
					});

					tinymce.each(params, function(value, name) {
						data.params[name] = "" + value;
					});
				}
			};

			data = node.attr('data-mce-json');
			if (!data)
				return;

			data = JSON.parse(data);
			typeItem = this.getType(node.attr('class'));

			style = node.attr('data-mce-style');
			if (!style) {
				style = node.attr('style');

				if (style)
					style = editor.dom.serializeStyle(editor.dom.parseStyle(style, 'img'));
			}

			// Use node width/height to override the data width/height when the placeholder is resized
			data.width = node.attr('width') || data.width;
			data.height = node.attr('height') || data.height;

			// Handle iframe
			if (typeItem.name === 'Iframe') {
				replacement = new Node('iframe', 1);

				tinymce.each(rootAttributes, function(name) {
					var value = node.attr(name);

					if (name == 'class' && value)
						value = value.replace(/mceItem.+ ?/g, '');

					if (value && value.length > 0)
						replacement.attr(name, value);
				});

				for (name in data.params)
					replacement.attr(name, data.params[name]);

				replacement.attr({
					style: style,
					src: data.params.src
				});

				node.replace(replacement);

				return;
			}

			// Handle scripts
			if (this.editor.settings.media_use_script) {
				replacement = new Node('script', 1).attr('type', 'text/javascript');

				value = new Node('#text', 3);
				value.value = 'write' + typeItem.name + '(' + JSON.serialize(tinymce.extend(data.params, {
					width: node.attr('width'),
					height: node.attr('height')
				})) + ');';

				replacement.append(value);
				node.replace(replacement);

				return;
			}

			// Add HTML5 video element
			if (typeItem.name === 'Video' && data.video.sources[0]) {
				// Create new object element
				video = new Node('video', 1).attr(tinymce.extend({
					id : node.attr('id'),
					width: normalizeSize(node.attr('width')),
					height: normalizeSize(node.attr('height')),
					style : style
				}, data.video.attrs));

				// Get poster source and use that for flash fallback
				if (data.video.attrs)
					posterSrc = data.video.attrs.poster;

				sources = data.video.sources = toArray(data.video.sources);
				for (i = 0; i < sources.length; i++) {
					if (/\.mp4$/.test(sources[i].src))
						mp4Source = sources[i].src;
				}

				if (!sources[0].type) {
					video.attr('src', sources[0].src);
					sources.splice(0, 1);
				}

				for (i = 0; i < sources.length; i++) {
					source = new Node('source', 1).attr(sources[i]);
					source.shortEnded = true;
					video.append(source);
				}

				// Create flash fallback for video if we have a mp4 source
				if (mp4Source) {
					addPlayer(mp4Source, posterSrc);
					typeItem = self.getType('flash');
				} else
					data.params.src = '';
			}

			// Add HTML5 audio element
			if (typeItem.name === 'Audio' && data.video.sources[0]) {
				// Create new object element
				audio = new Node('audio', 1).attr(tinymce.extend({
					id : node.attr('id'),
					width: normalizeSize(node.attr('width')),
					height: normalizeSize(node.attr('height')),
					style : style
				}, data.video.attrs));

				// Get poster source and use that for flash fallback
				if (data.video.attrs)
					posterSrc = data.video.attrs.poster;

				sources = data.video.sources = toArray(data.video.sources);
				if (!sources[0].type) {
					audio.attr('src', sources[0].src);
					sources.splice(0, 1);
				}

				for (i = 0; i < sources.length; i++) {
					source = new Node('source', 1).attr(sources[i]);
					source.shortEnded = true;
					audio.append(source);
				}

				data.params.src = '';
			}

			if (typeItem.name === 'EmbeddedAudio') {
				embed = new Node('embed', 1);
				embed.shortEnded = true;
				embed.attr({
					id: node.attr('id'),
					width: normalizeSize(node.attr('width')),
					height: normalizeSize(node.attr('height')),
					style : style,
					type: node.attr('type')
				});

				for (name in data.params)
					embed.attr(name, data.params[name]);

				tinymce.each(rootAttributes, function(name) {
					if (data[name] && name != 'type')
						embed.attr(name, data[name]);
				});

				data.params.src = '';
			}

			// Do we have a params src then we can generate object
			if (data.params.src) {
				// Is flv movie add player for it
				if (/\.flv$/i.test(data.params.src))
					addPlayer(data.params.src, '');

				if (args && args.force_absolute)
					data.params.src = editor.documentBaseURI.toAbsolute(data.params.src);

				// Create new object element
				object = new Node('object', 1).attr({
					id : node.attr('id'),
					width: normalizeSize(node.attr('width')),
					height: normalizeSize(node.attr('height')),
					style : style
				});

				tinymce.each(rootAttributes, function(name) {
					var value = data[name];

					if (name == 'class' && value)
						value = value.replace(/mceItem.+ ?/g, '');

					if (value && name != 'type')
						object.attr(name, value);
				});

				// Add params
				for (name in data.params) {
					param = new Node('param', 1);
					param.shortEnded = true;
					value = data.params[name];

					// Windows media needs to use url instead of src for the media URL
					if (name === 'src' && typeItem.name === 'WindowsMedia')
						name = 'url';

					param.attr({name: name, value: value});
					object.append(param);
				}

				// Setup add type and classid if strict is disabled
				if (this.editor.getParam('media_strict', true)) {
					object.attr({
						data: data.params.src,
						type: typeItem.mimes[0]
					});
				} else {
					object.attr({
						classid: "clsid:" + typeItem.clsids[0],
						codebase: typeItem.codebase
					});

					embed = new Node('embed', 1);
					embed.shortEnded = true;
					embed.attr({
						id: node.attr('id'),
						width: normalizeSize(node.attr('width')),
						height: normalizeSize(node.attr('height')),
						style : style,
						type: typeItem.mimes[0]
					});

					for (name in data.params)
						embed.attr(name, data.params[name]);

					tinymce.each(rootAttributes, function(name) {
						if (data[name] && name != 'type')
							embed.attr(name, data[name]);
					});

					object.append(embed);
				}

				// Insert raw HTML
				if (data.object_html) {
					value = new Node('#text', 3);
					value.raw = true;
					value.value = data.object_html;
					object.append(value);
				}

				// Append object to video element if it exists
				if (video)
					video.append(object);
			}

			if (video) {
				// Insert raw HTML
				if (data.video_html) {
					value = new Node('#text', 3);
					value.raw = true;
					value.value = data.video_html;
					video.append(value);
				}
			}

			if (audio) {
				// Insert raw HTML
				if (data.video_html) {
					value = new Node('#text', 3);
					value.raw = true;
					value.value = data.video_html;
					audio.append(value);
				}
			}

			var n = video || audio || object || embed;
			if (n)
				node.replace(n);
			else
				node.remove();
		},

		/**
		 * Converts a tinymce.html.Node video/object/embed to an img element.
		 *
		 * The video/object/embed will be converted into an image placeholder with a JSON data attribute like this:
		 * <img class="mceItemMedia mceItemFlash" width="100" height="100" data-mce-json="{..}" />
		 *
		 * The JSON structure will be like this:
		 * {'params':{'flashvars':'something','quality':'high','src':'someurl'}, 'video':{'sources':[{src: 'someurl', type: 'video/mp4'}]}}
		 */
		objectToImg : function(node) {
			var object, embed, video, iframe, img, name, id, width, height, style, i, html,
				param, params, source, sources, data, type, lookup = this.lookup,
				matches, attrs, urlConverter = this.editor.settings.url_converter,
				urlConverterScope = this.editor.settings.url_converter_scope,
				hspace, vspace, align, bgcolor;

			function getInnerHTML(node) {
				return new tinymce.html.Serializer({
					inner: true,
					validate: false
				}).serialize(node);
			};

			function lookupAttribute(o, attr) {
				return lookup[(o.attr(attr) || '').toLowerCase()];
			}

			function lookupExtension(src) {
				var ext = src.replace(/^.*\.([^.]+)$/, '$1');
				return lookup[ext.toLowerCase() || ''];
			}

			// If node isn't in document
			if (!node.parent)
				return;

			// Handle media scripts
			if (node.name === 'script') {
				if (node.firstChild)
					matches = scriptRegExp.exec(node.firstChild.value);

				if (!matches)
					return;

				type = matches[1];
				data = {video : {}, params : JSON.parse(matches[2])};
				width = data.params.width;
				height = data.params.height;
			}

			// Setup data objects
			data = data || {
				video : {},
				params : {}
			};

			// Setup new image object
			img = new Node('img', 1);
			img.attr({
				src : this.editor.theme.url + '/img/trans.gif'
			});

			// Video element
			name = node.name;
			if (name === 'video' || name == 'audio') {
				video = node;
				object = node.getAll('object')[0];
				embed = node.getAll('embed')[0];
				width = video.attr('width');
				height = video.attr('height');
				id = video.attr('id');
				data.video = {attrs : {}, sources : []};

				// Get all video attributes
				attrs = data.video.attrs;
				for (name in video.attributes.map)
					attrs[name] = video.attributes.map[name];

				source = node.attr('src');
				if (source)
					data.video.sources.push({src : urlConverter.call(urlConverterScope, source, 'src', node.name)});

				// Get all sources
				sources = video.getAll("source");
				for (i = 0; i < sources.length; i++) {
					source = sources[i].remove();

					data.video.sources.push({
						src: urlConverter.call(urlConverterScope, source.attr('src'), 'src', 'source'),
						type: source.attr('type'),
						media: source.attr('media')
					});
				}

				// Convert the poster URL
				if (attrs.poster)
					attrs.poster = urlConverter.call(urlConverterScope, attrs.poster, 'poster', node.name);
			}

			// Object element
			if (node.name === 'object') {
				object = node;
				embed = node.getAll('embed')[0];
			}

			// Embed element
			if (node.name === 'embed')
				embed = node;

			// Iframe element
			if (node.name === 'iframe') {
				iframe = node;
				type = 'Iframe';
			}

			if (object) {
				// Get width/height
				width = width || object.attr('width');
				height = height || object.attr('height');
				style = style || object.attr('style');
				id = id || object.attr('id');
				hspace = hspace || object.attr('hspace');
				vspace = vspace || object.attr('vspace');
				align = align || object.attr('align');
				bgcolor = bgcolor || object.attr('bgcolor');
				data.name = object.attr('name');

				// Get all object params
				params = object.getAll("param");
				for (i = 0; i < params.length; i++) {
					param = params[i];
					name = param.remove().attr('name');

					if (!excludedAttrs[name])
						data.params[name] = param.attr('value');
				}

				data.params.src = data.params.src || object.attr('data');
			}

			if (embed) {
				// Get width/height
				width = width || embed.attr('width');
				height = height || embed.attr('height');
				style = style || embed.attr('style');
				id = id || embed.attr('id');
				hspace = hspace || embed.attr('hspace');
				vspace = vspace || embed.attr('vspace');
				align = align || embed.attr('align');
				bgcolor = bgcolor || embed.attr('bgcolor');

				// Get all embed attributes
				for (name in embed.attributes.map) {
					if (!excludedAttrs[name] && !data.params[name])
						data.params[name] = embed.attributes.map[name];
				}
			}

			if (iframe) {
				// Get width/height
				width = normalizeSize(iframe.attr('width'));
				height = normalizeSize(iframe.attr('height'));
				style = style || iframe.attr('style');
				id = iframe.attr('id');
				hspace = iframe.attr('hspace');
				vspace = iframe.attr('vspace');
				align = iframe.attr('align');
				bgcolor = iframe.attr('bgcolor');

				tinymce.each(rootAttributes, function(name) {
					img.attr(name, iframe.attr(name));
				});

				// Get all iframe attributes
				for (name in iframe.attributes.map) {
					if (!excludedAttrs[name] && !data.params[name])
						data.params[name] = iframe.attributes.map[name];
				}
			}

			// Use src not movie
			if (data.params.movie) {
				data.params.src = data.params.src || data.params.movie;
				delete data.params.movie;
			}

			// Convert the URL to relative/absolute depending on configuration
			if (data.params.src)
				data.params.src = urlConverter.call(urlConverterScope, data.params.src, 'src', 'object');

			if (video) {
				if (node.name === 'video')
					type = lookup.video.name;
				else if (node.name === 'audio')
					type = lookup.audio.name;
			}

			if (object && !type)
				type = (lookupAttribute(object, 'clsid') || lookupAttribute(object, 'classid') || lookupAttribute(object, 'type') || {}).name;

			if (embed && !type)
				type = (lookupAttribute(embed, 'type') || lookupExtension(data.params.src) || {}).name;

			// for embedded audio we preserve the original specified type
			if (embed && type == 'EmbeddedAudio') {
				data.params.type = embed.attr('type');
			}

			// Replace the video/object/embed element with a placeholder image containing the data
			node.replace(img);

			// Remove embed
			if (embed)
				embed.remove();

			// Serialize the inner HTML of the object element
			if (object) {
				html = getInnerHTML(object.remove());

				if (html)
					data.object_html = html;
			}

			// Serialize the inner HTML of the video element
			if (video) {
				html = getInnerHTML(video.remove());

				if (html)
					data.video_html = html;
			}

			data.hspace = hspace;
			data.vspace = vspace;
			data.align = align;
			data.bgcolor = bgcolor;

			// Set width/height of placeholder
			img.attr({
				id : id,
				'class' : 'mceItemMedia mceItem' + (type || 'Flash'),
				style : style,
				width : width || (node.name == 'audio' ? "300" : "320"),
				height : height || (node.name == 'audio' ? "32" : "240"),
				hspace : hspace,
				vspace : vspace,
				align : align,
				bgcolor : bgcolor,
				"data-mce-json" : JSON.serialize(data, "'")
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('media', tinymce.plugins.MediaPlugin);
})();
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
