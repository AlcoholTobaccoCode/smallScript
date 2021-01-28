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
  //* 出
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
    // easing: 'easeInOutQuad',
    opacity: 1,
  };
  //* 出
  animeGather.section['section_part_0']['welcome_0_out'] = {
    targets: 'section.part_0 .welcome_0',
    // easing: 'easeInOutQuad',
    opacity: 0,
  };

  //* 第一部分 - 第二段欢迎词
  //* 入
  animeGather.section['section_part_0']['welcome_1_in'] = {
    targets: 'section.part_0 .welcome_1',
    // easing: 'easeInOutQuad',
    opacity: 1,
  };
  //* 出
  animeGather.section['section_part_0']['welcome_1_out'] = {
    targets: 'section.part_0 .welcome_1',
    // easing: 'easeInOutQuad',
    opacity: 0,
  };

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
        .add(animeGather.section['section_part_0']['icon_choose_in'], '+=500');

      setTimeout(() => {
        animeTimeline.pause();
      }, 5000);

      animeTimeline
        .add(animeGather.section['section_part_0']['icon_choose_out'], '+=1000')
        .add({
          targets: '.follow-friend',
          // easing: 'easeInOutQuad',
          bottom: '1rem',
          left: '5rem',
          opacity: 1,
        }) //* 已选伴友 入
        .add(animeGather.section['section_part_0']['welcome_0_in']) //* 欢迎词 0 入
        .add(animeGather.section['section_part_0']['welcome_0_out'], '+=2500') //* 欢迎词 0 出
        .add({
          targets: '.follow-friend',
          // easing: 'easeInOutQuad',
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
