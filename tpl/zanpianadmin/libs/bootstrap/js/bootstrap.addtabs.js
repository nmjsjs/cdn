/**
 * Website: http://git.oschina.net/hbbcs/bootStrap-addTabs
 *
 * Version : 2.1
 *
 * Created by joe on 2016-2-4.Update 2017-10-24
 */

(function ($) {

    var settings = {
        /**
         * 直接指定所有页面TABS内容
         * @type {String}
         */
        content: '',
        /**
         * 是否可以关闭
         * @type {Boolean}
         */
        close: true,
        /**
         * 监视的区域
         * @type {String}
         */
        monitor: 'body',
        /**
         * 默认使用iframe还是ajax,true 是iframe,false是ajax
         * @type {Boolean}
         */
        iframe: true,
        /**
         * 固定TAB中IFRAME高度,根据需要自己修改
         * @type {Number}
         */
        height: $(window).height() - 50,
        /**
         * 目标
         * @type {String}
         */
        target: '.nav-tabs',
        /**
         * 显示加载条
         * @type {Boolean}
         */
        loadbar: true,
        /**
         * 是否使用右键菜单
         * @type {Boolean}
         */
        contextmenu: true,
        /**
         * 将打开的tab页记录到本地中，刷新页面时自动打开，默认不使用
         * @type {Boolean}
         */
        store: false,
        /**
         * 保存的项目名称，为了区分项目
         * @type {String}
         */
        storeName: 'zanpianadmin',
        /**
         * 内容样式表
         * @type {String}
         */
        contentStyle: '',
        /**
         * ajax 的参数
         * @type {Object}
         */
        ajax: {
            'async': true,
            'dataType': 'html',
            'type': 'get'
        },
        /**
         *
         * @type {Object}
         */
        local: {
            'refreshLabel': '刷新此标签',
            'closeThisLabel': '关闭此标签',
            'closeOtherLabel': '关闭其他标签',
            'closeLeftLabel': '关闭左侧标签',
            'closeRightLabel': '关闭右侧标签',
			'closeAllLabel': '关闭所有标签',
            'loadbar': '正在加载内容，请稍候．．．'
        },
        /**
         * 关闭tab回调函数
         * @return {[type]} [description]
         */
        callback: function () {
        }
    };

    var target;

    _store = function () {
        if (typeof (arguments[0]) == 'object') {
            arguments[0].each(function (name, val) {
                localStorage.setItem(name, val);
            })
        } else if (arguments[1]) {
            localStorage.setItem(arguments[0], arguments[1]);
        } else {
            return localStorage.getItem(arguments[0]);
        }
    }

    _click = function (obj) {
        var a_obj, a_target;

        a_obj = (typeof obj.data('addtab') == 'object') ? obj.data('addtab') : obj.data();

        if (!a_obj.id && !a_obj.addtab) {
            a_obj.id = Math.random().toString(36).substring(3, 35);
            obj.data('id', a_obj.id);
        }
		var target=a_obj.target ? a_obj.target : target;
		var id=a_obj.id ? a_obj.id : a_obj.addtab;
		var title=a_obj.title ? a_obj.title : obj.text();
		var content=settings.content ? settings.content : a_obj.content;
		var url=a_obj.url ? a_obj.url : obj.attr('href');
		var ajax=a_obj.ajax ? a_obj.ajax : false;
		var state = ({
                target: target, id: id, title: title, content: content,url: url, ajax: ajax
        });
        document.title = title;
        if (history.pushState && !$(this).data("pushstate")) {
              var pushurl = url.indexOf("ref=addtabs") == -1 ? (url + (url.indexOf("?") > -1 ? "&" : "?") + "ref=addtabs") : url;
              window.history.pushState(state, title, pushurl);
        }
        $(this).data("pushstate", null);
        $.addtabs.add({
            'target': target,
            'id': id,
            'title': a_obj.title ? a_obj.title : obj.html(),
            'content': content,
            'url': url,
            'ajax': ajax
        });
    };

    _createMenu = function (right, icon, text) {
        return $('<a>', {
            'href': 'javascript:void(0);',
            'class': "list-group-item",
            'data-right': right
        }).append(
            $('<i>', {
                'class': 'glyphicon ' + icon
            })
        ).append(text);
    }

    _pop = function (id, e, mouse) {
        $('body').find('#popMenu').remove();
        var refresh = e.attr('id') ? _createMenu('refresh', 'glyphicon-refresh', settings.local.refreshLabel) : '';
        var remove = e.attr('id') ? _createMenu('remove', 'glyphicon-remove', settings.local.closeThisLabel) : '';
		var all = e.attr('id') ? _createMenu('removeall', 'glyphicon-remove', settings.local.closeAllLabel) : ''
        var left = e.prev('li').attr('id') ? _createMenu('remove-left', 'glyphicon-chevron-left', settings.local.closeLeftLabel) : '';
        var right = e.next('li').attr('id') ? _createMenu('remove-right', 'glyphicon-chevron-right', settings.local.closeRightLabel) : '';      
        var popHtml = $('<ul>', {
            'aria-controls': id,
            'class': 'rightMenu list-group',
            id: 'popMenu',
            'aria-url': e.attr('aria-url'),
            'aria-ajax': e.attr('aria-ajax')
        }).append(refresh)
            .append(remove)
			.append(all)
            .append(_createMenu('remove-circle', 'glyphicon-remove-circle', settings.local.closeOtherLabel))
            .append(left)
            .append(right);
			

        popHtml.css({
            'top': mouse.pageY,
            'left': mouse.pageX
        });
        popHtml.appendTo($('body')).fadeIn('slow');
        //刷新页面
        $('ul.rightMenu a[data-right=refresh]').on('click', function () {
            var id = $(this).parent('ul').attr("aria-controls").substring(4);
            var url = $(this).parent('ul').attr('aria-url');
            var ajax = $(this).parent('ul').attr('aria-ajax');
            $.addtabs.add({
                'id': id,
                'url': url,
                'refresh': true,
                'ajax': ajax
            });
        });

        //关闭自身
        $('ul.rightMenu a[data-right=remove]').on('click', function () {
            var id = $(this).parent("ul").attr("aria-controls");
            if (id.substring(0, 4) != 'tab_') return;
            $.addtabs.close({
                "id": id
            });
            $.addtabs.drop();
        });
        //关闭全部
        $('ul.rightMenu a[data-right=removeall]').on('click', function () {
            $.addtabs.closeAll(".nav-addtabs");
            $.addtabs.drop();
        });
        //关闭其他
        $('ul.rightMenu a[data-right=remove-circle]').on('click', function () {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            target.find('li').each(function () {
                var id = $(this).attr('id');
                if (id && id != 'tab_' + tab_id) {
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $.addtabs.drop();
        });

        //关闭左侧
        $('ul.rightMenu a[data-right=remove-left]').on('click', function () {
            var tab_id = $(this).parent('ul').attr("aria-controls");
            $('#tab_' + tab_id).prevUntil().each(function () {
                var id = $(this).attr('id');
                if (id && id != 'tab_' + tab_id) {
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $.addtabs.drop();
        });

        //关闭右侧
        $('ul.rightMenu a[data-right=remove-right]').on('click', function () {

            var tab_id = $(this).parent('ul').attr("aria-controls");
            $('#tab_' + tab_id).nextUntil().each(function () {
                var id = $(this).attr('id');
                if (id && id != 'tab_' + tab_id) {
                    $.addtabs.close({
                        "id": $(this).children('a').attr('aria-controls')
                    });
                }
            });
            $.addtabs.drop();
        });
        popHtml.mouseleave(function () {
            $(this).fadeOut('slow');
        });
        $('body').click(function () {
            popHtml.fadeOut('slow');
        })
    };

    _listen = function () {
        if (history.pushState) {
         //浏览器前进后退事件
            $(window).on("popstate", function (e) {
                var state = e.originalEvent.state;
                $("a[data-addtab=" + state.id + "]", settings.monitor).data("pushstate", true).trigger("click");
           });
        }		
        $(settings.monitor).on('click', '[data-addtab]', function (event) {
			event.preventDefault();													   
			if ($(this).data('url').indexOf("javascript") !== 0) {	
            _click($(this));
            $.addtabs.drop();
			}
        });	
        $("form.sidebar-form").on('mousedown click', '.menuresult a[data-url]', function (event) {
			event.preventDefault();													   
			if ($(this).data('url').indexOf("javascript") !== 0) {
			$('.sidebar-menu li a[data-addtab="'+$(this).data('addtab')+'"]').trigger("click");	
            _click($(this));
            $.addtabs.drop();
			}
        });		
        $('body').on('click', '.close-tab', function () {
            var id = $(this).prev("a").attr("aria-controls");
            $.addtabs.close({
                'id': id
            });
            $.addtabs.drop();
        });
        target.on('dblclick', 'li[role=presentation]', function (e) {
            $(this).find(".close-tab").trigger("click");
        });		
        target.on('click', 'li[role=presentation]', function (e) {										 
			$('[data-addtab="'+$("a", this).attr("aria-controls").substring(4)+'"]').trigger("click");
        });		
        $('body').on('mouseover', 'li[role = "presentation"]', function () {
            $(this).find('.close-tab').show();
        });

        $('body').on('mouseleave', 'li[role = "presentation"]', function () {
            $(this).find('.close-tab').hide();
        });

        if (settings.contextmenu) {
            //obj上禁用右键菜单
            $('body').on('contextmenu', 'li[role=presentation]', function (e) {
                var id = $(this).children('a').attr('aria-controls');
                _pop(id, $(this), e);
                return false;
            });
        }

        var el;
        $('body').on('dragstart.h5s', '.nav-tabs li', function (e) {
            el = $(this);
            //清除拖动操作携带的数据，否者在部分浏览器上会打开新页面
            if(e.originalEvent && e.originalEvent.dataTransfer
                && 'function' == typeof e.originalEvent.dataTransfer.clearData){
                e.originalEvent.dataTransfer.clearData();
            }
        }).on('dragover.h5s dragenter.h5s drop.h5s', '.nav-tabs li', function (e) {
            if (el == $(this)) return;
            $('.dragBack').removeClass('dragBack');
            $(this).addClass('dragBack');
            //支持前后调整标签顺序
            if (el.index() < $(this).index()) {
                el.insertAfter($(this))
            } else {
                $(this).insertAfter(el)
            }
        }).on('dragend.h5s', '.nav-tabs li', function () {
            $('.dragBack').removeClass('dragBack');
        });

        $('body').on('shown.bs.tab', 'a[data-toggle="tab"]', function () {
            var id = $(this).parent('li').attr('id');
            id = id ? id.substring(8) : '';
            if (settings.store) {
                var tabs = $.parseJSON(_store('addtabs'+settings.storeName));
                $.each(tabs, function (k, t) {
                    (t.id == id) ?(t.active = 'true'):(delete t.active);
                });
                tabs = JSON.stringify(tabs);
                _store('addtabs'+settings.storeName, tabs);
            }
        });
        //双击重新加载页面
        $(document).on("dblclick", ".sidebar-menu li > a", function (e) {
             $("#tab_" + $(this).data("addtab") + " iframe").attr('src', function (i, val) {
                    return val;
             });
             e.stopPropagation();
        });		
        //浏览器大小改变时自动收放tab
        $(window).resize(function () {			  
            $("#nav").width($("#header > .navbar").width() - $(".navbar-custom-menu").outerWidth() - 20);					
            $.addtabs.drop();
        });
    };

    $.addtabs = function (options) {
        $.addtabs.set(options);
        _listen();
        if (settings.store) {
            var tabs = _store('addtabs'+settings.storeName) ? $.parseJSON(_store('addtabs'+settings.storeName)) : {};
            var active;
            $.each(tabs, function (k, t) {
                if (t.active) active = k;
                $.addtabs.add(t);
            });
            if (active) {
              target.children('.active').removeClass('active');
              $('#tab_' + active).addClass('active');
			  $('#tab_' + active).trigger("click");
              $('.addtabs-content').children('.active').removeClass('active');
              $('#' + active).addClass('active');
            }
        }
    };

    $.addtabs.set = function () {
        if (arguments[0]) {
            if (typeof arguments[0] == 'object') {
                settings = $.extend(settings, arguments[0] || {});
            } else {
                settings[arguments[0]] = arguments[1];
            }
        }
        if (typeof settings.target == 'object') {
            target = settings.target;
        } else {
            target = $('body').find(settings.target).length > 0 ? $(settings.target).first() : $('body').find('.nav-tabs').first();
        }
    }

    $.addtabs.add = function (opts) {
        var a_target, content;
        opts.id = opts.id ? opts.id : Math.random().toString(36).substring(3, 35);
        if (typeof opts.target == 'object') {
            a_target = opts.target;
        } else if (typeof opts.target == 'string') {
            a_target = $('body').find(opts.target).first();
        } else {
            a_target = target;
        }

        var id = 'tab_' + opts.id;
        var tab_li = a_target;
        //写入cookie
        if (settings.store) {
          var tabs = _store('addtabs'+settings.storeName) ? $.parseJSON(_store('addtabs'+settings.storeName)) : {};
            tabs[id] = opts;
            tabs[id].target = (typeof tabs[id].target == 'object') ? settings.target : tabs[id].target;
            $.each(tabs, function (k, t) {
                delete t.active;
            });
            tabs[id].active = 'true';
            tabs = JSON.stringify(tabs);
            _store('addtabs'+settings.storeName, tabs);
        }

        var tab_content = $('.addtabs-content');

        tab_li.children('li[role = "presentation"].active').removeClass('active');
        tab_content.children('div[role = "tabpanel"].active').removeClass('active');
		$(".dropdown-menu").children('li[role = "presentation"].active').removeClass('active');
        //如果TAB不存在，创建一个新的TAB
        if (tab_li.find('#tab_' + id).length < 1) {
            var cover = $('<div>', {
                'id': 'tabCover',
                'class': 'tab-cover'
            });
            //创建新TAB的title
            var title = $('<li>', {
                'role': 'presentation',
                'id': 'tab_' + id,
                'aria-url': opts.url,
                'aria-ajax': opts.ajax ? true : false
            }).append(
                $('<a>', {
                    'href': '#' + id,
                    'aria-controls': id,
                    'role': 'tab',
                    'data-toggle': 'tab'
                }).html(opts.title)
            );
            //是否允许关闭
            if (settings.close && $("ul"+settings.target+" li").length!=1) {
                title.append(
                    $('<i>', {
                        'class': 'close-tab glyphicon glyphicon-remove'
                    })
                );
            }
            //创建新TAB的内容
            var content = $('<div>', {
                'class': 'tab-pane ' + settings.contentStyle,
                'id': id,
                'role': 'tabpanel'
            });

            //加入TABS
            tab_li.append(title);
            tab_content.append(content.append(cover));
        } else if (!opts.refresh) {
            $('#tab_' + id).addClass('active');
            $('#' + id).addClass('active');
            return;
        } else {
            content = $('#' + id);
            content.html('');
        }
        //加载条
        if (settings.loadbar) {
            content.html($('<div>', {
                'class': ''
            }).append(
                $('<div>', {
                    'class': 'progress-bar progress-bar-striped progress-bar-success active',
                    'role': 'progressbar',
                    'aria-valuenow': '100',
                    'aria-valuemin': '0',
                    'aria-valuemax': '100',
                    'style': 'width:100%'
                }).append('<span class="sr-only">100% Complete</span>')
                    .append('<span>' + settings.local.loadbar + '</span>')
            ));
        }

        //是否指定TAB内容
        if (opts.content) {
            content.html(opts.content);
        } else if (settings.iframe == true && (opts.ajax == 'false' || !opts.ajax)) { //没有内容，使用IFRAME打开链接
            content.html(
                $('<iframe>', {
                    'frameborder': "no",
					'height': "100%",
					'width': "100%",
                    'border': "0",
					'marginwidth': "0",
					'marginheight': "0",
					'scrolling': "yes",
					'allowtransparency': "yes",
                    'src': opts.url
                })
            );
        } else {
            var ajaxOption = $.extend(settings.ajax, opts.ajax || {});
            ajaxOption.url = opts.url;
            ajaxOption.error = function(XMLHttpRequest, textStatus) { content.html(XMLHttpRequest.responseText); };
            ajaxOption.success = function (result) {
                content.html(result);
            }
            $.ajax(ajaxOption);
        }

        //激活TAB

        tab_li.find('#tab_' + id).addClass('active');
        tab_content.find('#' + id).addClass('active');
        tab_content.find('#' + id).find('#tabCover').remove();

    };

    $.addtabs.close = function (opts) {
        //如果关闭的是当前激活的TAB，激活他的前一个TAB
        if ($("#tab_" + opts.id).hasClass('active')) {
            if ($('#tab_' + opts.id).parents('li.tabdrop').length > 0 && !$('#tab_' + opts.id).parents('li.tabdrop').hasClass('hide')) {
                $('#tab_' + opts.id).parents('.nav-tabs').find('li').last().tab('show');
				$('#tab_' + opts.id).parents('.nav-tabs').find('a').last().trigger("click");
            } else {
                $("#tab_" + opts.id).prev('li').tab('show');
				$("#tab_" + opts.id).prev().trigger("click");
            }
            $("#" + opts.id).prev().addClass('active');
        }
		if(opts.id!='tab_home'){
        //关闭TAB
        $("#tab_" + opts.id).remove();
        $("#" + opts.id).remove();
		}
        if (settings.store) {
            var tabs = $.parseJSON(_store('addtabs'+settings.storeName));
            delete tabs[opts.id];
            tabs = JSON.stringify(tabs);
            _store('addtabs'+settings.storeName, tabs);
        }
        $.addtabs.drop();
        settings.callback();
    };

    $.addtabs.closeAll = function (target) {
        if (typeof target == 'string') {
            target = $('body').find(target);
        }
        if (settings.store) {
            var tabs = $.parseJSON(_store('addtabs'+settings.storeName));
        }		
        $.each(target.find('li[id]'), function () {
            var id = $(this).children('a').attr('aria-controls');
			if(id!='tab_home'){
               $("#tab_" + id).remove();
               $("#" + id).remove();
               if (settings.store) {
                  var tabs = $.parseJSON(_store('addtabs'+settings.storeName));
                  delete tabs[id];
                  tabs = JSON.stringify(tabs);
                  _store('addtabs'+settings.storeName, tabs);
               }				   
			}
        });
		
        target.find('li[role = "presentation"]').first().addClass('active');
        var firstID = target.find('li[role = "presentation"]').first().children('a').attr('aria-controls');
        $('#' + firstID).addClass('active');
        $.addtabs.drop();
        settings.callback();		
    };

    $.addtabs.drop = function () {
        //创建下拉标签
		var navobj = $('.nav-addtabs');
        var dropdown = $('<li class="dropdown pull-right hide tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="javascript:;">' +
                '<i class="glyphicon glyphicon-align-justify"></i>' +
                ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>');


         //检测是否已增加
        if (!$('.tabdrop').html()) {
            dropdown.prependTo(navobj);
        } else {
            dropdown = navobj.find('.tabdrop');
        }
        //检测是否有下拉样式
        if (navobj.parent().is('.tabs-below')) {
            dropdown.addClass('dropup');
        }
        var collection = 0;

        var maxwidth = navobj.width() - 65;

        var liwidth = 0;
        //检查超过一行的标签页
        var litabs = navobj.append(dropdown.find('li')).find('>li').not('.tabdrop');
        var lisize = litabs.length;
        litabs.each(function (i, j) {
            liwidth += $(this).width();
            if (collection == 0 && i == lisize - 1 && liwidth <= navobj.width()) {
                return true;
            }
            if (liwidth > maxwidth) {
                dropdown.find('ul').append($(this));
                collection++;
            }
        });
        //如果有超出的，显示下拉标签
        if (collection > 0) {
            dropdown.removeClass('hide');
            if (dropdown.find('.active').length == 1) {
                dropdown.addClass('active');
            } else {
                dropdown.removeClass('active');
            }
        } else {
            dropdown.addClass('hide');
        }

    }
	 $.addtabs.url = function (url, title, icon) {
		
                var dom = "a[data-url='{url}']"
				 
                var leftlink = top.window.$(dom.replace(/\{url\}/, url));
                if (leftlink.length > 0) {
                    leftlink.trigger("click");
                } else {
					if(url.substr(0, 1) !== "/") {
                           var r = new RegExp('^(?:[a-z]+:)?//', 'i');
                           if (!r.test(url)) {
                              url = zanpiancms.moduleurl + "/" + url;
                           }
                    }
                    leftlink = top.window.$(dom.replace(/\{url\}/, url));
                    if (leftlink.length > 0) {
                        var event = leftlink.parent().hasClass("active") ? "dblclick" : "click";
                        leftlink.trigger(event);
                    } else {
                        var baseurl = url.substr(0, url.indexOf("?") > -1 ? url.indexOf("?") : url.length);
                        leftlink = top.window.$(dom.replace(/\{url\}/, baseurl));
                        //能找到相对地址
                        if (leftlink.length > 0) {
                            icon = typeof icon != 'undefined' ? icon : leftlink.find("i").attr("class");
                            title = typeof title != 'undefined' ? title : leftlink.find("span:first").text();
                            leftlink.trigger("fa.event.toggleitem");
                        }
                        var navnode = $(".nav-tabs ul li a[node-url='" + url + "']");
                        if (navnode.length > 0) {
                            navnode.trigger("click");
                        } else {
                            //追加新的tab
                            var id = Math.floor(new Date().valueOf() * Math.random());
                            icon = typeof icon != 'undefined' ? icon : 'fa fa-circle-o';
                            title = typeof title != 'undefined' ? title : '';
                            top.window.$("<a />").append('<i class="' + icon + '"></i> <span>' + title + '</span>').prop("href", url).attr({url: url, addtabs: id}).addClass("hide").appendTo(top.window.document.body).trigger("click");
                        }
                    }
                }
            }	
	
})(jQuery);

$(function () {
    $.addtabs();
})