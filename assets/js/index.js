/*
 * @description: index 页面支持
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021年1月27日19:39:24
 * @FilePath: assets/js/index.js
 */

var globalClient = {}, //* 全局窗口尺寸存储
  animeGather = {}, //* 动画对象集合
  animeTimelineGather = {}, //* 时间线集合
  animeTimeline = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 2000
  }), //* 创建动画时间轴
  animeTimelines = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 2000
  }), //* 创建动画时间轴
  // remDynamic = {},
  jumpRabbitKeyframes = {
    translateY: [{
        value: 10,
        duration: 50,
        delay: 100
      },
      {
        value: -50,
        duration: 150,
        delay: 100
      },
      {
        value: 0,
        duration: 100,
        delay: 100
      },
      {
        value: 0,
        duration: 100,
        delay: 1200
      }
    ]
  },
  varTem; //* 临时占位变量

$(function () {

  //* 初始化公共变量
  initCommonVariate();

  //* 初始化 anime 动画对象
  initAnime();

  //* 开始播放
  animePlay();

  //* 渲染选择动物
  loadIconChooser();

  //* 加载页面点击事件
  pageEventsInAnime();
});

/**
 * 初始化公共变量
 */
function initCommonVariate() {

  globalClient['x'] = $('body').width();
  globalClient['y'] = $('body').height();


  /* remDynamic = {
    w: (parseFloat($('html').css('font-size')) / 100),
    h: (parseFloat($('html').css('font-size')) / 100),
  } */

  //* 各部分盒子高度始终等于窗口高度
  $('section').css({
    'height': globalClient.y,
    // 'left': -globalClient.x
  });
  //* 选择伴友主体
  $('.icon-choose-body').css({
    'top': (globalClient.x / 6),
    'width': globalClient.x,
  });
  //* 已选伴友
  /* $('.follow-friend').css({
    'left': -globalClient.x,
  }); */
  
  //* 背景变化
  $('.bg').css({
    'height': (globalClient.y / 100 + 10) + 'rem', //* 幕布始终大于窗口大小
    'width': (globalClient.x / 100) + 'rem', //* 幕布始终大于窗口大小
  });

  //* 奋斗者主体
  $('.struggle').css({
    'top': '.5rem',
    left: globalClient.x / 100 / 2 -2.5 + 'rem',
    // top: '1rem',
  });

}

/**
 * 初始化 anime 动画对象
 */
function initAnime() {

  //* 创建时间轴
  /* animeTimeline = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 2000
  }); */

  //* 开始时拉起幕布
  /* $('.bg-dark').css({
    'top': -(globalClient.y / 100 + 3) + 'rem'
  }); */

  animeGather['section'] = {}; //* 创建主体存储变量
  animeGather['chooseFriend'] = {}; //* 创建伴友离场等帧节点
  animeGather['extend'] = {}; //* 额外拓展节点
  animeGather['overtime'] = {}; //* 加班第二部分开始启动

  //* 日落时分
  activeSunAndMoon('sunset');

  /*//? S part_0
   ****************************************/
  // animePart_0();
  /*//? S part_1
   ****************************************/
}

/**
 * 动画播放顺序控制
 * @param {string} part_0 部分、节点
 * @param {string} period 周期
 */
function animePlay(part, period) {
  if (!part || !period) {
    animeTimelineControl().part_0.chooseBefore(); //* 进入系统默认播放第一部分前奏
  } else {
    animeTimelineControl()[part][period]();
  }
}

/**
 * 时间线播放
 */
function animeTimelineControl() {
  const timeLine = {
    part_0: animePart_0(),
  }

  return timeLine;
}

/**
 * 加载页面点击事件
 */
function pageEventsInAnime() {

  //* 点击水波纹效果
  $(document).on('click', '.ani-ripple', function (e) {
    var target = $(this)[0];
    $(target).css({
      'overflow': 'hidden',
      'position': 'relative'
    });
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector('.ripple');
    if (!ripple) {
      ripple =
        document.createElement('span');
      ripple.className = 'ripple'
      ripple.style.height = ripple.style.width = Math.max(rect.width,
        rect.height) + 'px'
      target.appendChild(ripple);
    }
    ripple.classList.remove('show');
    var top = e.pageY - rect.top -
      ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + 'px'
    ripple.style.left = left + 'px'
    ripple.classList.add('show');
    return false;
  });

  //*选择伴友
  $(document).on('click', '.icon-choose-btn', function() {
    //* 存储伴友
    $('.follow-friend').html($(this).parents('.icon-block').prop('outerHTML'));
    //* 开始播放动画
    //* 禁用按钮
    $('.icon-choose-btn').attr('disabled', 'disabled');
    //* 隐藏按钮
    anime({
      targets: 'icon-choose-btn',
      opacity: 0,
      complete() {
        $('.icon-choose-btn').hide()
      }
    });

    //* 开始[伴友离场]
    friendLeave();
    setTimeout(() => {
      //* 重新渲染已选伴友动画
      loadIconChooser();
      //* 日出
      activeSunAndMoon('sunrise');
    },2100);
  });
}


/**
 * 日出日落
 * @param {string} action sunrise/sunset 
 */
function activeSunAndMoon(action) {
  let common = {
      duration: 2000,
      easing: 'easeInOutQuad',
    },
    up = function (name, position) {
      return {
        targets: name,
        top: '.2rem',
        ...position,
        ...common,
        opacity: 1,
      }
    },
    down = function (name, position) {
      return {
        targets: name,
        top: '20rem',
        ...position,
        ...common,
        opacity: 0,
      }
    };

  //* 太阳自身旋转
  anime({
    targets: ['.extend-sun-body', '.extend-moon-body'],
    rotate: {
      value: '+=2turn',
      duration: 3600,
      easing: 'easeInOutQuad'
    },
  });

  switch (action) {
    case 'sunrise': //* 日出
      //* 太阳进入时的独特动画
      //* 太阳升起
      anime({
        ...up('.extend-sun', {
          right: '.5rem'
        }),
        complete() {
          //* 出现太阳五官
          anime({
            targets: ['.sun-cheek-red', '.extend-sun-mouth', '.extend-sun-eye'],
            opacity: 1,
            duration: 1000
          });
        }
      });
      //* 月亮下落
      anime({
        ...down('.extend-moon', {
          left: '0'
        }),
        complete() {
          //* 出现月亮 zzz
          anime({
            targets: ['.extend-moon-zzz'],
            opacity: 0,
            duration: 1000,
            complete() {
              animeGather.extend['moonUp'].pause();//* 暂停月亮动画
            }
          });
        }
      });
      //* 改变背景色
      //* 黑色幕布上隐
      anime({
        targets: '.bg-dark',
        top: -(globalClient.y / 100 * 3), // * 3 是因为本身已经处于 -globalClient.y 位置
        ...common,
        duration: 2600,
        opacity: 0
      });
      //* 白色幕布上浮
      anime({
        targets: '.bg-light',
        top: -(globalClient.y / 100 + 3) + 'rem', //* -30 防止留白
        ...common,
        opacity: 1
      });
      break;
    case 'sunset': //* 日落
      //* 太阳落下
      anime({
        ...down('.extend-sun', {
          right: '0'
        }),
        complete() {
          //* 隐藏五官
          animeGather['extend']['sun'] = anime({
            targets: ['.sun-cheek-red', '.extend-sun-mouth', '.extend-sun-eye'],
            opacity: 0,
            duration: 1000,
          });
        }
      });
      //* 月亮升起
      anime({
        ...up('.extend-moon', {
          left: '.5rem'
        }),
        complete() {
          //* 出现月亮 zzz
          if (!animeGather.extend['moonUp']) {
            animeGather.extend['moonUp'] = anime({
              targets: ['.extend-moon-zzz'],
              opacity: 1,
              delay: 1500,
              duration: 1000,
              complete() {
                anime({
                  targets: ['.extend-moon-zzz'],
                  loop: true,
                  opacity: 0,
                  scale: 1.5,
                  duration: 2000,
                  easing: 'easeInOutSine',
                });
              }
            });
          } else {
            animeGather.extend['moonUp'].play();//* 暂停月亮动画
          }

        }
      });
      //* 改变背景色
      //* 黑色幕布上升至视野
      anime({
        targets: '.bg-dark',
        top: -((globalClient.x / 100) + 20) + 'rem',
        duration: 2000,
        easing: 'easeInOutQuad',
        opacity: 1
      });
      //* 白色幕布下沉
      anime({
        targets: '.bg-light',
        top: 0,
        duration: 2600,
        easing: 'easeInOutQuad',
        opacity: 0
      });
      break;
    default:
      break;
  }
}


/**
 * 窗口尺寸改变时
 * 
 * windowResizeTimerInAnime 防抖变量
 */
let windowResizeTimerInAnime = null;
$(window).resize(function () {
  if (windowResizeTimerInAnime) {
    clearTimeout(windowResizeTimerInAnime);
  }
  windowResizeTimerInAnime = setTimeout(() => {
    initCommonVariate();
  }, 100);
});
