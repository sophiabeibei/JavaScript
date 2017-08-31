//->DATA
var dataList = {
    1: ['李鑫', '王梦雅', '史潇潇', '叶祥磊', '单里斯', '周啸天', '任立欣'],
    2: ['王肖肖', '程海华', '周啸天', '王天明', '王运硕', '何晓凤'],
    3: ['丁梓涵', '李文新', '周啸天', '刘丹', '薛辈辈', '曹志强', '王彬翊', '张继伟', '宋涵', '王光辉', '高婷婷', '王国鹏', '赵航', '陈鹏飞', '杜伟民', '李鑫', '任立欣'],
    4: ['刘畅', '李雪', '张宏伟', '周啸天', '杜伟民', '陈鹏飞', '赵航'],
    5: ['于良', '王国鹏', '赵盈盈', '周啸天', '刘玉文', '庄伟红', '李日欣', '王博仪'],
    6: ['高婷婷', '郝新杰', '王光辉', '樊献锋', '宋涵'],
    7: ['许潇文', '李玲', '王彬翊', '孙梦真', '余春梅', '张继伟', '豆欣欣'],
    8: ['丁梓涵', '李文新', '刘丹', '周啸天', '薛辈辈', '曹志强', '王彬翊', '张继伟', '宋涵', '王光辉', '高婷婷', '王国鹏', '赵航', '陈鹏飞', '杜伟民', '李鑫', '任立欣'],
    9: ['刘婉月', '成甜甜', '周啸天', '冉俊俊', '曹志强', '康晶', '李素素', '赵沛', '陈晨'],
    10: ['李文新', '黄冬莹', '王鹏', '周啸天', '刘丹', '罗傲'],
    11: ['张磊军', '李睿', '周啸天', '薛辈辈', '董凤玲', '丁梓涵'],
    12: ['丁梓涵', '李文新', '周啸天', '刘丹', '薛辈辈', '曹志强', '王彬翊', '张继伟', '宋涵', '王光辉', '高婷婷', '王国鹏', '赵航', '陈鹏飞', '杜伟民', '李鑫', '任立欣']
};

//->ALREADY
var ary = [];

//->COMPUTED
var box = document.getElementById('box');
function fn() {
    var res = null;
    while (!res) {
        var ran = Math.round(Math.random() * 11 + 1);
        var personAry = dataList[ran],
            personLen = personAry.length;
        ran = Math.round(Math.random() * (personAry.length - 1));
        res = personAry[ran];
        if (ary.indexOf(res) > -1) {
            res = null;
        }
    }

    //->ASSIGN
    box.innerHTML = res;
}

//->EVEN
var isRun = false,
    autoTimer = null;
document.onkeyup = function (e) {
    if (e.keyCode !== 32) return;

    isRun = !isRun;
    if (isRun) {
        autoTimer = setInterval(fn, 50);
        return;
    }
    clearInterval(autoTimer);
    ary.push(box.innerHTML);
};














