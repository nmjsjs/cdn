$(document).ready(function(){
//订单付款界面						   
$('body').on("click","#user-score-payment",function(){	
	 payment();
});
//购买VIP界面
$('body').on("click","#ispay-vip",function(){
    $.colorbox({
        href: Root+'index.php?s=/user/center/buy',
    });
});
//支付VIP影币
$('body').on("click","#pay_vip",function(){								 
   $(".form-horizontal").qiresub({
			curobj: $("#pay_vip"),
			txt: "数据提交中,请稍后...",
			onsucc: function(a) {
				if($.hidediv(a),parseInt(a["code"])  > 0) {
					qr.gu({
						ubox: "unm",
						rbox: "innermsg",
						h3: "h3",
						logo: "userlogo"
					});
				$("#cboxClose").trigger("click")
				 location.reload();
				}
				if($.hidediv(a),parseInt(a["code"]) == -2){
				 payment();
				}
				else - 3 == parseInt(a["code"])
			}
		}).post({
			url: Root + "index.php?s=/user/center/buy"
		}), !1;
	
});
//购买VIP界面
$('body').on("click","#pay_card",function(){
     payment_card();
});
$('body').on("click","#payment_card",function(){								 
   $(".form-horizontal").qiresub({
			curobj: $("#payment_card"),
			txt: "数据提交中,请稍后...",
			onsucc: function(a) {
				if ($.hidediv(a), parseInt(a["code"]) > 0) {
					qr.gu({
						ubox: "unm",
						rbox: "innermsg",
						h3: "h3",
						logo: "userlogo"
					});
				$("#cboxClose").trigger("click")
				       location.reload();
				}
				if($.hidediv(a),parseInt(a["code"]) == -2){
				 payment();
				}
				else - 3 == parseInt(a["code"])
			}
		}).post({
			url: Root + "index.php?s=/user/payment/card"
		}), !1;
	
});

		//重新发送邮件
		$('body').on("click", "#send", function() {	
			var ac = $('input[name="ac"]').val();	
			var to = $('input[name="to"]').val();
			if(ac=='mobile'){
			    if ("" == to){$.showfloatdiv({
				     txt: "请输入手机号码"
			    }), $("#to").focus(), $.hidediv({});
			         return false;
			    }
                var pattern=/^[1][0-9]{10}$/;
                var ex = pattern.test(to);			
			    if (!ex) {$.showfloatdiv({
				    txt: "手机号格式不正确"
			    }), $("#to").focus(), $.hidediv({});
			        return false;
			    }
			}else if(ac=='email'){
			    if ("" == to){$.showfloatdiv({
				     txt: "请输入邮箱"
			    }), $("#to").focus(), $.hidediv({});
			         return false;
			    }
                var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                var exs = pattern.test(to);			
			    if (!exs) {$.showfloatdiv({
				    txt: "邮箱格式不正确"
			    }), $("#to").focus(), $.hidediv({});
			        return false;
			    }				
			}
			var obj = $(this);
			$(this).closest('form').qiresub({
				curobj: $(this),
				txt: "数据提交中,请稍后...",
				onsucc: function(a) {
					if ($.hidediv(a), parseInt(a["code"]) > 0) {
						settime(obj)
					}else{

					}
				}
			}).post({
				url: Root + "index.php?s=/user/reg/send/"
			}), !1;
		});	

		//绑定邮箱或手机
		$('body').on("click", "#submit-bind", function() {
			var ac = $('input[name="ac"]').val();	
			var to = $('input[name="to"]').val();														   
          	if ("" == $('input[name="code"]').val()){$.showfloatdiv({
		         txt: "请输入验证码"
	        }), $('input[name="code"]').focus(), $.hidediv({});
			    return false;
			}
			$('form').qiresub({
				curobj: $("#submit-bind"),
				txt: "数据提交中,请稍后...",
				onsucc: function(a) {
					if ($.hidediv(a), parseInt(a["code"]) > 0) {
						$("#cboxClose").trigger("click")
						if(ac=="email"){
							parent.$("#user_email").val(a["data"]);
							parent.$(".user_email").val(a["data"]);
							parent.$("#email").html(a["data"]);
							parent.$(".user-email-nubind").show();
							parent.$(".user-email-bind").hide();
						}
						if(ac=="mobile"){
						    parent.$("#user_mobile").val(a["data"]);
							parent.$(".user_mobile").val(a["data"]);
							parent.$("#mobile").html(a["data"]);
							parent.$(".user-mobile-nubind").show();
							parent.$(".user-mobile-bind").hide();							
						}						
					}
				}
			}).post({
				url: Root + "index.php?s=/user/center/bind"
			}), !1;
		});	
		$('body').on("click", "#unbind", function() {
			var url = $(this).data('url');
			var ac = $(this).data('type');
			$.showfloatdiv({
				txt: '数据提交中...',
				cssname: 'loading'
			});
				$.get(url, function(r) {
					if ($.hidediv(r), parseInt(r["code"]) > 0) {
						if(ac=="email"){
							$("#user_email").val('');
							$(".user_email").val('');
							$(".user-email-nubind").hide();
							$(".user-email-bind").show();
						}
						if(ac=="mobile"){
							$("#user_mobile").val('');
							$(".user_mobile").val('');
							$(".user-mobile-nubind").show();
							$(".user-mobile-bind").hide();
						}
						}
				}, 'json');
		});		

})
function payment(){
	 $.colorbox({
        href: Root+'index.php?s=/user/payment/index',
    });
}

function player_iframe(){
		if($("#zanpiancms-player-vip").length>0){
			self.location.reload();
		}
}
function payment_card(){
	 $.colorbox({
        href: Root+'index.php?s=/user/payment/card',
    }); 	 
}

    var countdown=60;
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
        setTimeout(function() {settime(val) },1000)
    }