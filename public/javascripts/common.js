$(document).ready(function(){
	//导航
	var pathname = document.location.pathname;
	pathname = pathname.split("/");
	pathname = pathname[1];
	if(pathname=='about'){
		$('.menu .item').eq(2).removeClass('active').addClass('active').siblings().removeClass('active');
	}else if(pathname=='articles'||pathname=='article'){
		$('.menu .item').eq(1).removeClass('active').addClass('active').siblings().removeClass('active');
	}else if(pathname=='chat'){
		$('.menu .item').eq(3).removeClass('active').addClass('active').siblings().removeClass('active');
	}
});