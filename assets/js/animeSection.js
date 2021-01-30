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
  // .add(animeGather.chooseFriend['leave']['welcome_1_in']) //* 欢迎词 1 入
  // .add(animeGather.chooseFriend['leave']['welcome_1_out']) //* 欢迎词 1 出
  .add(animeGather.chooseFriend['next_show_project_num_in']) //* 项目数量 入
  .add({
    targets: '.follow-friend',
    left: '10rem',
    bottom: '5rem',
  }) //* 已选伴友 入
  .add(animeGather.chooseFriend['next_show_project_num__title_out']) //* 项目数量 出
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
 * 青山与白云
 */
function castlePeakWhiteCloudsKeyFrames() {
  


}
