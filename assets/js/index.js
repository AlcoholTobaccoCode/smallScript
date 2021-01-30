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
    'height': globalClient.y + 60, //* 幕布始终大于窗口大小
    'width': globalClient.x + 60, //* 幕布始终大于窗口大小
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
  $('.bg-dark').css({
    'top': -globalClient.x - 66
  });

  animeGather['section'] = {}; //* 创建主体存储变量
  animeGather['chooseFriend'] = {}; //* 创建伴友离场等帧节点
  animeGather['extend'] = {}; //* 额外拓展节点

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
    // animeTimeline.play();
    //* 禁用按钮
    $('.icon-choose-btn').attr('disabled', 'disabled');
    //* 隐藏按钮
    anime({
      targets: 'icon-choose-btn',
      opacity: 0,
      // duration: 1000,
      complete() {
        $('.icon-choose-btn').hide()
      }
    });

    //* 已选伴友
    // $(this).parents('.icon-block').addClass('icon-block-chick').removeClass('icon-block');
    //* 开始[伴友离场]
    friendLeave();

    setTimeout(() => {
      //* 重新渲染已选伴友动画
      loadIconChooser();
    },2100);
  });
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
