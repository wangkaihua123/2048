var locations;
var keys=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f",];
var t;
var score;
var max;
var time;//计时
var color=[ "#FFF", "PINK", "GRAY", "#ABCDEF", "#0FF0FF", "#FF0", "#CDF0AB",
		"#FEDCBA", "#F0F", "#BBBBBB", "#00F", "#00FF00" ];
		// 思路：初始化然后判断是否结束然后写上下左右按键的反应，再写画布
function init(){
  t = setInterval(showtime,1000);
	score=0;
	max=0;
	time=0;
	locations=[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	locations[randomPlace()]=randomNum();
  locations[randomPlace()]=randomNum();
  paint();
	//还需要出现两个随机数
	window.onkeydown=function(e){
  	var keyCode;
		if (!e)
			e = window.event;
        if (document.all) {
        	keyCode=e.keyCode;
        }
        else{
        	keyCode=e.which;
        }
        if (keyCode==37||keyCode==65) {
        	$("#keys").text("←");
            toLeft();
            isEnd(); 
        }
         if (keyCode==38||keyCode==87) {
        	$("#keys").text("↑");
            toUp();
            isEnd();
        }
            if (keyCode==39||keyCode==68) {
        	$("#keys").text("→");
        	toRight();
            isEnd();
        }
            if (keyCode==40||keyCode==83) {
        	$("#keys").text("↓");
        	toDown();
            isEnd();
            
        }
	}
}

function isEnd(){
       var f=false;

       if (locations.indexOf(0) == -1) 
       {
       	if (confirmX()&&confirmY())
       	{
          clearInterval(t);
       		if(window.confirm("您的总分是"+score+"分\n您的最大分值是"+max+"分\n您的用时时间是"+time+"秒\n您需要作弊吗？"))
       		{
       			
             if(window.confirm("作弊的规则是可以将任意两个数字对调，但是要去除30%的总分数，您确认作弊吗？")) 
            {
              $(".cheat").show().animate({"left":"60%"},500);
          
            }
             else{alert("请点击开始键重新开始")};
       		}
       		else if(window.confirm("您确定要重新开始吗?")){
            init();   			
       		}
          else{window.close();}
       	}
       	else{
       		$("#danger").text("小心啊，继续加油");
       	}
    }
    else{
      $("#danger").text("");
    }
    return f;
}

function confirmX() {
	// 判断横向的数组

	var f = false;
	var w = new Array();
	for (var j = 0; j < 4; j++) {
		for (var i = 0; i < 4; i++) {
			w[i] = locations[4 * j + i];
		}
		// alert(w);
		f = (w[0] != w[1] && w[1] != w[2] && w[2] != w[3]);// 如果为真,表示相邻的两个数不相等
		if (!f) {
			break;
		}
	}
	return f;
}

function confirmY(){
	var f=false;
	var m=new Array();
    for(var z=0;z<4;z++)
    {
    	for(var i=0;i<4;i++){
            m[i] = locations [4*i+z];
    	}
    	f =( m[0] !=m [1] && m[1] != m[2] && m[2] != m[3] );
    	if (!f) {
    		break;
    	}

    }
    return f;
}
// 按键上下左右
function toLeft(){

	for(var i=0;i<4;i++){

     var row=[ locations[4*i], locations[4*i+1], locations[4*i+2], locations[4*i+3] ];
         toArrayWay(row);
              for(var z=0;z<4;z++){
        	locations[z+4*i]=row[z];
        }
	}
	
	locations[randomPlace()]=randomNum();
    paint();
}


function toRight(){
	for(var i=0;i<4;i++){
     var row=[locations[4*i+3],locations[4*i+2],locations[4*i+1],locations[4*i]];
     // alert(i+"\n"+row);
       toArrayWay(row);
        for(var z=0;z<4;z++){
        	locations[3-z+4*i]=row[z];
        }
	}
	locations[randomPlace()]=randomNum();
    paint();
}
function toUp(){
	for(var i=0;i<4;i++){
     var row=[locations[i],locations[4+i],locations[8+i],locations[12+i]];
         toArrayWay(row);
              for(var z=0;z<4;z++){
        	locations[4*z+i]=row[z];
        }
	}
	
	locations[randomPlace()]=randomNum();
    paint();
}
function toDown(){
	for(var i=0;i<4;i++){
     var row=[locations[12+i],locations[8+i],locations[4+i],locations[i]];
         toArrayWay(row);
              for(var z=0;z<4;z++){
        	locations[12-4*z+i]=row[z];
        }
	}
	
	locations[randomPlace()]=randomNum();
    paint();
}
// function toLeftWay(i,r)
// {
// 	doArrayWay(r);


// 	for(var z=0;z<4;z++){
          
// 	}


// }
// 上下左右按键时的方法
function isZero(m) {
  return m[0] == 0 && m[1] == 0 && m[2] == 0 && m[3] == 0;
}
function toArrayWay(r) {
  if (!isZero(r)) {
    // 把数组中是0往后移动
    for (var m = 0; m < 4; m++) {
      for (var n = 0; n < 3; n++) {
        if (r[n] == 0) {
          r[n] = r[n + 1];
          r[n + 1] = 0;
        }   
      }        
    }        
  }                    
for(var i=0;i<3;i++){

	if (r[i] == r[i+1]) {
       var k=i;
	    r[k] +=r[k+1];
	    score +=r[k];
	    while(++k<3) 
	    {
	    r[k]=r[k+1];
	    }
	    r[3]=0;
 		}
	}
    return r;
}
// function isZero(m) {
//   return m[0] == 0 && m[1] == 0 && m[2] == 0 && m[3] == 0;
// }
// function toArrayWay(r) {
//   if (!isZero(r)) {
//     // 把数组中是0往后移动
//     for (var m = 0; m < 4; m++) {
//       for (var n = 0; n < 3; n++) {
//         if (r[n] == 0) {
//           r[n] = r[n + 1];
//           r[n + 1] = 0;
//         }   
//       }        
//     }        
//   }             
         
//   for (var m = 0; m < 3; m++) {  
//     if (r[m] == r[m + 1]) {  
//       var k = m;
//       r[k] += r[k + 1];
//       score += r[k];
//             // r[k + 1]=0;
//       while (++k < 3) {  
//         r[k] = r[k + 1];   
//       }                  
//       r[3] = 0;     
//     }       
//   }          
//   return r;     
// }        
// 写画布
function paint() {
  for (var i = 0; i < 16; i++) {
    $("#box" + keys[i]).text((locations[i] == 0) ? "" : locations[i]);
    
    var index = (locations[i] == 0) ? 0
        : (locations[i].toString(2).length - 1);
    $("#box" + keys[i]).css("background", color[index]);
    // 选出最大数
    if (locations[i] > max) {
      max = locations[i];
    }
  }

  $("#score").text("总分为 : " + score);
  $("#max").text("当前最大数 : " + max);
}

// 随机生成两个数
function randomNum(){
	var Num=Math.random();
	(Num<0.8)?Num=2:Num=4;
	return Num;
}

// 16个随机位置
function randomPlace(){
	var Place=Math.floor(Math.random()*16);
	while (locations[Place]!=0) {
		var Place=Math.floor(Math.random()*16);
	}
	return Place;
}
// 时间
function showtime() {
	$("#time").text("当前用时 :" + (++time) + " s。");
}


// 作弊器
  var clickNum=0; //点击替换按钮的次数
  var clickArr=["0","0"];//将按钮的ID存到数组中
  var cheattimes=0;
$(function (){
  
  var boxNum=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
  // var confchange=$("#confchange");
  var cheatbtn=$(".cheat ul li input");

  cheatbtn.click(function()
  {
         var boxId=this.id;
         var boxIds=boxId.substr((boxId.length-1),boxId.length);
      // alert(typeof(boxIds));
         clickArr[clickNum]=boxIds;
         clickNum++;
         $("#cbox"+boxIds).addClass("btnclass");
   
         // $(".cheat ul li input").css("background-color","PINK");
   });
});

function conchange(){
  // window.confirm();
  if(cheattimes>2)
  {
    alert("非常抱歉，您的作弊次数超过三次");
    if (window.confirm("是否重新开始呢？")) {
      init();
    }
    else{
      window.close();
    }
   
  }
        if (clickNum!=2) {
          alert("只能进行两个数字之间的调换哦");
          if (window.confirm("是否重新选择？选否的话只能重新开始游戏了哦！")) 
          {         
                 $(".cheat ul li input").removeClass("btnclass");
                 clickArr=[0,0];
                 clickNum=0;               
          }
          else{
            init();
            $(".cheat").hide();
          }
         }
    else
    {
        var n=clickArr[0];
        var x=clickArr[1];
        n=parseInt(n,16);
        x=parseInt(x,16);
        var h=n-x;
        if (Math.abs(h)==1||Math.abs(h)==4) {
        var m= 0;
        m=locations[n];
        locations[n]=locations[x];
        locations[x]=m;
        score=Math.floor(score*0.7)
        paint();
        cheattimes++;
        // $("#score").text("总分为："+score);
        alert("替换成功，请继续游戏哦！作弊有害健康，每局游戏最多作弊三次哦！\n您已经作弊"+cheattimes+"次了！")
        $(".cheat").hide();
        clickArr=[0,0];
        clickNum=0;  
        $(".cheat ul li input").removeClass("btnclass");
      }
      else{
        alert("您所选的数字不是相邻的数字！即将重新选择！");
        clickArr=[0,0];
        clickNum=0;  
        $(".cheat ul li input").removeClass("btnclass");
      }
    }
}