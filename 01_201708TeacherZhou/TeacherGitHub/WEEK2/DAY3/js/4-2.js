var ary = ['任立欣', '单里斯', '叶祥磊', '史潇潇', '王梦雅', '罗傲', '刘丹', '王鹏', '黄冬莹', '李文鑫'];
ary.sort(function (a, b) {
    return a.localeCompare(b);
});

//->localeCompare：可以做字符串的比较，按照拼音字母在字母表中的顺序排列，越靠后的字母越大
// '任立欣'.localeCompare('单里斯') ->1
// '单里斯'.localeCompare('任立欣') ->-1
// 'renlixin'<=>'danlisi'