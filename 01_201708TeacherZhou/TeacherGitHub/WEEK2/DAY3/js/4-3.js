var ary = [{
    name: '任立欣',
    age: 28,
    score: 80
}, {
    name: '单里斯',
    age: 26,
    score: 90
}, {
    name: '叶祥磊',
    age: 27,
    score: 92
}];

// ary.sort(function (a, b) {
//     return b.age - a.age;
// });

// ary.sort(function (a, b) {
//     return a.score - b.score;
// });

ary.sort(function (a, b) {
    return a.name.localeCompare(b.name);
});