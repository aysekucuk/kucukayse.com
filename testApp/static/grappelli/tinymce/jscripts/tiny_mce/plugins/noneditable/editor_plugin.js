<<<<<<< HEAD
(function(){var a=tinymce.dom.Event;tinymce.create("tinymce.plugins.NonEditablePlugin",{init:function(d,e){var f=this,c,b;f.editor=d;c=d.getParam("noneditable_editable_class","mceEditable");b=d.getParam("noneditable_noneditable_class","mceNonEditable");d.onNodeChange.addToTop(function(h,g,k){var j,i;j=h.dom.getParent(h.selection.getStart(),function(l){return h.dom.hasClass(l,b)});i=h.dom.getParent(h.selection.getEnd(),function(l){return h.dom.hasClass(l,b)});if(j||i){f._setDisabled(1);return false}else{f._setDisabled(0)}})},getInfo:function(){return{longname:"Non editable elements",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/noneditable",version:tinymce.majorVersion+"."+tinymce.minorVersion}},_block:function(c,d){var b=d.keyCode;if((b>32&&b<41)||(b>111&&b<124)){return}return a.cancel(d)},_setDisabled:function(d){var c=this,b=c.editor;tinymce.each(b.controlManager.controls,function(e){e.setDisabled(d)});if(d!==c.disabled){if(d){b.onKeyDown.addToTop(c._block);b.onKeyPress.addToTop(c._block);b.onKeyUp.addToTop(c._block);b.onPaste.addToTop(c._block);b.onContextMenu.addToTop(c._block)}else{b.onKeyDown.remove(c._block);b.onKeyPress.remove(c._block);b.onKeyUp.remove(c._block);b.onPaste.remove(c._block);b.onContextMenu.remove(c._block)}c.disabled=d}}});tinymce.PluginManager.add("noneditable",tinymce.plugins.NonEditablePlugin)})();
=======
(function(){var c=tinymce.dom.TreeWalker;var a="contenteditable",d="data-mce-"+a;var e=tinymce.VK;function b(n){var j=n.dom,p=n.selection,r,o="mce_noneditablecaret",r="\uFEFF";function m(t){var s;if(t.nodeType===1){s=t.getAttribute(d);if(s&&s!=="inherit"){return s}s=t.contentEditable;if(s!=="inherit"){return s}}return null}function g(s){var t;while(s){t=m(s);if(t){return t==="false"?s:null}s=s.parentNode}}function l(s){while(s){if(s.id===o){return s}s=s.parentNode}}function k(s){var t;if(s){t=new c(s,s);for(s=t.current();s;s=t.next()){if(s.nodeType===3){return s}}}}function f(v,u){var s,t;if(m(v)==="false"){if(j.isBlock(v)){p.select(v);return}}t=j.createRng();if(m(v)==="true"){if(!v.firstChild){v.appendChild(n.getDoc().createTextNode("\u00a0"))}v=v.firstChild;u=true}s=j.create("span",{id:o,"data-mce-bogus":true},r);if(u){v.parentNode.insertBefore(s,v)}else{j.insertAfter(s,v)}t.setStart(s.firstChild,1);t.collapse(true);p.setRng(t);return s}function i(s){var v,t,u;if(s){rng=p.getRng(true);rng.setStartBefore(s);rng.setEndBefore(s);v=k(s);if(v&&v.nodeValue.charAt(0)==r){v=v.deleteData(0,1)}j.remove(s,true);p.setRng(rng)}else{t=l(p.getStart());while((s=j.get(o))&&s!==u){if(t!==s){v=k(s);if(v&&v.nodeValue.charAt(0)==r){v=v.deleteData(0,1)}j.remove(s,true)}u=s}}}function q(){var s,w,u,t,v;function x(B,D){var A,F,E,C,z;A=t.startContainer;F=t.startOffset;if(A.nodeType==3){z=A.nodeValue.length;if((F>0&&F<z)||(D?F==z:F==0)){return}}else{if(F<A.childNodes.length){var G=!D&&F>0?F-1:F;A=A.childNodes[G];if(A.hasChildNodes()){A=A.firstChild}}else{return !D?B:null}}E=new c(A,B);while(C=E[D?"prev":"next"]()){if(C.nodeType===3&&C.nodeValue.length>0){return}else{if(m(C)==="true"){return C}}}return B}i();u=p.isCollapsed();s=g(p.getStart());w=g(p.getEnd());if(s||w){t=p.getRng(true);if(u){s=s||w;var y=p.getStart();if(v=x(s,true)){f(v,true)}else{if(v=x(s,false)){f(v,false)}else{p.select(s)}}}else{t=p.getRng(true);if(s){t.setStartBefore(s)}if(w){t.setEndAfter(w)}p.setRng(t)}}}function h(z,B){var F=B.keyCode,x,C,D,v;function u(H,G){while(H=H[G?"previousSibling":"nextSibling"]){if(H.nodeType!==3||H.nodeValue.length>0){return H}}}function y(G,H){p.select(G);p.collapse(H)}function t(K){var J,I,M,H;function G(O){var N=I;while(N){if(N===O){return}N=N.parentNode}j.remove(O);q()}function L(){var O,P,N=z.schema.getNonEmptyElements();P=new tinymce.dom.TreeWalker(I,z.getBody());while(O=(K?P.prev():P.next())){if(N[O.nodeName.toLowerCase()]){break}if(O.nodeType===3&&tinymce.trim(O.nodeValue).length>0){break}if(m(O)==="false"){G(O);return true}}if(g(O)){return true}return false}if(p.isCollapsed()){J=p.getRng(true);I=J.startContainer;M=J.startOffset;I=l(I)||I;if(H=g(I)){G(H);return false}if(I.nodeType==3&&(K?M>0:M<I.nodeValue.length)){return true}if(I.nodeType==1){I=I.childNodes[M]||I}if(L()){return false}}return true}D=p.getStart();v=p.getEnd();x=g(D)||g(v);if(x&&(F<112||F>124)&&F!=e.DELETE&&F!=e.BACKSPACE){if((tinymce.isMac?B.metaKey:B.ctrlKey)&&(F==67||F==88||F==86)){return}B.preventDefault();if(F==e.LEFT||F==e.RIGHT){var w=F==e.LEFT;if(z.dom.isBlock(x)){var A=w?x.previousSibling:x.nextSibling;var s=new c(A,A);var E=w?s.prev():s.next();y(E,!w)}else{y(x,w)}}}else{if(F==e.LEFT||F==e.RIGHT||F==e.BACKSPACE||F==e.DELETE){C=l(D);if(C){if(F==e.LEFT||F==e.BACKSPACE){x=u(C,true);if(x&&m(x)==="false"){B.preventDefault();if(F==e.LEFT){y(x,true)}else{j.remove(x);return}}else{i(C)}}if(F==e.RIGHT||F==e.DELETE){x=u(C);if(x&&m(x)==="false"){B.preventDefault();if(F==e.RIGHT){y(x,false)}else{j.remove(x);return}}else{i(C)}}}if((F==e.BACKSPACE||F==e.DELETE)&&!t(F==e.BACKSPACE)){B.preventDefault();return false}}}}n.onMouseDown.addToTop(function(s,u){var t=s.selection.getNode();if(m(t)==="false"&&t==u.target){q()}});n.onMouseUp.addToTop(q);n.onKeyDown.addToTop(h);n.onKeyUp.addToTop(q)}tinymce.create("tinymce.plugins.NonEditablePlugin",{init:function(i,k){var h,g,j;function f(m,n){var o=j.length,p=n.content,l=tinymce.trim(g);if(n.format=="raw"){return}while(o--){p=p.replace(j[o],function(s){var r=arguments,q=r[r.length-2];if(q>0&&p.charAt(q-1)=='"'){return s}return'<span class="'+l+'" data-mce-content="'+m.dom.encode(r[0])+'">'+m.dom.encode(typeof(r[1])==="string"?r[1]:r[0])+"</span>"})}n.content=p}h=" "+tinymce.trim(i.getParam("noneditable_editable_class","mceEditable"))+" ";g=" "+tinymce.trim(i.getParam("noneditable_noneditable_class","mceNonEditable"))+" ";j=i.getParam("noneditable_regexp");if(j&&!j.length){j=[j]}i.onPreInit.add(function(){b(i);if(j){i.selection.onBeforeSetContent.add(f);i.onBeforeSetContent.add(f)}i.parser.addAttributeFilter("class",function(l){var m=l.length,n,o;while(m--){o=l[m];n=" "+o.attr("class")+" ";if(n.indexOf(h)!==-1){o.attr(d,"true")}else{if(n.indexOf(g)!==-1){o.attr(d,"false")}}}});i.serializer.addAttributeFilter(d,function(l,m){var n=l.length,o;while(n--){o=l[n];if(j&&o.attr("data-mce-content")){o.name="#text";o.type=3;o.raw=true;o.value=o.attr("data-mce-content")}else{o.attr(a,null);o.attr(d,null)}}});i.parser.addAttributeFilter(a,function(l,m){var n=l.length,o;while(n--){o=l[n];o.attr(d,o.attr(a));o.attr(a,null)}})})},getInfo:function(){return{longname:"Non editable elements",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/noneditable",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("noneditable",tinymce.plugins.NonEditablePlugin)})();
>>>>>>> 11a0730e5d256a0d82683a0c9d7069d28b900dd8
