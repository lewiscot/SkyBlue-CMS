/*****************************************************************************
 * jQuery.plugin - jQuery Plugin for on-demand loading of scripts and styles
 *
 * Documentation : http://nicolas.rudas.info/jQuery/getPlugin/
 * Issues         : http://plugins.jquery.com/project/getPlugin/
 *
 * Version: 081002 - 02 Oct 2008
 *
 *****************************************************************************/
;jQuery(function(){jQuery.plugins=jQuery.plugins||{};jQuery.plugins.cache=window.sessionStorage||{};jQuery.plugins.settings={cache:true,ajax:{cache:true},context:jQuery(document),target:jQuery('head',this.context),init:function(){},preLoad:function(){},postLoad:function(){}};var e=jQuery.plugins.settings,cache=jQuery.plugins.cache;Plugin=function(a,b){var c=this;this.name=a;for(var i in b){c[i]=b[i]};this.context=this.context||b.context;this.target=this.target||b.target;this.loaded={};this.queue=[];this.init.apply(this);return this};Plugin.prototype.getFile=function(c){if(!c||typeof c!='string'){throw new Error('jQuery.plugin.getFile(url) - url {String} must be specified');}var d=this,extension=c.split('.')[c.split('.').length-1],fileId=c.replace(/\W/gi,''),cached=cache[c],caching=(e.cache===true||e.cache=='true');if(extension!='css'&&extension!='js'){throw new Error('jQuery.plugin.getFile(url) - Invalid extension:'+extension+'\n\t'+c);return this;}if(caching&&this.loaded[c]){return this;}this.beforeGet(c);jQuery('[data-file-id="'+fileId+'"]').remove();if(caching&&cached&&cached!='undefined'){if(extension=='css'){this.target.append('<style type="text\/css" rel="stylesheet" data-file-id="'+fileId+'">'+cached+'<\/style>');}else if(extension=='js'){this.target.append('<script type="text\/javascript" data-file-id="'+fileId+'">'+cached+'<\/script>');}setTimeout(function(){d.afterGet(c);},0);}else{if(extension=='css'){(function(){var b=jQuery.extend({url:c},e.ajax),onSuccess=b.success||function(){};b.success=function(a){onSuccess.apply(this,arguments);d.loaded[c]=true;cache[c]=a;d.target.append('<style type="text\/css" rel="stylesheet" data-file-id="'+fileId+'">'+a+'<\/style>');d.afterGet(c);};jQuery.ajax(b);})();}else if(extension=='js'){(function(){var b=jQuery.extend({dataType:"script",url:c},e.ajax),onSuccess=b.success||function(){};b.success=function(){onSuccess.apply(this,arguments);var a=(typeof arguments[0]=='string')?arguments[0]:null;cache[c]=a;d.loaded[c]=true;d.afterGet(c);};jQuery.ajax(b);})();}}return this;};Plugin.prototype.beforeGet=function(a){this.queue.push(a);e.preLoad.call(this,a);return this;};Plugin.prototype.afterGet=function(a){var b=this,callback=this.tmp_callback,index=jQuery.inArray(a,this.queue);if(index==-1){throw new Error('jQuery.plugin.afterGet(url) - Ignoring postLoad for file that should not be in queue:\n '+a);return this;}this.queue.splice(index,1);if(this.queue.length==0&&callback){setTimeout(function(){callback.apply(b);delete b.tmp_callback;},0);}e.postLoad.call(this,a);return this;};Plugin.prototype.get=function(){var b=this,files=(typeof this.files=='string')?[this.files]:this.files,callback=arguments[0]||this.callback;this.tmp_callback=callback;if(this.isNeeded()!==true){return this;}var c=function(a){b.getFile(a);};for(var i=0;i<files.length;i++){(function(){var a=files[i];if(jQuery.browser.opera){setTimeout(function(){c(a);},500);}else{c(a);}})();}return this;};Plugin.prototype.isNeeded=function(){var a=this,selectors=(typeof this.selectors=='string')?[this.selectors]:this.selectors,isNeeded;for(var i=0;i<selectors.length;i++){var b=selectors[i];if(jQuery(b,a.context).length>0){isNeeded=true;break;}};return isNeeded||this;};jQuery.extend(jQuery,{plugin:function(a,b){var c=jQuery.plugin;if(arguments.length==0){for(var i in jQuery.plugins){if(i=='settings'||i=='cache'){continue;}jQuery.plugins[i].get();};return c;}else if(typeof a!='string'){throw new Error('jQuery.plugin(name,[settings||callback])\n\t\t@param name\t\t{String}\n\t\t@param settings\t{Object}\n\t\t@param callback\t{Function}');return c;}if(typeof b=='object'){jQuery.plugins[a]=new Plugin(a,jQuery.extend(e,b));}else{var d=jQuery.plugins[a];if(typeof d!='object'){throw new Error('jQuery.plugin: '+a+' is not specified');return c;}if(typeof b=='function'){d.get(b)}else if(!b){return d}}return c},getPlugin:function(){return jQuery.plugin.apply(this,arguments)}})});