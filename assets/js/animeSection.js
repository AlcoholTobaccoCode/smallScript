/*
 * @description: index 页面动画播放流程
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021年1月27日22:49:36
 */
function animePart_0() {

  /* //! S 第一部分
   ****************************************/
  animeGather.section['section_part_0'] = {};
  //* 第一部分主体
  animeGather.section['section_part_0']['Body'] = {
    targets: 'section.part_0',
    opacity: 1,
  };

  //* 第一部分 - 选择
  //* 入
  animeGather.section['section_part_0']['icon_choose_in'] = {
    targets: '.icon-choose-body',
    left: 0,
    opacity: 1,
  };

  /* //! E 第二部分
   ****************************************/

  //* 更新时间线
  const animePlayQueue = {
    chooseBefore() { // *选择前
      //? 第一部分
      animeTimeline
        .add(animeGather.section['section_part_0']['Body']) //* 身体显
        .add(animeGather.section['section_part_0']['icon_choose_in'], '+=500'); //* 伴友总盒子
    }
  };

  return animePlayQueue;
}

/**
 * 伴友离场
//  * @param {object} chooseFriend 已选择的伴友
 */
function friendLeave() {
  let common = {
    duration: 2000,
    easing: 'easeInOutQuad',
  }
  createTimerLineInstance('chooseFriend'); //* 创建[伴友离场]时间线

  animeGather.chooseFriend['stay'] = {}; //* 留下的
  animeGather.chooseFriend['leave'] = {}; //* 离开的
  animeGather.chooseFriend['next_show'] = {}; //* 接下来

  //* 启动青山白云动画
  castlePeakWhiteCloudsKeyFrames();
  //* 出
  animeGather.chooseFriend['leave']['icon_choose_out'] = {
    targets: '.icon-choose-body',
    left: -globalClient.x,
    opacity: 0,
    complete() {
      anime({
        targets: '.reveal-vert',
        opacity: 1,
        bottom: '0',
        delay: 800,
        ...common,
        complete() {
          //* 鸟儿从远方飞来
          /* animeGather.extend['bird'] =  */anime({
            targets: '.icon-bird',
            bottom: '2rem',
            right: '2.5rem',
            duration: 5000,
            easing: 'easeInOutQuad',
            delay: 800,
          });
        }
      });
    },
  };

  //* 第一部分 - 第一段欢迎词
  //* 入
  animeGather.chooseFriend['leave']['welcome_0_in'] = {
    targets: 'section.part_0 .welcome_0',
    opacity: 1,
    complete() {
      //* 工作天数滚动
      digitalScroll('.join-day', 233, 1);
    }
  };
  //* 出
  animeGather.chooseFriend['leave']['welcome_0_out'] = {
    targets: 'section.part_0 .welcome_0',
    opacity: 0,
  };

  //* 第一部分 - 第二段欢迎词
  //* 入
  animeGather.chooseFriend['leave']['welcome_1_in'] = {
    targets: 'section.part_0 .welcome_1',
    opacity: 1,
    complete() {
      //* 工作时长滚动
      digitalScroll('.work-hours', 12333, 10);
    }
  };
  
  //* 第一部分 出
  animeGather.chooseFriend['leave']['welcome_1_out'] = {
    targets: 'section.part_0 .welcome_1',
    opacity: 0,
  };

  //* 项目数量 - 文本 出
  animeGather.chooseFriend['next_show_project_num__title_out'] = {
    targets: '.project-num-text',
    right: '-25rem',
    delay: 4000
  }

  animeTimelineGather.chooseFriend
    .add(animeGather.chooseFriend['leave']['icon_choose_out'], '+=1000')
    .add({
      targets: '.follow-friend',
      bottom: '1.8rem',
      left: '5rem',
      opacity: 1,
    }) //* 已选伴友 入
    .add(animeGather.chooseFriend['leave']['welcome_0_in']) //* 欢迎词 0 入
    .add(animeGather.chooseFriend['leave']['welcome_0_out'], '+=2500') //* 欢迎词 0 出
    .add({
      targets: '.follow-friend',
      bottom: '1.8rem',
      left: '4rem',
    }) //* 已选伴友 入
    .add(animeGather.chooseFriend['leave']['welcome_1_in']) //* 欢迎词 1 入
    .add(animeGather.chooseFriend['leave']['welcome_1_out'], '+=2500') //* 欢迎词 1 出
    .add({
      targets: '.follow-friend',
      // left: '10rem',
      bottom: '0',
      ...common,
      left: (globalClient.x / 100 - 1 - 5.5),
      complete() {
        //* 青山 出
        anime({
          targets: '.reveal-vert',
          opacity: 1,
          bottom: '-6rem',
          delay: 1000,
          duration: 4000,
        });
        //* 鸟儿自由飞翔
        anime({
          targets: '.icon-bird',
          duration: 5000,
          delay: 1000,
          easing: 'easeInOutQuad',
          right: (globalClient.x / 100) + 'rem',
          bottom: (globalClient.y / 100) + 'rem'
        });
        //* 启动奋斗者
        part_struggle();
      }
    }) //* 已选伴友移至奋斗者身旁
    .add({
      targets: '.follow-friend',
      left: globalClient.x / 100 * 0.3 + 'rem',
      bottom: globalClient.y / 100 * 0.56 + 'rem',
      delay: 1000,
    })
    ;
}

//* 第二部分开始 struggle 奋斗者 
function part_struggle() {
  // stay-up-late-box
  let common = {
    duration: 2000,
    easing: 'easeInOutQuad',
  }
  anime({ //* 出现奋斗者
    targets: '.struggle',
    ...common,
    width: '5rem',
    left: globalClient.x / 100 / 2 - 2.5 + 'rem',
    top: '1rem',
    opacity: 1,
    complete() {
      struggle(); //* 奋斗者动画
      anime({
        ...common,
        targets: '.overtime-box', //* 加班第一部分
        opacity: 1,
        complete() {
          createTimerLineInstance('overtime'); //* 创建加班第二部分时间线
          overtimeTimeLine(common); //* 加班第二部分时间线
        }
      })
    }
  });
}

/**
 * 加班第二部分时间线
 */
function overtimeTimeLine(common) {

  //* 第一部分 出
  animeGather.chooseFriend['next_show_project_num_encourage_out'] = {
    targets: '.overtime-box',
    opacity: 0,
    complete() {
      anime({
        targets: '.stay-up-late-box',
        opacity: 1,
        // duration: 1000,
        easing: 'easeInOutQuad'
      });
    }
  }

  //* 第二部分 第一句话 入
  animeGather.overtime['stay_up_late_box_0_in'] = {
    targets: '.stay-up-late-box-0',
    opacity: 1,
    top: 0
  };

  //* 第二部分 第二句话 入
  animeGather.overtime['stay_up_late_box_1_in'] = {
    targets: '.stay-up-late-box-1',
    opacity: 1,
    top: 0,
  };

  //* 第二部分 第三句话 入
  animeGather.overtime['stay_up_late_box_2_in'] = {
    targets: '.stay-up-late-box-2',
    opacity: 1,
    top: 0,
    complete() { //* 第三句话结束之后
      //* 日落
      activeSunAndMoon('sunset');
      //* 奋斗者 出
      //* 休息
      anime({
        targets: '.sleep-rest',
        ...common,
        width: '4rem',
        opacity: 1,
        right: 0,
      });
    }
  };

  //* 奋斗者出
  animeGather.overtime['struggle_out'] = {
    targets: '.struggle',
    ...common,
    width: '0',
    left: globalClient.x / 100 / 2 - 2.5 + 'rem',
    top: '.5rem',
    opacity: 0,
  };

  //* 奋斗第二句话 出
  animeGather.overtime['stay-up-late-box_out'] = {
    targets: '.stay-up-late-box',
    ...common,
    opacity: 0
  };



  animeTimelineGather.overtime
  .add(animeGather.chooseFriend['next_show_project_num_encourage_out']) //* 加班第一部分 出
  .add(animeGather.overtime['stay_up_late_box_0_in']) //* 加班第二部分 第一句话 入
  .add(animeGather.overtime['stay_up_late_box_1_in']) //* 加班第二部分 第二句话 入
  .add(animeGather.overtime['stay_up_late_box_2_in']) //* 加班第二部分 第三句话 入
  .add(animeGather.overtime['struggle_out']) //* 奋斗者 出
  .add(animeGather.overtime['stay-up-late-box_out']) //* 加班第二部分 出
  .add({//* 伴友移动至休息人旁边
    targets: '.follow-friend',
    bottom: '0',
    ...common,
    left: (globalClient.x / 100 - 1 - 4),
    complete() {
      //* 最后总结
      $('.end-sum').find('h2').each(function(index, item) {
        anime({
          targets: '.' + $(item).attr('class'),
          duration: 1000 * index,
          easing: 'easeInOutQuad',
          delay: 500 * index,
          opacity: 1,
          complete() {
            $(item).addClass('end');
          }
        });
      });
    }
  }, '-=2000');


  let waitEndTimerInIndex = null,
    waitEndTimerInIndexForWishEnd = null;
  waitEndTimerInIndex = setInterval(() => {
    if ($('.end').length >= 11) {
      $('.end-sum').hide(); //* 隐藏总结文字
      $('.wish-word').find('h2').each(function(index, item) {
        anime({
          targets: '.' + $(item).attr('class'),
          duration: 1000 * index,
          easing: 'easeInOutQuad',
          delay: 500 * index,
          opacity: 1,
          complete() {
            $(item).addClass('wish-end');
          }
        });
      });

      //* 休息者出
      anime({
        targets: '.sleep-rest',
        ...common,
        width: 0,
        opacity: 0,
        right: '-4rem',
      });
      
      //* 小鸡 出
      anime({
        targets: '.follow-friend',
        ...common,
        opacity: 0,
      });

      
      //* 启动烟花
      activeFireworks();
      clearInterval(waitEndTimerInIndex);
      waitEndTimerInIndex = null;
    }
  },100);

  waitEndTimerInIndexForWishEnd = setInterval(() => {
    if ($('.wish-end').length >= 5) {
      //* 祝福语 出
      anime({
        targets: '.wish-word',
        ...common,
        delay: 1000,
        opacity: 0,
      });
      clearInterval(waitEndTimerInIndexForWishEnd);
      waitEndTimerInIndexForWishEnd = null;
    }

  },100);

}

/**
 * 创建一个空的时间线
 * @param {string} timelineName 时间线名
 */
function createTimerLineInstance(timelineName) {
  animeTimelineGather[timelineName] = anime.timeline({
    easing: 'easeInOutQuad',
    duration: 2000
  });
}

/**
 * 青山与白云 动画效果
 */
function castlePeakWhiteCloudsKeyFrames() {
  //* 公共移动方法
  const _revealVert_left = (bottomX, easing, delay) => ({
    translateX: [bottomX, 0],
    opacity: [0, 1],
    easing: easing,
    delay: anime.stagger(delay),
    duration: 2000
  });

  //* 左侧白云移动
  animeGather['project_icon_cloud_left_move'] = anime({
    targets: '.project-icon-cloud-left',
    ..._revealVert_left(25, "easeInOutQuad", 200),

    complete: function () {
      animeGather['project_icon_cloud_left'] = anime({
        targets: '.project-icon-cloud-left',
        ..._revealVert_left(50, "easeInOutQuad", 250),
        loop: true
      });
    }
  });

  //* 右侧白云移动
  animeGather['project_icon_cloud_right_move'] = anime({
    targets: '.project-icon-cloud-right',
    ..._revealVert_left(-25, "easeInOutQuad", 200),

    complete: function () {
      animeGather['project_icon_cloud_right'] = anime({
        targets: '.project-icon-cloud-right',
        ..._revealVert_left(-50, "easeInOutQuad", 250),
        loop: true
      });
    }
  });
}
