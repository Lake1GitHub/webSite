var debounce = function(idle, action){
    var last;
    return function(){
        var self = this , args = arguments;
        clearTimeout(last);
        last = setTimeout(function(){
            action.apply(self,args);
        },idle);
    }
};
var throttle = function(delay, action){
    var last = 0;
    return function(){
        var curr = +new Date();
        if (curr - last > delay){
            action.apply(this.arguments);
            last = curr;
        }
    }
}
tagNav = function(){
    //tagNav.init(tag);
    var element;
    var isInit=false;
    var self = this;
    this.init = function( ele ){
        if( typeof ele === 'string'){
            ele = document.getElementsByTagName(ele);
            self.element = ele;
        }
        else return;
        self.width = ele[0].style.width;
        self.height = ele[0].style.height;
        self.navNode = ele[0].children;
        for( var i=0; i<self.navNode.length;i++ ){
            self.navNode[i].style.cursor = 'pointer';
            self.navNode[i].addEventListener('mouseenter',function(){
                this.style.backgroundColor = 'white';
                this.children[0].style.color = 'black';
            });
            self.navNode[i].addEventListener('mouseleave',function(){
                this.style.backgroundColor = 'black';
                this.children[0].style.color = 'white';
            });
        }
        self.isInit = true;
    };
    this.append = function(){
        var toTop = document.documentElement.scrollTop || document.body.scrollTop ;
        if(toTop<500){
            self.element[0].style.position = 'position';
            self.element[0].style.width = '100%';
            self.element[0].style.borderRadius = '0';
        }
        else{
            self.element[0].style.position = 'fixed';
            self.element[0].style.width = '70%';
            self.element[0].style.left = '0';
            self.element[0].style.right = '0';
            self.element[0].style.borderRadius = '15px';
            self.element[0].style.margin = '0 auto';//兼容
        }
        var action = function(){
            var toTop = document.documentElement.scrollTop || document.body.scrollTop ;
            if(toTop<500){
                self.element[0].style.position = 'relative';
                self.element[0].style.width = '100%';
                self.element[0].style.borderRadius = '0';
            }
            else{
                self.element[0].style.position = 'fixed';
                self.element[0].style.width = '70%';
                self.element[0].style.left = '0';
                self.element[0].style.right = '0';
                self.element[0].style.borderRadius = '15px';
                self.element[0].style.margin = '0 auto';//兼容
            }
        };
        window.addEventListener('scroll',throttle(10,action));
    }
};
/*tagAcss3 = function(){
    this.toUp = function(ele){
        if( typeof ele === 'string' )
            ele = document.getElementById(ele);
        else return;
        ele.addEventListener('click',function(){
            ele.style.webKitTransition = 'transform 2s';
            ele.style.webKitTransform = 'translateY(0)';
            console.log(ele.style);
        });
    }
}*/
tagA = function(){
    //tagA.toUp(id);
    this.toUp = function(ele,v1,v2){
        var timeToUp = v1||40;//滚动到页面顶部的速度 默认60 数值越大越快
        var speedRoll = v2||3; //标签收起或展开的速度 默认3  数值越大越快
        var isuse = false;  //信号量
        var toTop = document.documentElement.scrollTop || document.body.scrollTop ;
        if( typeof ele === 'string')
            ele = document.getElementById(ele);
        else return;
        /**
         * 点击滚动到顶部事件
         */
        ele.addEventListener('click',function(){
            var set = setInterval(function(){
                toTop = document.documentElement.scrollTop || document.body.scrollTop ;//这里由于toTop是动态的，所以要重新赋值
                if(toTop==0)
                    clearInterval(set);
                document.documentElement.scrollTop = toTop-20;
                document.body.scrollTop = toTop-20;
            },timeToUp);
        });
        /**
         * 监听scroll事件，这里采用了函数放抖
         */
        var action = function(){
            //window.screen.height 设备的高度
            //window.innerHeight   页面可以看见的高度
            toTop = document.documentElement.scrollTop || document.body.scrollTop ;
            if(toTop < 150){//当距离顶端小于150px，顶部条回收
                if(isuse===true) //如果资源已经被占用，则直接回退
                    return;
                else{
                    var rollDown = ele.parentNode.parentNode;//这里对html结构有要求
                    var currentTop = rollDown.style.top;
                    if(currentTop.replace('px', '') >= 150)//如果已经回收直接返回
                        return;
                    var set = setInterval(function(){
                        var currentTop = window.getComputedStyle(rollDown, null)['top'];
                        if(currentTop.replace('px', '') >= 150){
                            clearInterval(set);
                            isuse = false;
                        }
                        else{
                            rollDown.style.top = parseInt(currentTop.replace('px', ''), 10) + speedRoll + 'px';
                            isuse = true;
                        }
                    }, 10);
                }
            }
            else{
                if(isuse===true)
                    return;
                else{
                    var rollDown = ele.parentNode.parentNode;
                    var currentTop = rollDown.style.top;
                    if(currentTop.replace('px', '') <= 0)
                        return;
                    var set = setInterval(function(){
                        var currentTop = window.getComputedStyle(rollDown, null)['top'];
                        console.log(currentTop);
                        if(currentTop.replace('px', '') + 150 <= 0){
                            clearInterval(set);
                            isuse = false;
                        }
                        else{
                            rollDown.style.top = parseInt(currentTop.replace('px', ''), 10) - speedRoll + 'px';
                            isuse = true;
                        }
                    }, 10);
                }
            }
        }
        window.addEventListener('scroll',throttle(5,action));
    }
};
lazyL = function(){
    var self = this;
    this.lazyLoad = function( ele ){
        if( typeof ele === 'string'){
            ele = document.getElementsByClassName(ele);
            self.element = ele;
        }
        var action = function(){
            var i;
            for( i=0;i<self.element.length;i++ ){
                if(self.element[i].getBoundingClientRect().top <= window.screen.height+150){
                    var attr = self.element[i].getAttribute('data-src');
                    self.element[i].setAttribute('src', attr);
                }
            }
        };
        window.addEventListener('scroll',throttle(10,action));
    }
};
InitSpecial = function(){
    this.Init = function(ele){
        var finish = false;
        var element = document.getElementsByClassName(ele);
        for( var i=0;i<element.length;i++ ){
            element[i].style.webkitTransition = 'padding-top 1s ease,opacity 2s ease';
            element[i].style.mozTransition = 'padding-top 1s ease,opacity 2s ease';
            element[i].style.oTransition = 'padding-top 1s ease,opacity 2s ease';
            element[i].style.transition = 'padding-top 1s ease,opacity 2s ease';
            element[i].style.opacity = 1;
            element[i].style.paddingTop = '50px';
        }
        finish = true;
        return finish;
    }

};
function shake(e,oncomplete,distance,time){
    if(typeof e==='string') e=document.getElementById(e);
    if(!time) time=500;
    if(!distance) distance=5;

    var originalStyle = e.style.cssText;
    e.style.position = 'relative';
    var start = (new Date()).getTime();
    animate();
    function animate(){
        var now = (new Date()).getTime();
        var elapsed = now-start;
        var fraction = elapsed/time;
        if( fraction<1 ){
            var x = distance*Math.sin(fraction*4*Math.PI);
            e.style.left = x+'px';
            setTimeout(animate,Math.min(25,time-elapsed));
        }
        else{
            e.style.cssText = originalStyle;
            if(oncomplete) oncomplete(e);
        }
    }
}
window.onload = (function(){
    document.documentElement.scrollTop=0;
    document.body.scrollTop =0;
    var Nav = new tagNav;
    Nav.init('nav');
    Nav.append();
    var a = new tagA;
    a.toUp('itemOne',2,3);
    var lazy = new lazyL;
    lazy.lazyLoad('lazy-pic');
    shake('shake');
    var header = document.getElementsByTagName('header')[0];
    header.style.backgroundColor = 'red';
    var special = new InitSpecial();

    var promise = new Promise(function(resolve,reject){
        special.Init('div');
        resolve();
    });
    promise.then(function(){
        setTimeout(special.Init('div2'),1000);
//        special.Init('div2');
    },function(){
    }).then(function(){
        setTimeout(special.Init('div3'),1000);
        //special.Init('div3');
    },function(){
        console.log('error3')
    })

    document.getElementsByTagName('input')[0].addEventListener('keyup',function(){
        document.getElementsByTagName('input')[1].value = this.value.replace(/(\d{4}\B)/g,'$1-');//将\d{4}\B匹配的字符A 替换为 A-
    });
});
