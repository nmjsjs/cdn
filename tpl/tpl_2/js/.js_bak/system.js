var zanpiancms = {
	'theme': function() {
		if (localStorage.getItem("box") == 1 || cms.theme.box == 1) {
			var box = $('body').addClass('box');
		}
		$('body').on("click", "#theme-skin li", function(e) {
			var theme = $(this).data('theme');
			var href = cms.public + "tpl/" + cms.theme.name + "/css/theme-" + theme + ".css?v=" + Math.random();
			$('#skin').attr('href', href);
			localStorage.setItem('theme', theme);
		})
		$('body').on("click", "#theme-box .on", function(e) {
			$('body').addClass('box');
			localStorage.setItem('box', 1);
		})
		$('body').on("click", "#theme-box .off", function(e) {
			$('body').removeClass('box');
			localStorage.setItem('box', 0);
		})
	},	

	'tool': function() {
		var a = $(window);
		$scrollTopLink = $(".back-top");
		$scrollTopHead = $(".header-top");
		$scrollTopNav = $("#top-nav");
		if ($scrollTopHead.offset().top > 500) {
			$scrollTopHead.addClass("header-top-down");
		}
		a.scroll(function() {
			500 < $(this).scrollTop() ? $scrollTopLink.css("display", "block") : $scrollTopLink.css("display", "none");
			400 > $(this).scrollTop() ? $scrollTopHead.removeClass("header-top-down") : $scrollTopHead.addClass("header-top-down");
			if ($(".header-top.home").length > 0) {
				0 < $(this).scrollTop() ? $scrollTopHead.removeClass("color") : $scrollTopHead.addClass("color");
			}

		});
		$scrollTopLink.on("click", function() {
			$("html, body").animate({
				scrollTop: 0
			}, 400);
			return !1
		})
	},	
	'ajax': function(url, type, datatype, data, sfun, efun, cfun) {
		type = type || 'get';
		dataType = datatype || 'json';
		data = data || '';
		zanpiancms.tip.open({
			css: "loadings",
			msg: "数据提交中..."
		}, function(e) {
			$.ajax({
				type: type,
				data: data,
				dataType: datatype,
				cache: false,
				url: url,
				timeout: 3000,
				beforeSend: function(XHR) {},
				error: function(XHR, textStatus, errorThrown) {
					if (efun) efun(XHR, textStatus, errorThrown);
				},
				success: function(data) {
					sfun(data);
				},
				complete: function(XHR, TS) {
					if (cfun) cfun(XHR, TS);
				}
			});
		});
	},
	'tip': {
		'auto': function(ox, callback) {
			var tipbox = $("#zanpian-tips-box");
			var w = $(window).width();
			var h = $(window).height();
			var t = (h - tipbox.height()) / 2;
			var l = (w - tipbox.width()) / 2;
			tipbox.css("top", t);
			tipbox.css("left", l);
		},
		'close': function(e) {
			$("#zanpian-tips-bg").remove();
			$("#zanpian-tips-box").remove();
			$("#zanpian-tips-content").remove();
		},
		'hide': function(e) {
			var oxdefaults = {
				intvaltime: 1000
			};
			e = e || {};
			if (e.msg != null && e.msg != undefined) {
				$("#zanpian-tips-tip").html(e.msg);
			}
			if (parseInt(e.rcode) == 1 || parseInt(e.code) == 1 || parseInt(e.code) > 0) {
				$("#zanpian-tips-tip").removeClass('loadings error alert').addClass('succ');
			} else if (parseInt(e.rcode) < 1 || parseInt(e.code) < 1) {
				$("#zanpian-tips-tip").removeClass('loadings alert succ').addClass('error');
			}
			setTimeout(function() {
				zanpiancms.tip.close();
			}, oxdefaults.intvaltime);
		},
		'open': function(ox, callback) {
			$(window).resize(function() {
				zanpiancms.tip.auto();
			});
			var type = typeof callback === 'function';
			var oxdefaults = {
				msg: '数据加载中,请稍后...',
				wantclose: 1,
				autoclose: 1,
				css: 'loadings',
				html: '',
				title: '',
				intvaltime: 1000,
			};
			ox = ox || {};
			$.extend(oxdefaults, ox);
			$("#zanpian-tips-bg").remove();
			$("#zanpian-tips-box").remove();
			if (oxdefaults.wantclose == 1) {
				var floatdiv = $('<div id="zanpian-tips-bg"></div><div id="zanpian-tips-box" class="png-img"><table class="zanpian-tips-box"><tr><td><div class="zanpian-tips"><div class="zanpian-tips-cnt" id="zanpian-tips-cnt"><div class="zanpian-tips-tip alert" id="zanpian-tips-tip"><span id="xtip">' + oxdefaults.msg + '</span></div></div><div class="zanpian-tips-close"><span class="close">关闭</span></div></div></td></tr></table></div>');
				$("body").append(floatdiv);
				zanpiancms.tip.auto();
				$("#zanpian-tips-bg").fadeIn(500);
				$("#zanpian-tips-box").fadeIn(500);
				$("#zanpian-tips-tip").removeClass('succ error alert loadings').addClass(oxdefaults.css);
				$(".zanpian-tips-close").click(function() {
					zanpiancms.tip.close();
				});
				if (type) {
					return callback();
				}
			} else if (oxdefaults.wantclose == 2) {
				var floatdiv = $('<div id="zanpian-tips-bg"></div><div id="zanpian-tips-box" class="png-img"><table class="zanpian-tips-box"><tr><td><div class="zanpian-tips"><div class="zanpian-tips-cnt" id="zanpian-tips-cnt"><div class="zanpian-tips-tip alert" id="zanpian-tips-tip"><span id="xtip">' + oxdefaults.msg + '</span></div></div><div class="zanpian-tips-todo"><a class="tips-link tips-link-small" href="javascript:void(0);" id="confirm">确定</a><a class="tips-link tips-link-small"  id="cancel">取消</a><input type="hidden" id="hideval" value=""/></div><div class="zanpian-tips-close"><span class="close">关闭</span></div></div></td></tr></table></div>');
				$("body").append(floatdiv);
				zanpiancms.tip.auto();
				$("#zanpian-tips-bg").fadeIn(500);
				$("#zanpian-tips-box").fadeIn(500);
				$(".zanpian-tips-close").click(function() {
					zanpiancms.tip.close();
				});
				$("#cancel").click(function() {
					zanpiancms.tip.close();
				});
				$("#confirm").click(function(e) {
					if (type) {
						return callback();
					}
				})
			} else if (oxdefaults.wantclose == 3) {
				var floatdiv = $('<div id="zanpian-pop-bg"></div><div id="zanpian-tips-box"><div id="zanpian-tips-content"><div id="zanpian-tips-con">' + oxdefaults.html + '</div></div><div id="zanpian-tips-close">close</div></div>');
				$("body").append(floatdiv);
				zanpiancms.tip.auto();
				$("#zanpian-tips-bg").fadeIn(500);
				$("#zanpian-tips-box").fadeIn(500);
				$("#zanpian-tips-close").click(function() {
					zanpiancms.tip.close();
				});
				$("#cancel").click(function() {
					zanpiancms.tip.close();
				});
				$("#confirm").click(function(e) {
					if (type) {
						return callback();
					}
				})
			} else {
				var floatdiv = $('<div id="zanpian-tips-bg"></div><div id="zanpian-tips-box" class="png-img"><table class="zanpian-tips-box"><tr><td><div class="zanpian-tips"><div class="zanpian-tips-cnt" id="zanpian-tips-cnt"><div class="zanpian-tips-tip alert" id="zanpian-tips-tip"><span id="xtip">' + oxdefaults.msg + '</span></div></div><div class="zanpian-tips-close"><span class="close">关闭</span></div></div></td></tr></table></div>');
				$("body").append(floatdiv);
				zanpiancms.tip.auto();
				$("#zanpian-tips-bg").fadeIn(500);
				$("#zanpian-tips-box").fadeIn(500);
				$("#zanpian-tips-cnt").fadeIn(500);
				$("#zanpian-tips-tip").removeClass('succ error alert loadings').addClass(oxdefaults.css);
				$(".zanpian-tips-close").click(function() {
					zanpiancms.tip.close();
				});
				setTimeout(function() {
					zanpiancms.tip.close();
				}, oxdefaults.intvaltime);
			}
			$('#zanpian-tips-bg').bind('click', function(e) {
				pp = setTimeout("zanpiancms.tip.close()", oxdefaults.intvaltime);
				zanpiancms.tip.close(e);
				if (pp != null) {
					clearTimeout(pp);
				}
			});
		},
	},
	'pop': {
		'auto': function(ox, callback) {
			var tipbox = $("#zanpian-pop-box");
			var w = $(window).width();
			var h = $(window).height();
			var t = (h - tipbox.height()) / 2;
			var l = (w - tipbox.width()) / 2;
			tipbox.css("top", t);
			tipbox.css("left", l);
		},
		'close': function(e) {
			$("#zanpian-pop-bg").remove();
			$("#zanpian-pop-box").remove();
			$("#zanpian-pop-content").remove();
		},
		'url': function(ox, callback) {
			$(window).resize(function() {
				zanpiancms.pop.auto();
			});
			var type = typeof callback === 'function';
			var oxdefaults = {
				url: '',
				data: '',
				type: 'get',
				dataType: 'json',
				timeout: 5000,
			};
			ox = ox || {};
			$.extend(oxdefaults, ox);
			$("#zanpian-pop-bg").remove();
			$("#zanpian-pop-box").remove();
			$("#zanpian-pop-content").remove();
			var floatdiv = $('<div id="zanpian-pop-bg"></div><div id="zanpian-pop-box"><div id="zanpian-pop-content"><div id="zanpian-pop-con"></div></div><div id="zanpian-pop-close">close</div></div>');
			$("body").append(floatdiv);
			$("#zanpian-pop-close").click(function() {
				zanpiancms.pop.close();
			});
			$.ajax({
				url: oxdefaults.url,
				type: oxdefaults.type,
				dataType: oxdefaults.dataType,
				data: oxdefaults.data,
				timeout: oxdefaults.timeout,
				beforeSend: function(XHR) {},
				error: function(XHR, textStatus, errorThrown) {},
				success: function(json) {
					$("#zanpian-pop-con").html(json);
					zanpiancms.pop.auto();
					$(".zanpian-modal").show();
					$("#zanpian-pop-bg").fadeIn(500);
					$("#zanpian-pop-box").fadeIn(500);
					$("#zanpian-pop-content").fadeIn(500);
				},
				complete: function(XMLHttpRequest, status) {
					if (status == 'timeout') { 
						　ajaxTimeOut.abort(); 	
						　　　　
					}
				}
			})
			$('#zanpian-pop-bg').bind('click', function(e) {
				pp = setTimeout("zanpiancms.tip.close()", oxdefaults.intvaltime);
				zanpiancms.pop.close(e);
				if (pp != null) {
					clearTimeout(pp);
				}
			});
		}
	},
	'fixbar': function(a, b) {
		var c = $(a),d = $(b),e = c.offset().top,f = d.offset().top,w = d.width() + 20;
		$(window).resize(g).scroll(g).trigger("resize");
		function g() {
			var g = $(window).scrollLeft(),h = $(window).scrollTop(),i = $(document).height(),j = $(window).height(),k = c.height(),l = d.height(),m = k > l ? f : e,n = k > l ? d : c,o = k > l ? c.offset().left + c.outerWidth(!0) - g : d.offset().left - c.outerWidth(!0) - g,p = k > l ? l : k,q = k > l ? k : l,r = parseInt(q - j) - parseInt(p - j);$(a + "," + b).removeAttr("style"), j > i || p > q || m > h || p - j + m >= h ? n.removeAttr("style") : j > p && h - m >= r || p > j && h - m >= q - j ? n.attr("style", "margin-top:" + r + "px;") : n.attr("style", "_margin-top:" + (h - m) + "px;position:fixed;width:" + w + "px;left:" + o + "px;" + (j > p ? "top" : "bottom") + ":0;")
		}
	},
	'list': {
		'init': function() {
			zanpiancms.list.ajax();
			zanpiancms.list.more();
		},
		'ajax': function() {

			try {
				if (type_ajax_url != undefined && type_ajax_url != null) {
					$('body').on("click", ".type-select ul li a", function(e) {
						msg_list_loading = false;
						if (type_parms != undefined && type_parms != null) {
							var curdata = $(this).attr('data').split('-');
							if (curdata[0] == 'id' || curdata[0] == 'sid') {
								type_parms = {"id": curdata[1],"mcid": "0","area": "0","year": "0","letter": "0","sid": "0","wd": "0","sex": "0","zy": "0","order": "0","picm": 1,"p": 1
								};
								zanpiancms.list.deltype();
							}
							type_parms[curdata[0]] = curdata[1];
							type_parms['p'] = 1;
							url = zanpiancms.list.parseurl(type_parms);
							$(this).parent().addClass('active');
							$(this).parent().siblings().removeClass('active');
							$(this).addClass('active');
							$(this).siblings().removeClass('active');
							zanpiancms.list.url(url);
							zanpiancms.list.deltitle()
						}
						return false;
					});
					$('body').on("click", ".type-select-t ul li a", function(e) {
						msg_list_loading = false;
						if (type_parms != undefined && type_parms != null) {
							curdata = $(this).attr('data').split('-');
							if (curdata[0] == 'id' || curdata[0] == 'sid') {
								type_parms = {
									"id": curdata[1],"mcid": "0","area": "0","year": "0","letter": "0","sid": "0","wd": "0","sex": "0","zy": "0","order": "0","picm": 1,"p": 1
								};
								zanpiancms.list.deltype();
							}
							type_parms[curdata[0]] = curdata[1];
							type_parms['p'] = 1;
							url = zanpiancms.list.parseurl(type_parms);
							$(this).parent().addClass('active');
							$(this).parent().siblings().removeClass('active');
							$(this).addClass('active');
							$(this).siblings().removeClass('active');
							zanpiancms.list.deloption(curdata[0]);
							zanpiancms.list.url(url);
							$(this).remove();
							return false;
						}

					});
					$('body').on("click", ".ajax-page ul li a,.week-list a", function(e) {
						e.preventDefault();
						$(this).parent().addClass('active');
						$(this).parent().siblings().removeClass('active');
						$(this).addClass('active');
						$(this).siblings().removeClass('active');
						var curdata = $(this).attr('data').split('-');
						type_parms[curdata[0]] = curdata[1];
						var url = zanpiancms.list.parseurl(type_parms);
						zanpiancms.list.url(url);
					});
					$('body').on("click", ".ajax-nav-tabs a", function(e) {
						e.preventDefault();
						var curdata = $(this).attr('data').split('-');
						type_parms[curdata[0]] = curdata[1];
						type_parms['p'] = 1;
						var url = zanpiancms.list.parseurl(type_parms);
						$(this).parent().siblings().removeClass('active');
						$(this).parent().addClass('active');
						$(this).siblings().removeClass('active');
						$(this).addClass('active');
						zanpiancms.list.url(url);
					});
					$('body').on("click", ".seach-nav-tabs li a", function(e) {
						e.preventDefault();
						var curdata = $(this).attr('data').split('-');
						type_parms[curdata[0]] = curdata[1];
						type_parms['p'] = 1;
						var url = zanpiancms.list.parseurl(type_parms);
						$('.seach-nav-tabs li a').each(function(e) {
							$(this).removeClass('active');
						});
						$(this).addClass('active');
						zanpiancms.list.url(url);
					});
					$('body').on("click", "#conreset a", function(e) {
						msg_list_loading = false;
						var curdata = $(this).attr('data').split('-');
						type_parms = {
							"id": curdata[1],"mcid": "0","area": "0","year": "0","letter": "0","sid": "0","wd": "0","sex": "0","zy": "0","order": "0","picm": 1,"p": 1
						};
						url = zanpiancms.list.parseurl(type_parms);
						zanpiancms.list.url(url);
						zanpiancms.list.deltype();
						zanpiancms.list.deltitle();
						return false;
					});

				}
			} catch (e) {};

		},
		'deltitle': function() {
			var constr = '';
			$('.type-select ul li a').each(function(e) {
				if ($(this).parent().hasClass('active')) {
					var data = $(this).attr('data').split('-');
					if ($(this).html() == '全部') constr += ' ';
					else constr += '<li class="opt"><a data="' + data[0] + '-0">' + $(this).html() + '<span></span></a></li>';
				}
			});
			var txt = '<li><a class="text-muted">已选</a></li>';
			if (constr != '') $('.conbread').html(txt + constr);
		},
		'deltype': function() {
			$('.type-select ul li a').each(function(e) {
				$(this).parent().removeClass('active');
				if ($(this).html() == '全部') {
					$(this).parent().addClass('active');
				}
			});
			return false;
		},
		'deloption': function(data) {
			$("#" + data).children().removeClass('active');
			$("#" + data + " a").each(function(e) {
				if ($(this).html() == '全部') {
					$(this).parent().addClass('active');
				}
			});

		},
		'parseurl': function(rr) {
			var url = cms.root + type_ajax_url;
			for (var c in rr) {
				if (rr[c] != '0') {
					url = url + "-" + c + "-" + rr[c];
				}
			}
			return url;
		},
		'url': function(url) {
			$("#content").html('<div class="loading"></div>');
			msg_list_loading = false;
			$.ajax({
				url: url,
				timeout: 5000,
				error: function(XHR, textStatus, errorThrown) {},
				success: function(data) {
					var value = jQuery('#content', data).html();
					if (value == null || value == '') {
						value = '<div class="kong">抱歉，没有找到相关内容！</div>';
					}
					$("#content").html(value);
					$("#short-page").html(jQuery('#short-page', data).html())
					$("#page").html(jQuery('#page', data).html())
					$("#total-page").html(jQuery('#total-page', data).html())
					$("#current-page").html(jQuery('#current-page', data).html())
					$("#count").html(jQuery('#count', data).html());
					zanpian.lazyload.tab("#content");
					if ($(".main-left").height() > $(".main-right").height()) {
						zanpian.fixbar(".main-left", ".main-right");
					}
				},
				complete: function(XMLHttpRequest, status) {
					XMLHttpRequest = null
				}
			})
		},

		'more': function() {
			if ($('#content-more').length > 0) {
				var msg_list_loading = false;
				var p = 2;
				$(window).scroll(function() {
					if (!msg_list_loading) {
						load_more_msg(type_ajax_url);
					}
				})
				function load_more_msg(url) {
					var winH = $(window).height();
					var pageH = $(document.body).height();
					var scrollT = $(window).scrollTop(); 
					var aa = (pageH - winH - scrollT) / winH;
					if (aa < 0.02) {
						msg_list_loading = true;
						type_parms['p'] = p;
						var url = zanpiancms.list.parseurl(type_parms);
						$("#content-more").append('<div class="loading"></div>');
						$.ajax({
							url: url,
							timeout: 5000,
							error: function(XHR, textStatus, errorThrown) {},
							success: function(data) {
								var value = jQuery('#content', data).html();
								var kong = jQuery('.kong', data).html();
								$("#content-more").find(".loading").remove();
								if (kong) {
									$(".kong").remove();
									value = '<div class="kong">我是有底线的！</div>';
									msg_list_loading = true;
									$("#content-more").append(value);
									$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
										msg_list_loading = false;
									})
									return false;
								}
								$("#content-more").removeClass("content-more").append(value);
								$("#page-count").html(jQuery('#page-count', data).html());
								$("#page").html(jQuery('#page', data).html())
								msg_list_loading = false;
								zanpian.lazyload.tab("#content-more");
								p++;
								$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
									p = 2;
									msg_list_loading = false;
								})
							},
							complete: function(XMLHttpRequest, status) {
								XMLHttpRequest = null
							}
						})
					}
				}
			}
			if ($('#content-more-loading').length > 0) {
				var msg_list_loading = false;
				var p = 2;
				$('body').on("click", "#content-more-loading", function() {
					if (!msg_list_loading) {
						loading_more_msg(type_ajax_url);
					}
				});
				function loading_more_msg(url) {
					msg_list_loading = true;
					type_parms['p'] = p;
					var url = zanpiancms.list.parseurl(type_parms);
					$("#content-more-loading").append('<div class="loading"></div>');
					$.ajax({
						url: url,
						timeout: 5000,
						error: function(XHR, textStatus, errorThrown) {},
						success: function(data) {
							var value = jQuery('#content', data).html();
							var kong = jQuery('.kong', data).html();
							$("#content-more-loading").find(".loading").remove();
							$("#content-more-loading").find(".more-loading").remove();
							if (kong) {
								$(".kong").remove();
								value = '<div class="kong">我是有底线的！</div>';
								msg_list_loading = true;
								$("#content-more-loading").append(value);
								$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
									msg_list_loading = false;
								})
								return false;
							}
							$("#content-more-loading").removeClass(".more-loading").append(value);
							$("#page-count").html(jQuery('#page-count', data).html());
							$("#page").html(jQuery('#page', data).html())
							msg_list_loading = false;
							zanpian.lazyload.tab("#content-more-loading");
							p++;
							$('body').on("click", ".type-select ul li a,#conreset a", function(e) {
								p = 2;
								msg_list_loading = false;
							})
						},
						complete: function(XMLHttpRequest, status) {
							XMLHttpRequest = null
						}
					})
				}
			}
		}
	},
	'slider': {
			'index': function() {

				if ($('.index-slide').length > 0 && $('.index-slide-txt').length > 0) {
					var thumbsSwiper = new Swiper('.index-slide-txt', {slidesPerView: 1,allowSlideNext: false,allowSlidePrev: false,watchSlidesVisibility: true,

					})
					var swiper = new Swiper('.index-slide', {
						lazy: {loadPrevNext: true,},loop: true,autoplay: true,effect: 'fade',pagination: {el: '.index-slide .swiper-pagination',clickable: true,},
						thumbs:{swiper: thumbsSwiper,},
					});
					var slidetxt = $(".index-slide-txt .swiper-slide");
					for (i = 0; i < slidetxt.length; i++) {
						slidetxt[i].index = i + 1;
						slidetxt[i].onmouseover = function() {
							swiper.slideTo(this.index);
						};
					}
					for (i = 0; i < swiper.pagination.bullets.length; i++) {
						swiper.pagination.bullets[i].onmouseover = function() {
							this.click();
						};
					}
				}
				var articleswiper = new Swiper('#article-slide', {
					lazy: {loadPrevNext: true,},
					loop: true,
					autoHeight: true,
					navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
					pagination: {el: ' .swiper-pagination',clickable: true,},
					fadeEffect: {crossFade: true,}
				});
			},
			'nav': function(a) {
				if ($(a).length > 0) {
					try {
						var menuSwiper = new Swiper(a, {freeMode: true,slidesPerView: "auto",observer: true,observeParents: true,
						})
						var currentSlide = $(a + " .swiper-wrapper").find("li.active"),
							slideWidth = currentSlide.outerWidth(),
							slideLeft = currentSlide.offset().left,
							maxTranslate = menuSwiper.maxTranslate(),
							windowWidth = $(window).outerWidth();
						if (slideLeft < windowWidth / 2) {
							menuSwiper.setTransition(0)
						} else {
							if (slideLeft > -maxTranslate + (windowWidth / 2) - slideWidth) {
								menuSwiper.setTransition(1000)
								menuSwiper.setTranslate(maxTranslate)
							} else {
								menuSwiper.setTransition(1000)
								menuSwiper.setTranslate((windowWidth / 2) - slideLeft - (slideWidth / 2))
							}
						}
					} catch (e) {};
				}
			},
			'one': function(a) {
				$('body').find(a).each(function() {
					var id = "#" + $(this).attr('id');
					var onslide = new Swiper(id, {
						lazy: {loadPrevNext: true,},loop: true,autoplay: true,effect: 'fade',
						navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
						pagination: {el: id + ' .swiper-pagination',clickable: true,},
						fadeEffect: {crossFade: true,}

					});
				})
			},
			'auto': function(a) {
				var autoslide = new Swiper(a, {
					lazy: {loadPrevNext: true,loadPrevNextAmount: 6,},loop: true,freeMode: true,slidesPerView: 'auto',navigation: {nextEl: '.swiper-button-next',prevEl: '.swiper-button-prev',},
				});
			}
		},
};
var zanpian = {
	//浏览器信息
	'url': document.URL,
	'domain': document.domain,
	'title': document.title,
	'language': function() {
		try {
			var ua = (navigator.browserLanguage || navigator.language).toLowerCase(); //zh-tw|zh-hk|zh-cn
			return ua;
		} catch (e) {}
	}(),
	'canvas': function() {
		return !!document.createElement('canvas').getContext;
	}(),
	'useragent': function() {
		var ua = navigator.userAgent; //navigator.appVersion
		return {
			'mobile': !! ua.match(/AppleWebKit.*Mobile.*/),
			//是否为移动终端 
			'ios': !! ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
			//ios终端
			'android': ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1,
			//android终端或者uc浏览器 
			'iPhone': ua.indexOf('iPhone') > -1 || ua.indexOf('Mac') > -1,
			//是否为iPhone或者QQHD浏览器 
			'iPad': ua.indexOf('iPad') > -1,
			//是否iPad
			'trident': ua.indexOf('Trident') > -1,
			//IE内核
			'presto': ua.indexOf('Presto') > -1,
			//opera内核
			'webKit': ua.indexOf('AppleWebKit') > -1,
			//苹果、谷歌内核
			'gecko': ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1,
			//火狐内核 
			'weixin': ua.indexOf('MicroMessenger') > -1 //是否微信 ua.match(/MicroMessenger/i) == "micromessenger",			
		};
	}(),
	'js': function(file) {
		$("<scri" + "pt>" + "</scr" + "ipt>").attr({
			src: file,
			type: 'text/javascript'
		}).appendTo("head");
	},
	'css': function(file) {
		$("<link>").attr({
			rel: "stylesheet",
			type: "text/css",
			href: file
		}).appendTo("head");
	},	
	'jump': function() {
		if(cms.wap_status=='1' && (zanpian.url != cms.wap_url) && zanpian.useragent.mobile){
			location.replace(cms.wap_url);
		}			
	},	
	'verify': {
		'init': function() {
			zanpian.verify.focus();
			zanpian.verify.click();
		},
		'focus': function() { //验证码框焦点
			$('body').on("focus", ".zanpian-validate", function() {
				$(this).removeClass('zanpian-validate').after(zanpian.verify.show());
				$(this).unbind();
			});
		},
		'click': function() { //点击刷新
			$('body').on('click', 'img.validate-img', function() {
				$(this).attr('src', cms.root + 'index.php?s=/home/verify/index/' + Math.random());
			});
		},
		'refresh': function(a){
			if(a){
			    $(a+' .validate-img').attr('src', cms.root + 'index.php?s=/home/verify/index/' + Math.random());
			}else{
				$('.validate-img').attr('src', cms.root + 'index.php?s=/home/verify/index/' + Math.random());
			}
		},
		'show': function() {
			return '<img class="validate-img" src="' + cms.root + 'index.php?s=/home/verify/index/' + Math.random() + '"  title="看不清楚? 换一张！">';
		}
	},	
	'lazyload': {
		'show': function() {
			try {
				$(".lazy,.lazyload").lazyload({
					effect: "fadeIn",
					failurelimit: 20
				});
			} catch (e) {};
		},
		'tab': function($id) {
			//$($id).trigger("sporty");
			//$(".lazyload").lazyload({container:$($id)});
			$($id).find(".lazyload").each(function() {
				if (typeof($(this).hasClass("lazyload"))) {
					$(this).attr("src", $(this).attr("data-original"));
					$(this).removeAttr("data-original");
					$(this).removeClass("lazyload");
					$(this).addClass("fade-in");
				}
			})
		},
		'box': function($id) {
			$(".lazyload").lazyload({
				container: $($id)
			});
		}
	},
	'hits': function() {
		if ($('.detail-hits').length == 0) {
			return false;
		}
		$(".detail-hits").each(function(i) {
			var $this = $(".detail-hits").eq(i);
			$.ajax({
				type: 'get',
				url: cms.root + 'index.php?s=/home/hits/show/id/' + $this.attr("data-id") + '/sid/' + $this.attr("data-sid") + '/type/' + $this.attr("data-type"),
				timeout: 5000,
				dataType: 'json',
				success: function(data) {
					$type = $this.attr('data-type');
					if ($type != 'insert') {
						$this.html(eval('(data.' + $type + ')'));
					}
					if ($('#detail-hits').length > 0) {
						$("#detail-hits").html(eval('(data.' + $("#detail-hits").attr('data-type') + ')'));
					}
				}
			});
		});
	},
	'digg': function() {
		$('body').on("click", ".digg_link,#flower", function() {
			var data = {
				'id': $(this).data("id"),
				'sid': $(this).data("sid"),
				'type': $(this).data("type"),
				'name': $(this).data("name")
			}
			var obj = $(this);
			zanpiancms.ajax(cms.root + "index.php?s=/home/digg/index", 'post', 'json', data, function(r) {
				zanpiancms.tip.hide(r);
				if (parseInt(r.code) > 0) {
					count = obj.find('#count').text() * 1 + 1;
					obj.find('#count').text(count);
					obj.find('#count').attr('data-count', count)
				}
			});
			return false;
		});
		$("#flower").hover(function() {
			$(this).find("#count").text("送花");
		}, function() {
			var count = $(this).find("#count").attr("data-count")
			$(this).find("#count").text(count);
		});
	},
	'love': function() {
		$(".user-bt").each(function() {
			var a = $(this).find(".sect-btn"),
				b = $(this).find(".cancel"),
				c = $(this).find(".sect-show");
			a.click(function() {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				var d = $(this);
				zanpiancms.ajax(cms.root + "index.php?s=/home/ajax/mark/type/" + a.attr("data-type") + "/id/" + a.attr("data-id") + "/cid/" + a.attr("data-cid"), 'get', 'json', '', function(a) {
					zanpiancms.tip.hide(a), parseInt(a.code) > 0 ? (d.hide(), c.show(), b.show()) : parseInt(a["yjdy"]) > 0 && 1 == parseInt(a["yjdy"]) && (d.hide(a), c.show(), b.show())
				});
			}), b.click(function() {
				zanpiancms.ajax(cms.root + "index.php?s=/home/ajax/mark/type/" + a.attr("data-type") + "/id/" + a.attr("data-id") + "/cid/" + a.attr("data-cid"), 'get', 'json', '', function(b) {
					zanpiancms.tip.hide(b), parseInt(b.code) > 0 && (a.show(), c.hide())
				});
			})
		})
	},
	//评分
	'score': {
		'init': function() {
			if ($('#zanpian-score').length > 0 && $('#zanpian-cm').length == 0) {
				zanpian.score.ajax(cms.root + "index.php?s=/home/ajax/gold/id/" + $('#zanpian-score').data('id') + "/sid/" + $('#zanpian-score').data('sid'))
			}
		},
		'loading': function() {
			if ($('#zanpian-score').length > 0) {
				zanpian.score.ajax(cms.root + "index.php?s=/home/ajax/gold/id/" + $('#zanpian-score').data('id') + "/sid/" + $('#zanpian-score').data('sid'))
			}
		},
		//加载评分与订阅收藏
		'ajax': function(url) {
			$.ajax({
				url: url,
				cache: false,
				timeout: 3000,
				success: function(data) {
					if (data.gold != undefined && data.gold != null) {
						zanpian.score.stars(data.gold);

					};
				}
			});
			return false;
		},
		'stars': function(r) {
			if ($("#rating")) {
				$("ul.rating li").each(function() {
					var b = $(this).attr("title"),
						c = $("ul.rating li"),
						d = $(this).index(),
						e = d + 1;
					$(this).click(function() {
						hadpingfen > 0 ? (zanpiancms.tip.open({
							msg: "已经评分,请务重复评分",
							css: "alert"
						}), zanpiancms.tip.hide({})) : (zanpiancms.tip.open({
							msg: "数据提交中...",
							css: "loadings"
						}), c.removeClass("active"), $("ul.rating li:lt(" + e + ")").addClass("active"), $("#ratewords").html(b), $.post(cms.root + "index.php?s=/home/ajax/addgold", {
							val: $(this).attr("val"),
							id: cms.id,
							sid: cms.sid
						}, function(a) {
							if (parseInt(a.code) == 1) {
								$.ajax({
									type: 'get',
									cache: false,
									timeout: 3000,
									url: cms.root + "index.php?s=/home/ajax/gold/id/" + cms.id + "/sid/" + cms.sid,
									success: function(data) {
										zanpian.score.stars(data.gold);
									}
								});
							}
							parseInt(a.code) > 0 ? (zanpiancms.tip.hide(a), loadstat(), hadpingfen = 1) : -2 == parseInt(a.code) ? (hadpingfen = 1, zanpiancms.tip.open({
								msg: "已经评分,请务重复评分",
								css: "alert"
							}), zanpiancms.tip.hide({})) : (zanpiancms.tip.close(), $("#innermsg").trigger("click"));

						}, "json"))
					}).hover(function() {
						this.myTitle = this.title, this.title = "", $(this).nextAll().removeClass("active"), $(this).prevAll().addClass("active"), $(this).addClass("active"), $("#ratewords").html(b)
					}, function() {
						this.title = this.myTitle, $("ul.rating li:lt(" + e + ")").removeClass("hover")

					})
				}), $(".rating-panle").hover(function() {
					$(this).find(".rating-show").show()
				}, function() {
					$(this).find(".rating-show").hide()
				})
			}
			var hadpingfen = 0;
			var curstars = parseInt(r.mygold);
			$("#pa").html(r['curpingfen'].a + "人");
			$("#pb").html(r['curpingfen'].b + "人");
			$("#pc").html(r['curpingfen'].c + "人");
			$("#pd").html(r['curpingfen'].d + "人");
			$("#pe").html(r['curpingfen'].e + "人");
			$("#vod_gold").html(r['curpingfen'].pinfen);
			var totalnum = parseInt(r['curpingfen'].a) + parseInt(r['curpingfen'].b) + parseInt(r['curpingfen'].c) + parseInt(r['curpingfen'].d) + parseInt(r['curpingfen'].e);
			if (totalnum > 0) {
				$("#pam").css("width", ((parseInt(r['curpingfen'].a) / totalnum) * 100) + "%");
				$("#pbm").css("width", ((parseInt(r['curpingfen'].b) / totalnum) * 100) + "%");
				$("#pcm").css("width", ((parseInt(r['curpingfen'].c) / totalnum) * 100) + "%");
				$("#pdm").css("width", ((parseInt(r['curpingfen'].d) / totalnum) * 100) + "%");
				$("#pem").css("width", ((parseInt(r['curpingfen'].e) / totalnum) * 100) + "%")
			};
			if (r['hadpingfen'] != undefined && r['hadpingfen'] != null) {
				hadpingfen = 1;
			}
			var PFbai = r['curpingfen'].pinfen * 10;
			if (PFbai > 0) {
				$("#rating-main").show();
				$("#rating-kong").hide();
				$("#fenshu").animate({
					'width': parseInt(PFbai) + "%"
				});
				$("#total").animate({
					'width': parseInt(PFbai) + "%"
				});
				$("#pingfen").html(r['curpingfen'].pinfen);
				$("#pingfen2").html(r['curpingfen'].pinfen);

			} else {
				$("#rating-main").hide();
				$("#rating-kong").show();
				$(".loadingg").addClass('nopingfen').html('暂时没有人评分，赶快从左边打分吧！');
			};
			if (r['loveid'] != null) {
				$("#love").hide();
				$("#yeslove").show();
			} else {
				$("#love").show();
				$("#yeslove").hide();
			}
			if (r['remindid'] != null) {
				$("#remind").hide();
				$("#yesremind").show();
			} else {
				$("#remind").show();
				$("#yesremind").hide();
			}
			if (curstars > 0) {
				var curnum = curstars - 1;
				$("ul.rating li:lt(" + curnum + ")").addClass("current");
				$("ul.rating li:eq(" + curnum + ")").addClass("current");
				$("ul.rating li:gt(" + curnum + ")").removeClass("current");
				var arr = new Array('很差', '较差', '还行', '推荐', '力荐');
				$("#ratewords").html(arr[curnum]);
			}
		},
	},
	//播放记录
	'playlog': {
		'init': function() {
			zanpian.playlog.set();
			zanpian.playlog.get();
		},
		'get': function() {
			if ($("#user-playlog").eq(0).length) {
				$.ajax({
					type: 'get',
					cache: false,
					url: cms.root + 'index.php?s=/home/playlog/get',
					timeout: 10000,
					success: function($html) {
						$(".playlog-box").html($html);
						zanpian.user.userinfo();
					}
				})
				$('#user-playlog').hover(function() {
					$(this).children('.playlog-box').stop(true, true).show();
				}, function() {
					$(this).children('.playlog-box').stop(true, true).hide();
				})
				$('body').on("click", "#playlog-clear", function() {
					$.ajax({
						type: 'get',
						cache: false,
						dataType: 'json',
						url: cms.root + 'index.php?s=/home/playlog/clear',
						timeout: 10000,
						success: function(data) {
							if (parseInt(data["rcode"]) > 0) {
								$(".playlog-box").html("<ul><strong>暂无观看历史记录列表</strong></ul>");
							}
						}
					})
				});
				$('body').on("click", "#playlog-del", function(event) {
					event.preventDefault();
					$.post(cms.root + 'index.php?s=/home/playlog/del', {
						log_id: $(this).attr('data-id'),
						log_vid: $(this).attr('data-vid')
					}, function(data) {
						if (parseInt(data["rcode"]) > 0) {}
					}, "json")
					$(this).parent().remove();
				});
				$('body').on("click", "#playlog-close", function() {
					$('.playlog-box').stop(true, true).hide();
				});
			}
		},
		'set': function() {
			if ($(".playlog-set").eq(0).attr('data-pid')) {
				$.post(cms.root + "index.php?s=/home/playlog/set", {
					log_vid: $(".playlog-set").attr('data-id'),
					log_sid: $(".playlog-set").attr('data-sid'),
					log_pid: $(".playlog-set").attr('data-pid'),
					log_urlname: $(".playlog-set").attr('data-name'),
					log_maxnum: $(".playlog-set").attr('data-count')
				});
			}

		},
	},
	//评论
	'cm': {
		//按类型加载评论
		'init': function() {
			if ($('#zanpian-cm[data-type=zanpian]').length) {
				this.forum();
			}
			if ($('#zanpian-cm[data-type=uyan]').length) {
				this.uyan();
			}
			if ($('#zanpian-cm[data-type=changyan]').length) {
				this.changyan();
			}
		},
		'forum': function() {
			var id = $("#zanpian-cm").data('id');
			var sid = $("#zanpian-cm").data('sid');
			//如果同时需要评分并加载
			if ($('#zanpian-score').length > 0) {
				zanpian.cm.ajax(cms.root + "index.php?s=/home/ajax/get/id/" + id + "/sid/" + sid);
			} else {
				zanpian.cm.ajax(cms.root + "index.php?s=/home/ajax/cm/id/" + id + "/sid/" + sid);
			}
			zanpian.cm.emo();
			$("#subcomm").click(function(e) {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				if ($("#comm_txt").val() == '') zanpiancms.tip.open({
					css: "alert",
					msg: "请输入评论内容"
				}), $("#comm_txt").focus(), zanpiancms.tip.hide({});
				else {
					zanpiancms.ajax(cms.root + 'index.php?s=home/ajax/addcm/sid/' + sid + '/id/' + id, 'post', 'json', $("#commform").serializeArray(), function(r) {
						zanpiancms.tip.hide(r);
						if (parseInt(r['code']) > 0) {
							if (parseInt(r['code']) == 1) {
								zanpian.cm.ajax(cms.root + "index.php?s=home/ajax/cm/id/" + id + "/sid/" + sid)
							}
						} else {
							zanpian.verify.refresh("#commform");
						}
						if (parseInt(r['code']) < -1) {
							zanpian.user.loginform();
							return false;
						}
					});
				}
				return false;
			});
			$("#cmt-input-tip .form-control").focus(function() {
				$("#cmt-input-tip").hide(), $("#cmt-input-bd").show(), $("#cmt-input-bd .ui-textarea").focus()
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
			})
		},
		'uyan': function() {
			$("#zanpian-cm").html('<div id="uyan_frame"></div>');
			$.getScript("http://v2.uyan.cc/code/uyan.js?uid=" + $('#zanpian-cm[data-type=uyan]').attr('data-uyan-uid'));
		},
		'changyan': function() {
			$appid = $('#zanpian-cm[data-type=changyan]').attr('data-changyan-id');
			$conf = $('#zanpian-cm[data-type=changyan]').attr('data-changyan-conf');
			$sourceid = cms.sid + '-' + cms.id;
			var width = window.innerWidth || document.documentElement.clientWidth;
			if (width < 768) {
				$("#zanpian-cm").html('<div id="SOHUCS" sid="' + $sourceid + '"></div><script charset="utf-8" id="changyan_mobile_js" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' + $appid + '&conf=prod_' + $conf + '"><\/script>');
			} else {
				$("#zanpian-cm").html('<div id="SOHUCS" sid="' + $sourceid + '"></div>');
				$.getScript("https://changyan.sohu.com/upload/changyan.js", function() {
					window.changyan.api.config({
						appid: $appid,
						conf: 'prod_' + $conf
					});
				});
			}
		},
		//评论表情
		'emo': function() {
			$.get(cms.tpl + 'tpl/cms/emots.html', function(data) {
				$("#emots").html(data);
				$('body').on("click", ".emotion", function() {
					var left = $(this).offset().left;
					var top = $(this).offset().top;
					var id = $(this).attr("data-id");
					$("#smileBoxOuter").css({
						"left": left,
						"top": top + 25
					}).show().attr("data-id", id)
				});
				$("#smileBoxOuter,.emotion").hover(function() {
					$("#smileBoxOuter").attr("is-hover", 1)
				}, function() {
					$("#smileBoxOuter").attr("is-hover", 0)
				});
				$(".emotion,#smileBoxOuter").blur(function() {
					var is_hover = $("#smileBoxOuter").attr("is-hover");
					if (is_hover != 1) {
						$("#smileBoxOuter").hide()
					}
				});
				$(".smileBox").find("a").click(function() {
					var textarea_id = $("#smileBoxOuter").attr("data-id");
					var textarea_obj = $("#reply_" + textarea_id).find("textarea");
					var textarea_val = textarea_obj.val();
					if (textarea_val == "发布评论") {
						textarea_obj.val("")
					}
					var title = "[" + $(this).attr("title") + "]";
					textarea_obj.val(textarea_obj.val() + title).focus();
					$("#smileBoxOuter").hide()
				});
				$("#smileBoxOuter").find(".smilePage").children("a").click(function() {
					$(this).addClass("current").siblings("a").removeClass("current");
					var index = $(this).index();
					$("#smileBoxOuter").find(".smileBox").eq(index).show().siblings(".smileBox").hide()
				});
				$(".comment_blockquote").hover(function() {
					$(".comment_action_sub").css({
						"visibility": "hidden"
					});
					$(this).find(".comment_action_sub").css({
						"visibility": "visible"
					})
				}, function() {
					$(".comment_action_sub").css({
						"visibility": "hidden"
					})
				})
			});
		},
		'ajax': function(url) {
			$.ajax({
				url: url,
				cache: false,
				timeout: 3000,
				success: function(data) {
					if (data != '') {
						if ($('#datalist li').length > 3) $("html,body").animate({
							scrollTop: $("#datalist").offset().top - 130
						}, 1000);
						$("#comment").empty().html(data.comment);
						$("#commnum").html(jQuery('#comment-count', data.comment).html());
						$("#data").empty().html(data);
						$("#commnum").html(data.count);
						$(".digg a").click(function(e) {
							var data = {
								'id': $(this).data('id'),
								'type': $(this).data('type')
							}
							var obj = $(this);
							zanpiancms.ajax($(this).data('url'), 'post', 'json', data, function(r) {
								zanpiancms.tip.hide(r);
								if (parseInt(r.code) > 0) {
									obj.children('strong').html(parseInt(obj.children('strong').html()) + 1)
								}
							});
							return false;
						});
						$(".reply").click(function(e) {
							var curid = $(this).attr('data-id');
							var curpid = $(this).attr('data-pid');
							var curtid = $(this).attr('data-tid');
							var curtuid = $(this).attr('data-tuid');
							var curvid = $(this).attr('data-vid');
							var cursid = $(this).attr('data-sid');
							if (!zanpian.user.islogin()) {
								zanpian.user.loginform();
								return false;
							} else {
								if ($("#rep" + curid).html() != '') {
									$("#rep" + curid).html('');
								} else {

									$(".comms").html('');
									$("#rep" + curid).html($("#commsub").html());
									$(".emotion,#smileBoxOuter").blur(function() {
										var is_hover = $("#smileBoxOuter").attr("is-hover");
										if (is_hover != 1) {
											$("#smileBoxOuter").hide()
										}
									});
									$("#rep" + curid + " #comm_pid").val(curpid); //顶级ID
									$("#rep" + curid + " #comm_id").val(curid); //回贴ID
									$("#rep" + curid + " #comm_tid").val(curtid); //回贴ID
									$("#rep" + curid + " #comm_tuid").val(curtuid); //回贴用户ID
									$("#rep" + curid + " #comm_sid").val(cursid);
									$("#rep" + curid + " #comm_vid").val(curvid);
									$("#rep" + curid + " #row_id").attr("data-id", curid)
									$("#rep" + curid + " .recm_id").attr("id", 'reply_' + curid)
									$("#rep" + curid + " .sub").unbind();
									$("#rep" + curid + " .sub").click(function(e) {
										if (!zanpian.user.islogin()) {
											zanpian.user.loginform();
											return false;
										}
										if ($("#rep" + curid + " #commtxt").val() == '') zanpiancms.tip.open({
											css: "alert",
											msg: "请输入评论内容"
										}), $("#rep" + curid + " #commtxt").focus(), zanpiancms.tip.hide({});
										else {
											zanpiancms.ajax(cms.root + 'index.php?s=/home/ajax/addrecm', 'post', 'json', $("#rep" + curid + " #comm-sub-form").serializeArray(), function(r) {
												zanpiancms.tip.hide(r);
												if (parseInt(r['code']) > 0) {
													if (parseInt(r['code']) == 1) {
														zanpian.cm.ajax(url);
													}
												} else {
													zanpian.verify.refresh("#rep" + curid + " #comm-sub-form");
												}
												if (parseInt(r['code']) < -1) {
													zanpian.user.loginform();
													return false;
												}
											});
										}

									});
								}
							}
						});
					} else {
						$("#datalist").html('<li class="kong">当前没有评论，赶紧抢个沙发！</li>');
					};

					if (data.gold != undefined && data.gold != null) {
						zanpian.score.stars(data.gold);
					};
					$("#pages").html(data.pages);
					$("#pagetop").html(data.pagetop);
					$(".ajax-page ul a").click(function(e) {
						var pagegourl = $(this).attr('href');
						zanpian.cm.ajax(pagegourl);
						return false;
					});
				},
				dataType: 'json'
			});
			return false;
		},

	},
	'barrage': { //弹幕
		'init': function() {
			$.ajaxSetup({
				cache: true
			});
			if ($("#barrage").length) {
				$("<link>").attr({
					rel: "stylesheet",
					type: "text/css",
					href: cms.public + "tpl/cms/barrager/barrager.css"
				}).appendTo("head");
				$.getScript(cms.public + "tpl/" + cms.theme.name + "/js/jquery.barrager.js");
			}
			if ($('.barrage_switch').is('.on')) {
				zanpian.barrage.get(0);
			}
			$('body').on("click", "#slider", function() {
				if ($('.barrage_switch').is('.on')) {
					$('.barrage_switch').removeClass('on');
					$.fn.barrager.removeAll();
					clearInterval(looper);
					return false;
				} else {
					$('.barrage_switch').addClass('on');
					zanpian.barrage.get(0);
				}
			});
			$("#barrage-submit").click(function(e) {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				zanpiancms.ajax(cms.root + 'index.php?s=/home/barrage/add', 'post', 'json', $("#barrage-form").serializeArray(), function(r) {
					zanpiancms.tip.hide(r);
					if (parseInt(r['code']) > 0) {
						zanpian.barrage.get(1);
					} else {
						zanpian.verify.refresh("#barrage-form");
					}
				});
				return false;
			});
		},
		'get': function(t) {
			if ($("#barrage").data('id') != undefined && $("#barrage").data('id') != null && $("#barrage").data('id') != '') {
				var url = cms.root + "index.php?s=/home/barrage/index/t/" + t + "/id/" + $("#barrage").data('id');
			} else {
				return false;
			}
			$.getJSON(url, function(data) {
				//是否有数据
				if (typeof(data) != 'object') {
					return false;
				}
				var looper_time = data.looper_time;
				var items = data.items;
				var total = items.length;
				var run_once = true;
				var index = 0;
				barrager();

				function barrager() {
					if (t == 0) {
						if (run_once) {
							looper = setInterval(barrager, looper_time);
							run_once = false;
						}
					}
					$('#zanpiancms_player').barrager(items[index]);
					if (t == 0) {
						index++;
						if (index == total) {
							clearInterval(looper);
							return false;
						}
					}
				}

			});
		}
	},

	'player': {
		//播放页面播放列表
		'playerlist': function() {
			var height = $(".player-left").height();
			var tips = $(".player-tips").height();
			if ($(window).width() > 767) {
				var height = height - tips - 110;
			}
			$(".min-play-list").height(height);

		},
		//播放权限回调
		'vip_callback': function($vod_id, $vod_sid, $vod_pid, $status, $trysee, $tips) {
			if ($status != 200) {
				if ($trysee > 0) {
					window.setTimeout(function() {
						$.get(cms.root + 'index.php?s=/home/vod/vip/type/trysee/id/' + $vod_id + '/sid/' + $vod_sid + '/pid/' + $vod_pid, function(html) {
							var index = '<div class="embed-responsive embed-responsive-16by9"><div id="zanpiancms-player-vip"><div class="zanpiancms-player-box jumbotron">' + html + '</div></div></div>';
							$('#zanpiancms_player').html(index);
							//$('.zanpiancms-player-box').html(html).addClass("jumbotron");
							//zanpian.user.iframe();
							//$('#zanpiancms-player-vip .zanpiancms-player-iframe').hide();
						}, 'html');
					}, 1000 * 60 * $trysee);
				} else {
					$('#zanpiancms-player-vip .zanpiancms-player-box').html($tips).addClass("jumbotron");
					$('#zanpiancms-player-vip .zanpiancms-player-iframe').hide();
				}
				//播放你密码
				$('body').on("click", "#user-weixinpwd", function() {
					$(this).text('Loading...');
					$pwd = $(".password").val();
					$.get(cms.root + 'index.php?s=/home/vod/vip/type/pwd/id/' + $vod_id + '/sid/' + $vod_sid + '/pid/' + $vod_pid + '/pwd/' + $pwd, function(json) {
						if (json.status == 200) {
							zanpian.user.iframe();
						} else {
							$("#user-weixinpwd").text('播放');
							alert('密码错误或失效,请重新回复');
						}
					}, 'json');
				});
				//支付影币按钮
				$('body').on("click", "#user-price", function() {
					$(this).text('Loading...');
					var obj = $(this);
					$.get(cms.root + 'index.php?s=/home/vod/vip/type/ispay/id/' + $vod_id + '/sid/' + $vod_sid + '/pid/' + $vod_pid, function(json) {
						if (json.status == 200) {
							$.showfloatdiv({
								txt: '支付成功',
								cssname: 'succ'
							});
							$.hidediv();
							zanpian.user.iframe();
						} else if (json.status == 602) {
							obj.text('确定');
							$.showfloatdiv({
								txt: json.info
							})
							$.hidediv({})
							setTimeout(function() {
								zanpian.user.payment();
							}, 1000);
						} else if (json.status == 500 || json.status == 501) {
							//zanpian.user.login();
						} else {
							$('#zanpiancms-player-vip .zanpiancms-player-box').html(json.info).addClass("jumbotron");
						}
					}, 'json');
				});
			} else {
				//拥有VIP观看权限
			}
		},
	},

	'user': {
		'index': function() {
			zanpian.user.login();
			zanpian.user.reg();
			zanpian.user.home();
			zanpian.user.center();
			var countdown = 60;

			function settime(val) {
				if (countdown == 0) {
					val.addClass('btn-success').prop('disabled', false);
					val.val("获取验证码");
					countdown = 60;
					return true;
				} else {
					val.removeClass('btn-success').prop('disabled', true);
					val.val("重新发送(" + countdown + ")");
					countdown--;
				}
				setTimeout(function() {
					settime(val)
				}, 1000)
			}
			//重新发送邮件
			$('body').on("click", "#send", function() {
				var ac = $('input[name="ac"]').val();
				var to = $('input[name="to"]').val();
				if (ac == 'mobile') {
					if ("" == to) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "请输入手机号码"
						}), $("#to").focus(), zanpiancms.tip.hide({});
						return false;
					}
					var pattern = /^[1][0-9]{10}$/;
					var ex = pattern.test(to);
					if (!ex) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "手机号格式不正确"
						}), $("#to").focus(), zanpiancms.tip.hide({});
						return false;
					}
				} else if (ac == 'email') {
					if ("" == to) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "请输入邮箱"
						}), $("#to").focus(), zanpiancms.tip.hide({});
						return false;
					}
					var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					var exs = pattern.test(to);
					if (!exs) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "邮箱格式不正确"
						}), $("#to").focus(), zanpiancms.tip.hide({});
						return false;
					}
				}
				var obj = $(this);

				zanpiancms.ajax(cms.root + 'index.php?s=/user/reg/send/', 'post', 'json', $(this).closest('form').serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0) {
						settime(obj)
					} else {
						zanpian.verify.refresh($(this).closest('form'));
					}
				});
			});
			//购买VIP界面
			$('body').on("click", "#user-vip", function() {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				zanpiancms.pop.url({
					url: cms.root + 'index.php?s=/user/center/buy'
				});
			});
			//点击冲值影币
			$('body').on("click", "#user-payment", function() {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				zanpian.user.payment();
			});
			//支付VIP影币
			$('body').on("click", "#user-pay-vip", function() {
				zanpiancms.ajax(cms.root + "index.php?s=/user/center/buy", 'post', 'json', $(".form-pay-vip").serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0) {
						setTimeout(function() {
							zanpiancms.pop.close();
						}, 500);
						$("#grouptitle").html(a["data"]['user_grouptitle']);
						$("#viptime").html(a["data"]['user_viptime']);
						$("#usescore").html(a["data"]['user_score']);
						zanpian.user.iframe();
					}
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) == -2) {
						setTimeout(function() {
							zanpian.user.payment();
						}, 500);
					} else - 3 == parseInt(a["code"])
				});
			});
			//卡密充值
			$('body').on("click", "#user-pay-card", function() {

				zanpiancms.ajax(cms.root + "index.php?s=/user/payment/card", 'post', 'json', $(".form-pay-card").serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0 || parseInt(a["code"]) > 0) {
						setTimeout(function() {
							zanpiancms.pop.close();
						}, 500);
						$("#usescore").html(parseInt($("#usescore").text()) + parseInt(a["data"]));
						zanpian.user.iframe();
					}
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) == -2 || parseInt(a["code"]) == -2) {
						zanpian.user.payment();
					} else - 3 == parseInt(a["code"])
				});
			});
			//在线充值
			$('body').on("click", "#user-pay", function(e) {
				var type = $("select[name='payment'] option:selected").val();
				var score = $("#score").val();
				if (type == 'weixinpay') {
					e.preventDefault();
					zanpiancms.pop.url({
						url: cms.root + 'index.php?s=/user/payment/index/payment/' + type + '/score/' + score
					});
				}
				payckeck = setInterval(function() {
					check()
				}, 5000);

				function check() {
					if ($(".modal").css("display") == 'none') {
						clearInterval(payckeck);
					}
					$.get(cms.root + 'index.php?s=/user/payment/check/type/' + type + '/id/' + $("#order_id").text(), function(a) {
						if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0 || parseInt(a["code"]) > 0) {
							clearInterval(payckeck);
							$("#success").html('付款成功增加' + parseInt(a["data"]) + '积分');
							$("#usescore").html(parseInt($("#usescore").text()) + parseInt(a["data"]));
							zanpiancms.tip.open({
								msg: '付款成功增加' + parseInt(a["data"]) + '积分',
								css: 'succ'
							});
							$(".modal-dialog .close").trigger('click');
							zanpian.user.iframe();
						}
					});
				}
			});
		},
		//会员充值窗口
		'payment': function() {
			if (!zanpian.user.islogin()) {
				zanpian.user.loginform();
				return false;
			}
			zanpiancms.pop.url({
				url: cms.root + 'index.php?s=/user/payment/index'
			});
		},
		//检查VIP播放页面并刷新页面
		'iframe': function() {
			if ($("#zanpiancms-player-vip").length > 0) {
				if ($(".zanpiancms-player-iframe").length > 0 && $('.zanpiancms-player-iframe').attr('src').indexOf("home-vod-vip-type-play") >= 0) {
					$('.zanpiancms-player-iframe').attr('src', $('.zanpiancms-player-iframe').attr('src')).show();
				} else {
					self.location.reload();
				}
			}
		},
		//检查登录状态
		'islogin': function() {
			islogin = 0;
			if (document.cookie.indexOf('auth_sign=') >= 0) {
				islogin = 1;
				return true;
			}
			return false;
		},
		//弹出登录窗口
		'loginform': function() {
			if (!zanpian.user.islogin()) {
				zanpiancms.pop.url({
					url: cms.root + 'index.php?s=/home/ajax/login'
				})
			} else {
				return false;
			}
		},
		//登录
		'login': function() {
			$('body').on("click", "#login-submit", function() {
				if ("" == $("#login-form #user_name").val()) {
					zanpiancms.tip.open({
						css: "alert",
						msg: "请输入用户名"
					}), $("#login-form #user_name").focus(), zanpiancms.tip.hide({});
					return false;
				}
				if ("" != $("#login-form #user_password").val()) return zanpiancms.ajax(cms.root + 'index.php?s=/user/login/index', 'post', 'json', $("#login-form").serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0) {
						zanpian.user.iframe();
						try {
							zanpian.playlog.get();
							zanpian.score.loading();
						} catch (e) {}
						setTimeout(function() {
							zanpiancms.pop.close();
						}, 500);
					} else - 3 == parseInt(a["code"])
					zanpian.verify.refresh("#login-form");
					return false;
				});
				zanpiancms.tip.open({
					css: "alert",
					msg: "请输入密码"
				}), $("#login-form #user_password").focus(), zanpiancms.tip.hide({})
			})
		},
		//注册
		'reg': function() {
			$('body').on("click", "#reg-submit", function() {
				var ac = $('input[name="ac"]').val();
				var to = $('input[name="to"]').val();
				if ("" == $("#reg-form #user_name").val()) {
					zanpiancms.tip.open({
						css: "alert",
						msg: "请输入用户名"
					}), $("#reg-form #user_name").focus(), zanpiancms.tip.hide({});
					return false;
				}
				if (ac == 'mobile') {
					if ("" == to) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "请输入手机号码"
						}), $('input[name="to"]').focus(), zanpiancms.tip.hide({});
						return false;
					}
					var pattern = /^[1][0-9]{10}$/;
					var ex = pattern.test(to);
					if (!ex) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "手机号格式不正确"
						}), $('input[name="to"]').focus(), zanpiancms.tip.hide({});
						return false;
					}

				} else if (ac == 'email') {
					if ("" == to) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "请输入邮箱"
						}), $('input[name="to"]').focus(), zanpiancms.tip.hide({});
						return false;
					}
					var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					var ex = pattern.test(to);
					if (!ex) {
						zanpiancms.tip.open({
							css: "alert",
							msg: "邮箱格式不正确"
						}), $('input[name="to"]').focus(), zanpiancms.tip.hide({});
						return false;
					}
				}
				if ("" != $("#reg-form #user_password").val()) return zanpiancms.ajax(cms.root + 'index.php?s=/user/reg/index', 'post', 'json', $("#reg-form").serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0) {
						try {
							zanpian.playlog.get();
						} catch (e) {}
						setTimeout(function() {
							zanpiancms.pop.close();
						}, 500);
					} else - 3 == parseInt(a["code"])
					zanpian.verify.refresh("#reg-form");
					return false;
				});
				zanpiancms.tip.open({
					css: "alert",
					msg: "请输入密码"
				}), $("#reg-form #user_password").focus(), zanpiancms.tip.hide({})
			})
		},
		//注册
		'userinfo': function() {
			if (!zanpian.user.islogin()) {
				return false;
			}
			$.ajax({
				type: 'get',
				cache: false,
				url: cms.root + 'index.php?s=/user/center/flushinfo',
				timeout: 10000,
				success: function(a) {
					return -7 == parseInt(a.code) ? (zanpiancms.tip.open({
						msg: a.msg,
						classname: "error"
					}), zanpiancms.tip.hide({
						code: -1,
						msg: a.msg
					}), !1) : (a.uid > 0 && (parseInt(a.history) > 10 ? ($("#playlog-todo").html('<a target="_blank" href="' + cms.root + 'index.php?s=/user/center/playlog">进入会员中心查看' + a.history + '条播放记录&gt;&gt;</a>'), $("#playlog-todo").show()) : ($("#playlog-todo").html(""), $("#playlog-todo").hide()), loginhtml = $("#user-login").html(), $("#user-login").html(a.html), $("#nav-signed").hide(), $(".logoutbt").unbind(), $('#user-login .nav-link').removeAttr("href"), $("#nav-signed").removeAttr("style"), $(".logoutbt").click(function(event) {
						event.stopPropagation();
						zanpiancms.tip.open({
							msg: '数据提交中...',
							css: 'loadings'
						});
						$.get(cms.root + "index.php?s=/home/ajax/logout", function(r) {
							if (zanpiancms.tip.hide(r), parseInt(r["code"]) > 0) {
								$("#user-login").html(loginhtml);
								zanpian.playlog.get();
								zanpian.user.iframe();
								$("#love,#remind").show();
								$("#yeslove,#yesremind").hide();
							}
						}, 'json');
					})))
				}
			})
		},
		'home': function() {
			$('body').on("click", ".user-home-nav ul a", function() {
				var url = $(this).attr("data-url");
				if (url) {
					var txt = $(this).text();
					$(this).parents().find('li').removeClass('active');
					$(this).parent('li').addClass('active');
					$("#tab_title").text(txt);
					if ($(this).attr("data-id") == 'cm') {
						zanpian.cm.ajax(url);
						zanpian.cm.emo();
					} else {
						zanpian.user.get(url);
					}
				}
			})
		},
		//会员中心
		'center': function() {
			var countdown = 60;

			function settime(val) {
				if (countdown == 0) {
					val.addClass('btn-success').prop('disabled', false);
					val.val("重新发送认证邮件");
					countdown = 60;
					return true;
				} else {
					val.removeClass('btn-success').prop('disabled', true);
					val.val("重新发送(" + countdown + ")");
					countdown--;
				}
				setTimeout(function() {
					settime(val)
				}, 1000)
			}
			if ($("#cxselect").length > 0) {
				$.cxSelect.defaults.url = cms.public + "/zanpianadmin/libs/jquery-cxselect/js/cityData.json";
				$.cxSelect.defaults.emptyStyle = 'none';
				$('#cxselect').cxSelect({
					selects: ['province', 'city', 'area']
				});
			}
			//绑定邮箱或手机
			$('body').on("click", "#submit-bind", function() {
				var ac = $('input[name="ac"]').val();
				var to = $('input[name="to"]').val();
				if ("" == $('input[name="code"]').val()) {
					zanpiancms.tip.open({
						msg: "请输入验证码"
					}), $('input[name="code"]').focus(), zanpiancms.tip.hide({});
					return false;
				}
				zanpiancms.ajax(cms.root + "index.php?s=/user/center/bind", 'post', 'json', $('form').serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0) {
						setTimeout(function() {
							zanpiancms.pop.close();
						}, 500);
						if (ac == "email") {
							$("#user_email").val(a["data"]);
							$(".user_email").val(a["data"]);
							$("#email").html(a["data"]);
							$(".user-email-nubind").show();
							$(".user-email-bind").hide();
						}
						if (ac == "mobile") {
							$("#user_mobile").val(a["data"]);
							$(".user_mobile").val(a["data"]);
							$("#mobile").html(a["data"]);
							$(".user-mobile-nubind").show();
							$(".user-mobile-bind").hide();
						}
					}
				});
			});
			$('body').on("click", "#unbind", function() {
				var url = $(this).data('url');
				var ac = $(this).data('type');
				zanpiancms.tip.open({
					msg: '数据提交中...',
					css: 'loading'
				});
				$.get(url, function(r) {
					if (zanpiancms.tip.hide(r), parseInt(r["code"]) > 0) {
						if (ac == "email") {
							$("#user_email").val('');
							$(".user_email").val('');
							$(".user-email-nubind").hide();
							$(".user-email-bind").show();
						}
						if (ac == "mobile") {
							$("#user_mobile").val('');
							$(".user_mobile").val('');
							$(".user-mobile-nubind").show();
							$(".user-mobile-bind").hide();
						}
					}
				}, 'json');
			});
			//重新发送邮件
			$('body').on("click", "#send_newemail", function() {
				var obj = $(this);
				zanpiancms.tip.open({
					msg: '邮件发送中...',
					css: 'loading'
				});
				$.post(cms.root + "index.php?s=/user/reg/sendemail", {
					val: 1
				}, function(a) {
					settime(obj)
					zanpiancms.tip.hide(a);
				}, 'json')
			});
			$(".user-notice-close").click(function() {
				$(this).parent(".user-notice").fadeOut(400, 0, function() {
					$(this).parent(".user-notice").slideUp(400);
				});
				return false;
			});
			//删除单条数据
			$('body').on("click", ".mdel,.del", function() {
				var parents = $(this).parents('li');
				zanpiancms.tip.open({
					wantclose: 2,
					succdo: function(r) {
						parents.remove();
						count = $('#total').text() * 1 - 1;
						$('#total').text(count);
					},
					msg: '确认删除?'
				});
			});
			//删除多条数据
			$('body').on("click", ".clearall", function() {
				var url = $(this).attr("data");
				zanpiancms.tip.open({
					wantclose: 2,
					ispost: 1,
					formid: 'clearcomm',
					url: url,
					succdo: function(r) {
						if (r.data > 0) {
							count = $('#total').text() * 1 - r.data;
							$('#total').text(count);
						}
						zanpian.user.get(geturl);
						if (typeof(hoturl) != "undefined") {
							zanpian.user.hot(hoturl);
						}
					},
					msg: '确认删除?'
				});
			});
			zanpian.user.setuplabel();
			$('body').on("click", ".label-checkbox", function() {
				zanpian.user.setuplabel();
			});
			$('body').on("click", ".delcheckall", function() {
				checkAll('');
			});
			$('body').on('mouseenter', '#list li', function() {
				$(this).find(".ui-del,.mdel").show();
				$(this).addClass("hover");
			});
			$('body').on('mouseleave', '#list li', function() {
				$(this).find(".ui-del,.mdel").hide();
				$(this).removeClass("hover");
			});
			$('body').on("click", ".user_nav_get li", function() {
				var url = $(this).attr('data-url');
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				zanpian.user.get(url);
			});
			//发布留言
			$('body').on("click", "#user-edit", function() {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				var url = $(this).data('url');
				zanpiancms.pop.url({
					url: url
				})
			});
			//修改密码
			$('body').on("click", "#user-email", function() {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				zanpiancms.pop.url({
					url: cms.root + 'index.php?s=/user/center/iemail'
				});
			});
			//发送私信
			$('body').on("click", "#send-msg", function() {
				if (!zanpian.user.islogin()) {
					zanpian.user.loginform();
					return false;
				}
				var uid = $(this).attr('data-id');
				zanpiancms.pop.url({
					url: cms.root + 'index.php?s=/user/home/msg/id/' + uid
				});
			});
			$('body').on("click", "#add-modal-submit", function() {
				var url = $('#modal-form').attr('action');
				zanpiancms.ajax(url, 'post', 'json', $("#modal-form").serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) > 0) {
						if (typeof(geturl) != "undefined") {
							zanpian.user.get(geturl);
						}
						setTimeout(function() {
							zanpiancms.pop.close();
						}, 500);
					} else {
						zanpian.verify.refresh("#modal-form");
					}
				});
			})
			$('body').on("click", ".fav-cancel", function(event) {
				zanpiancms.tip.open({
					wantclose: 2,
					succdo: function(r) {
						if (parseInt(r.code) == 1) {
							zanpian.user.get(geturl);
							zanpian.user.hot(hoturl);
						}
					},
					msg: '确认删除?'
				});
			});
			$('body').on("click", ".fav-add", function(e) {
				zanpiancms.tip.open({
					css: 'loading'
				});
				var turl = $(this).attr('href');
				$.get(
				turl, '', function(data) {
					zanpiancms.tip.hide(data);
					if (parseInt(data.code) > 0) {
						zanpian.user.hot(hoturl);
						zanpian.user.get(geturl);
					}
				}, 'json');
				return false;
			});
			$('body').on('mouseenter', '.i-rss-list', function() {
				var vid = $(this).find(".play-pic").attr('data');
				if ($("#play" + vid).attr('data') == '') {
					$.ajax({
						url: cms.root + "index.php?s=/user/center/getplayurl/id/" + vid,
						success: function(r) {
							$("#play" + vid).html(r);
							$("#play" + vid).attr('data', '1');
						},
						dataType: 'json'
					});
				}
				$(this).find(".i-rss-box").show();
			});
			$('body').on('mouseleave', '.i-rss-list', function() {
				$(this).find(".i-rss-box").hide();
			});
			//表单提交	
			$('form').on('submit', function(e) {
				var url = $(this).attr('action');
				if (!url) {
					url = window.location.href;
				}
				zanpiancms.ajax(url, 'post', 'json', $("#modal-form").serializeArray(), function(a) {
					if (zanpiancms.tip.hide(a), parseInt(a["code"]) < 0) {
						zanpian.verify.refresh($(this));
					}
				});
			})
			$('body').on("click", "#delsns", function() {
				var type = $(this).attr('data-id');
				zanpiancms.tip.open({
					msg: '数据提交中...',
					css: 'loading'
				});
				$.ajax({
					type: 'get',
					dataType: 'json',
					cache: false,
					url: cms.root + "index.php?s=/user/center/sns/type/" + type,
					timeout: 3000,
					success: function(r, a) {
						zanpiancms.tip.hide(r);
						if (parseInt(r.code) > 0) {
							$('.btn-success').hide();
							$('.btn-default').show();
						}
					}
				});
			})
			$('body').on("click", "#addsns", function() {
				var type = $(this).attr('data-id');
				var snsckeck = setInterval(snslogin, 1000);
				window.open(cms.root + 'index.php?s=/user/snslogin/' + type + "/t/1", "_blank", "width=750, height=525");

				function snslogin() {
					if (zanpian.user.islogin()) {
						zanpian.user.iframe();
						zanpian.playlog.get();
						zanpiancms.pop.close();
						clearInterval(snsckeck);
					} else {
						return false;
					}
				}
			})
			$('body').on("click", ".loginout", function() {
				zanpiancms.tip.open({
					msg: '正在退出...',
					css: 'loading',
					isajax: 1,
					succdo: function(r) {}
				});
				return false;
			});
		},
		'get': function(url) {
			$.ajax({
				url: url,
				cache: false,
				timeout: 3000,
				success: function(data) {
					if (data != '') {
						if ($('#list li').length > 3) $("html,body").animate({
							scrollTop: $("#list li").offset().top - 130
						}, 1000);
						$("#data").empty().html(data);
					} else {
						$("#data").html('<div class="kong">当前没有任何数据！</div>');
					};
					$(".ajax-page ul a").click(function(e) {
						var pagegourl = $(this).attr('href');
						zanpian.user.get(pagegourl);
						return false;
					});

				},
				dataType: 'json'
			});
			return false;
		},
		'hot': function(url) {
			$.ajax({
				url: url,
				cache: false,
				timeout: 3000,
				success: function(data) {
					if (data.ajaxtxt != '') {
						$("#hotremind").empty().html(data);
					} else {
						$("#hotremind").html('<li class="kong">当前没有任何数据！</li>');
					};
					$("#pages").html(data.pages);
				},
				dataType: 'json'
			});
			return false;
		},
		'setuplabel': function() {
			if ($('.label-checkbox input').length) {
				$('.label-checkbox').each(function() {
					$(this).removeClass('label-checkbox-on');
				});

				$('.label-checkbox input:checked').each(function() {
					$(this).parent('label').addClass('label-checkbox-on');
				});

			};
			if ($('.label-radio input').length) {
				$('.label-radio').each(function() {
					$(this).removeClass('label-radio-on');
				});
				$('.label-radio input:checked').each(function() {
					$(this).parent('label').addClass('label-radio-on');
				});
			};
		},
		'editor': function() {}
	},
	'gbook': function() {
		//留言
		$('body').on("click", "#gb_types li", function(e) {
			$("#gb_types li").each(function() {
				$(this).removeClass('active');
			});
			$(this).addClass('active');
			$("#gb_type").val($(this).attr('val'));
		});
		$('body').on("click", "#gb-submit", function() {
			if ($("#gb_nickname").val() == '') zanpiancms.tip.open({
				css: "alert",
				msg: "请输入您的昵称"
			}), $("#gb_nickname").focus(), zanpiancms.tip.hide({});
			else {
				if ("" != $("#gb_content").val()) return zanpiancms.ajax(cms.root + 'index.php?s=/home/gb/add', 'post', 'json', $("#gbook-form").serializeArray(), function(r) {
					if (zanpiancms.tip.hide(r), parseInt(r["code"]) > 0) {
						if (parseInt(r["code"]) == 1) {
							zanpiancms.list.url(cms.root + "index.php?s=/home/gb/show");
						}
					} else {
						zanpian.verify.refresh("#gbook-form");
					}
					return false;
				});
				zanpiancms.tip.open({
					css: "alert",
					msg: "输入留言内容"
				}), $("#gb_content").focus(), zanpiancms.tip.hide({})
			}
		})
	},
	//联想搜索
	'autocomplete': function() {
		if ($('.zanpian-search').length == 0) {
			return false;
		}
		var $limit = $('.zanpian-search').eq(0).data('limit');
		$.ajaxSetup({
			cache: true
		});
		$.getScript(cms.public + "tpl/" + cms.theme.name + "/js/jquery.autocomplete.min.js", function(response, status) {
			$ajax_url = cms.root + 'index.php?s=/home/search/vod';
			$('.zanpian-wd').autocomplete({
				serviceUrl: $ajax_url,
				params: {
					'limit': $limit
				},
				paramName: 'q',
				maxHeight: 400,
				transformResult: function(response) {
					var obj = $.parseJSON(response);
					return {
						suggestions: $.map(obj.data, function(dataItem) {
							return {
								value: dataItem.vod_name,
								data: dataItem.vod_url
							};
						})
					};
				},
				onSelect: function(suggestion) {
					location.href = suggestion.data;
					//alert('You selected: ' + suggestion.value + ', ' + suggestion.data);
				}
			});
		});
	},
	'language': { //简繁转换
		's2t': function() {
			if (zanpian.language == 'zh-hk' || zanpian.language == 'zh-tw') {
				$.getScript(cms.public + "zanpiancms/js/s2t.min.js", function(data, status, jqxhr) {
					$(document.body).s2t(); //$.s2t(data);
				});
			}
		},
		't2s': function() {
			if (zanpian.language == 'zh-cn') {
				$.getScript(cms.public + "zanpiancms/js/s2t.min.js", function(data, status, jqxhr) {
					$(document.body).t2s(); //$.s2t(data);
				});
			}
		}
	},
	//二维码生成
	'qrcode': function() {
		if ($('.qrcode-box').length > 0) {
			wapurl = cms.wapurl;
			if (wapurl == '' || wapurl == 'undefined' || wapurl == undefined) {
				wapurl = zanpian.url;
			}
			$(".qrcode-box img").attr("src", "//api.97bike.com/qrcode/?url=" + encodeURIComponent(wapurl));
			$(".qrcode-box").append('<img src="//api.97bike.com/qrcode/?url=' + encodeURIComponent(wapurl) + '"/>');
		}
	},
	//选项卡切换
	'mytab': {
		'init': function() {
			$('body').on("click", "#myTab li", function(e) {
				var id = $(this).attr('id');
				$(this).addClass("active").siblings().removeClass("active");
				$(id).siblings().addClass("hide");
				$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
				zanpian.lazyload.tab(id);
				//$(id).find('a').lazyload({effect: "fadeIn"});
			});
			$('body').on("click", "#Tab li", function(e) {
				if (!$(this).children('a').hasClass('moreTab')) {
					var id = $(this).children('a').attr('id');
					$(this).addClass("active").siblings().removeClass("active");
					$(id).siblings().addClass("hide");
					$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
				}
				//$(id).find('a').lazyload({effect: "fadeIn"});
			});
		},
		'click': function(nid, cid, sel, show) {
			if ($(nid).length > 0) {
				$(nid).children().click(function() {
					$(this).addClass(sel).siblings().removeClass(sel);
					$(cid).children().eq($(this).index()).addClass(show).siblings().removeClass(show)
				})
			}
		},
		'hover': function(nid, cid, sel, show) {
			if ($(nid).length > 0) {
				$(nid).children().hover(function() {
					$(this).addClass(sel).siblings().removeClass(sel);
					$(cid).children().eq($(this).index()).addClass(show).siblings().removeClass(show)
				})
			}
		}
	},
	'site': function() {
		//滑动导航与幻灯片
		zanpiancms.slider.index();
		zanpiancms.slider.nav('.header-nav-wrap');
		zanpiancms.slider.auto('.auto-slide');
		zanpiancms.slider.one('.box-slide');
		zanpiancms.slider.nav('#nav-select');
		zanpiancms.slider.nav('#mcat-select');
		zanpiancms.slider.nav('#year-select');
		zanpiancms.slider.nav('#area-select');
		zanpiancms.slider.nav('#letter-select');
		//左侧滑块工具初始化
	    zanpiancms.tool();
		//搜索相关
		$(".zanpian-wd").focus(function() {
			$('.header-search .dropdown').show();
		});
		document.onclick = function(e) {
			if (!$(e.target).is(".zanpian-wd")) {
				$('.header-search .dropdown').hide();
			}
		}
		$('body').on("click", ".tool-weixin", function(e) {
			zanpiancms.tip.open({
				wantclose: 3,
				title: "关注微信公众号",
				html: $("#weixin-qrcode").html(),
			})

		})
		$('body').on("click", "#theme", function(e) {
			zanpiancms.tip.open({
				wantclose: 3,
				title: "选择皮肤",
				html: $("#theme-body").html(),
			})

		})
		$('#goback').click(function() {
			javascript: history.back(-1);
		})
		//收起展开
		$('.slideDown-btn').click(function() {
			var bnt = $(this);
			if ($(this).children().hasClass("icon-up") > 0) {
				$("." + $(this).attr('id')).slideUp(600, 'swing', function() {
					bnt.html('展开<i class="iconfont icon-down"></i>')
				});
			} else {
				$("." + $(this).attr('id')).slideDown(600, function() {
					bnt.html('收起<i class="iconfont icon-up"></i>')
				});
			}
		});
		$('body').on("click", ".detail-info", function(e) {
			$(this).parent().find(".txt-hid").toggleClass('txt-hidden');
			$(this).parent().find(".slidedown span").toggleClass('icon-up');

		});
		$('body').on("click", ".more", function(e) {
			$($(this).attr('data-id')).toggleClass('hide');
			$(this).parent().find("span.iconfont").toggleClass('icon-up');

		});
		//显示更多
		$('body').on("click", ".more-click", function() {
			var self = $(this);
			var box = $(this).attr('data-box');
			var allNum = $(this).attr('data-count');
			var buNum = allNum - $(this).attr('data-limit');
			var sta = $(this).attr('data-sta');
			var hideItem = $('.' + box).find('li[rel="h"]');
			if (sta == undefined || sta == 0) {
				hideItem.show();
				$(this).find('span').text('收起部分' + buNum);
				self.attr('data-sta', 1);
			} else {
				hideItem.hide();
				$(this).find('span').text('查看全部' + allNum);
				self.attr('data-sta', 0);
			}
			if ($(".main-left").height() > $(".main-right").height()) {
				zanpiancms.fixbar(".main-left", ".main-right");
			}

		});
		//键盘上一页下一页
		var prevpage = $("#pre").attr("href");
		var nextpage = $("#next").attr("href");
		$("body").keydown(function(event) {
			if (event.keyCode == 37 && prevpage != undefined) location = prevpage;
			if (event.keyCode == 39 && nextpage != undefined) location = nextpage;
		});
		zanpian.mytab.click(".story-nav-page", ".details-play-list", "active", "show")
		//更多播放地址切换
		$('body').on("click", ".moreTab", function(e) {
			var id = $(this).attr('data-id');
			$(this).parent().find("span").toggleClass('icon-up');
			$("*[data-type='" + id + "']").toggle(100);
			$(this).parent().toggleClass('active');
			return false;
		});
		$(".play-more ul li").click(function() {
			$(".moreTab").trigger("click");
			$("#Tab").find('li').removeClass('active');
			var activeTab = $(this).html();
			var prevTab = $(this).parent().parent().prev('li').html();
			$(this).html(prevTab);
			$(this).parent().parent().prev('li').addClass('active').html(activeTab);
			var id = $(this).children('a').attr('id');
			$(this).addClass("active").siblings().removeClass("active");
			$(id).siblings().addClass("hide");
			$(id).removeClass("hide").addClass("show").siblings().removeClass("show");
		});
		//手机端播放源切换
		$(".min-play-more ul li").click(function() {
			var sclass = $(this).find('a').attr('class');
			var stext = $(this).text();
			$(".min-play-more .name").text(stext);
			$("#min-more").removeClass($("#min-more").attr('class'));
			$("#min-more").addClass(sclass);
			$(this).siblings().removeClass('active');
		});
		var WidthScreen = true;
		var classs = $(".details-play-list ul.play-list li").attr("class");
		for (var i = 0; i < $(".details-play-list ul.play-list").length; i++) {
			series($(".details-play-list ul.play-list").eq(i), 20, 1);
		}

		function series(div, n1, n2) { //更多剧集方法
			var len = div.find("li").length;
			var n = WidthScreen ? n1 : n2;
			if (len > 24) {
				for (var i = n2 + 18; i < len - ((n1 / 2) - 2) / 2; i++) {
					div.find("li").eq(i).addClass("hided");
				}
				var t_m = "<li class='" + classs + " more open'><a target='_self' href='javascript:void(0)'>更多剧集</a></li>";
				div.find("li").eq(n2 + 17).after(t_m);
				var more = div.find(".more");
				var _open = false;
				div.css("height", "auto");
				more.click(function() {
					if (_open) {
						div.find(".hided").hide();
						$(this).html("<a target='_self' href='javascript:void(0)'>更多剧集</a>");
						$(this).removeClass("closed");
						$(this).addClass("open");
						$(this).insertAfter(div.find("li").eq(n2 + 17));
						_open = false;
					} else {
						div.find(".hided").show();
						$(this).html("<a target='_self' href='javascript:void(0)'>收起剧集</a>");
						$(this).removeClass("open");
						$(this).addClass("show");
						$(this).insertAfter(div.find("li:last"));
						_open = true;
					}
				})
			}
		}
		if ($("#downlist").length) {
			$.getScript(cms.public + "tpl/" + cms.theme.name + "/js/down.js");
		}
		$('body').on("click", ".user_add_detail", function(e) {
			if (!zanpian.user.islogin()) {
				zanpian.user.loginform();
				return false;
			}
			zanpiancms.pop.url({
				url: $(this).data('url')
			})
		});
		$('body').on("click", "#user-login,#login", function(event) {
			if (!zanpian.user.islogin()) {
				event.preventDefault();
				zanpian.user.loginform();
				return false;
			}
		});
		if ($('.min-play-list').length > 0) {
			zanpian.player.playerlist();
		}
		$(window).resize(function() {
			zanpian.player.playerlist();
		});
		$('body').on("click", "#player-shrink", function() {
			$(".vod-play-box").toggleClass("max");
			$(".player-shrink").toggleClass("icon-left");
		});
		$('body').on("click", ".icon-guanbi", function() {
			$(this).parent().hide();
		});
		$('body').on("focus", "#id_input", function() {
			//$("#role_list").hide();						   
		})
		$('body').on("click", "#get_role", function() {
			$("#role_list").show();
		});
		//右侧滑块
		if ($(".main-left").height() > $(".main-right").height()) {
			zanpiancms.fixbar(".main-left", ".main-right");
		}
	}

};

$(document).ready(function() {
	//主题切换			   
	zanpiancms.theme();
	//手机端跳转
	zanpian.jump();
	//验证码初始化
	zanpian.verify.init();
	//图片延迟加载初始化
	zanpian.lazyload.show();
	//人气初始化
	zanpian.hits();
	//顶踩初始化
	zanpian.digg();
	//收藏订阅初始化
	zanpian.love();
	//评分初始化
	zanpian.score.init();
	//评论初始化
	zanpian.cm.init();
	//联想搜索初始化
	zanpian.autocomplete();
	//播放记录初始化
	zanpian.playlog.init();
	//二维码生成初始化
	zanpian.qrcode();
	//左侧滑块工具初始化
	zanpian.mytab.init();
	//留言板初始化
	zanpian.gbook();
	//加载弹幕
	zanpian.barrage.init();
	//加载AJAX列表
	zanpiancms.list.init();
	//模版使用
	zanpian.user.index();
	//网站相关
	zanpian.site();
});