window.onerror=function(){return true;};var console={};console.log = function(){};
(function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
function Push_code(){
    (function(){
        var bp = document.createElement('script');
        var curProtocol = window.location.protocol.split(':')[0];
        if (curProtocol === 'https') {
            bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
        }else {
            bp.src = 'http://push.zhanzhang.baidu.com/push.js';
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
}
function Ad_code(){
    (function() {
        var adurl,tag,root_s;
        if(ad.url == ""||typeof(ad.url) == "undefined"){
            adurl = ''; 
        }else{
            adurl = ad.url;
        }
        tag = document.createElement('script');
        tag.src = adurl;
        root_s = document.getElementsByTagName('script')[0];
        root_s.parentNode.insertBefore(tag, root_s);
    })();
}