var a = [];
var nameArr = [];
for (let i = 0; i < 25; i++) {
  nameArr.push('名' + i);
}
for (let i = 0; i < 25; i++) {

	a.push({
		id: i+1,
    userName: nameArr[i],
    projectNum: parseInt(Math.random() * 10) + i + 10
	});
}
console.info(a)