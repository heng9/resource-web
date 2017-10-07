$(function () {
    pageInitModule.setWidth();
    pageInitModule.setSidebar();
});

$(window).resize(function () {
    pageInitModule.setWidth();
});

$(window).scroll(function () {
    pageInitModule.setScrollToTop();
});

/*init page when page load*/
var pageInitModule = (function (mod) {
    mod.setWidth = function () {
        if ($(window).width() < 768) {
            $(".sidebar").css({ left: -220 });
            $(".container").css({ marginLeft: 0 });
        } else {
            $(".sidebar").animate({ left: 0 });
            $(".container").animate({ marginLeft: 220 });
        }
    };
    
	/*返回顶部*/
    mod.setScrollToTop = function () {
        var top = $(window).scrollTop();
        if (top < 60) {
            $('#goTop').hide();
        } else {
            $('#goTop').show();
        }
    };
    
    /*sidebar 切换*/
    mod.setSidebar = function () {
        $('[data-target="sidebar"]').click(function () {
            var asideleft = $(".sidebar").offset().left;
            if (asideleft == 0) {
                $(".sidebar").animate({ left: -220 });
                $(".container").animate({ marginLeft: 0 });
            }
            else {
                $(".sidebar").animate({ left: 0 });
                $(".container").animate({ marginLeft: 220 });
            }
        });
    };
    return mod;
})(window.pageInitModule || {});



function showNotice(){
    var notice = $("#notice").val();
    UIkit.notify("系统公告<br/>"+notice, {status:'info', timeout:0});
}

function pleaseLogin(){
    UIkit.modal.confirm("<div style='font-size: 20px; height: 100px;' class='uk-text-center uk-margin-top'>"+
        "<img width=80 height=80 style='border-radius: 50%; margin-right:20px' src='/static/img/login.jpg'>请先登录</div>", function(){

    });
}

function logout(){
    var avatar = $("#avatar").attr("src");
    UIkit.modal.confirm("<div style='font-size: 20px; height: 100px' class='uk-text-center uk-margin-top'>"+
        "<img width=80 height=80 style='border-radius: 50%; margin-right:20px' src='"+avatar+"'>确定退出吗？</div>", function(){
        location.href="/logout";
    });
}