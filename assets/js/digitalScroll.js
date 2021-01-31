/*
 * @description: 数字滚动动画集合
 * @Author: duQings duqings@foxmail.com
 * @Date: 2021年1月31日17:11:39
 * @FilePath: assets\js\digitalScroll.js
 */

/**
 * 公共条件
 * * param {string} targets 目标盒子 
 * * param {array} scope 范围 示例: [0, 10000]
 * * param {number} round 小数点位数, 原数 / round , 示例: 设置为10则声明小数点后一位
 */
function digitalScroll(targets, scope, round) {
  if (!targets) {
    throw '请设置目标元素';
  }
  if (!scope) {
    throw '请设置数字范围, 示例: [0, 10000]';
  }

  let $round = round || 10; //* 默认小数点后一位
  return anime({
    targets: targets,
    innerHTML: scope, //* 范围
    easing: 'easeInQuint', //* 由慢至快
    round: +($round), //* 小数点位数
  });
}