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

  // anime(animeGather.section['section_part_0']['Body'])

  //* 第一部分 - 选择
  //* 入
  animeGather.section['section_part_0']['icon_choose_in'] = {
    targets: '.icon-choose-body',
    left: 0,
    opacity: 1,
  };
  /* //* 出
  animeGather.section['section_part_0']['icon_choose_out'] = {
    targets: '.icon-choose-body',
    left: -globalClient.x,
    opacity: 0,
    delay: 200,
    duration: 2000
  };

  //* 第一部分 - 第一段欢迎词
  //* 入
  animeGather.section['section_part_0']['welcome_0_in'] = {
    targets: 'section.part_0 .welcome_0',
    opacity: 1,
  };
  //* 出
  animeGather.section['section_part_0']['welcome_0_out'] = {
    targets: 'section.part_0 .welcome_0',
    opacity: 0,
  };

  //* 第一部分 - 第二段欢迎词
  //* 入
  animeGather.section['section_part_0']['welcome_1_in'] = {
    targets: 'section.part_0 .welcome_1',
    opacity: 1,
  };
  //* 出
  animeGather.section['section_part_0']['welcome_1_out'] = {
    targets: 'section.part_0 .welcome_1',
    opacity: 0,
  }; */

  //* 第一部分 - 渲染已选伴友
  // animeGather.section['section_part_0']['follow_friend_part_0_in'] = ;


  /* //! E 第一部分
   ****************************************/
  /* animeGather.section['section_part_0']['Body'] = {
    targets: 'section.part_1',
    opacity: 1,
  }; */

  /* //! S 第二部分
   ****************************************/



  /* //! E 第二部分
   ****************************************/

  //* 更新时间线
  const animePlayQueue = {
    chooseBefore() { // *选择前
      //? 第一部分
      animeTimeline
        .add(animeGather.section['section_part_0']['Body']) //* 身体显
        .add(animeGather.section['section_part_0']['icon_choose_in'], '+=500'); //* 伴友总盒子

      /* setTimeout(() => {
        animeTimeline.pause();
      }, 5000); */

    },
    chooseAfter() { // *选择前
      animeTimeline
        .add(animeGather.section['section_part_0']['icon_choose_out'], '+=1000')
        .add({
          targets: '.follow-friend',
          bottom: '1rem',
          left: '5rem',
          opacity: 1,
        }) //* 已选伴友 入
        .add(animeGather.section['section_part_0']['welcome_0_in']) //* 欢迎词 0 入
        .add(animeGather.section['section_part_0']['welcome_0_out'], '+=2500') //* 欢迎词 0 出
        .add({
          targets: '.follow-friend',
          bottom: '1rem',
          left: '4rem',
          opacity: 1,
        }) //* 已选伴友 入
        .add(animeGather.section['section_part_0']['welcome_1_in']) //* 欢迎词 1 入
        .add(animeGather.section['section_part_0']['welcome_1_out']) //* 欢迎词 1 出
    }
  };

  return animePlayQueue;
}

/**
 * 伴友离场
//  * @param {object} chooseFriend 已选择的伴友
 */
function friendLeave() {
  createTimerLineInstance('chooseFriend'); //* 创建[伴友离场]时间线

  animeGather.chooseFriend['stay'] = {}; //* 留下的
  animeGather.chooseFriend['leave'] = {}; //* 离开的
  animeGather.chooseFriend['next_show'] = {}; //* 接下来

  //* 出
  animeGather.chooseFriend['leave']['icon_choose_out'] = {
    targets: '.icon-choose-body',
    left: -globalClient.x,
    opacity: 0,
  };

  //* 第一部分 - 第一段欢迎词
  //* 入
  animeGather.chooseFriend['leave']['welcome_0_in'] = {
    targets: 'section.part_0 .welcome_0',
    opacity: 1,
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
  };
  //* 出
  animeGather.chooseFriend['leave']['welcome_1_out'] = {
    targets: 'section.part_0 .welcome_1',
    opacity: 0,
  };

  //* 项目数量 icon 入
  animeGather.chooseFriend['next_show_project_num_in'] = {
    targets: '.icon-project-num',
    opacity: 1,
    right: '1rem',
    top: '.2rem',
    complete() {
      //* 启动青山白云动画
      castlePeakWhiteCloudsKeyFrames();
    }
  }

  //* 项目数量 icon 出
  animeGather.chooseFriend['next_show_project_num_out'] = {
    targets: '.icon-project-num',
    opacity: 1,
    right: '-25rem',
    delay: 4000
  }

  //* 项目数量 - 文本 出
  animeGather.chooseFriend['next_show_project_num__title_out'] = {
    targets: '.project-num-text',
    opacity: 1,
    right: '-25rem',
    delay: 4000
  }

  //* 项目数量鼓励语
  animeGather.chooseFriend['next_show_project_num_encourage'] = {
    targets: '.project-num-text-encourage1',
    left: '1rem',
    top: '0.2rem'
  }


  /* //* 项目 - 数量
  animeGather.chooseFriend['next_show_project_num_'] = {
    targets: '.follow-friend',
    right: '1rem',
    top: '0.2rem',
    opacity: 1
  } */

  //* 未选择的伴友逐渐消失
  /* animeGather.chooseFriend['leave']['otherFriend'] = {
    targets: '.icon-block',
    right: -globalClient.x,
    opacity: 0,
  };

  //* 未选择的伴友逐渐消失
  animeGather.chooseFriend['leave']['title'] = {
    targets: '.icon-choose-body-title',
    top: -globalClient.y,
    opacity: 0,
  };

  //* 未选择的伴友逐渐消失
  animeGather.chooseFriend['leave']['chooseBtn'] = {
    targets: '.icon-choose-btn',
    bottom: globalClient.x * 3,
    opacity: 0,
  };

  //* 选择的伴友
  animeGather.chooseFriend['stay']['friend'] = {
    targets: '.icon-choose-body',
    bottom: '1rem',
    left: '4rem',
  };


  //* 未选择的伴友离开屏幕
  setTimeout(() => {
    $('.icon-choose-body').css({
      'width': 'fit-content',
      'height': 'fit-content'
    });
    $('.icon-block').css('display', 'none');
    $('.icon-choose-body-title').css('display', 'none');
    $('.icon-choose-btn').css('display', 'none');
  }, 3000);
  animeTimelineGather.chooseFriend
  .add(animeGather.chooseFriend['leave']['otherFriend'])
  .add(animeGather.chooseFriend['leave']['title'], '-=2000')
  .add(animeGather.chooseFriend['leave']['chooseBtn'], '-=2000')
  .add(animeGather.chooseFriend['stay']['friend'], '-=2000') */


  animeTimelineGather.chooseFriend
    .add(animeGather.chooseFriend['leave']['icon_choose_out'], '+=1000')
    .add({
      targets: '.follow-friend',
      bottom: '1rem',
      left: '5rem',
      opacity: 1,
    }) //* 已选伴友 入
    .add(animeGather.chooseFriend['leave']['welcome_0_in']) //* 欢迎词 0 入
    .add(animeGather.chooseFriend['leave']['welcome_0_out'], '+=2500') //* 欢迎词 0 出
    .add({
      targets: '.follow-friend',
      bottom: '1rem',
      left: '4rem',
      // opacity: 1,
    }) //* 已选伴友 入
    .add(animeGather.chooseFriend['leave']['welcome_1_in']) //* 欢迎词 1 入
    .add(animeGather.chooseFriend['leave']['welcome_1_out']) //* 欢迎词 1 出
    .add(animeGather.chooseFriend['next_show_project_num_in']) //* 项目数量 入
    .add({
      targets: '.follow-friend',
      // left: '10rem',
      // bottom: '5rem'
      left: globalClient.x * .58 + 'px',
      bottom: globalClient.y * .59 + 'px',
    }) //* 已选伴友 入
    // .add(animeGather.chooseFriend['next_show_project_num__title_out']) //* 项目数量 青山 出
    .add(animeGather.chooseFriend['next_show_project_num_out']) //* 项目数量 出
    .add(animeGather.chooseFriend['next_show_project_num_encourage']) //* 项目数量 出


  //  animeTimelineGather.pause()

  //* createTimerLineInstance('project_num'); //* 创建[伴友离场]时间线

  //* animeGather.chooseFriend['stay'] = {}; //* 留下的

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

  //* 鸟儿飞来
  animeGather.extend['bird'] = anime({
    targets: '.icon-bird',
    // left: '3.5rem',
    // bottom: '5.5rem',
    bottom: globalClient.y * .65,
    left: globalClient.x * .1,
    duration: 5000,
    complete() {


    }
  })

}

/**
 * 出现太阳/月亮
 * @param {string} type sun/moon
 * @param {string} action in/out 
 */
function activeSunAndMoon(type, action) {
  animeGather['extend'][type] = {};
  let sun = {},
      moon = {};
  switch (type) {
    case 'sun':
      //* 自身旋转
      animeGather['extend']['sun'] = anime({
        targets: '.extend-sun-body',
        rotate: {
          value: '+=2turn', // 0 * 2 = '2turn'
          duration: 3600,
          easing: 'easeInOutQuad'
        },
      });
      //* 太阳进入时的独特动画
      sun = {
        in () {
          //* 太阳升起
          anime({
            targets: '.extend-sun',
            top: '.2rem',
            right: '.5rem',
            duration: 2000,
            opacity: 1,
            easing: 'easeInOutQuad',
            complete() {
              //* 出现太阳五官
              animeGather['extend']['sun'] = anime({
                targets: ['.sun-cheek-red', '.extend-sun-mouth', '.extend-sun-eye'],
                opacity: 1,
                duration: 1000
              });
            }
          });
          //* 改变背景色
          //* 黑色幕布上浮
          anime({
            targets: '.bg-dark',
            top: -globalClient.y * 3, // * 3 是因为本身已经处于 -globalClient.y 位置
            duration: 2000,
            easing: 'easeInOutQuad',
            opacity: 0
          });
          //* 白色幕布上浮
          anime({
            targets: '.bg-light',
            top: -globalClient.y - 30, //* -30 防止留白
            duration: 2000,
            easing: 'easeInOutQuad',
            opacity: 1
          });
        },
        out() {
          //* 太阳落下
          anime({
            targets: '.extend-sun',
            top: '20rem',
            right: '0',
            duration: 2000,
            opacity: 0,
            easing: 'easeInOutQuad',
            complete() {
              //* 隐藏五官
              animeGather['extend']['sun'] = anime({
                targets: ['.sun-cheek-red', '.extend-sun-mouth', '.extend-sun-eye'],
                opacity: 0,
                duration: 1000
              });
            }
          });
          //* 改变背景色
          //* 黑色幕布下沉至视野
          anime({
            targets: '.bg-dark',
            // top: -globalClient.x - 66,
            top: -globalClient.x - 66 , // * 3 是因为本身已经处于 -globalClient.y 位置
            duration: 2000,
            easing: 'easeInOutQuad',
            opacity: 1
          });
          //* 白色幕布下沉
          anime({
            targets: '.bg-light',
            top: 0,
            duration: 2000,
            easing: 'easeInOutQuad',
            opacity: 0
          });
        }
      }
      sun[action]();
      break;
    case 'moon':


      break;

    default:
      break;
  }

}