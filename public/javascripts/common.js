$(document).ready(function(){
	//导航
	var pathname = document.location.pathname;
	if(pathname=='/about/'){
		$('.menu .item').eq(2).removeClass('active').addClass('active').siblings().removeClass('active');
	}else if(pathname=='/category/'){
		$('.menu .item').eq(1).removeClass('active').addClass('active').siblings().removeClass('active');
	}else if(pathname=='/chat/'){
		$('.menu .item').eq(3).removeClass('active').addClass('active').siblings().removeClass('active');
	}
});