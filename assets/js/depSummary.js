/**
 * @description 部门年总结
 * @author duqins@foxmail.com
 * @date 2021年1月28日10:12:44
 */

var globalClient = {}, //* 全局窗口尺寸存储
  animeGather = {}, //* 动画对象集合
  animeTimeline = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 2000
  }), //* 创建动画时间轴
  echartsGather = {}, // *甘特图集合
  varTem; //* 临时占位变量

$(function () {

  //* 初始化公共变量
  initCommonVariate();

  //* 初始化动画
  initAnime();

  //* 创建 echarts 实例
  createInstance();

  //* 加载页面点击事件
  pageEventsInDepSum()
});

/**
 * 初始化公共变量
 */
function initCommonVariate() {
  globalClient['x'] = $('body').width();
  globalClient['y'] = $('body').height();

  /* let positionStyle = `<style>
    .positionXLeft {
      left: -${globalClient.x / 2}px;
    }
    
    .positionXRight {
      left: ${globalClient.x + globalClient.x / 2}px;
    }
  </style>`;
  $('body').append(positionStyle); */

  //* 各部分盒子高度始终等于窗口高度
  $('section').css({
    'height': globalClient.y,
  });

  //* 篝火
  $('.part_extend_fire').css({
    'width': globalClient.x,
    'height': globalClient.y,
  });

  /* //* 表格统一样式
  $('.table-content').css({
    'max-height': globalClient.y - 200,
    'min-height': globalClient.y - 200,
  }); */

  //* 表格统一样式
  /* $('.echarts-section').css({
    "width": globalClient.x * 0.8,
    "height": globalClient.y * 0.78,
  }); */

  //* 轮播图主体
  $('.holderCircle').css({
    "width": globalClient.x/*  * 0.8 */,
    "height": globalClient.y * 0.78,
  });

  //* 轮播图子项
  $('.contentCircle').css({
    "width": globalClient.x * 0.9,
    "height": globalClient.y * 0.78,
  });

  //* 表格统一样式
  /* $('.echarts-tools').css({
    // "width": globalClient.x * 0.8,
    "height": globalClient.y * 0.8,
  }); */


  //* echarts 图表尺寸适应
  for (let i in echartsGather) {
    if (echartsGather[i] && typeof echartsGather[i] === 'object') {
      echartsGather[i].resize();
    }
  }

}

/**
 * 加载页面点击事件
 */
function pageEventsInDepSum() {
  
  //* 左右切换 echarts 按钮事件
  $(document).on('click', '.iconfont', function() {debugger
    if ($(this).hasClass('iconLeft')) {
      $('.echarts-section-this').removeClass('zIndex2').removeClass('echarts-section-this').addClass('zIndex1').css({
        left: -(globalClient.x / 2)
      }).siblings().addClass('zIndex1').removeClass('zIndex2').next().addClass('zIndex2').removeClass('zIndex1').css({
        left: globalClient.x * .8
      });
      /* anime({
        targets: '.echarts-section-this',
        zIndex: 1,
        duration: 1500,
        translateX: -(globalClient.x / 2)
      });

      anime({
        targets: $('.echarts-section-this').next(),
        zIndex: 2,
        duration: 1500,
        translateX: globalClient.x * .8
      }); */

    } else if ($(this).hasClass('iconRight')) {

    }
  });
}

/**
 * 初始化动画
 */
function initAnime() {
  //! 初始化动画对象集合章节(部分)
  //* 各部分主体
  animeGather['section'] = {};

  //* 拓展部分
  animeGather['extend'] = {};

  /* S 篝火
   ***********************************/
  animeGather.extend['fire'] = {}

  //* a. 初始化烧火棍
  animeGather.extend['fire']['cf_log_container'] = {
    targets: '.cf-log-container',
    opacity: 1,
    duration: 1000,
  }

  //* b.0 火焰由内向外层次加载
  animeGather.extend['fire']['base_fire'] = {
    targets: '#base-fire',
    opacity: 1,
    duration: 1000,
  }

  //* 让火动起来
  animeGather.extend['fire']['base_fire_dynamic'] = {
    targets: '#base-fire .cf-flame',
    delay: anime.stagger(300),
    translateY: function () {
      return anime.random(0, -10);
    },
    keyframes: [{
        scale: .8
      },
      {
        scale: .825
      },
      {
        scale: .9
      },
      {
        scale: .925
      },
      {
        scale: 1
      }
    ],
    duration: 300,
    easing: 'easeInOutSine',
    loop: true,
  }

  //* b.1 火焰由内向外层次加载
  animeGather.extend['fire']['fireNodes1'] = {
    targets: '#fireNodes1',
    opacity: 1,
    duration: 1000,
  }

  //* 让火动起来
  animeGather.extend['fire']['fireNodes1_dynamic'] = {
    targets: '#fireNodes1 .cf-flame',
    delay: anime.stagger(100),
    translateY: function () {
      return anime.random(0, 300);
    },
    rotate: 30,
    opacity: function () {
      return anime.random(.5, 1);
    },
    translateX: function () {
      return anime.random(0, -60);
    },
    scale: 0,
    skew: function () {
      return anime.random(0, 10);
    },
    loop: true,
    easing: "easeInOutSine",
  }

  //* b.2 火焰由内向外层次加载
  animeGather.extend['fire']['fireNodes2'] = {
    targets: '#fireNodes2',
    opacity: 1,
    duration: 1000,
  }

  //* 让火动起来
  animeGather.extend['fire']['fireNodes2_dynamic'] = {
    targets: '#fireNodes2 .cf-flame',
    delay: anime.stagger(400),
    translateX: function () {
      return anime.random(-30, 0);
    },
    translateY: function () {
      return anime.random(0, -260);
    },
    translateY: function () {
      return anime.random(-260, -160);
    },
    translateX: function () {
      return anime.random(0, -30);
    },
    scale: 0,
    rotate: function () {
      return anime.random(0, 60);
    },
    skew: function () {
      return anime.random(0, 30);
    },
    loop: true,
    easing: "easeInOutSine"
  }

  //* 让火动起来
  animeGather.extend['fire']['fireNodes3_dynamic'] = {
    targets: '#fireNodes1 .cf-flame',
    delay: anime.stagger(400),
    translateX: function () {
      return anime.random(-30, 0);
    },
    translateY: function () {
      return anime.random(0, -260);
    },
    translateY: function () {
      return anime.random(-260, -160);
    },
    translateX: function () {
      return anime.random(0, -30);
    },
    scale: 0,
    rotate: function () {
      return anime.random(0, 60);
    },
    skew: function () {
      return anime.random(0, 30);
    },
    loop: true,
    easing: "easeInOutSine"
  }

  //* 让火动起来
  anime(animeGather.extend['fire']['base_fire_dynamic'])
  anime(animeGather.extend['fire']['fireNodes1_dynamic'])
  anime(animeGather.extend['fire']['fireNodes2_dynamic'])
  anime(animeGather.extend['fire']['fireNodes3_dynamic'])

  /* E 篝火
   ***********************************/

  /* S 时间
   ***********************************/
  animeGather.section['section_part_0'] = {};

  animeGather.section['section_part_0']['time'] = {};

  //* 2020 出现
  animeGather.section['section_part_0']['time']['old_year_in'] = {
    targets: '.part_0 .old-year',
    innerHTML: [0, 2020],
    round: 1,
    duration: 2500,
    opacity: 1
  }

  //* 分隔符 出现
  animeGather.section['section_part_0']['time']['segmentation_in'] = {
    targets: '.part_0 .segmentation',
    opacity: 1
  }

  //* 2021 出现
  animeGather.section['section_part_0']['time']['new_year_in'] = {
    targets: '.part_0 .new-year',
    innerHTML: [0, 2021],
    round: 1,
    duration: 2500,
    opacity: 1
  }

  /* E 时间
   ***********************************/

  /* S 时间上移、篝火下移
   ***********************************/
  //* 时间上移
  animeGather.section['section_part_0']['time']['body_out'] = {
    targets: '.part_0',
    duration: 1000,
    margin: '-1.2rem 0 0'
  }

  //* 篝火消失
  animeGather.extend['fire']['part_extend_fire_out'] = {
    targets: '.part_extend_fire',
    duration: 1000,
    opacity: 0
  }
  //* 篝火移出视窗
  animeGather.extend['fire']['part_extend_fire_out_tx'] = {
    targets: '.part_extend_fire',
    duration: 200,
    translateX: -globalClient.x
  }

  /* E 时间上移、篝火下移
   ***********************************/

  /* S 第二部分 - 总结 echarts 准备
   ***********************************/
  animeGather.section['section_part_1'] = {};

  //* 黑色背景消失
  animeGather.section['section_part_1']['body_out'] = {
    targets: '.black-bg',
    duration: 1000,
    opacity: 0,
  }

  //* 黑色背景移出视窗
  animeGather.section['section_part_1']['body_out_tx'] = {
    targets: '.black-bg',
    duration: 1000,
    translateX: -globalClient.x
  }

  /* E 第二部分 - 总结 echarts 准备
   ***********************************/

  /* S 第二部分 - 显示 echarts
   ***********************************/
  animeGather.section['section_part_2'] = {};

  //* echarts 展示
  animeGather.section['section_part_1']['echarts_in'] = {
    targets: '.contentCircle',
    duration: 1000,
    opacity: 1,
    bottom: 0
  }

  //* 切换展示
  animeGather.section['section_part_1']['echarts_choose_in'] = {
    targets: '.dotCircle',
    duration: 1000,
    opacity: 1,
    bottom: 0
  }

  /* E 第二部分 - 显示 echarts
   ***********************************/

  //* 创建时间线
  animeTimeline
    //* 第一部分
    // .add(animeGather.extend['fire']['cf_log_container']) //* 篝火渐显
    // .add(animeGather.extend['fire']['base_fire']) //* 篝火渐显
    // .add(animeGather.extend['fire']['fireNodes1']) //* 篝火渐显
    // .add(animeGather.extend['fire']['fireNodes2']) //* 篝火渐显
    .add(animeGather.section['section_part_0']['time']['old_year_in'], '-=1000') //* 过往
    .add(animeGather.section['section_part_0']['time']['segmentation_in'], '-=1500') //* 分隔符
    .add(animeGather.section['section_part_0']['time']['new_year_in'], '-=2000') //* 未来
    .add(animeGather.section['section_part_0']['time']['body_out']) //* 时间上移
    .add(animeGather.extend['fire']['part_extend_fire_out']) //* 篝火消失
    .add(animeGather.extend['fire']['part_extend_fire_out_tx']) //* 篝火背景消失
    //* 第二部分 准备
    .add(animeGather.section['section_part_1']['body_out']) //* 黑色背景消失
    .add(animeGather.section['section_part_1']['body_out_tx']) //* 黑色背景下移
    //* 第二部分 开始
    .add(animeGather.section['section_part_1']['echarts_in']) //* echarts 展示
    .add(animeGather.section['section_part_1']['echarts_choose_in']) //* 切换展示



  /* $.get('/test/api/tableProject.json', function(data) {
    createDatagrid(data, 'project')
  }); */
}

/**
 * 创建总结简单数据表
 * @param {*} params
 */
function createDatagrid(data, type) {

  let typeName = '';
  switch (type) {
    case 'project':
      typeName = '项目数'
      break;

    default:
      break;
  }

  let tableTem = `
  <div class="table-content">
    <table class="part_tables table-project">
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>${typeName}</th>
      </tr>`;

  data.forEach(function (item, index) {
    //* TODO 自定义渲染字段参数
    tableTem += `<tr>
        <td>${index + 1}</td>
        <td>${item.userName}</td>
        <td>${item.projectNum}</td>
      </tr>`;
  });

  tableTem += `</table></div>`;

  $('.part_1').append(tableTem);
  //* 表格统一样式
  $('.table-content').css({
    'max-height': globalClient.y - 200,
    'min-height': globalClient.y - 200,
  });
}

/**
 * 动态动画重新渲染
 * @param {*} el
 */
function dynamicRenderAnime(el) {

}

/**
 * 创建 echarts 
 * @param {object} data 返回数据
 * @param {object} param 自定义字段
 */
function creatCommonEcharts(targetEl ,data, param) {
  echartsGather[targetEl] = echarts.init(document.getElementById(targetEl));

  let option = null;

  option = {
    color: 'rgba(14, 72, 131, 1)',
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      data: ['杜青山', '青云', '锦瑟', '千机', '枳酒', '伟伟', 'xxx'],
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      }
    }],
    yAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: "#fff"
        }
      }
    }],
    series: [{
      name: '总计: ',
      type: 'bar',
      barWidth: '60%',
      showBackground: true,
      itemStyle: {
          color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0, color: '#faaca8'},
                  {offset: 0.5, color: '#faaca8'},
                  {offset: 1, color: '#ddd6f3'}
              ]
          )
      },
      data: [10, 52, 200, 334, 390, 330, 220]
    }]
  };

  if (option && typeof option === 'object') {
    echartsGather[targetEl].setOption(option);
  }
}

/**
 * 创建 echarts 实例
 */
function createInstance() {
  
  //* 创建项目 echarts 图
  creatCommonEcharts('echarts_project');
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
  windowResizeTimerInAnime = setTimeout(function () {
    initCommonVariate();
  }, 100);
});