
commonModule ={
	"serverUrl":"http://192.168.1.108:8091/",
	"jumpTo":function(path){
		 location.href = path;
	},
	"parentJumpTo":function(path){
		window.parent.location.href = path;
	},
	"getToken":function(){
		var loginInfo = localStorage.getItem('loginInfo');
		var token = "";
     	if(!!loginInfo){
     		token = JSON.parse(loginInfo).accessToken;
     	} 
     	return token;
	}
}
$.ajaxSetup({
    type: "post",     
    data:{"token":commonModule.getToken()},
    error: function(jqXHR, textStatus, errorThrown){ 
        switch (jqXHR.status){  
            case 0:
            	layer.msg('网络不通', { icon: 6, time: 1000 });
				break;
			case(500):  
				layer.msg('服务器系统内部错误', { icon: 6, time: 1000 });
	            break;  
	        case(401):  
				localStorage.clear();
				layer.msg('您长时间没有进行操作，请重新登录', { icon: 6, time: 1000 }, function() {
					commonModule.parentJumpTo("./login.html");
				});
	            break;    
	        case(403):  
	        	layer.msg('无权限执行此操作', { icon: 6, time: 1000 });
	            break;  
	        case(404):  
	        	layer.msg('url地址错误', { icon: 6, time: 1000 });
	            break;      
	        case(408):  
	        	layer.msg('请求超时', { icon: 6, time: 1000 });
	            break;      
        }  
    }
});  
$.ajaxSetup({  
    type: "get",  
    data:{"token":commonModule.getToken()},
    error: function(jqXHR, textStatus, errorThrown){ 
        switch (jqXHR.status){  
             case 0:
            	layer.msg('网络不通', { icon: 6, time: 1000 });
				break;
			case(500):  
				layer.msg('服务器系统内部错误', { icon: 6, time: 1000 });
	            break;  
	        case(401):  
				localStorage.clear();
				layer.msg('您长时间没有进行操作，请重新登录', { icon: 6, time: 1000 }, function() {
					commonModule.parentJumpTo("./login.html");
				});
	            break;    
	        case(403):  
	        	layer.msg('无权限执行此操作', { icon: 6, time: 1000 });
	            break;  
	        case(404):  
	        	layer.msg('url地址错误', { icon: 6, time: 1000 });
	            break;      
	        case(408):  
	        	layer.msg('请求超时', { icon: 6, time: 1000 });
	            break;  
        }  
    }
}); 

Array.prototype.unique1 = function(){
 var res = [this[0]];
 for(var i = 1; i < this.length; i++){
  var repeat = false;
  for(var j = 0; j < res.length; j++){if(this[i] == res[j]) {
    repeat = true;
    break;
   }
  }
  if(!repeat){
   res.push(this[i]);
  }
 }
 return res;
}

function checkNull(str){
	if(str == null || str == undefined  || !str){
		return "";
	}else{
		return str;
	}
}
function ifHasAuthorization(auth){
	var ifHasAuthorization = false;
	var loginInfo = localStorage.getItem('loginInfo');
	if(!!loginInfo){
		var  authResourceUrls =   JSON.parse(localStorage.loginInfo).authResourceUrls.toString();
		 if(authResourceUrls.indexOf(auth)>0){
		 	ifHasAuthorization = true;
		 }
	}
	return ifHasAuthorization;
}
function authButtonDeal(authArr,btnType){
	var ifAuth = true;
	$.each(authArr, function(index,item) {
		if(!ifHasAuthorization(item)){
			ifAuth = false;
		}
	});
	if(!ifAuth){
		$("."+btnType).css("display","none");
	}else{
		$("."+btnType).css("display","inline-block");
	}
}
