/*
 ------------------------获取dom封装工具部分---------------------
 */

//封装通过class获取dom对象的函数
function getClass(className,obj){
	//设置obj在不写改参数时候的默认值
	obj = obj || document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(className);
	}else{
		//保存合适的dom对象
		var result = [];
		//获取所有的对象
		var objs = document.getElementsByTagName("*");
		//遍历所有合适的对象并放入数组
		for(var i = 0,len = obj.length;i < len;i++){
			//将所有的类名用空格分隔
			var classNames = objs[i].className.split(" ");
			//遍历所有的类名中是否有合适的类名
			for(var j = 0,len = classNames.length;i < len;j++){
				if(className === classNames[j]){
					result.push(objs[i]);
					break;
				}
			}
		}
		// 返回查找到的 DOM 元素数组
		return result;
	}
}

//封装通过id class 或者标签名获取dom对象
function $(param,obj){
	obj = obj || document;
	if(param.indexOf("#") === 0){
		return document.getElementById(param.substring(1));
	}else if(param.indexOf(".") === 0){
		return getClass(param.substring(1),obj);
	}else{
		return obj.getElementsByTagName(param);
	}
}

//设置对象属性
function setAttr(oTarget,obj){
	obj = obj || document;
	for(var sAttr in oTarget){
		obj.style[sAttr] = oTarget[sAttr];
	}
}

//获取对象属性
function getAttr(sAttr,obj){
	obj = obj || document;
	return obj.currentStyle ? obj.currentStyle[sAttr] : getComputedStyle(obj,null)[sAttr];
}
/*
 ------------------------封装运动函数---------------------
 */
var LJC = {
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - LJC.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return LJC.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return LJC.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
};

function startMove(obj, oTarget, fx, times, fn) {
	clearInterval(obj.timer);
	var oCur = {};
	for(var sAttr in oTarget) {
		if(sAttr == 'opacity') {
		    oCur[sAttr] = parseInt(parseFloat(getStyle(obj, sAttr)) * 100);
		} else {
		    oCur[sAttr] = parseInt(getStyle(obj, sAttr));
		}
	}
	var startTime = new Date().getTime();

	obj.timer = setInterval(function () {
		var switchTime = new Date().getTime();
		var iScale = 1 - Math.max(0, (startTime + times - switchTime)/times);
		for(var sAttr in oTarget) {
			var iNow = fx(iScale * times, oCur[sAttr], oTarget[sAttr] - oCur[sAttr], times);
			if(sAttr == 'opacity') {
                obj.style['opacity'] = iNow/100;
                obj.style['filter'] = 'alpha(opacity:' + iNow + ')';
            }else if(sAttr === 'zIndex') {
            	obj.style[sAttr] = iNow;
            }else {
                obj.style[sAttr] = iNow + 'px';
            }
		}
		if(iScale == 1) {
			clearInterval(obj.timer);
			if(fn) {
				fn.call(obj);
			}
		}
	}, 20);

	function getStyle(obj, sAttr) {
		if(obj.currentStyle) {
			return obj.currentStyle[sAttr];
		} else {
			return getComputedStyle(obj, false)[sAttr];
		}
	}
}

/*
 ------------------------封装轮播调用核心部分---------------------
/*
 * 样式修改权重预留
 * 修改UL ----swiperUl
 * 修改切换导航num-------swiperList
 * 
 * 
 * */
function Swiper(id,oArrImg,oOptions){
	//遍历oOptions对象并赋值
	if(oOptions  === undefined){
		//做属性的默认值	(注意，若用true false 做判断，那么将false写在后面为好，否则无法做或判断)
	
		this.autoPlay	  = false;			//默认为不自动轮播
		this.switchBtn    = false;			//按钮默认为移上显示移出隐藏
		this.listNum      = true;			//默认显示列表切换按钮
		this.hoverStop    = false;			//是否允许鼠标移上停止轮播，默认不允许
		this.playTime    = 3000;			//自动轮播的默认切换时间为3秒
		this.playWay      = LJC.Linear;		//切换方式默认为Tween.Linear
		this.switchTime   = 500;			//切换时间默认为500
		this.shadow       = false;			//设置盒子是否有阴影效果，默认是没有的
		this.moveMode     = "move";			//设置轮播方式，默认是位移运动
		this.vPlay        = false;			//设置是否为垂直运动模式，默认为水平
		this.listSwitch   = "hover";		//设置列表按钮切换轮播的方式，默认是hover
		this.vDirection   = "up";			//垂直轮播方式，默认是向上
		this.showText     = false;			//是否为图片配置文字信息，默认为false
		this.loop		  = false;			//是否开启无缝滚动，默认为false
		
	}else{
		for(var sAttr in oOptions){
			this[sAttr]  = oOptions[sAttr];
		}
		//做属性的默认值	(注意，若用true false 做判断，那么将false写在后面为好，否则无法做或判断)
		this.autoPlay	  = oOptions.autoPlay || false;		//默认为不自动轮播
		this.switchBtn    = oOptions.switchBtn || false;	//按钮默认为移上显示移出隐藏
		this.listNum      = oOptions.listNum;
		this.hoverStop    = oOptions.hoverStop || false;	//是否允许鼠标移上停止轮播，默认不允许
		this.playTime    = oOptions.playTime || 3000;		//自动轮播的默认切换时间为3秒
		this.playWay      = oOptions.playWay || LJC.Linear;	//切换方式默认为Tween.Linear
		this.switchTime   = oOptions.switchTime || 500;		//切换时间默认为500
		this.shadow       = oOptions.shadow || false;		//设置盒子是否有阴影效果，默认是没有的
		this.moveMode     = oOptions.moveMode || "move";	//设置轮播方式，默认是位移运动
		this.vPlay        = oOptions.vPlay || false;		//设置是否为垂直运动模式，默认为水平
		this.listSwitch   = oOptions.listSwitch || "hover";
		this.vDirection   = oOptions.vDirection || "up";
		this.showText     = oOptions.showText || false;
		this.loop		  = oOptions.loop || false;
	}
	
	//给透明运动和无缝做兼容
	if(this.moveMode === "opacity"){
		this.loop = false;
	}
	
	
	//添加ul并设置属性
	this.oSwiper = $(id);
	this.oSwiperImg = oArrImg;
	this.iSwiperImgHeight = 0;
	this.isMoving = false;	//用于控制是否在运动中点击

	this.oUl = document.createElement("ul");
	this.oList = document.createElement("div");
	this.oUl.className = "swiperUl";
	this.oList.className = "swiperList";
	$(id).appendChild(this.oUl);
	$(id).appendChild(this.oList);
	this.iCurIndex = 0;
	this.oTimer  = null;
	var that = this;
	if($(".swiperPrev",$(id)).length !== 0){
		this.oPrev = $(".swiperPrev",$(id))[0];
		this.oNext = $(".swiperNext",$(id))[0];
		//初始化消除切换标签的默认行为
		this.oPrev.href = "javascript:;";
		this.oNext.href = "javascript:;";
	}
	
	//隐藏列表按钮
	if(this.listNum === false){
		this.oList.className = "swiperList none";
	}
	
	
	//为每个父容器添加css属性，减少用户代码量
	this.oSwiper.className = "swiper";
	//自动生成标签并且添加属性
	
	for(var i = 0,len = oArrImg.length;i < len;i++){
		//给oUl添加标签
		$("ul",$(id))[0].appendChild(document.createElement("li"));
		$("li",$("ul",$(id))[0])[i].appendChild(document.createElement("a"));
		$("a",$("li",$("ul",$(id))[0])[i])[0].appendChild(document.createElement("img"));
		$("a",$("li",$("ul",$(id))[0])[i])[0].href = oArrImg[i][1];
		
		//初始化图片信息内容文字
		if(this.showText && oArrImg[i][3] === undefined){
			oArrImg[i][3]  = "没有初始化图片文字!";
		}
		
		//如果显示文字信息，则向li中添加元素
		if(this.showText){
			$("li",$("ul",$(id))[0])[i].appendChild(document.createElement("div"));
			$("div",$("li",$("ul",$(id))[0])[i])[0].className = "swiper-text";
			$("div",$("li",$("ul",$(id))[0])[i])[0].appendChild(document.createElement("p"));
			$("p",$("div",$("li",$("ul",$(id))[0])[i])[0])[0].innerHTML = oArrImg[i][3];
		}
		
		//初始化数组的第三个参数(文件夹位置)
		if(oArrImg[i][2] === undefined || ""){
			this.imgLocation = "img";
		}else{
			this.imgLocation = oArrImg[i][2];
		}
		
		$("img",$("a",$("li",$("ul",$(id))[0])[i])[0])[0].src = this.imgLocation + "/" + oArrImg[i][0];
		
		//给oList添加标签
		$(".swiperList",$(id))[0].appendChild(document.createElement("a"));
		$("a",$(".swiperList",$(id))[0])[i].href = "javascript:;";
		$("a",$(".swiperList",$(id))[0])[i].className = "swiperListA";
		
		//给第一个a添加active类名
		if(i === 0){
			$("a",$(".swiperList",$(id))[0])[0].className = "swiperListA active";
			$("li",$("ul",$(id))[0])[0].className = "active";
		}
		$("a",$(".swiperList",$(id))[0])[i].innerHTML = i + 1;
		
		//设置宽度(真实起了怪了，在不设置高度的情况下，可以不延时获取到图片的offsetWidth但是offsetHeight就是不可以，而且还是必须设置两次才行，否则百分比的时候会出问题)
			setAttr({"width" : $("img",$("a",$("li",$("ul",$(id))[0])[0])[0])[0].offsetWidth + "px"},$(id));
			//这里不知道为什么要设置两次才能使得获得在css中设置了百分比的图片的正确高度
			setAttr({"width" : getAttr("width", $("img",$("a",$("li",$("ul",$(id))[0])[0])[0])[0])},$(id));
		
		//根据运动模式给li设置属性
		switch(this.moveMode){
			case "move" : 
				if(this.vPlay){	//垂直运动布局(由于跨域问题无法解决只能在上面先布局)
					
				}else{	//水平运动布局
					setAttr({"left" : i * $(id).offsetWidth + "px"},$("li",($("ul",$(id)))[0])[i]);
				}
				break;
			case "opacity" : 
				//给出了第一个的所有li透明隐藏
				if(i !== 0){
					$("li",($("ul",$(id)))[0])[i].className = "pacity-hidden opacity";
				}else{
					$("li",($("ul",$(id)))[0])[i].className = "pacity-active opacity";
				}
				break;
		}
		
		//无缝克隆写在所有元素创建完成之后
		//创建克隆以及排序
		if(this.loop){
			if(this.vPlay === false){			//水平克隆布局
			//创建克隆对象
				if(i === len -1){
				//这里插入的顺序千万不能出错!!!!!!!!!!!!!
				this.oFirstPic = $("li",$("ul",$(id))[0])[0].cloneNode(true);
				//插入克隆对象(只能在对应的i下面插入)
				$(".swiperUl",$(id))[0].appendChild(this.oFirstPic);
				
				this.oLastPic = $("li",$("ul",$(id))[0])[len-1].cloneNode(true);
				//插入克隆对象(只能在对应的i下面插入)
				$(".swiperUl",$(id))[0].insertBefore(this.oLastPic,$("li",$("ul",$(id))[0])[0]);
				
				//创建新属性保存新的图片长度
				var newImgLen = $("li",($("ul",$(id)))[0]).length;
				//给水平克隆布局
					setAttr({"left" : - $(id).offsetWidth + "px"},$("li",($("ul",$(id)))[0])[0]);
					setAttr({"left" : (newImgLen - 2) * $(id).offsetWidth + "px"},$("li",($("ul",$(id)))[0])[newImgLen - 1]);

				}
			}
			
		}

		
		//根据列表按钮切换方式触发按钮
		if(this.listSwitch === "hover"){
			//添加移除样式的方法
			$("a",$(".swiperList",$(id))[0])[i].index  = i;
			$("a",$(".swiperList",$(id))[0])[i].onmouseover = function(){
				//进行样式切换
				that.iCurIndex = this.index;
				//给制定序列添加样式
				that.styleChange();
				that.run();
			}
		}else if(this.listSwitch === "click"){
			//添加移除样式的方法
			$("a",$(".swiperList",$(id))[0])[i].index  = i;
			$("a",$(".swiperList",$(id))[0])[i].onclick = function(){
				//进行样式切换
				that.iCurIndex = this.index;
				//给制定序列添加样式
				that.styleChange();
				that.run();
			}
		}
	
	}
	
	//延时函数获取dom，设置容器的高度和垂直运动时的top值
	setDom();
	if($(".swiperPrev",$(id)).length !== 0){
		//轮播按钮点击事件
		this.oPrev.onclick = function(e){
			if(!that.isMoving){
				that.iCurIndex--;
				//执行iCurIndex的改变
				if(that.loop){
					if(that.iCurIndex < -1){
						that.iCurIndex = that.oSwiperImg.length - 1;
					}
				}else{
					if(that.iCurIndex < 0){
						that.iCurIndex = that.oSwiperImg.length - 1;
					}
				}
				
				//执行运动函数
				that.run();
			}
		}
		this.oNext.onclick = function(e){
			if(!that.isMoving){
				that.iCurIndex++;
			
				//执行iCurIndex的改变
				if(that.loop){
					if(that.iCurIndex === that.oSwiperImg.length + 1){
						that.iCurIndex = 0;
					}
				}else{
					if(that.iCurIndex === that.oSwiperImg.length){
						that.iCurIndex = 0;
					}
				}
				//执行运动函数
				that.run();
			}
		}
	}
	
	//判断是否自动轮播
	if(this.autoPlay){
		this.autoRun();
	}
	
	//判断初始状态是否显示切换btn按钮
	if(this.switchBtn === "none"){	//让切换按钮不显示出来,这里要写在前面，因为字符串判断也为true
		this.hoverOut();
	}else if(this.switchBtn){
		this.hoverOn();
		//执行判断是否轮播和显示按钮的操作
		this.isStopRun();
	}else{
		this.hoverOut();
		//执行判断是否轮播和显示按钮的操作
		this.isStopRun();
	}
	
	//判断是否产生阴影
	if(this.shadow){
		this.oSwiper.className = "swiper shadow";
	}

	//封装延时函数获取Dom的方法
	function setDom(){
//		console.log($(id));
		//延时以获得dom里面的值
		setTimeout(function(){
			//查看用户有没有设置高度
			if(that.oSwiper.offsetHeight !== 0){
//				setAttr({"height" : that.oSwiper.offsetHeight + "px"},$(id));
			}else{
				//这里能用$(id)实际上就是用了闭包
			setAttr({"height" : $("img",$("a",$("li",$("ul",$(id))[0])[0])[0])[0].offsetHeight + "px"},$(id));
			//这里不知道为什么要设置两次才能使得获得在css中设置了百分比的图片的正确高度
			setAttr({"height" : getAttr("height", $("img",$("a",$("li",$("ul",$(id))[0])[0])[0])[0])},$(id));
			}
			
			
			//给垂直运动的轮播布局
			for(var i = 0,len = oArrImg.length;i < len;i++){
				
				if(that.vPlay && that.vDirection === "up" && that.moveMode === "move"){
					setAttr({"top" : i * $("img",$("a",$("li",$("ul",$(id))[0])[0])[0])[0].offsetHeight + "px"},$("li",($("ul",$(id)))[0])[i]);
					//无缝克隆写在所有元素创建完成之后
					//创建克隆以及排序
					if(that.loop){
						if(that.vPlay){			//垂直up克隆布局
						//创建克隆对象
							if(i === len -1){
							//这里插入的顺序千万不能出错!!!!!!!!!!!!!
							that.oFirstPic = $("li",$("ul",$(id))[0])[0].cloneNode(true);
							//插入克隆对象(只能在对应的i下面插入)
							$(".swiperUl",$(id))[0].appendChild(that.oFirstPic);
							
							that.oLastPic = $("li",$("ul",$(id))[0])[len-1].cloneNode(true);
							//插入克隆对象(只能在对应的i下面插入)
							$(".swiperUl",$(id))[0].insertBefore(that.oLastPic,$("li",$("ul",$(id))[0])[0]);
							
							//创建新属性保存新的图片长度
							var newImgLen = $("li",($("ul",$(id)))[0]).length;
							//给水平克隆布局
								setAttr({"top" : - $(id).offsetHeight + "px"},$("li",($("ul",$(id)))[0])[0]);
								setAttr({"top" : (newImgLen - 2) * $(id).offsetHeight + "px"},$("li",($("ul",$(id)))[0])[newImgLen - 1]);
							}
						}
					}
				}
				if(that.vPlay && that.vDirection === "down" && that.moveMode === "move"){
					setAttr({"top" : -i * $("img",$("a",$("li",$("ul",$(id))[0])[0])[0])[0].offsetHeight + "px"},$("li",($("ul",$(id)))[0])[i]);
					//无缝克隆写在所有元素创建完成之后
					//创建克隆以及排序
					if(that.loop){
						if(that.vPlay){			//垂直down克隆布局
						//创建克隆对象
							if(i === len -1){
							//这里插入的顺序千万不能出错!!!!!!!!!!!!!
							that.oFirstPic = $("li",$("ul",$(id))[0])[0].cloneNode(true);
							//插入克隆对象(只能在对应的i下面插入)
							$(".swiperUl",$(id))[0].appendChild(that.oFirstPic);
							
							that.oLastPic = $("li",$("ul",$(id))[0])[len-1].cloneNode(true);
							//插入克隆对象(只能在对应的i下面插入)
							$(".swiperUl",$(id))[0].insertBefore(that.oLastPic,$("li",$("ul",$(id))[0])[0]);
							
							//创建新属性保存新的图片长度
							var newImgLen = $("li",($("ul",$(id)))[0]).length;
							//给水平克隆布局
								setAttr({"top" : $(id).offsetHeight + "px"},$("li",($("ul",$(id)))[0])[0]);
								setAttr({"top" : - (newImgLen - 2) * $(id).offsetHeight + "px"},$("li",($("ul",$(id)))[0])[newImgLen - 1]);
							}
						}
					}
				}
			}
		},150);
	}
	
}
//样式改变函数
Swiper.prototype.styleChange = function(){
	
	for(var j = 0,len = this.oSwiperImg.length;j < len;j++){
		//清除所有样式
		$("a",$(".swiperList",this.oSwiper)[0])[j].className = "";
	}
	//给制定序列添加样式
	if(this.iCurIndex === this.oSwiperImg.length){
		$("a",$(".swiperList",this.oSwiper)[0])[0].className = "active";
	}else if(this.iCurIndex === -1){
		$("a",$(".swiperList",this.oSwiper)[0])[this.oSwiperImg.length - 1].className = "active";
	}else{
		$("a",$(".swiperList",this.oSwiper)[0])[this.iCurIndex].className = "active";
	}

	
	//清除特定运动模式的样式
	if(this.moveMode === "opacity"){
		//清除其他li的透明样式
		for(var i = 0,len = $("li",$("ul",this.oSwiper)[0]).length;i < len;i++){
			$("li",$("ul",this.oSwiper)[0])[i].className = "pacity-hidden opacity";
			setAttr({"opacity" : 0},$("li",$("ul",this.oSwiper)[0])[this.iCurIndex]);
		}
		$("li",$("ul",this.oSwiper)[0])[this.iCurIndex].className = "opacity";
	}
}
//鼠标移上操作
Swiper.prototype.hoverOn = function(){
	if($(".swiperPrev",this.oSwiper).length !== 0){
		setAttr({"display":"block"},$(".swiperPrev",this.oSwiper)[0]);
		setAttr({"display":"block"},$(".swiperNext",this.oSwiper)[0]);
	}
}

//鼠标移出操作
Swiper.prototype.hoverOut = function(){
	if($(".swiperPrev",this.oSwiper).length !== 0){
		setAttr({"display":"none"},$(".swiperPrev",this.oSwiper)[0]);
		setAttr({"display":"none"},$(".swiperNext",this.oSwiper)[0]);
	}
}

//鼠标移上停止轮播的方法
Swiper.prototype.isStopRun = function(){
	var that = this;
	this.oSwiper.onmouseover = function(){
		//鼠标移上停止轮播
		if(that.hoverStop && that.autoPlay && that.switchBtn === true){
			clearInterval(that.oTimer);
		}else if(that.hoverStop && that.autoPlay && that.switchBtn === false){
			clearInterval(that.oTimer);
			//显示按钮
			that.hoverOn();
		}else if(that.switchBtn === false){			//鼠标移上去显示按钮
			that.hoverOn();
		}
	}
	this.oSwiper.onmouseout = function(){
		//鼠标移开允许轮播
		if(that.hoverStop && that.autoPlay && that.switchBtn === true){
			that.autoRun();
		}else if(that.hoverStop && that.autoPlay && that.switchBtn === false){
			//关闭按钮
			that.hoverOut();
			that.autoRun();
		}else if(that.switchBtn === false){			//鼠标移上去消失按钮
			that.hoverOut();
		}
	}
}


//运动公用方法
Swiper.prototype.run = function(){
	var that = this;
	this.isMoving = true;
	//判断运动模式
	switch(this.moveMode){
		case "move" : 
			if(this.vPlay && this.vDirection === "up" && this.moveMode === "move"){
				this.moveTarget = {"top": - this.iCurIndex * this.oSwiper.offsetHeight};
			}else if(this.vPlay && this.vDirection === "down" && this.moveMode === "move"){
				this.moveTarget = {"top": this.iCurIndex * this.oSwiper.offsetHeight};
			}else{
				this.moveTarget = {"left" : - this.iCurIndex * this.oSwiper.offsetWidth};
			}
			
			//下面的left不要带PX
			//根据是否无缝轮播做出运动响应
			if(this.loop && this.iCurIndex === -1 && !this.vPlay){	//水平轮播左边临界
//				this.moveTarget = {"left" : 1 * this.oSwiper.offsetWidth};
				startMove(this.oUl,this.moveTarget,this.playWay,this.switchTime,function(){
					setAttr({"left" : - (that.oSwiperImg.length - 1) * that.oSwiper.offsetWidth + "px"},that.oUl);
					that.iCurIndex = that.oSwiperImg.length - 1;
					//运动完成标识
					that.isMoving = false;
				});
			}else if(this.loop && this.iCurIndex === this.oSwiperImg.length && !this.vPlay){	//水平轮播右边临界
				this.moveTarget = {"left" : - this.iCurIndex * this.oSwiper.offsetWidth};
				startMove(this.oUl,this.moveTarget,this.playWay,this.switchTime,function(){
					setAttr({"left" : 0},that.oUl);
					that.iCurIndex = 0;
					//运动完成标识
					that.isMoving = false;
				});
			}else if(this.loop && this.iCurIndex === -1 && this.vPlay && this.vDirection === "down"){	//垂直down运动
//				this.moveTarget = {"left" : 1 * this.oSwiper.offsetWidth};
				startMove(this.oUl,this.moveTarget,this.playWay,this.switchTime,function(){
					setAttr({"top" : (that.oSwiperImg.length - 1) * that.oSwiper.offsetHeight + "px"},that.oUl);
					that.iCurIndex = that.oSwiperImg.length - 1;
					//运动完成标识
					that.isMoving = false;
				});
			}else if(this.loop && this.iCurIndex === this.oSwiperImg.length && this.vPlay && this.vDirection === "down"){   //垂直down运动
				this.moveTarget = {"top" : this.iCurIndex * this.oSwiper.offsetHeight};
				startMove(this.oUl,this.moveTarget,this.playWay,this.switchTime,function(){
					setAttr({"top" : 0},that.oUl);
					that.iCurIndex = 0;
					//运动完成标识
					that.isMoving = false;
				});
			}else if(this.loop && this.iCurIndex === -1 && this.vPlay && this.vDirection === "up"){	//垂直up运动
				this.moveTarget = {"top" : this.oSwiper.offsetHeight};
				startMove(this.oUl,this.moveTarget,this.playWay,this.switchTime,function(){
					setAttr({"top" : -(that.oSwiperImg.length - 1) * that.oSwiper.offsetHeight + "px"},that.oUl);
					that.iCurIndex = that.oSwiperImg.length - 1;
					//运动完成标识
					that.isMoving = false;
				});
			}else if(this.loop && this.iCurIndex === this.oSwiperImg.length && this.vPlay && this.vDirection === "up"){   //垂直up运动
				this.moveTarget = {"top" : -this.iCurIndex * this.oSwiper.offsetHeight};
				startMove(this.oUl,this.moveTarget,this.playWay,this.switchTime,function(){
					setAttr({"top" : 0},that.oUl);
					that.iCurIndex = 0;
					//运动完成标识
					that.isMoving = false;
				});
			}else{
				startMove(this.oUl,this.moveTarget,this.playWay,this.switchTime);
				//运动完成标识
				that.isMoving = false;
			}
			break;
		case "opacity" : this.moveTarget = {"opacity" : 100};
				//运动完成标识
				that.isMoving = false;
			//设置运动
			for(var i = 0,len = that.oSwiperImg.length;i < len;i++){
					startMove($("li",$("ul",this.oSwiper)[0])[i],{"opacity":0},this.playWay,this.switchTime);
			}
			startMove($("li",$("ul",this.oSwiper)[0])[this.iCurIndex],this.moveTarget,this.playWay,this.switchTime);
	}
	//执行样式改变
	this.styleChange();
	
}

//自动轮播方法
Swiper.prototype.autoRun = function(){
	var that  = this;
	this.oTimer = setInterval(function(){
		that.iCurIndex++;
		//做判断便于区分无缝和有缝轮播
		if(that.loop){
			if(that.iCurIndex === that.oSwiperImg.length + 1){
				that.iCurIndex = 0;
			}
		}else{
			if(that.iCurIndex === that.oSwiperImg.length){
				that.iCurIndex = 0;
			}
		}
		//执行运动函数
		that.run();
	},that.playTime);

}














