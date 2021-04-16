(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';        
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
/*
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?8bb3de68e12593b6ad6da44303c81bfb";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
var cnzz_s_tag = document.createElement('script');
cnzz_s_tag.type = 'text/javascript';
cnzz_s_tag.async = true;
cnzz_s_tag.charset = 'utf-8';
cnzz_s_tag.src = 'https://w.cnzz.com/c.php?id=1447976&async=1';
var root_s = document.getElementsByTagName('script')[0];
root_s.parentNode.insertBefore(cnzz_s_tag, root_s);
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  if(typeof(callback) != "undefined"){
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = function () {
        callback();
      };
    }
  }
  script.src = url;
  document.body.appendChild(script);
}
loadScript("https://s19.cnzz.com/z_stat.php?id=1447976&web_id=1447976");
document.writeln("<script>var cnzz_s_tag = document.createElement('script');cnzz_s_tag.type = 'text/javascript';cnzz_s_tag.async = true;cnzz_s_tag.charset = 'utf-8';cnzz_s_tag.src = 'https://w.cnzz.com/c.php?id=1447976&async=1';var root_s = document.getElementsByTagName('script')[0];root_s.parentNode.insertBefore(cnzz_s_tag, root_s);</script>"); 
document.writeln("<script>var _hmt = _hmt || [];(function() { var hm = document.createElement(\"script\"); hm.src =\"https://hm.baidu.com/hm.js?8bb3de68e12593b6ad6da44303c81bfb\"; var s = document.getElementsByTagName(\"script\")[0]; s.parentNode.insertBefore(hm, s);})();</script>");
*/