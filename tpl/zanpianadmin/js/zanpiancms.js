var zanpian = {	
'cms': {
	'all': function() {
		zanpian.table.load();
	    zanpian.form.load($("#myform"));		
	},	
    'install': function() {
		zanpian.table.load();
	},
    'update': function() {
		$(document).on("click", ".update", function(e) {			
		     var url=$(this).data('url');
		     var index = parent.layer.getFrameIndex(window.name);
             parent.layer.close(index);
			 parent.layer.open({
					   title: '安装更新',   
					   zIndex:layer.zIndex,	
                       type: 2,
                       area: ['600px', '500px'], //宽高
                       content: url
                 });
		})
        zanpian.upload.api.plupload("#plupload-update", function(data,ret){
					layer.confirm(ret.msg, {
						zIndex:layer.zIndex,		  
						icon: 1,
						title: '温馨提醒',
						btn: ['安装更新', '取消更新']
					}, function(index, layero) {
                          layer.close(index);
		                  var index = parent.layer.getFrameIndex(window.name);
                          parent.layer.title('安装更新', index) ;
                          parent.layer.iframeSrc(index, ret.url)  ;
					})					
		});	
	},	
	'login': function() {
           $("#myform").submit(function(event){
			var type = $(this).attr("method").toUpperCase();
			type = type && (type === 'GET' || type === 'POST') ? type : 'GET';
			url = $(this).attr("action");
			url = url ? url : location.href;
			query = $(this).serialize();
			layer.msg('数据提交中...', {zIndex:layer.zIndex,icon:6});
			$.ajax({
				type: "post",
				url: url,
				data: query,
				dataType: 'json',
				success: function(json) {
					if (json.code == 1){
						layer.msg(json.msg ? json.msg : '登录成功', {zIndex:layer.zIndex,icon: 1,time: 500}, function() {
							if (json.url) {
							    setTimeout(function() {
								   location.href = json.url;
							   }, 1500);	
							}
						});
					} else{
						layer.confirm(json.msg ? json.msg : '登录失败', {zIndex:layer.zIndex,icon: 5, title:'提示',btn: ['朕知道了!']});
						$("#verify").attr("src", $("#verify").attr('src') + '?tm=' + Math.random());
					}
				},
				error: function(json) {
					layer.confirm('程序返回：' + json.status + ' 错误,点击查看详细错误', {zIndex:layer.zIndex,icon: 5, title:'出错啦！',btn: ['查看', '关闭']}, function() {
						$('html').html(json.responseText);
					});
				},
			});
			return false;
		})		
		$(document).on("click", "#verify", function(e) {
			$("#verify").attr("src", $("#verify").attr('src') + '?tm=' + Math.random());
		});
		$(document).on("click", "#verify", function(e) {
			$("#verify").attr("src", $("#verify").attr('src') + '?tm=' + Math.random());
		});
	},
	'index': function(){
		/*
		if(config.cms.player == 0) {
                layer.confirm('检查到你使用站内播放,网站存在版权问题或涉及违法,一切后果自负,增强版权意识,请勿提供在线播放等站内播放没有版权的内容.请勿添加和采集违反国家法律法规的内容,如有发现我们将把相关信息提交到有关部门。', {zIndex:layer.zIndex,closeBtn: 0,icon: 5,title:'警告',btn: ['已知晓，自己负责!']})
		}else{
           function getCookie(name){ 
               var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")); 
               if(arr != null){ 
                    return unescape(arr[2]); 
               }else{ 
                    return null; 
               } 
           } 
           var tag = getCookie('tag');
           if(!tag){
			   document.cookie = "tag=0";
               layer.confirm('请勿添加和采集违反国家法律法规的内容,如有发现我们将把相关信息提交到有关部门。', {zIndex:layer.zIndex,closeBtn: 0,icon: 5,title:'警告',btn: ['已知晓，自己负责!']});
           }
		}
		if(config.zanpian.moduleurl.indexOf("admin.php")>0 || config.zanpian.moduleurl.indexOf("admin")>0){
            layer.open({
	  			type: 1,
	  			title: '温馨提示',
	  			closeBtn: 1, //不显示关闭按钮
	  			area: ['340px', '220px'],
	  			skin: 'layui-layer-lan',
	  			move:false,
	  			shade: 0,
	 			offset: 'rb', //右下角弹出
	  			anim: 2,
	  			content: "<div style='padding:15px;font-size:14px;line-height:24px'>检查到你后台路入口文件名称存在安全隐患<br>请不要使用admin.php或者admin相关名称,请及时修改.</div>",
	  			btn: ['我知道了'],
	 		});
		}
		*/
		zanpian.table.load();
		$(document).on("click", ".editpwd", function(e){
			zanpian.api.open($(this));
			return false;
		});		
		$(document).on("click", ".logout", function(e) {
			zanpian.api.ajax($(this), 1);
			return false;
		});
		$(window).resize(function() {
			$(".tab-addtabs").css("height", $(".content-wrapper").height() + "px");
		});
		//切换左侧sidebar显示隐藏
		$(document).on("click fa.event.toggleitem", ".sidebar-menu li > a", function(e) {
			$(".sidebar-menu li").removeClass("active");
			//当外部触发隐藏的a时,触发父辈a的事件
			if (!$(this).closest("ul").is(":visible")) {
				//如果不需要左侧的菜单栏联动可以注释下面一行即可
				$(this).closest("ul").prev().trigger("click");
			}
			var visible = $(this).next("ul").is(":visible");
			if (!visible) {
				$(this).parents("li").addClass("active");
			} else {}
			e.stopPropagation();
		});

		//快捷搜索
		$(".menuresult").width($("form.sidebar-form > .input-group").width());
		var searchResult = $(".menuresult");
		$("form.sidebar-form").on("blur", "input[name=q]", function() {
			searchResult.addClass("hide");
		}).on("focus", "input[name=q]", function() {
			if ($("a", searchResult).length > 0) {
				searchResult.removeClass("hide");
			}
		}).on("keyup", "input[name=q]", function() {
			searchResult.html('');
			var val = $(this).val();
			var html = [];
			if (val != '') {
				$("ul.sidebar-menu li a[data-addtab]:not([href^='javascript:;'])").each(function() {
					if ($("span:first", this).text().indexOf(val) > -1) {
						html.push('<a data-url="' + $(this).data("url") + '" data-addtab="' + $(this).data("addtab") + '" href="javascript:;">' + $("span:first", this).text() + '</a>');
						if (html.length >= 100) {
							return false;
						}
					}
				});
			}
			$(searchResult).append(html.join(""));
			if (html.length > 0) {
				searchResult.removeClass("hide");
			} else {
				searchResult.addClass("hide");
			}
		});
		//读取官方信息
		$.ajax({
			url: config.zanpian.apiurl + 'news/index/',
			type: 'post',
			dataType: 'jsonp',
			success: function(ret){
				$(".notifications-menu > a span").text(ret.new > 0 ? ret.new : '');
				$(".notifications-menu .footer a").attr("href", ret.url);
				$.each(ret.newslist, function(i, j) {
					var item = '<li><a href="' + j.news_jumpurl + '" target="_blank"><i class="' + j.news_icon + '"></i> ' + j.news_name + '</a></li>';
					$(item).appendTo($(".notifications-menu ul.menu"));
				});
			}
		});
		//版本检测
		var checkupdate = function(ignoreversion, tips) {
				$.ajax({
					url: config.zanpian.apiurl + 'version/check/',
					type: 'post',
					data: {
						version: config.cms.version
					},
					dataType: 'jsonp',
					success: function(ret) {
						if (ret.data && ignoreversion !== ret.data.newversion) {
							layer.open({
								title: '发现新版本',
								zIndex:layer.zIndex,
								area: ["500px", "auto"],
								content: '<h5 style="background-color:#f7f7f7; font-size:14px; padding: 10px;">你的版本是:' + ret.data.version + '，新版本:' + ret.data.newversion + '</h5><span class="label label-danger">更新说明</span><br/>' + ret.data.upgradetext,
								btn: ['在线更新', '手动更新', '忽略此次更新', '不再提示'],
								btn2: function(index, layero) {
									$(".layui-layer-btn1", layero).attr("href", ret.data.downloadurl).attr("target", "_blank");
								},
								btn3: function(index, layero) {
									localStorage.setItem("ignoreversion", ret.data.newversion);
								},
								btn4: function(index, layero) {
									localStorage.setItem("ignoreversion", "*");
								},
								yes: function(index) {
									layer.close(index);
									zanpian.api.window(zanpian.api.fixurl('update/index'), ret.data.newversion + '在线更新',)
								},
							});
						} else {
							if (tips) {
								layer.msg('已经是最新版本了', {
									zIndex:layer.zIndex,	  
									icon: 1,
									time: 1800
								});
							}
						}
					},
					error: function(e) {
						if (tips) {
							layer.msg("发生未知错误:" + e.message, {
								zIndex:layer.zIndex,	  
								icon: 2,
								time: 1800
							});
						}
					}
				});
			};
		//读取版本检测信息
		var ignoreversion = localStorage.getItem("ignoreversion");
		if (ignoreversion !== "*") {
			checkupdate(ignoreversion, false);
		}
		//手动检测版本信息
		$("a[data-toggle='checkupdate']").on('click', function() {
			checkupdate('', true);
		});
            if ($("ul.sidebar-menu li.active a").length > 0) {
                $("ul.sidebar-menu li.active a").trigger("click");
            } else {
                $("ul.sidebar-menu li a[url!='javascript:;']:first").trigger("click");
            }		
		//刷新页面后跳到到刷新前的页面
		if (config.zanpian.referer) {
			$.addtabs.url(config.zanpian.referer);
		}
	},
	'config': function() {
		zanpian.table.load();
	    zanpian.form.load($("#myform"));
		$(document).on("change", "select[name='system[system_pathinfo]']", function() {
			layer.confirm('修改PATHINFO后需要重新从登录页面进入后台！因为生成的路径改变了。', {
				zIndex:layer.zIndex,		  
				icon: 5,
				title: '温馨提示',
				btn: ['知道了', '关闭']
			});
		});
		$(document).on("change", "select[name='video[video_play]']", function() {
				if($(this).val()==0){
                         layer.confirm('检查到你使用站内播放,网站存在版权问题或涉及违法,一切后果自负.', {zIndex:layer.zIndex,icon: 5, title:'警告',btn: ['自己负责!']})
				}																		
		});			
		$(document).on("click", "#prefix_click", function(e) {
			$("input[name='cache[prefix]']").val(zanpian.api.pwd(12));
		});
		$(document).on("click", "#password_click", function(e) {
			var url, type, host, port, password
			url = $(this).data('url');
			type = $("select[name='cache[type]'] option:selected").val();
			host = $("input[name='cache[host]']").val();
			port = $("input[name='cache[port]']").val();
			password = $("input[name='cache[password]']").val();
			$.ajax({
				url: $(this).data('url'),
				type: "post",
				dataType: "json",
				data: {
					type: type,
					host: host,
					port: port,
					password: password
				},
				beforeSend: function() {},
				error: function(r) {
					layer.msg('发生错误，请检查是否开启相应扩展库!', {
						zIndex:layer.zIndex,	  
						icon: 2,
						time: 1800
					});
				},
				success: function(r) {
					layer.msg(r.msg, {
						zIndex:layer.zIndex,	  
						icon: 1,
						time: 1800
					});
				},
				complete: function() {}
			});
		});
	   function showtab(mid, no, n) {
		if (no == 1) {
			for (var i = 0; i <= n; i++) {
				$('#' + mid + i).show();
			}
		} else {
			for (var i = 0; i <= n; i++) {
				$('#' + mid + i).hide();
			}
		}
	  }
	  if ($("select[name='rewrite[url_rewrite_user]'] option:selected").val() == 1) {
				$("#url_rewrite_route,#url_rewrite_user_callout").show();
			}else{
				$("#url_rewrite_route,#url_rewrite_user_callout").hide();
	  }	
	  $(document).on("change", "select[name='rewrite[url_rewrite_user]']", function() {
			if ($(this).val() == 1) {
				$("#url_rewrite_route,#url_rewrite_user_callout").show();
			} else {
				$("#url_rewrite_route,#url_rewrite_user_callout").hide();
			}
		});		  
	  if ($("select[name='cache[type]'] option:selected").val() == 'redis' || $("select[name='cache[type]'] option:selected").val() == 'memcache') {
				$("#host,#port,#password").show();
	  }else{
				$("#host,#port,#password").hide();
	  }
	  $(document).on("change", "select[name='cache[type]']", function() {
			if($(this).val() == 'redis'){
			   $("input[name='cache[port]']").val('6379');
			}														  
			if($(this).val() == 'memcache'){
			   $("input[name='cache[port]']").val('11211');
			}																	  												  
			if ($(this).val() == 'redis' || $(this).val() == 'memcache') {
				$("#host,#port,#password").show();
			} else {
				$("#host,#port,#password").hide();
			}
		});	
	  if($("select[name='upload[upload_thumb]'] option:selected").val() == 1) {
				showtab('thumb', 1, 2);
	  }else{
				showtab('thumb', 0, 2);
	   }
	   $(document).on("change", "select[name='upload[upload_thumb]']", function() {
			if ($("select[name='upload[upload_thumb]'] option:selected").val() == 1){
			   showtab('thumb', 1, 2);	
			}else{
				showtab('thumb', 0, 2);
			}
																			   
		});	
	  if($("select[name='upload[upload_water]'] option:selected").val() == 1) {
				showtab('water', 1, 4);
	  }else{
				showtab('water', 0, 4);
	   }
	   $(document).on("change", "select[name='upload[upload_water]']", function() {
			if ($("select[name='upload[upload_water]'] option:selected").val() == 1){
			   showtab('water', 1, 4);	
			}else{
				showtab('water', 0, 4);
			}
																			   
		});		   
	  if ($("select[name='upload[upload_type]'] option:selected").val() == 0) {
				showtab('bendi', 1, 1);
			}else{
				showtab('bendi', 0, 1);
			}
			if ($("select[name='upload[upload_type]'] option:selected").val() == 1) {
				showtab('ftp', 1, 7);
				showtab('bendi', 1, 1);
			}else{
				showtab('ftp', 0, 7);
			}
			if ($("select[name='upload[upload_type]'] option:selected").val() == 2) {
				showtab('sina', 1, 5);
				showtab('bendi', 0, 1);
			}else{
				showtab('sina', 0, 5);
			}
			if ($("select[name='upload[upload_type]'] option:selected").val() == 3) {
				showtab('qiniu', 1, 4);
				showtab('bendi', 0, 1);
			}else{
				showtab('qiniu', 0, 4);
			}
			if ($("select[name='upload[upload_type]'] option:selected").val() == 4) {
				showtab('upyun', 1, 4);
				showtab('bendi', 1, 1);
			}else{
				showtab('upyun', 0, 4);
			}
			$(document).on("change", "select[name='upload[upload_type]']", function() {
				if ($(this).val() == 1) {
					showtab('ftp', 1, 7);
					showtab('sina', 0, 5);
					showtab('qiniu', 0, 4);
					showtab('upyun', 0, 4);
					showtab('bendi', 1, 1);
				}else if($(this).val() == 2){
					showtab('sina', 1, 5);
					showtab('qiniu', 0, 4);
					showtab('upyun', 0, 4);
					showtab('ftp', 0, 7);
					showtab('bendi', 0, 1);
				}else if($(this).val() == 3){
					showtab('qiniu', 1, 4);
					showtab('sina', 0, 5);
					showtab('upyun', 0, 4);
					showtab('ftp', 0, 7);
					showtab('bendi', 0, 1);
				}else if($(this).val() == 4){
					showtab('upyun', 1, 4);
					showtab('sina', 0, 5);
					showtab('ftp', 0, 7);
					showtab('qiniu', 0, 4);
					showtab('bendi', 1, 1);
				}else {
					showtab('bendi', 1, 1);
					showtab('sina', 0, 5);
					showtab('qiniu', 0, 4);
					showtab('upyun', 0, 4);
					showtab('ftp', 0, 7);
				}
			});		
			    
	},
	'data': function() {
		zanpian.table.load();
		var $form = $("#export-form"),
			$export = $("#export"),
			tables
			$optimize = $("#optimize"),
			$repair = $("#repair");
		$(document).on("click", "#export", function() {
			$("#export").parent().children().addClass("disabled");
			$("#export").html("正在发送备份请求...");
			$.post($form.attr("action"), $form.serialize(), function(data) {
				if (data.code) {
					layer.msg('操作成功开始备份', {
						zIndex:layer.zIndex,	  
						icon: 1,
						time: 1800
					});
					tables = data.data.tables;
					$("#export").html(data.msg + "开始备份，请不要关闭本页面！");
					backup(data.data.tab);
					window.onbeforeunload = function() {
						return "正在备份数据库，请不要关闭！"
					}
				} else {
					layer.confirm(data.msg, {
						zIndex:layer.zIndex,		  
						icon: 3,
						title: '温馨提醒',
						btn: ['确定', '取消']
					}, function(index, layero) {
						layer.close(index);
						$.get(zanpian.api.fixurl('data/dellock'), function(result) {});
					})
					$("#export").parent().children().removeClass("disabled");
					$("#export").html("立即备份");
					setTimeout(function() {
						$('#top-alert').find('button').click();
						$(that).removeClass('disabled').prop('disabled', false);
					}, 1500);
				}
			}, "json");
			return false;
		});
		//数据库还原
		$(document).on("click", "#db-import", function() {
			var self = this,
				status = ".";
			if ($(this).hasClass('confirm')) {
				layer.confirm('确认要执行该操作吗?', {
					zIndex:layer.zIndex,		  
					icon: 3,
					title: '温馨提醒',
					btn: ['确定', '取消']
				}, function(index, layero) {
					layer.close(index);
					$.get(self.href, success, "json");
					window.onbeforeunload = function() {
						return "正在还原数据库，请不要关闭！"
					}
					return false;
					function success(data) {
						if (data.code) {
							if (data.data.gz) {
								data.msg += status;
								if (status.length === 5) {
									status = ".";
								} else {
									status += ".";
								}
							}
							$(self).parent().prev().text(data.msg);
							if (data.data.part) {
								$.get(self.href, {
									"part": data.data.part,
									"start": data.data.start
								}, success, "json");
							} else {
								window.onbeforeunload = function() {
									return null;
								}
							}
						} else {
							layer.msg(data.msg ? data.msg : '操作失败', {
								zIndex:layer.zIndex,	  
								icon: 2,
								time: 1800
							});
						}
					}
				})
				return false;
			};
		});
		$(document).on("click", "#field", function() {
			$('#rpfield').val($(this).attr('title'));
		});
		$(document).on("change", "select[name='exptable']", function() {
			var id = $(this).val();
			$.ajax({
				url: zanpian.api.fixurl('data/ajaxfields'),
				type: 'post',
				dataType: 'json',
				data: {
					id: id
				},
				success: function(data) {
					if (data.code == 1) {
						layer.msg(data.msg ? data.msg : '获取成功');
						$("#fields").html(data.data);
					} else {
						layer.msg(data.msg ? data.msg : '获取失败');
					}
				}
			});
		});
		function backup(tab, status) {
			status && showmsg(tab.id, "开始备份...(0%)");
			$.get($form.attr("action"), tab, function(data) {
				if (data.code) {
					var info = data.data;
					showmsg(tab.id, data.msg);
					if (!$.isPlainObject(info.tab)) {
						$("#export").parent().children().removeClass("disabled");
						$("#export").html("备份完成，点击重新备份");
						window.onbeforeunload = function() {
							return null
						}
						return;
					}
					backup(info.tab, tab.id != info.tab.id);
				} else {
					layer.msg(data.msg ? data.msg : '获取失败', {zIndex:layer.zIndex,icon: 2,time: 500});
					$("#export").parent().children().removeClass("disabled");
					$("#export").html("立即备份");
					setTimeout(function() {
						$('#top-alert').find('button').click();
						$(that).removeClass('disabled').prop('disabled', false);
					}, 1500);
				}
			}, "json");

		}
		function showmsg(id, msg) {
			$form.find("input[value=" + tables[id] + "]").closest("tr").find(".info").html(msg);
		}
	},
	'database': function() {
		zanpian.form.load($("#myform"))
		$("#database").on('click', '.dropdown-menu input, .dropdown-menu label, .dropdown-menu select', function(e) {
			e.stopPropagation();
		});

		//提交时检查是否有删除或清空操作
		$("#database").on("submit", "#sqlexecute", function() {
			var v = $("#sqlquery").val().toLowerCase();
			if ((v.indexOf("delete ") >= 0 || v.indexOf("truncate ") >= 0) && !confirm(__('Are you sure you want to delete or turncate?'))) {
				return false;
			}
		});
		//事件按钮操作
		$("#database").on("click", "ul#subaction li input", function() {
			$("#topaction").val($(this).attr("rel"));
			return true;
		});
		//窗口变更的时候重设结果栏高度
		$(window).on("resize", function() {
			$("#database .well").height($(window).height() - $("#database #sqlexecute").height() - $(".callout-success").outerHeight() - 100);
		});
		//修复iOS下iframe无法滚动的BUG
		if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
			$("#resultparent").css({
				"-webkit-overflow-scrolling": "touch",
				"overflow": "auto"
			});
		}
		$(window).resize();
	},
	'group': function() {
		zanpian.table.load();	
		$("#myform").submit(function(event){
           if ($("#treeview").length > 0) {
               var r = $("#treeview").jstree("get_all_checked");
               $("input[name='rules']").val(r.join(','));
           }
           return true;
        });	
		zanpian.form.load($("#myform"))
        zanpian.jstree.load();
		$(document).ready(function(){
		if ($('#treeview').length > 0) {
			   var id = $("input[name='id']").val();
			   var type = $("select[name='module'] option:selected").val();			
			   roletree(id,type);
		} 
		});	
		$(document).on("change", "select[name='module']", function() {
			   var id = $("input[name='id']").val();														 
			   roletree(id,$(this).val());
		});	
		function roletree(id,type){			   
			$.ajax({
				url: zanpian.api.fixurl('group/roletree'),
				type: 'get',
				dataType: 'json',
				data: {id: id,type:type},
				success: function(ret) {
					if (ret.hasOwnProperty("code")) {
						var data = ret.hasOwnProperty("data") && ret.data != "" ? ret.data : "";
						if (ret.code === 1) {
							//销毁已有的节点树
							$("#treeview").jstree("destroy");
							rendertree(data);
						} else {
							layer.msg(ret.msg ? ret.msg : '获取失败', {zIndex:layer.zIndex,icon: 2,time: 500});
						}
					}
				},
				error: function(e) {
					   layer.msg(e.message ? e.message : '获取失败', {zIndex:layer.zIndex,icon: 2,time: 500});
				}
			});
		}
		$(document).on("click", "#checkall", function() {
			$("#treeview").jstree($(this).prop("checked") ? "check_all" : "uncheck_all");
		});
		$(document).on("click", "#expandall", function() {
			$("#treeview").jstree($(this).prop("checked") ? "open_all" : "close_all");
		});
		function rendertree(content) {
			$("#treeview").on('redraw.jstree', function(e){
				$(".layer-footer").attr("domrefresh", Math.random());
			}).jstree({
				"themes": {
					"stripes": true
				},
				"checkbox": {
					"keep_selected_style": false,
				},
				"types": {
					"root": {
						"icon": "fa fa-folder-open",
					},
					"menu": {
						"icon": "fa fa-folder-open",
					},
					"file": {
						"icon": "fa fa-file-o",
					}
				},
				"plugins": ["checkbox", "types"],
				"core": {
					'check_callback': true,
					"data": content
				}
			});
		}
	},
	'auth': function() {
		   zanpian.table.load();
	       zanpian.form.load($("#myform"))
            //显示隐藏子节点
             $(document.body).off("click").on("click", ".btn-node-sub", function (e) {
                    var status = $(this).data("shown") ? true : false;
                    $("a.btn[data-pid='" + $(this).data("id") + "']").each(function () {
                        $(this).closest("tr").toggle(!status);
                    });
                    $(this).data("shown", !status);
                    return false;
                });													 
            //展开隐藏一级
            $(document.body).on("click", ".btn-toggle", function (e) {
                $("a.btn[data-id][data-pid][data-pid!=0].disabled").closest("tr").hide();
                var that = this;
                var show = $("i", that).hasClass("fa-chevron-down");
                $("i", that).toggleClass("fa-chevron-down", !show);
                $("i", that).toggleClass("fa-chevron-up", show);
                $("a.btn[data-id][data-pid][data-pid!=0]").not('.disabled').closest("tr").toggle(show);
                $(".btn-node-sub[data-pid=0]").data("shown", show);
            });
            //展开隐藏全部
            $(document.body).on("click", ".btn-toggle-all", function (e) {
                var that = this;
                var show = $("i", that).hasClass("fa-plus");
                $("i", that).toggleClass("fa-plus", !show);
                $("i", that).toggleClass("fa-minus", show);
                $(".btn-node-sub.disabled").closest("tr").toggle(show);
                $(".btn-node-sub").data("shown", show);
            });		   
           $(document).on('click', "#chooseicon ul  li", function () {											 
                 parent.$("#icon").val('fa fa-'+$(this).data('font'));
           });		  
           $(document).on('click', ".btn-search-icon", function () {
				var url=$(this).data('url');
                 layer.open({
						zIndex:layer.zIndex,	
                       type: 2,
                       area: ['460px', '300px'], //宽高
                       content: url
                 });
           });		  
	},
	'model': function() {
			zanpian.table.load();
	        zanpian.form.load($("#myform"))
            $(document).on('click', ".nav-tabs a", function (e) {
                $(".layer-footer").attr("domrefresh", Math.random());
            });			
		
	},
	'channel': function() {
			zanpian.table.load();
	        zanpian.form.load($("#myform"))
            $(document).on('click', ".nav-tabs a", function (e) {
                $(".layer-footer").attr("domrefresh", Math.random());
            });
			 $(document).on("change", "select[name='list_sid']", function () {
                    var id = $(this).val();
					url="channel/show/id/"+id;
					$.get(url,function(data,status){
						$("#contents").html(jQuery('#contents', data).html());
						$("#seo").html(jQuery('#seo', data).html());
	                });	
             });				
		
	},
	'mcat': function() {
			zanpian.table.load();
	        zanpian.form.load($("#myform"))
            //显示隐藏子节点
            $(document.body).on("click", ".btn-node-sub", function (e) {
                    var status = $(this).data("shown") ? true : false;
                    $("a.btn[data-pid='" + $(this).data("id") + "']").each(function () {
                        $(this).closest("tr").toggle(!status);
                    });
                    $(this).data("shown", !status);
                    return false;
                });													 
            //展开隐藏一级
            $(document.body).on("click", ".btn-toggle", function (e) {												 
                $("a.btn[data-id][data-pid][data-pid!=0].disabled").closest("tr").show();
                var that = this;
                var show = $("i", that).hasClass("fa-chevron-up");
                $("i", that).toggleClass("fa-chevron-up", !show);
                $("i", that).toggleClass("fa-chevron-down", show);
                $("a.btn[data-id][data-pid][data-pid!=0]").closest("tr").toggle(show);
                $(".btn-node-sub[data-pid=!0]").data("shown", show);
            });					
		
	},'play': function() {
			zanpian.table.load();
	        zanpian.form.load($("#myform"))
            $(document).on("change", "select[name='play_js']", function() {
				if ($(this).val() != "") {
				    $("#play_code").hide();	
				}else{
					$("#play_code").show();	
				}
			});
           zanpian.upload.api.plupload("#plupload-addon", function(data, ret) {	
				   layer.msg(ret.msg ? ret.msg : '导入成功', {zIndex:layer.zIndex,icon: 1,time: 500}, function() {
						 if (ret.url) {
							  zanpian.api.url(ret.url);
						 }
				   });				
			});
			$(document).on("click", ".play-del", function() {
				var target;
				var that = this;
				var thistab = $(this);
				if ((target = $(this).attr('href')) || (target = $(this).attr('url'))) {
					layer.confirm('确认要执行该操作吗,确定后将删除该视频中该播放器数据?', {
						zIndex:layer.zIndex,
						icon: 3,
						title: '温馨提醒',
						btn: ['确定', '取消']
					}, function(index, layero) {
						layer.close(index);
						$(".play-del").parent().children().addClass("disabled");
						thistab.html("正在发请求...");
						$.get(target).success(function(data) {
							if (data.code) {
								layer.msg('操作成功,开始执行', {zIndex:layer.zIndex,icon: 1,time: 1000});
								thistab.html(data.msg);
								geturl(thistab, data);
								window.onbeforeunload = function() {
									return "正在执行删除播放器数据，请不要关闭！"
								}
							} else {
								layer.msg(data.msg ? data.msg : '操作失败', {zIndex:layer.zIndex,icon: 2,time: 2000});
								$(".play-del").parent().children().removeClass("disabled");
								$(".play-del").html("删除数据");
							}
						}, "json");
						return false;
					});
				};

			});	
         function geturl(tab, data) {
		 $.get(data.url).success(function(e) {
			if (e.code) {
				tab.html(e.msg);
				geturl(tab, e);
			} else {
				layer.msg(e.msg ? e.msg : '操作失败', {zIndex:layer.zIndex,icon: 2,time: 2000});
				$(".play-del").parent().children().removeClass("disabled");
				$(".play-del").html("删除数据");
			}
		}, "json");

	}			
		
	},	
	'addon': function() {
		   zanpian.table.load();
	       zanpian.form.load($("#myform"))
		   zanpian.template.load();
           zanpian.upload.api.plupload("#plupload-addon", function(data, ret) {	
					layer.confirm(ret.msg, {
						zIndex:layer.zIndex,		  
						icon: 1,
						title: '温馨提醒',
						btn: ['确定', '取消']
					}, function(index, layero) {
						layer.close(index);
						$('.refurbish').trigger('click');
					})					
			});		
			//点击安装
			$(document).on("click", ".btn-install", function() {
				var url=$(this).attr('href') ? $(this).attr('href') : $(this).data("url");
				var name = $(this).closest(".operate").data("name");
				var install = function(name, force) {
                $.ajax({
                    type: "POST",
                    url: url,
					data: {name: name,force: force ? 1 : 0},
                    dataType: "json",
                    success: function(ret){
						if(ret && ret.code === 1) {
                              layer.alert('插件安装成功！清除缓存刷新页面后生效！', {
                                  btn: ['确定'],
                                  title: '温馨提示',
                                  icon: 1,
								  zIndex:layer.zIndex,
                                  btn2: function () {
                                  //打赏
                                 layer.open({content: template("paytpl", {payimg: $(that).data("donateimage")}),shade: 0.8,area: ['800px', '600px'],skin: 'layui-layer-msg layui-layer-pay',title: false,closeBtn: true,btn: false,resize: false,});
                                  }
                              });
                              $('.btn-refresh').trigger('click');							
						}else if(ret && ret.code === -1){
							//扫码支付
							  layer.open({
									content: template("paytpl", ret.data),
									shade: 0.8,
									area: ['800px', '500px'],
									skin: 'layui-layer-msg layui-layer-pay',
									title: false,
									closeBtn: true,
									btn: false,
									resize: false,
									zIndex:layer.zIndex,
									end: function() {
										layer.alert("");
									}
							  });					
						}else if(ret && ret.code === -2){
								//跳转支付
								layer.alert('请点击这里在新窗口中进行支付！', {
									btn: ['立即支付', '取消'],
									icon: 0,
									zIndex:layer.zIndex,
									success: function(layero) {
										$(".layui-layer-btn0", layero).attr("href", ret.data.payurl).attr("target", "_blank");
									}
								},function() {
									layer.alert("请在新弹出的窗口中进行支付，支付完成后再重新点击安装按钮进行安装！", {
										zIndex:layer.zIndex,		
										icon: 0
									});
								});							
						}else if(ret && ret.code === -3){
								//插件目录发现影响全局的文件
								layer.open({
									content: template("conflicttpl", ret.data),
									shade: 0.8,
									zIndex:layer.zIndex,
									area: ['800px', '500px'],
									title: "温馨提示",
									btn: ['继续安装', '取消'],
									end: function() {
									},
									yes: function() {
										install(name, true);
									}
								});						
						}else{
							layer.alert(ret.msg);
						}
                    },
				error: function(data) {
					layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {zIndex:layer.zIndex,icon: 5, title:'抱歉程序出错啦！',btn: ['查看错误', '关闭提示']}, function() {
					$('html').html(data.responseText);
					});
				}					
                });					
				};
				install(name, false);
				return false;
			});			
			//点击启用/禁用
			$(document).on("click", ".btn-enable", function() {
				var url=$(this).attr('href') ? $(this).attr('href') : $(this).data("url")
				var name = $(this).closest(".operate").data("name");
				var action = $(this).data("action");
				var operate = function(name, action, force) {
                $.ajax({
                    type: "POST",
                    url: url,
					data: {name: name,action: action,force: force ? 1 : 0},
                    dataType: "json",
                    success: function(ret){
						if(ret && ret.code === -3) {
							//插件目录发现影响全局的文件
						    layer.open({
								  zIndex:layer.zIndex,   
								  content: template("conflicttpl", ret.data),
								  shade: 0.8,
									area: ['800px', '500px'],
									title: "温馨提示",
									btn: ['继续操作', '取消'],
									end: function() {},
									yes: function() {
										operate(name, action, true);
									}
							});
						}else if(ret && ret.code === 1){
                             layer.closeAll();
							$('.refurbish').trigger('click');							
						}else{
							layer.alert(ret.msg,{zIndex:layer.zIndex});
						}
					return false;	
                    },
				error: function(data) {
					layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {zIndex:layer.zIndex,icon: 5, title:'抱歉程序出错啦！',btn: ['查看错误', '关闭提示']}, function() {
					$('html').html(data.responseText);
					});
				}	
                });					
				};
				operate(name,action,false);
				return false;
			});	
			//点击卸载
			$(document).on("click", ".btn-uninstall", function() {
				var url=$(this).attr('href') ? $(this).attr('href') : $(this).data("url")
				var name = $(this).closest(".operate").data("name");
				var action = $(this).data("action");
				var uninstall = function(name, action, force) {
                $.ajax({
                    type: "POST",
                    url: url,
					data: {name: name,force: force ? 1 : 0},
                    dataType: "json",
                    success: function(ret){
						if(ret && ret.code === -3) {
							//插件目录发现影响全局的文件
						    layer.open({
								  content: template("conflicttpl", ret.data),
								  zIndex:layer.zIndex,
								  shade: 0.8,
									area: ['800px', '500px'],
									title: "温馨提示",
									btn: ['继续操作', '取消'],
									end: function() {},
									yes: function() {
										uninstall(name, true);
									}
							});
						}else if(ret && ret.code === 1){
                             layer.closeAll();
							$('.refurbish').trigger('click');							
						}else{
							layer.alert(ret.msg,{zIndex:layer.zIndex});
						}
					return false;	
                    },
				error: function(data) {
					layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {zIndex:layer.zIndex,icon: 5, title:'抱歉程序出错啦！',btn: ['查看错误', '关闭提示']}, function() {
					$('html').html(data.responseText);
					});
				}	
                });					
				};
				layer.confirm("确认卸载插件？<p class='text-danger'>卸载将会删除所有插件文件且不可找回!!! 插件如果有创建数据库表请手动删除!!!</p>如有重要数据请备份后再操作！", function() {
					uninstall(name, false);
				});				
				return false;
			});	
	},
	'html': function() {
			zanpian.table.load();
	        zanpian.form.load($("#myform"))
            $(document).on('click', ".nav-tabs a", function (e) {
                $(".layer-footer").attr("domrefresh", Math.random());
            });
$(document).on("change", "select[name='dir_html']", function() {
				var id = $(this).attr('data-id');
				var value = $(this).val();
				if(value){
	                $('#'+id).val(value);
	            }
			});	
			$('body').on("click", "#dir_html_add", function() {
				var name = $(this).attr('data-name');
				var value = $(this).attr('data-id');
				$('#'+name).focus();
				$('#'+name).insert({"text":value});
				return false;
			});	
			if ($("select[name='config[url_html_list]'] option:selected").val() == 0) {
				$("#list_div_vod,#list_div_news,#list_div_star,#list_div_story,#list_div_actor,#list_div_role,#list_div_tv,#list_div_special").hide();  
			}	
			$(document).on("change", "select[name='config[url_html_list]']", function() {
				if($(this).val()==1){
                    $("#list_div_vod,#list_div_news,#list_div_star,#list_div_story,#list_div_actor,#list_div_role,#list_div_tv,#list_div_special").show();     
				}else{
					$("#list_div_vod,#list_div_news,#list_div_star,#list_div_story,#list_div_actor,#list_div_role,#list_div_tv,#list_div_special").hide();  
					}																		
			});	
			(function($){
	$.fn.extend({
		"insert":function(value){
			//默认参数
			value=$.extend({
				"text":"123"
			},value);
			
			var dthis = $(this)[0]; //将jQuery对象转换为DOM元素
			
			//IE下
			if(document.selection){
				
				$(dthis).focus();		//输入元素textara获取焦点
				var fus = document.selection.createRange();//获取光标位置
				fus.text = value.text;	//在光标位置插入值
				$(dthis).focus();	///输入元素textara获取焦点
				
			
			}
			//火狐下标准	
			else if(dthis.selectionStart || dthis.selectionStart == '0'){
				
				var start = dthis.selectionStart; 
				var end = dthis.selectionEnd;
				var top = dthis.scrollTop;
				
				//以下这句，应该是在焦点之前，和焦点之后的位置，中间插入我们传入的值
				dthis.value = dthis.value.substring(0, start) + value.text + dthis.value.substring(end, dthis.value.length);
			}
			
			//在输入元素textara没有定位光标的情况
			else{
				this.value += value.text;
				this.focus();	
			};
			
			return $(this);
		}
	})
})(jQuery)	
	},'vod': function() {
		zanpian.table.load();
		zanpian.form.load($("#myform"));
		$(document).on("click", "#getdoubaninfo", function() {									   
			if ($("#vod_doubanid").val() == '') {
						layer.msg('请填写豆瓣ID', {icon:2,time: 1800});
						return false;
			}											   
			doubanid($("#vod_doubanid").val());											   
		});
		$(document).on("click", "#getbaikeinfo", function() {									   
			if ($("#vod_baike").val() == '') {
						layer.msg('请填写采集网址', {icon:2,time: 1800});
						return false;
			}	
			doubanid($("#vod_baike").val());											   
		});		
		$(document).on("change", "select[id='pianyuan']", function() {
				doubanid($(this).val(),1);												   

		});
		$(document).on("click", "#getdoubanid", function() {									   
			if ($('#pianyuan').val() == '') {
						layer.msg('请填写豆瓣ID', {icon:2,time: 1800});
						return false;
			}											   
			doubanid($('#pianyuan').val(),1);											   
		});		
		         function doubanid(id,type) {
					var $data = "url="+id;
					layer.msg('数据获取中...');
					$.ajax({type: 'post',url:zanpian.api.fixurl('get/vod'),data:$data,dataType: 'json',
					success: function(data) {
									if (data.code == 1) {
									     $("#vod_name").val(data.data.vod_name);
					                     $("#vod_aliases").val(data.data.vod_stitle);
					                     $("#vod_filmtime").val(data.data.vod_filmtime);
										 if(data.data.vod_doubanid){
										    $("#vod_doubanid").val(data.data.vod_doubanid);
										 }
					                     $("#vod_language").val(data.data.vod_language);
										 if(data.data.vod_language){
										 $("#vod_language").find("option[value="+data.data.vod_language+"]").attr("selected",true);
										 $("#vod_language").val(data.data.vod_language).select2();
										 }										 
					                     $("#vod_length").val(data.data.vod_length);
					                     $("#vod_area").val(data.data.vod_area);
										 if(data.data.vod_area){
										 $("#vod_area").find("option[value="+data.data.vod_area+"]").attr("selected",true);
										 $("#vod_area").val(data.data.vod_area).select2();
										 }										 
					                     $("#vod_total").val(data.data.vod_total);
					                     $("#vod_year").val(data.data.vod_year);
										 if(data.data.vod_year){
										 $("#vod_year").find("option[value="+data.data.vod_year+"]").attr("selected",true);
										 $("#vod_year").val(data.data.vod_year).select2();
										 }
					                     $("#vod_director").val(data.data.vod_director);
					                     $("#vod_actor").val(data.data.vod_actor);
										 $("#vod_writer").val(data.data.vod_writer);
					                     $("#vod_pic").val(data.data.vod_pic);
					                     $("#vod_tag").val(data.data.vod_tags);
					                     $("#vod_gold").val(data.data.vod_gold);
					                     $("#vod_golder").val(data.data.vod_golder);
										 $("#vod_mcid_name").val(data.data.vod_mcid);
					                     $("#vod_hits").val(data.data.vod_golder);
					                     $("#vod_diantai").val(data.data.vod_diantai);
					                     var editor = config.editor;
					                     switch(editor){
					                     case "summernote":
					                     $("#vod_content").summernote('code',data.data.vod_content);
					                     break;
					                     case "kindeditor":    
					                     KindEditor.html("#vod_content",data.data.vod_content);
					                     break;
					                     case "ueditor":                          
					                     UE.getEditor("vod_content").execCommand('insertHtml',data.data.vod_content);
					                     break;	
					                     case "umeditor":
					                     UM.getEditor('vod_content').setContent(data.data.vod_content);		
					                     break;
					                     case "ckeditor":
					                     CKEDITOR.instances.vod_content.setData(data.data.vod_content);
					                     break;				
					                     default:
					                     break;
					                     } 
										 if(type){
											layer.msg('导入资料成功', {icon:1,time: 1800}); 
										 }else{
									        layer.msg('获取资料成功', {icon:1,time: 1800});
										 }										 
									} else {
						                 layer.msg(data.msg ? data.msg : '获取资料失败', {icon:2,time: 1800});
					                }
							},
				            error: function(data) {
					            layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误', {zIndex:layer.zIndex,icon: 5, title:'出错啦！',btn: ['查看', '关闭']}, function() {$('html').html(data.responseText);});
				            },
						});
				   }
                  $(document).on("click", "#getvodname", function() {
					  if ($("#vod_name").val() == '') {
						layer.msg('请填写视频名称', {icon:2,time: 1800});
						return false;
			          }
					    layer.msg('数据获取中...');
						var $data = "name="+$("#vod_name").val();
						$.ajax({
							type: 'get',
							url: zanpian.api.fixurl('get/vodname'),
							data: $data,
							dataType: 'json',
							success: function(data) {
									if (data.code == 1) {
									     layer.msg('共获取到'+data.data.num+'条豆瓣数据', {icon:1,time: 1800});
										 $('#pianyuan').html(data.data.str);
										 $("#caiji").show();
									} else {
						                 layer.msg(data.msg ? data.msg : '获取豆瓣资料失败', {icon:2,time: 1800});
					                }
							},
				            error: function(data) {
					            layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误', {zIndex:layer.zIndex,icon: 5, title:'出错啦！',btn: ['查看', '关闭']}, function() {$('html').html(data.responseText);});
				            },
						});
				});
				  

	},'star': function() {
	      zanpian.cms.all();
		  zanpian.api.js('tpl/zanpianadmin/libs/summernote-master/dist/summernote.min.js');
		  zanpian.api.js('tpl/zanpianadmin/libs/summernote-master/dist/lang/summernote-zh-CN.min.js');
		  zanpian.api.css('tpl/zanpianadmin/libs/summernote-master/dist/summernote.css');	
	      zanpian.form.summernote('.summernote');	
				$(document).on("click", ".delinfo", function() {
					var k = $(this).attr('id');
					var i = $("#stardata #star_data_info").length;
					if (i != 1) {
						$("#data_" + k).remove();
						Toastr.success('删除成功');
					} else {
						Toastr.error('已经最后一个鸟');
					}
				});
               $(document).on('click', ".addstar", function() {
					$urln = $("#stardata>.stardata").length;
					str = '<div class="stardata input-group mb20" id="data_' + ($urln + 1) + '"><div class="input-group-btn"><span class="btn btn-default form-left-title">信息' + ($urln + 1) + '：</span><span class="form-left-title-hide"></span></div><div class="col-md-12 col-sm-12 col-xs-12 pl0 pr0" style="margin-bottom:1px"><input class="form-control w150" name="star_data_title[]" id="star_data_title" value="" ></div><div class="col-md-12 col-sm-12 col-xs-12 pl0 mb10 pr0"><textarea name="star_data_info[]" id="star_data_info_' + ($urln + 1) + '" class="summernote" style="width:100%;height:150px"></textarea></div></div>';
					$("#stardata>.stardata:last-child").after(str);
				    zanpian.form.summernote('.summernote');	
				})	
                 $(document).on("click", "#getstarname", function() {
					  if ($("#star_name").val() == '') {
						layer.msg('请填名字', {icon:2,time: 1800});
						return false;
			          }
					    layer.msg('数据获取中...');
						var $data = "name="+$("#star_name").val();
						$.ajax({
							type: 'get',
							url: zanpian.api.fixurl('get/starname'),
							data: $data,
							dataType: 'json',
							success: function(data) {
									if (data.code == 1) {
										 $('#stararray').html(data.data.str);
										 $("#caiji").show();
									} else {
						                 layer.msg(data.msg ? data.msg : '获取资料失败', {icon:2,time: 1800});
					                }
							},
				            error: function(data) {
					            layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误', {zIndex:layer.zIndex,icon: 5, title:'出错啦！',btn: ['查看', '关闭']}, function() {$('html').html(data.responseText);});
				            },
						});
				});	
		$(document).on("change", "select[id='stararray']", function() {
				getstar($(this).val(),1);												   

		});
		$(document).on("click", "#getbaikestar", function() {									   
			if ($('#stararray').val() == '') {
						layer.msg('数据为空', {icon:2,time: 1800});
						return false;
			}											   
			getstar($('#stararray').val(),1);											   
		});	
		$(document).on("click", "#getbaikeinfo", function() {									   
			if ($('#star_baike').val() == '') {
						layer.msg('请填写网址', {icon:2,time: 1800});
						return false;
			}											   
			getstar($('#star_baike').val(),1);											   
		});			
		         function getstar(id,type) {
					var $data = "url="+id;
					layer.msg('数据获取中...');
					$.ajax({type: 'post',url:zanpian.api.fixurl('get/star'),data:$data,dataType: 'json',
					success: function(data) {
									if (data.code == 1) {
									     $("#star_name").val(data.data.star_name);
										 if(data.data.star_wwm){
					                         $("#star_wwm").val(data.data.star_wwm);
										 }
										 if(data.data.star_bm){
					                          $("#star_bm").val(data.data.star_bm);
										 }
										 if(data.data.star_pic){
										     $("#star_pic").val(data.data.star_pic);
										 }
										 if(data.data.star_color){
										      $("#star_color").val(data.data.star_color);
										 }
										 if(data.data.star_bigpic){
										    $("#star_bigpic").val(data.data.star_bigpic);
										 }
										 if(data.data.star_csd){
										      $("#star_csd").val(data.data.star_csd);
										 }
										 if(data.data.star_area){
										 $("#star_area").find("option[value="+data.data.star_area+"]").attr("selected",true);
										 $("#star_area").val(data.data.star_area).select2();
										 }
										 if(data.data.star_gj){
										    $("#star_gj").val(data.data.star_gj);
										 }
										 if(data.data.star_sg){
                                             $("#star_sg").val(data.data.star_sg);
										 }
										 if(data.data.star_tz){
										     $("#star_tz").val(data.data.star_tz);
										 }
										 if(data.data.star_mz){
										      $("#star_mz").val(data.data.star_mz);
										 }
										 if(data.data.star_xb){
										 $("#star_xb").find("option[value="+data.data.star_xb+"]").attr("selected",true);
										 $("#star_xb").val(data.data.star_xb).select2();
										 }										 
										 if(data.data.star_xx){
										 $("#star_xx").find("option[value="+data.data.star_xx+"]").attr("selected",true);
										 $("#star_xx").val(data.data.star_xx).select2();
										 }
										 if(data.data.star_xz){
										 $("#star_xz").find("option[value="+data.data.star_xz+"]").attr("selected",true);
										 $("#star_xz").val(data.data.star_xz).select2();
										 }
										 if(data.data.star_zy){
										     $("#star_zy").val(data.data.star_zy);
										 }
										 if(data.data.star_cstime){
                                              $("#star_cstime").val(data.data.star_cstime);
										 }
										 if(data.data.star_school){
									          $("#star_school").val(data.data.star_school);
										 }
										 if(data.data.star_gs){
					                          $("#star_gs").val(data.data.star_gs);
										 }
										 if(data.data.star_weibo){
										      $("#star_weibo").val(data.data.star_weibo);
										 }
										 if(data.data.star_work){
					                          $("#star_work").val(data.data.star_work);
										 }
										 if(data.data.star_guanxi){
										      $("#star_guanxi").val(data.data.star_guanxi);
										 }
										 if(data.data.star_info){
										 $("#star_info").val(data.data.star_info);
										 }											 
										 $("#star_content").val(data.data.star_content);
					                     var editor = config.editor;
					                     switch(editor){
					                     case "summernote":
					                     $("#star_content").summernote('code',data.data.star_content);
					                     break;
					                     case "kindeditor":    
					                     KindEditor.html("#star_content",data.data.star_content);
					                     break;
					                     case "ueditor":                          
					                     UE.getEditor("star_content").execCommand('insertHtml',data.data.star_content);
					                     break;	
					                     case "umeditor":
					                     UM.getEditor('star_content').setContent(data.data.star_content);	
					                     break;
					                     case "ckeditor":
					                     CKEDITOR.instances.vod_content.setData(data.data.star_content);
					                     break;				
					                     default:
					                     break;
					                     }  
										 if(type){
											layer.msg('导入资料成功', {icon:1,time: 1800}); 
										 }else{
									        layer.msg('获取资料成功', {icon:1,time: 1800});
										 }										 
									} else {
						                 layer.msg(data.msg ? data.msg : '获取资料失败', {icon:2,time: 1800});
					                }
							},
				            error: function(data) {
					            layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误', {zIndex:layer.zIndex,icon: 5, title:'出错啦！',btn: ['查看', '关闭']}, function() {$('html').html(data.responseText);});
				            },
						});
				   }				 
	}
},
'form':  {
    'load': function (form){
        zanpian.form.plupload(form);
		zanpian.form.editor(form);
		zanpian.form.submit(form);
		zanpian.form.color(form);
		
		
    },	
    'color': function (form) {
                //绑定plupload上传元素事件
                if ($(".color-input", form).length > 0) {
		              zanpian.api.css('tpl/zanpianadmin/libs/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css');
		              $.ajaxSetup({cache: true});
		              $.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js?v=" + config.cms.version,            function() {
			            $('.color-input').colorpicker()
		             });					
                }
    },
    'plupload': function (form) {
                //绑定plupload上传元素事件
                if ($(".plupload", form).length > 0) {
                    zanpian.upload.api.plupload();
                }
    },
    'editor': function (form) {	
		        if ($(".editor", form).length > 0) {
				var editor = config.editor;
                switch(editor){
                case "summernote":
					 zanpian.api.js('tpl/zanpianadmin/libs/summernote-master/dist/summernote.min.js');
				     zanpian.api.js('tpl/zanpianadmin/libs/summernote-master/dist/lang/summernote-zh-CN.min.js');
				     zanpian.api.css('tpl/zanpianadmin/libs/summernote-master/dist/summernote.css');	
                     zanpian.form.summernote('.editor');
                break;
                case "kindeditor":
				     zanpian.api.js('tpl/zanpianadmin/libs/kindeditor-master/kindeditor-all.js');
				     zanpian.api.js('tpl/zanpianadmin/libs/kindeditor-master/lang/zh-CN.js');	
                     var editor;
	                 KindEditor.ready(function(K) {
	                 editor = K.create('.editor', {
	                        uploadJson : config.upload.uploadurl,				  
	                        resizeType : 1,
	                        allowPreviewEmoticons : true,
	                        allowImageUpload : true,
	                        extraFileUploadParams: {
                               from : 'kindeditor',
	                           sid : config.upload.multipart.sid,
							   PHPSESSID : config.upload.session_id,
                            },
							afterBlur: function () { editor.sync(); },
                            allowFileManager: false,
	                        items : ['source', '|','pagetitle','pagebreak', '|','fontname', 'fontsize', '|','cut','copy','paste','plainpaste','|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline','removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright','justifyfull', 'insertorderedlist','insertunorderedlist','indent','outdent', 'clearhtml','selectall','|','fullscreen','|', 'emoticons', 'image','multiimage','baidumap', 'link', 'unlink','quickformat']
				});
			});
             var $content = $('.editor').val();
	             document.getElementById("myform").onreset = function(){
	             editor.html($content);
                 }
				
                break;
                case "ueditor":
				     zanpian.api.js('tpl/zanpianadmin/libs/ueditor/ueditor.config.js');	
				     zanpian.api.js('tpl/zanpianadmin/libs/ueditor/ueditor.all.min.js');
					 $(".editor").each(function(){
						 var ue = UE.getEditor($(this).attr("id"),{
								serverUrl:config.upload.uploadurl+'?from=ueditor&sid='+config.upload.multipart.sid,
					     }); 
                     });
                break;	
                case "umeditor":
				     zanpian.api.js('tpl/zanpianadmin/libs/umeditor/umeditor.config.js');	
				     zanpian.api.js('tpl/zanpianadmin/libs/umeditor/umeditor.min.js');
					 zanpian.api.js('tpl/zanpianadmin/libs/umeditor/lang/zh-cn/zh-cn.js');
					 zanpian.api.css('tpl/zanpianadmin/libs/umeditor/themes/default/css/umeditor.min.css');	
					 $(".editor").each(function(){
                           um = UM.getEditor($(this).attr("id"), {
                           imageUrl:config.upload.uploadurl+'?from=umeditor&sid='+config.upload.multipart.sid,
                           imagePath:'',
					       initialFrameWidth:'100%',
                           focus: true
                          });
                     }); 
                break;
                case "ckeditor":
				zanpian.api.js('tpl/zanpianadmin/libs/ckeditor/ckeditor.js');
				zanpian.api.js('tpl/zanpianadmin/libs/ckeditor/adapters/jquery.js');
				$('.editor').ckeditor({
						filebrowserImageUploadUrl : config.upload.uploadurl+'?from=ckeditor&sid='+config.upload.multipart.sid
				});
                break;				
                default:
                
				
                break;
               }
			}	
    },
	'summernote': function (form) {																										
				 $(form).summernote({
                            height: 200,
                            lang: 'zh-CN',
                            fontNames: [
                                'Arial', 'Arial Black', 'Serif', 'Sans', 'Courier',
                                'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande',
                                "Open Sans", "Hiragino Sans GB", "Microsoft YaHei",
                                '微软雅黑', '宋体', '黑体', '仿宋', '楷体', '幼圆',
                            ],
                            fontNamesIgnoreCheck: [
                                "Open Sans", "Microsoft YaHei",
                                '微软雅黑', '宋体', '黑体', '仿宋', '楷体', '幼圆'
                            ],
                            dialogsInBody: true,
                            callbacks: {
                                onChange: function (contents) {
                                    $(this).val(contents);
                                    $(this).trigger('change');
                                },
                                onInit: function () {
                                },
                                onImageUpload: function (files) {
                                    var that = this;
                                    //依次上传图片
                                    for (var i = 0; i < files.length; i++) {
                                        zanpian.upload.api.send(files[i], function (data) {
                                            var url = data.file;
											if(url.substr(0,8)=='zanpian:'){
												var file = url.replace('zanpian:', '');
											}else{
												var file=url;
										    }
											$(that).summernote('insertImage',file, function($image) {
													$image.attr('src', url);
                                              });
                                           // $(that).summernote("insertImage",url,'filename'); 
										});
                                    }
                                }
                            }
                        });	 
	},
	'submit': function(form) {							   
		form.submit(function(event){
			var type = $(this).attr("method").toUpperCase();
			var load=$(this).attr("load");
			var jump=$(this).attr("jump");
			var current=$(this).attr("current");
			type = type && (type === 'GET' || type === 'POST') ? type : 'GET';
			url = $(this).attr("action");
			url = url ? url : location.href;
			query = $(this).serialize();
			layer.msg('数据提交中...',{zIndex:layer.zIndex,icon:6});
			$.ajax({
				type: "post",
				url: url,
				data: query,
				dataType: 'json',
				success: function(json) {
					if (json.code == 1){
						layer.msg(json.msg ? json.msg : '操作成功', {zIndex:layer.zIndex,icon: 1,time: 500}, function() {
							if (json.url) {
								if(current==1){
                                    var index = layer.open();
									layer.closeAll();
								}else{
								    var index = parent.layer.getFrameIndex(window.name);
                                    parent.layer.close(index);
								}
								if(jump==1){
									if(current==1){
									   location.href=json.url
									}else{
									   parent.location.href=json.url	
									}
								}
								if(load == "" || load == undefined || load == null){
									if(current==1){
								        zanpian.api.url(json.url);
									}else{
										parent.zanpian.api.url(json.url);
									}
								}
							}
						});
					} else{
						layer.confirm(json.msg ? json.msg : '操作失败', {zIndex:layer.zIndex,icon: 5, title:'提示',btn: ['朕知道了!']});
					}
				},
				error: function(json) {
					layer.confirm('程序返回：' + json.status + ' 错误,点击查看详细错误', {zIndex:layer.zIndex,icon: 5, title:'出错啦！',btn: ['查看', '关闭']}, function() {
						$('html').html(json.responseText);
					});
				},
			});
			return false;
		})
	}

},
'table': {
	'load': function() {
		zanpian.table.select();
		zanpian.table.input();
		zanpian.table.form();
		zanpian.table.editable();
		zanpian.table.datetimepicker();
	},
	'form': function() {	
		$("input[data-tip],textarea[data-tip],select[data-tip]").focus(function() {
			tips = $(this).data("tip");
			if (tips) {
				tipsi = layer.tips(tips, $(this), {
					tips: [1, '#3595CC'],
					area: ['auto', 'auto'],
					time: 0
				});
				$("input,textarea,select").blur(function() {
					layer.close(tipsi);
				});
			}
		});
		$(document).on("click", ".close", function(e) {
			$(this).parent().hide(200);
		});
		$(document).on("click", ".btn-editone", function(e) {
			zanpian.api.open($(this));
			return false;
		});
		$(document).on("click", ".ajax-post", function(e){
			zanpian.api.ajax($(this));
			return false;
		});
		$(document).on("click", ".popurl", function(e) {
			zanpian.api.poptab($(this));
			return false;
		});				
		$(document).on("click", ".ajax-url,.ajax-page a", function(e) {
			var target;
			if ((target = $(this).attr('url'))) {
				zanpian.api.url(target)
			} else if ((target = $(this).attr('href'))) {
				zanpian.api.url(target)
			}
			return false;
		});
		$(document).on("click", ".ajax-jump", function(e) {
			if ($(this).data('url') && $("#page").val()) {
				zanpian.api.url($(this).data('url').replace('[PAGE]', $("#page").val()))
			}
			return false;
		});
		$(document).on("change", ".ajax-select", function(e) {
			if ($(this).val()) {
				zanpian.api.url($(this).data('url').replace('[LIMIT]', $(this).val()))
			}
			return false;
		});
		$(document).on("change", "select[type='ajax-select']", function() {
			var that = this;
			if ($(this).val()) {
				zanpian.api.url($(this).val());
			}
			return false;
		});
	},
	'select': function(){
		if ($('.select2').length > 0) {
		$.ajaxSetup({
			cache: true
		});
		$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/select/select2.full.min.js?v=" + config.cms.version, function() {
			$('.select2').select2();
		});	
	
//		$(window).resize(function (){
//            $('.select2').select2();
//        });
		
		}
	},
	'editable': function() {
		zanpian.api.css('tpl/zanpianadmin/libs/bootstrap/css/bootstrap-editable.css');
		$.ajaxSetup({
			cache: true
		});
		$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/bootstrap/js/bootstrap-editable.min.js?v=" + config.cms.version, function() {
			$('.editable').editable();
		});
	},
	//选择窗口
	'input': function() {
		var $thr = $('table thead tr'); /*将全选/反选复选框添加到表头最前，即增加一列*/
		/*“全选/反选”复选框*/
		var $checkAll = $thr.find('input');
		$checkAll.click(function(event) { /*将所有行的选中状态设成全选框的选中状态*/
			$tbr.find('input').prop('checked', $(this).prop('checked')); /*并调整所有选中行的CSS样式*/
			if ($(this).prop('checked')) {
				$tbr.find('input').parent().parent().parent().addClass('warning');
				$("#selectedChks").html('已选择<strong>' + $tbr.find('input:checked').length + '</strong>记录').show();
				$('.btn-disabled').removeClass('disabled');
			} else {
				$tbr.find('input').parent().parent().parent().removeClass('warning');
				$('.btn-disabled').addClass('disabled');
				$('#selectedChks').hide();
			} /*阻止向上冒泡，以防再次触发点击操作*/
			event.stopPropagation();
		}); /*点击全选框所在单元格时也触发全选框的点击操作*/

		var $tbr = $('table tbody tr'); /*点击每一行的选中复选框时*/
		$tbr.find('input').click(function(event) { /*调整选中行的CSS样式*/
			$(this).parent().parent().parent().toggleClass('warning');
			$checkAll.prop('checked', $tbr.find('input:checked').length == $tbr.length ? true : false);
			if ($tbr.find('input:checked').length) {
				$('.btn-disabled').removeClass('disabled');
				$("#selectedChks").html('已选择<strong>' + $tbr.find('input:checked').length + '</strong>记录').show();
			} else {
				$('.btn-disabled').addClass('disabled');
				$('#selectedChks').hide();
			} /*阻止向上冒泡，以防再次触发点击操作*/
			event.stopPropagation();
		});
		if ($(".editable").length == 0) {
			$tbr.click(function(){
				$(this).find('input').click();
			});
			$('table tbody tr .label-checkbox').click(function(){
				$(this).find('input').click();
			});			
		};
		$('#myform').find("input[type='checkbox']").click(function(event) {
			$(this).attr("checked",true);													   
		});		

	},
	'datetimepicker': function() {
		if ($('.datetimepicker').length > 0) {
		zanpian.api.css('tpl/zanpianadmin/libs/bootstrap-daterangepicker/build/css/bootstrap-datetimepicker.css');
		$.ajaxSetup({
			cache: true
		});
        $.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/bootstrap-daterangepicker/moment.min.js?v=" + config.cms.version)	
		$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/bootstrap-daterangepicker/zh-cn.js?v=" + config.cms.version)	
		$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/bootstrap-daterangepicker/build/js/bootstrap-datetimepicker.min.js?v=" + config.cms.version, function() { 																																									
                        var options = {
                            format: 'YYYY-MM-DD HH:mm:ss',
                            icons: {time: 'fa fa-clock-o',date: 'fa fa-calendar',up: 'fa fa-chevron-up',down: 'fa fa-chevron-down',
                                previous: 'fa fa-chevron-left',
                                next: 'fa fa-chevron-right',
                                today: 'fa fa-history',
                                clear: 'fa fa-trash',
                                close: 'fa fa-remove'
                            },
                            showTodayButton: true,
                            showClose: true
                        };
          $('.datetimepicker').datetimepicker(options);																																									  
		});
		
		}
	}
},
'api': {
	'uploaddir': function (url) {
                return /^(?:[a-z]+:)?\/\//i.test(url) ? url : config.upload.path+url;
            },	
     'js': function (file) {
	    var src=config.cms.tpl+file+'?v='+ config.cms.version;
        $("<scri" + "pt>" + "</scr" + "ipt>").attr({src:src,type: 'text/javascript' }).appendTo("head"); 
    },
     'css': function (file) {
	    var href=config.cms.tpl+file+'?v='+ config.cms.version;
		$("<link>").attr({rel: "stylesheet",type: "text/css",href:href}).appendTo("head");
    },		
     'fixurl': function (url) {
                if (url.substr(0, 1) !== "/") {
                    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
                    if (!r.test(url)) {
                        url = config.zanpian.moduleurl + "/" + url;
                    }
                }
                return url;
    },
	'relation': function($tid,$tsid,$did,$sid,$type,$lastdid,$types) {
	    $.ajax({
		    type: 'get',
		    cache: false,
			data: {tid:$tid,tsid:$tsid,did:$did,sid:$sid,type:$type,lastdid:$lastdid,types:$types},
		    url: zanpian.api.fixurl('relation/ajax/'),
		    success: function($html) {
			     $('#html').html($html);
		   }
	     });
    },	
	'url': function(url) {
		layer.load(1);
		$.ajax({type: 'get',url: url,success: function(data) {
			var value = jQuery('#contents', data).html();
			$("#contents").html(value);
			layer.closeAll('loading')
			zanpian.table.input();
			if ($('.select2').length > 0) {
			    $('.select2').select2();
			}
			    $('.editable').editable();
		},
		error: function(data) {
			layer.closeAll('loading')
			layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {zIndex:layer.zIndex,icon: 5, title:'抱歉程序出错啦！',btn: ['查看错误', '关闭提示']}, function() {
			$('html').html(data.responseText);
			});
		}}
		);
	},
	'get': function(url) {
		$.ajax({
			type: 'get',
			url: url,
			dataType: 'json',
			success: function(data) {
				if (data.code >= 1) {
					layer.msg(data.msg ? data.msg : '操作成功', {
						zIndex: layer.zIndex,
						icon: 1,
						time: 500
					});
				} else {
					layer.confirm(data.msg ? data.msg : '操作失败', {
						zIndex: layer.zIndex,
						icon: 5,
						title: '提示',
						btn: ['关闭提示']
					});
				}
			},
			error: function(data) {
				layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {
					zIndex: layer.zIndex,
					icon: 5,
					title: '抱歉程序出错啦！',
					btn: ['查看错误', '关闭提示']
				}, function() {
					$('html').html(data.responseText);
				});
				$(that).removeClass('disabled').attr('autocomplete', 'off').prop('disabled', false);
			}
		});
	},
   'pwd': function(len) {
       len = len || 32;
       var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
       var maxPos = $chars.length;
       var pwd = '';
       for (i = 0; i < len; i++) {
           pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
       }
       return pwd;
    },
	'ajax': function(that,jump) {
		var url, query, form, type;
		if (that.attr('form')) {
			form = $(that.attr('form'));
			type = 'POST';
			if (that.attr('hide-data') === 'true') { //无数据时也可以使用的功能
				form = $('.hide-data');
				query = form.serialize();
			}else if (form.get(0) == undefined) {
				return false;
			}else if (form.get(0).nodeName == 'FORM') {
				if (that.attr('url') !== undefined) {
					target = that.attr('url');
			    } else {
					target = form.get(0).action;
				}
				    query = form.serialize();
				}else if (form.get(0).nodeName == 'INPUT' || form.get(0).nodeName == 'SELECT' || form.get(0).nodeName == 'TEXTAREA') {
					form.each(function(k, v) {
					   if (v.type == 'checkbox' && v.checked == true) {
							  nead_confirm = true;
					     }
					 })
					query = form.serialize();
				}else {
				    query = form.find('input,select,textarea').serialize();
		   }
		}
		type = 'POST';
		url = url ? url : that.attr('href');
		url = url ? url : location.href;
		that.addClass('disabled').attr('autocomplete', 'off').prop('disabled', true);
		if (that.hasClass('confirm')) {
			layer.confirm('您确认要' + $.trim(that.text()) + '吗?', {
				zIndex:layer.zIndex,
				icon: 3,
				title: '温馨提醒',
				btn: ['确定', '取消']
			},function(index,layero) {
				layer.close(index);
				$.ajax({
					type: type,
					url: url,
					data: query,
					dataType: 'json',
					success: function(data) {
						if (data.code == 1) {
							layer.msg(data.msg ? data.msg : '操作成功', {
								zIndex:layer.zIndex,
								icon: 1,
								time: 500
							}, function() {
								if (data.url){
									if(jump){
										location.href = data.url;
									}else{
									    zanpian.api.url(data.url);
									}
								}
							});
						}else{
							if(data.code<=0) {
								layer.confirm(data.msg ? data.msg : '操作失败', {zIndex:layer.zIndex,icon: 5, title:'提示',btn: ['关闭提示']});
							}else {
								layer.msg(data.msg ? data.msg : '操作成功', {
									zIndex:layer.zIndex,
									icon: 1,
									time: 500
								});
								$('.btn-disabled').addClass('disabled').prop('disabled', false);
								$("[type = checkbox]").prop('checked', false);
								var value = jQuery('#contents', data).html();
								$("#contents").html(value);
								zanpian.table.input();
								if ($('.select2').length > 0) {
								$('.select2').select2();
								}
								$('.editable').editable();
							}
						}					
						$('.btn-disabled').addClass('disabled').prop('disabled', false);
						$("[type = checkbox]").prop('checked', false);
						$('.label-checkbox').find('input').parent('label').removeClass('label-checkbox-on');
						$('.label-checkbox').find('input').parent().parent().parent().removeClass('warning');
					},
					error: function(data) {
					    layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {zIndex:layer.zIndex,icon: 5, title:'抱歉程序出错啦！',btn: ['查看错误', '关闭提示']}, function() {
						$('html').html(data.responseText);
					    });
						$(that).removeClass('disabled').attr('autocomplete', 'off').prop('disabled', false);
				    }
				});
			});
			$(that).removeClass('disabled').attr('autocomplete', 'off').prop('disabled', false);
		} else{
			$.ajax({
				type: type,
				url: url,
				data: query,
				dataType: 'json',
				success: function(data) {
					if (data.code == 1) {
						layer.msg(data.msg ? data.msg : '操作成功', {
							zIndex:layer.zIndex,
							icon: 1,
							time: 500
						}, function() {
						    if (data.url){
								if(jump){
									location.href = data.url;
								}else{
									zanpian.api.url(data.url);
								}
						   }
						});
					}else {
						if(data.code<=0) {
							layer.confirm(data.msg ? data.msg : '操作失败', {zIndex:layer.zIndex,icon: 5, title:'提示',btn: ['朕知道了!']});
						}else {
							layer.msg(data.msg ? data.msg : '操作成功', {
								zIndex:layer.zIndex,
								icon: 1,
								time: 500
							});
							$(that).removeClass('disabled').attr('autocomplete', 'off').prop('disabled', false);
							$("[type = checkbox]").prop('checked', false);
							var value = jQuery('#contents', data).html();
							$("#contents").html(value);
							$('#selectedChks').hide();
							zanpian.table.input();
							if ($('.select2').length > 0) {
							$('.select2').select2();
							}
							$('.editable').editable();
						}
					}
					$('.btn-disabled').addClass('disabled').prop('disabled', false);
					$("[type = checkbox]").prop('checked', false);
					$('.label-checkbox').find('input').parent('label').removeClass('label-checkbox-on');
					$('.label-checkbox').find('input').parent().parent().parent().removeClass('warning');
				},
				error: function(data) {
					layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {zIndex:layer.zIndex,icon: 5, title:'抱歉程序出错啦！',btn: ['查看错误', '关闭提示']}, function() {
					$('html').html(data.responseText);
					});
					$(that).removeClass('disabled').attr('autocomplete', 'off').prop('disabled', false);
				}
			});
                    $(that).removeClass('disabled').attr('autocomplete', 'off').prop('disabled', false);
		}
		return false;
	},
	'open': function(that) {
			var url = that.attr('href') ? that.attr('href') : that.data("url");
			var name = that.data("name");
			var width = that.data("width");
			var height = that.data("height");
			var offset = that.data("offset");
			zanpian.api.window(url, name, '', width, height, offset);
			return false;		
	},
	'window': function(url, title, options, width, height,offset) {
		title = title ? title : "";
		url = zanpian.api.fixurl(url);
		url = url + (url.indexOf("?") > -1 ? "&" : "?") + "dialog=1";
		width = width ? width : $(window).width() > 800 ? '800px' : '90%';
		height = height ? height : 'auto';
		//width=width ? width : '100%';
		//height=height ? height : '100%';
		offset = offset ? offset : '5px';
		var area = [width, height];
		//var area = [$(window).width() > 800 ? '800px' : '95%', $(window).height() > 600 ? '600px' : '95%'];
		layer.open($.extend({
			type: 2,
			offset: offset,
			title: title,
			shadeClose: true,
			shade: false,
			maxmin: true,
			area: area,
			id:1,
			content: url,
			zIndex: layer.zIndex,
			success: function(layero, index) {
				var that = this;
				//存储callback事件
				$(layero).data("callback", that.callback);
				//$(layero).removeClass("layui-layer-border");
				layer.setTop(layero);
				var frame = layer.getChildFrame('html',index);
				var layerfooter = frame.find(".layer-footer");
                zanpian.api.layerfooter(layero, index, that);
				//绑定事件
				if (layerfooter.length > 0){
					$(window).resize(function() {
			           zanpian.api.layerfooter(layero,index,that);
		           });	
					
				//监听窗口内的元素及属性变化
					// Firefox和Chrome早期版本中带有前缀
					var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
					// 选择目标节点
					var target = layerfooter[0];
					// 创建观察者对象
					var observer = new MutationObserver(function(mutations){
					     zanpian.api.layerfooter(layero, index, that);
						mutations.forEach(function(mutation) {});
					});
					// 配置观察选项:
					var config = {attributes:true,attributeOldValue: true,childList:true,characterData:true,subtree:true}
					// 传入目标节点和观察选项
					observer.observe(target, config);
					// 随后,你还可以停止观察
					// observer.disconnect();
				}
			}
		}, options ? options : {}));
		return false;
	},	
	'close': function(data) {
		var index = parent.layer.getFrameIndex(window.name);
		var callback = parent.$("#layui-layer" + index).data("callback");
		//再执行关闭
		parent.layer.close(index);
		//再调用回传函数
		if (typeof callback === 'function') {
			callback.call(undefined, data);
		}
	},
	'layerfooter': function(layero, index, that){
		var frame = layer.getChildFrame('html', index);
		var layerfooter = frame.find(".layer-footer");
		if (layerfooter.length > 0) {
			$(".layui-layer-footer", layero).remove();
			var footer = $("<div />").addClass('layui-layer-btn layui-layer-footer');
			footer.html(layerfooter.html());
			footer.insertAfter(layero.find('.layui-layer-content'));
		}		
		var heg = frame.outerHeight();
		var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
		var btnHeight = layero.find('.layui-layer-footer').outerHeight() || 0;

		var oldheg = heg + titHeight + btnHeight;
		var maxheg = $(window).height() < 600 ? $(window).height() : 600;
		if (frame.outerWidth() < 768 || that.area[0].indexOf("%") > -1) {
			maxheg = $(window).height();
		}
		// 如果有.layer-footer或窗口小于600则重新排
		if (layerfooter.length > 0 || oldheg < maxheg || that.area[0].indexOf("%") > -1) {
			var footerHeight = layero.find('.layui-layer-footer').outerHeight() || 0;
			footerHeight = 0;
			if (oldheg >= maxheg) {
				heg = Math.min(maxheg, oldheg) - titHeight - btnHeight - footerHeight;
			}
			//alert(oldheg)
			layero.css({
				height: heg + titHeight + btnHeight + footerHeight
			});
			layero.find("iframe").css({
				height: heg
			});
		}
		$(".layer-footer .btn.disabled").removeClass("disabled");
		if (layerfooter.length > 0) {
			footer.on("click", ".btn", function() {
				if ($(this).hasClass("disabled") || $(this).parent().hasClass("disabled")) {
					return;
				}
				$(".btn:eq(" + $(this).index() + ")", layerfooter).trigger("click");
			});
		}

	},'poptab': function(that){
            var url, query, form, type;
		if (that.attr('form')) {
			form = $(that.attr('form'));
			type = 'POST';
			if (that.attr('hide-data') === 'true') { //无数据时也可以使用的功能
				form = $('.hide-data');
				query = form.serialize();
			}else if (form.get(0) == undefined) {
				return false;
			}else if (form.get(0).nodeName == 'FORM') {
				if (that.attr('url') !== undefined) {
					target = that.attr('url');
			    } else {
					target = form.get(0).action;
				}
				    query = form.serialize();
				}else if (form.get(0).nodeName == 'INPUT' || form.get(0).nodeName == 'SELECT' || form.get(0).nodeName == 'TEXTAREA') {
					form.each(function(k, v) {
					   if (v.type == 'checkbox' && v.checked == true) {
							  nead_confirm = true;
					     }
					 })
					query = form.serialize();
				}else {
				    query = form.find('input,select,textarea').serialize();
		   }
		}
		    type = type && (type === 'GET' || type === 'POST') ? type : 'GET';
		    url = url ? url : that.attr('href');
		    url = url ? url : location.href;
			var name = that.data("name");
			var width = that.data("width");
			var height = that.data("height");
			var offset = that.data("offset");
            zanpian.api.popurl(url, name, '', width, height, offset,type,query);
			return false;
	},'popurl': function(url, title, options, width, height, offset,type,query) {
		    url = url = url + (url.indexOf("?") > -1 ? "&" : "?") + "dialog=1";
            $.ajax({
				type: type,   
				url: url,
				data: query,
				success: function(data){
				      zanpian.api.content(data, title,'',width, height, offset);	
				},
		error: function(data) {
			layer.closeAll('loading')
			layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误。<br>如果没有返回具体错误请开启<br>系统设置-高级设置-调试模式-开启', {zIndex:layer.zIndex,icon: 5, title:'抱歉程序出错啦！',btn: ['查看错误', '关闭提示']}, function() {
			$('html').html(data.responseText);
			});
		}	   
		    });	
			return false;
		
	}
	,'content': function(content, title, options, width, height, offset) {
		title = title ? title : "";
		width = width ? width : $(window).width() > 800 ? '800px' : '90%';
		height = height ? height : 'auto';
		//width=width ? width : '100%';
		//height=height ? height : '100%';
		offset = offset ? offset : '5px';
		var area = [width, height];
		//var area = [$(window).width() > 800 ? '800px' : '95%', $(window).height() > 600 ? '600px' : '95%'];
		layer.open($.extend({
			type: 1,
			id:1,
			offset: offset,
			title: title,
			shadeClose: true,
			shade: false,
			maxmin: true,
			area: area,
			content: content,
			zIndex: layer.zIndex,
			success: function(layero, index) {
				var that = this;
				//存储callback事件
				$(layero).data("callback", that.callback);
				//$(layero).removeClass("layui-layer-border");
				layer.setTop(layero);
				var frame = layer.getChildFrame('html',index);
				var layerfooter = $("html").find(".layer-footer");
                zanpian.api.layerfooters(layero, index, that);
				//绑定事件
				if (layerfooter.length > 0){
					   zanpian.form.load($("#myform"));
                       if ($('.select2').length > 0) {
						   $('.select2').select2({placeholder: "请选择",});
						}
							$('.editable').editable();
					$(window).resize(function() {
			           zanpian.api.layerfooters(layero,index,that);
		           });	
					
				//监听窗口内的元素及属性变化
					// Firefox和Chrome早期版本中带有前缀
					var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
					// 选择目标节点
					var target = layerfooter[0];
					// 创建观察者对象
					var observer = new MutationObserver(function(mutations){
					     zanpian.api.layerfooters(layero, index, that);
						mutations.forEach(function(mutation) {});
					});
					// 配置观察选项:
					var config = {attributes:true,attributeOldValue: true,childList:true,characterData:true,subtree:true}
					// 传入目标节点和观察选项
					observer.observe(target, config);
					// 随后,你还可以停止观察
					// observer.disconnect();
				}
			}
		}, options ? options : {}));
		return false;
	},
	'layerfooters': function(layero, index, that){
		var frame = layer.getChildFrame('html', index);
		var layerfooter = $("html").find(".layer-footer");
		if (layerfooter.length > 0) {
			$(".layui-layer-footer", layero).remove();
			var footer = $("<div />").addClass('layui-layer-btn layui-layer-footer');
			footer.html(layerfooter.html());
			footer.insertAfter(layero.find('.layui-layer-content'));
		}		
		var heg = frame.outerHeight();
		var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
		var btnHeight = layero.find('.layui-layer-footer').outerHeight() || 0;

		var oldheg = heg + titHeight + btnHeight;
		var maxheg = $(window).height() < 600 ? $(window).height() : 600;
		if (frame.outerWidth() < 768 || that.area[0].indexOf("%") > -1) {
			maxheg = $(window).height();
		}
		// 如果有.layer-footer或窗口小于600则重新排
		if (layerfooter.length > 0 || oldheg < maxheg || that.area[0].indexOf("%") > -1) {
			var footerHeight = layero.find('.layui-layer-footer').outerHeight() || 0;
			footerHeight = 0;
			if (oldheg >= maxheg) {
				heg = Math.min(maxheg, oldheg) - titHeight - btnHeight - footerHeight;
			}
			//alert(oldheg)
			layero.css({
				height: heg + titHeight + btnHeight + footerHeight-10
			});
			layero.find("iframe").css({
				height: heg-10
			});
		}
		$(".layer-footer .btn.disabled").removeClass("disabled");
		if (layerfooter.length > 0) {
			footer.on("click", ".btn", function() {
				if ($(this).hasClass("disabled") || $(this).parent().hasClass("disabled")) {
					return;
				}
				$(".btn:eq(" + $(this).index() + ")", layerfooter).trigger("click");
			});
		}

	}

},
'jstree': {
	'load': function(){
		zanpian.api.css('tpl/zanpianadmin/libs/jstree/dist/themes/default/style.css');
		$.ajaxSetup({cache: true});
		$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/jstree/dist/jstree.min.js?v=" + config.cms.version, function() {
			$.jstree.core.prototype.get_all_checked = function(full) {
				var obj = this.get_selected(),
					i, j;
				for (i = 0, j = obj.length; i < j; i++) {
					obj = obj.concat(this.get_node(obj[i]).parents);
				}
				obj = $.grep(obj, function(v, i, a) {
					return v != '#';
				});
				obj = obj.filter(function(itm, i, a) {
					return i == a.indexOf(itm);
				});
				return full ? $.map(obj, $.proxy(function(i) {
					return this.get_node(i);
				}, this)) : obj;
			};
		});
	}		
	
},
'template': {
	'load': function(){
		$.ajaxSetup({cache: true});
		$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/art-template/dist/template-native.js?v=" + config.cms.version);	
	}		
	
},
'upload': {
 list: {},
        config: {
            container: document.body,
            classname: '.plupload:not([initialized])',
            previewtpl: '<li class="col-xs-3"><a href="<%=fullurl%>" data-url="<%=url%>" target="_blank" class="thumbnail"><img src="<%=fullurl%>" class="img-responsive"></a><a href="javascript:;" class="btn btn-danger btn-xs btn-trash"><i class="fa fa-trash"></i></a></li>',
        },
        events: {
            //上传成功的回调
            onUploadSuccess: function (ret, onUploadSuccess, button) {
                var data = typeof ret.data !== 'undefined' ? ret.data : null;
                //上传成功后回调
                if (button) {
                    //如果有文本框则填充
                    var input_id = $(button).data("input-id") ? $(button).data("input-id") : "";
                    if (input_id) {
                        var urlArr = [];
                        var inputObj = $("#" + input_id);
                        if ($(button).data("multiple") && inputObj.val() !== "") {
                            urlArr.push(inputObj.val());
                        }
                        urlArr.push(data.file);
						if(data.thumb){
						   var i,j;
						   var thumb=[];
                           for(i=0;i<data.thumb.length;i++){
                                thumb[i]=data.thumb[i].file;
                           }
						   $("#" + input_id +'_thumb').val(thumb).trigger("change");
						}
						//alert(data.thumb[0].file)
                        inputObj.val(urlArr.join(",")).trigger("change");
                    }
                    //如果有回调函数
                    var onDomUploadSuccess = $(button).data("upload-success");
                    if (onDomUploadSuccess) {
                        if (typeof onDomUploadSuccess !== 'function' && typeof zanpian.upload.api.custom[onDomUploadSuccess] === 'function') {
                            onDomUploadSuccess = zanpian.upload.api.custom[onDomUploadSuccess];
                        }
                        if (typeof onDomUploadSuccess === 'function') {
                            var result = onDomUploadSuccess.call(button, data, ret);
                            if (result === false)
                                return;
                        }
                    }
                }
                if (typeof onUploadSuccess === 'function') {
                    var result = onUploadSuccess.call(button, data, ret);
                    if (result === false)
                        return;
                }
            },
            //上传错误的回调
            onUploadError: function (ret, onUploadError, button) {
                var data = typeof ret.data !== 'undefined' ? ret.data : null;
                if (button) {
                    var onDomUploadError = $(button).data("upload-error");
                    if (onDomUploadError) {
                        if (typeof onDomUploadError !== 'function' && typeof zanpian.upload.api.custom[onDomUploadError] === 'function') {
                            onDomUploadError = zanpian.upload.api.custom[onDomUploadError];
                        }
                        if (typeof onDomUploadError === 'function') {
                            var result = onDomUploadError.call(button, data, ret);
                            if (result === false)
                                return;
                        }
                    }
                }

                if (typeof onUploadError === 'function') {
                    var result = onUploadError.call(button, data, ret);
                    if (result === false) {
                        return;
                    }
                }
				layer.msg(ret.msg ? ret.msg : '上传错误', {icon: 2});
            },
            //服务器响应数据后
            onUploadResponse: function (response) {
                try {
                    var ret = typeof response === 'object' ? response : JSON.parse(response);
                    if (!ret.hasOwnProperty('code')) {
                        $.extend(ret, {code: -2, msg: response, data: null});
                    }
                } catch (e) {
                    var ret = {code: -1, msg: e.message, data: null};
                }
                return ret;
            }
        },
        api: {
            //Plupload上传
            plupload: function (element, onUploadSuccess, onUploadError){
				$.ajaxSetup({cache: true});
                $.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/plupload/js/plupload.full.min.js?v=" + config.cms.version, function() {
                element = typeof element === 'undefined' ? zanpian.upload.config.classname : element;
                $(element, zanpian.upload.config.container).each(function () {
                    $(this).attr("initialized", true);
                    var that = this;
                    var id = $(this).prop("id");
                    var url = $(this).data("url");
                    var maxsize = $(this).data("maxsize");
                    var mimetype = $(this).data("mimetype");
                    var multipart = $(this).data("multipart");
                    var multiple = $(this).data("multiple");
                    //填充ID
                    var input_id = $(that).data("input-id") ? $(that).data("input-id") : "";
                    //预览ID
                    var preview_id = $(that).data("preview-id") ? $(that).data("preview-id") : "";
                    //上传URL
                    url = url ? url : config.upload.uploadurl;
                    url = zanpian.api.fixurl(url);
                    //最大可上传
                    maxsize = typeof maxsize !== "undefined" ? maxsize : config.upload.maxsize;
                    //文件类型
                    mimetype = typeof mimetype !== "undefined" ? mimetype : config.upload.mimetype;
                    //请求的表单参数
                    multipart = typeof multipart !== "undefined" ? multipart : config.upload.multipart;
                    //是否支持批量上传
                    multiple = typeof multiple !== "undefined" ? multiple : config.upload.multiple;
                    //生成Plupload实例
                    zanpian.upload.list[id] = new plupload.Uploader({
                        runtimes: 'html5,flash,silverlight,html4',
                        multi_selection: multiple, //是否允许多选批量上传
                        browse_button: id, // 浏览按钮的ID
                        container: $(this).parent().get(0), //取按钮的上级元素
                        flash_swf_url: config.cms.tpl + 'tpl/zanpianadmin/libs/plupload/js/Moxie.swf',
                        silverlight_xap_url: config.cms.tpl + 'tpl/zanpianadmin/libs/plupload/js/Moxie.xap',
                        filters: {
                            max_file_size: maxsize,
                            mime_types: mimetype
                        },
                        url: url,
                        multipart_params: multipart,
                        init: {
                            PostInit: function () {

                            },
                            FilesAdded: function (up, files) {
                                var button = up.settings.button;
                                $(button).data("bakup-html", $(button).html());
                                //添加后立即上传
                                setTimeout(function () {
                                    up.start();
                                }, 1);
                            },
                            UploadProgress: function (up, file) {
                                var button = up.settings.button;
                                //这里可以改成其它的表现形式
                                //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
                                $(button).prop("disabled", true).html("<i class='fa fa-upload'></i> "  + file.percent + "%");
                            },
                            FileUploaded: function (up, file, info) {
                                var button = up.settings.button;
                                //还原按钮文字及状态
                                $(button).prop("disabled", false).html($(button).data("bakup-html"));
                                var ret = zanpian.upload.events.onUploadResponse(info.response);
                                if (ret.code === 1) {
                                    zanpian.upload.events.onUploadSuccess(ret, onUploadSuccess, button);
                                } else {
                                    zanpian.upload.events.onUploadError(ret, onUploadError, button);
                                }
                            },
                            Error: function (up, err) {
                                var button = up.settings.button;
                                $(button).prop("disabled", false).html($(button).data("bakup-html"));
                                var ret = {code: err.code, msg: err.message, data: null};
                                zanpian.upload.events.onUploadError(ret, onUploadError, button);
                            }
                        },
                        onUploadSuccess: onUploadSuccess,
                        onUploadError: onUploadError,
                        button: that
                    });
                    zanpian.upload.list[id].init();
                });
				$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/plupload/js/i18n/zh_CN.js?v=" + config.cms.version)
				});
            },
            // AJAX异步上传
            send: function (file, onUploadSuccess, onUploadError) {
                var data = new FormData();
                data.append("file", file);
                $.each(config.upload.multipart, function (k, v) {
                    data.append(k, v);
                });
                $.ajax({
                    url: config.upload.uploadurl+'?from=plupload',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (ret) {
                        ret = zanpian.upload.events.onUploadResponse(ret);
                        if (ret.code === 1) {
                            zanpian.upload.events.onUploadSuccess(ret, onUploadSuccess);
                        } else {
                            zanpian.upload.events.onUploadError(ret, onUploadError);
                        }
                    }, error: function (e) {
                        var ret = {code: 500, msg: e.message, data: null};
                        zanpian.upload.events.onUploadError(ret, onUploadError);
                    }
                });
            },
            custom: {
                //自定义上传完成回调
                afteruploadcallback: function (response) {
                    console.log(this, response);
                    alert("Custom Callback,Response URL:" + response.url);
                },
            },
        }
	
},
'webupload': function(form) {
	$.ajaxSetup({cache: true});
	 zanpian.api.css('tpl/zanpianadmin/libs/webuploader/webuploader.css');
	$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/Sortable/Sortable.min.js?v=" + config.cms.version,function() {	
	    var el = document.getElementById('preview-ul');
        new Sortable(el,{animation:100,sort: true,}); 
	})
	$.getScript(config.cms.tpl + "tpl/zanpianadmin/libs/webuploader/webuploader.js?v=" + config.cms.version,function() {
	operate();	
	var ext = $(form).data("ext");
	var num = $(form).data("num");
	var sid = $(form).data("sid");
    jQuery(function(){		
    var $ = jQuery,    // just in case. Make sure it's not an other libaray.
        $wrap = $(form),
        // 图片容器
        $queue = $('<ul class="filelist"></ul>').appendTo( $wrap.find('.queueList') ),
        // 状态栏，包括进度和控制按钮
        $statusBar = $wrap.find('.statusBar'),
        // 文件总体选择信息。
        $info = $statusBar.find('.info'),
        // 上传按钮
        $upload = $wrap.find('.uploadBtn'),
        // 没选择文件之前的内容。
        $placeHolder = $wrap.find('.placeholder'),
        // 总体进度条
        $progress = $statusBar.find('.progress').hide(),
        // 添加的文件数量
        fileCount = 0,
        // 添加的文件总大小
        fileSize = 0,
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 120 * ratio,
        thumbnailHeight = 110 * ratio,
        // 可能有pedding, ready, uploading, confirm, done.
        state = 'pedding',
        // 所有文件的进度信息，key为file id
        percentages = {},
        supportTransition = (function(){
            var s = document.createElement('p').style,
                r = 'transition' in s ||
                      'WebkitTransition' in s ||
                      'MozTransition' in s ||
                      'msTransition' in s ||
                      'OTransition' in s;
            s = null;
            return r;
        })(),

        // WebUploader实例
        uploader;
    if ( !WebUploader.Uploader.support() ) {
        alert( 'Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
        throw new Error( 'WebUploader does not support the browser you are using.' );
    }
    // 实例化
    uploader = WebUploader.create({
        pick: {
            id: '#filePicker',
            label: '点击选择图片'
        },
        dnd: form+ ' .queueList',
        paste: document.body,
        accept: {
            title: 'Images',
            extensions: ext,
            mimeTypes: 'image/*'
        },
        // swf文件路径
        swf: config.cms.tpl + 'tpl/zanpianadmin/libs/webuploader/Uploader.swf',
        disableGlobalDnd: true,
        chunked: true,
        server: config.upload.uploadurl+'?from=plupload&sid='+sid,
        fileNumLimit: num,
        fileSizeLimit: 5 * 1024 * 1024,    // 200 M
        fileSingleSizeLimit: 1 * 1024 * 1024    // 50 M
    });
    // 添加“添加文件”的按钮，
    uploader.addButton({
        id: '#filePicker2',
        label: '继续添加'
    });
    // 当有文件添加进来时执行，负责view的创建
    function addFile( file ) {
		
        var $li = $( '<li id="' + file.id + '">' +
                '<p class="title">' + file.name + '</p>' +
                '<p class="imgWrap"></p>'+
                '<p class="progress"><span></span></p>' +
                '<p class="progress"><span></span></p>' +
                '</li>' ),
		    //'<input class="upalt text-center" type="text" name="picture_image[title][]" value="" placeholder="图片描述">' +
            $btns = $('<div class="file-panel">' +'<span class="cancel">移除</span></div>').appendTo( $li ),
            $prgress = $li.find('p.progress span'),
            $wrap = $li.find( 'p.imgWrap' ),
            $info = $('<p class="error"></p>'),
            showError = function( code ) {
                switch( code ) {
                    case 'exceed_size':
                        text = '文件大小超出';
                        break;

                    case 'interrupt':
                        text = '上传暂停';
                        break;

                    default:
                        text = '上传失败，请重试';
                        break;
                }
                $info.text( text ).appendTo( $li );
            };
         if ( file.getStatus() === 'invalid' ) {
            showError( file.statusText );
         } else {
            // @todo lazyload
            $wrap.text( '预览中' );
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $wrap.text( '不能预览' );
                    return;
                }
                var img = $('<img src="'+src+'">');
				//var img = $('<img src="'+src+'"><input class="img-url" type="hidden" name="picture_image[url][]" value="'+src+'">');
                $wrap.empty().append( img );
            },1,1);

            percentages[ file.id ] = [ file.size, 0 ];
            file.rotation = 0;
			$(".uploadBtn").removeClass( 'disabled' );
        }
        file.on('statuschange', function( cur, prev ) {
            if ( prev === 'progress' ) {
                $prgress.hide().width(0);
            } else if ( prev === 'queued' ) {
                $li.off( 'mouseenter mouseleave' );
                $btns.remove();
            }
            // 成功
            if ( cur === 'error' || cur === 'invalid' ) {
                showError( file.statusText );
                percentages[ file.id ][ 1 ] = 1;
            } else if ( cur === 'interrupt' ) {
                showError( 'interrupt' );
            } else if ( cur === 'queued' ) {
                percentages[ file.id ][ 1 ] = 0;
            } else if ( cur === 'progress' ) {
                $info.remove();
                $prgress.css('display', 'block');
            } else if ( cur === 'complete' ) {
                $li.append( '<span class="success"></span>' );
				uploader.removeFile(file);
            }
            $li.removeClass( 'state-' + prev ).addClass( 'state-' + cur );
        });

        $li.on( 'mouseenter', function() {
            $btns.stop().animate({height: 30});
        });

        $li.on( 'mouseleave', function() {
            $btns.stop().animate({height: 0});
        });
        $btns.on( 'click', 'span', function() {
            var index = $(this).index(),
                deg;

            switch ( index ) {
                case 0:
                    uploader.removeFile( file );
                    return;

                case 1:
                    file.rotation += 90;
                    break;

                case 2:
                    file.rotation -= 90;
                    break;
            }

            if ( supportTransition ) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({
                    '-webkit-transform': deg,
                    '-mos-transform': deg,
                    '-o-transform': deg,
                    'transform': deg
                });
            } else {
                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
            }
        });
        $li.appendTo( $queue );
    }
    // 负责view的销毁
    function removeFile( file ) {
        var $li = $('#'+file.id);
        delete percentages[ file.id ];
        updateTotalProgress();
        $li.off().find('.file-panel').off().end().remove();
    }
    function updateTotalProgress() {
        var loaded = 0,
            total = 0,
            spans = $progress.children(),
            percent;

        $.each( percentages, function( k, v ) {
            total += v[ 0 ];
            loaded += v[ 0 ] * v[ 1 ];
        } );
        percent = total ? loaded / total : 0;
        spans.eq( 0 ).text( Math.round( percent * 100 ) + '%' );
        spans.eq( 1 ).css( 'width', Math.round( percent * 100 ) + '%' );
        updateStatus();
    }
    function updateStatus() {
        var text = '', stats;
        if ( state === 'ready' ) {
            text = '选中' + fileCount + '张图片，共' +
                    WebUploader.formatSize( fileSize ) + '。';
        } else if ( state === 'confirm' ) {
            stats = uploader.getStats();
            if ( stats.uploadFailNum ) {
                text = '已成功上传' + stats.successNum+ '张照片至XX相册，'+
                    stats.uploadFailNum + '张照片上传失败，<a class="retry">重新上传</a>失败图片或<a class="ignore">忽略</a>'
            }
        } else {
            stats = uploader.getStats();
            text = '共上传' + stats.successNum + '张';

            if ( stats.uploadFailNum ) {
                text += '，失败' + stats.uploadFailNum + '张';
            }
        }
        $info.html( text );
    }
    function setState( val ) {
        var file, stats;
        if ( val === state ) {
            return;
        }
        $upload.removeClass( 'state-' + state );
        $upload.addClass( 'state-' + val );
        state = val;
        switch ( state ) {
            case 'pedding':
                $placeHolder.removeClass( 'element-invisible' );
                $queue.parent().removeClass('filled');
                $queue.hide();
                $statusBar.addClass( 'element-invisible' );
                uploader.refresh();
                break;
            case 'ready':
                $placeHolder.addClass( 'element-invisible' );
                $( '#filePicker2' ).removeClass( 'element-invisible');
                $queue.parent().addClass('filled');
                $queue.show();
                $statusBar.removeClass('element-invisible');
                uploader.refresh();
                break;
            case 'uploading':
                $( '#filePicker2' ).addClass( 'element-invisible' );
                $progress.show();
                $upload.text( '暂停上传' );
                break;
            case 'paused':
                $progress.show();
                $upload.text( '继续上传' );
                break;
            case 'confirm':
                $progress.hide();
                $upload.text( '开始上传' ).addClass( 'disabled' );
                stats = uploader.getStats();
                if ( stats.successNum && !stats.uploadFailNum ) {
                    setState( 'finish' );
                    return;
                }
                break;
            case 'finish':
                stats = uploader.getStats();
                if ( stats.successNum ) {
					layer.msg('图片全部成功', {zIndex:layer.zIndex,icon: 1,time: 500});
                } else {
                    // 没有成功的图片，重设
                    state = 'done';
                    location.reload();
                }
                break;
        }
        updateStatus();
    }
    uploader.onUploadProgress = function( file, percentage ) {
        var $li = $('#'+file.id),
            $percent = $li.find('.progress span');
            $percent.css( 'width', percentage * 100 + '%' );
            percentages[ file.id ][ 1 ] = percentage;
           updateTotalProgress();
    };
    uploader.onFileQueued = function( file ) {
        fileCount++;
        fileSize += file.size;
        if ( fileCount === 1 ) {
            $placeHolder.addClass( 'element-invisible' );
            $statusBar.show();
        }
        addFile( file );
        setState( 'ready' );
        updateTotalProgress();
    };
    uploader.onFileDequeued = function( file ) {
        fileCount--;
        fileSize -= file.size;
        if ( !fileCount ) {
            setState( 'pedding' );
        }
        removeFile( file );
        updateTotalProgress();
    };
    uploader.on('uploadSuccess', function(file,response){						  
			var $previe	= $('.preview-list');
            uploader.makeThumb( file, function( error, src ) {
                $previe.append( '<li><p class="imgWrap"><img src="'+src+'"></p><input class="upalt  text-center" type="text" name="picture_image[title][]" value="" placeholder="图片描述"><input type="hidden" class="img-url" name="picture_image[url][]" value="'+response.file+'"><div class="file-panel">' + '<span class="cancel">删除</span></div><span class="success"></span></li>');	
			$('.preview li .file-panel').unbind("click"); 
			$('.preview li').unbind("mouseenter");
			$('.preview li').unbind("mouseleave");
			operate();	
            },1,1);
    });
    uploader.on( 'all', function( type ) {
        var stats;
        switch( type ) {
            case 'uploadFinished':
                $placeHolder.addClass( 'element-invisible' );
                $( '#filePicker2' ).removeClass( 'element-invisible');
                $queue.parent().addClass('filled');
                $queue.show();
                $statusBar.removeClass('element-invisible');
                uploader.refresh();
                setState( 'confirm' );
                break;
            case 'startUpload':
                setState( 'uploading' );
                break;

            case 'stopUpload':
                setState( 'paused' );
                break;
        }
    });
    uploader.onError = function( code ) {
        alert( 'Eroor: ' + code );
    };
    $upload.on('click', function() {
        if ( $(this).hasClass( 'disabled' ) ) {
            return false;
        }
        if ( state === 'ready' ) {
            uploader.upload();
        } else if ( state === 'paused' ) {
            uploader.upload();
        } else if ( state === 'uploading' ) {
            uploader.stop();
        }
    });
    $info.on( 'click', '.retry', function() {
        uploader.retry();
    } );
    $info.on( 'click', '.ignore', function() {
        //alert( 'todo' );
    } );
    $upload.addClass( 'state-' + state );
    updateTotalProgress();		 
});
function operate() {
    $(".preview li").on('mouseenter',
    function() {
        $(this).find(".file-panel").stop().animate({
            height: 30
        });
    });
    $(".preview li").on('mouseleave',
    function() {
        $(this).find(".file-panel").stop().animate({
            height: 0
        });
    });
    $(".preview li .file-panel").on('click', 'span',function() {
        var file = $(this).parent().prev(".img-url").attr("value");
        var $li = $(this).parent().parent('li');
        layer.confirm('您确认要删除吗?', {
            zIndex: layer.zIndex,
            icon: 3,
            title: '温馨提醒',
            btn: ['确定', '取消']
        },
        function(index) {
            layer.close(index);
            $.ajax({
                type: "post",
                url: zanpian.api.fixurl('upload/del/'),
                data: {
                    "file": file
                },
                dataType: "json",
                success: function(data) {
                    $li.remove();
                    if (data.code == 1) {
                        layer.msg(data.msg ? data.msg: '删除成功', {
                            icon: 1,
                            time: 500
                        });
                    } else {
                        layer.msg(data.msg ? data.msg: '删除成功', {
                            icon: 2,
                            time: 500
                        });
                    }
                }
            });
        });
    })
}	 
});
}

}
$(document).ready(function() {
	skin = parent.$("body").attr('class');
	if (skin) {
		arr = "skin-" + skin.split("skin-")[1];
		$("body").addClass(arr);
	}
	$(document).on('click', ".addstars", function() {
		var arr = $(this).attr('id');
		var index = arr.split("_");
		for (i = 1; i <= 5; i++) {
			$('#' + index[0] + '_' + i).attr("src", config.cms.tpl + "tpl/zanpianadmin/img/star0.gif");
		}
		for (i = 1; i <= index[1]; i++) {
			$('#' + index[0] + '_' + i).attr("src", config.cms.tpl + "tpl/zanpianadmin/img/star1.gif");
		}
		$('#' + index[0] + '_stars').val(index[1]);
	})
	$(document).on("click", ".create-html", function(e) {
		var arr = [];
		$.each($('input[name="id[]"]:checkbox:checked'), function(i) {
			arr.push($(this).val());
		});
		var str = arr.join(",");
		var url = $(this).data('url') + '-ids-' + str;
		var name = $(this).data("name");
		var width = $(this).data("width");
		var height = $(this).data("height");
		var offset = $(this).data("offset");
		zanpian.api.window(url, name, '', width, height, offset);
	});
	if ($("#close").length > 0) {
		setTimeout(function() {
			var index = parent.layer.getFrameIndex(window.name);
			parent.layer.close(index);
		}, 1000);
	}
	$(document).on('click', ".getkeywords", function() {
		var inputname = $(this).data('name');
		var inputnames = $(this).data('names');
		var inputtype = $(this).data('type');
		if ($("#" + inputnames).val() != '') {
			var keywords = $("#" + inputnames).val();
		} else if ($("#" + inputname).val() != '') {
			var keywords = $("#" + inputname).val();
		}
		if (inputtype) {
			var keywords = keywords + inputtype;
		}
		layer.msg('数据获取中...');
		var $data = "name=" + keywords;
		$.ajax({
			type: 'get',
			url: zanpian.api.fixurl('get/keywords'),
			data: $data,
			dataType: 'json',
			success: function(data) {
				if (data.code == 1) {
					layer.msg('共获取到' + data.data.num + '个关键词', {
						icon: 1,
						time: 1800
					});
					$("#" + inputnames).val(data.data.str);
				} else {
					layer.msg(data.msg ? data.msg : '获取关键词失败', {
						icon: 2,
						time: 1800
					});
				}
			},
			error: function(data) {
				layer.confirm('程序返回：' + data.status + ' 错误,点击查看详细错误', {
					zIndex: layer.zIndex,
					icon: 5,
					title: '出错啦！',
					btn: ['查看', '关闭']
				}, function() {
					$('html').html(data.responseText);
				});
			},
		});
	})
});