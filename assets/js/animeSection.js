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
      bottom: '1.2rem',
      left: '5.1rem',
      opacity: 1,
    }) //* 已选伴友 入
    .add(animeGather.chooseFriend['leave']['welcome_0_in']) //* 欢迎词 0 入
    .add(animeGather.chooseFriend['leave']['welcome_0_out'], '+=2500') //* 欢迎词 0 出
    .add({
      targets: '.follow-friend',
      bottom: '1.2rem',
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

  animeGather.chooseFriend['next_show_project_num_encourage_out'] = {
    targets: '.project-num-text-encourage1',
    opacity: 1,
    complete() {
      anime({
        targets: '.stay-up-late-box',
        opacity: 1,
        duration: 1000,
        easing: 'easeInOutQuad'
      });
    }
  }

  //* 第二部分 第一句话 入
  animeGather.overtime['stay_up_late_box_0_in'] = {
    targets: '.stay-up-late-box-0',
    opacity: 1
  };

  //* 第二部分 第一句话 入
  animeGather.overtime['stay_up_late_box_0_in'] = {
    targets: '.stay-up-late-box-0',
    opacity: 1
  };



  animeTimelineGather.overtime
  .add(animeGather.chooseFriend['next_show_project_num_encourage_out']) //* 加班第一部分 出
  .add(animeGather.overtime['stay_up_late_box_0_in']) //* 加班第二部分 第一句话 入

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
            duration: 1000
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
          anime({
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
