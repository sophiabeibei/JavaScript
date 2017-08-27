//=>暂时不讲：使用原生JS封装选项卡插件
~function () {
    function TabPlugin(options) {
        options = this.initDefault(options);
        this.tab = options.curEle;
        this.tabPage = utils.byClass('page', this.tab)[0];
        this.pageList = utils.children(this.tabPage, 'li');
        this.contentList = utils.byClass('content', this.tab);
        this.preIndex = options.index;
        this.init();
    }

    TabPlugin.prototype = {
        constructor: TabPlugin,
        //=>初始化参数配置
        initDefault: function (options) {
            var _default = {
                curEle: null,
                index: 0
            };
            for (var key in options) {
                if (options.hasOwnProperty(key)) {
                    _default[key] = options[key];
                }
            }
            return _default;
        },
        //=>默认展示
        initShow: function () {
            var preIndex = this.preIndex,
                pageList = this.pageList,
                contentList = this.contentList;
            for (var i = 0; i < pageList.length; i++) {
                if (preIndex === i) {
                    utils.addClass(pageList[i], 'select');
                    utils.addClass(contentList[i], 'select');
                    continue;
                }
                utils.removeClass(pageList[i], 'select');
                utils.removeClass(contentList[i], 'select');
            }
        },
        //=>点击切换
        bindEvent: function () {
            var pageList = this.pageList,
                contentList = this.contentList,
                _this = this;
            for (var i = 0; i < pageList.length; i++) {
                pageList[i].index = i;
                pageList[i].onclick = function () {
                    var index = this.index;
                    if (_this.preIndex === index) return;

                    utils.addClass(this, 'select');
                    utils.addClass(contentList[index], 'select');

                    utils.removeClass(pageList[_this.preIndex], 'select');
                    utils.removeClass(contentList[_this.preIndex], 'select');
                    _this.preIndex = index;
                }
            }
        },
        //=>入口
        init: function () {
            this.initShow();
            this.bindEvent();
        }
    };

    TabPlugin.extend = function (options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this.prototype[key] = options[key];
            }
        }
    };

    window.TabPlugin = TabPlugin;
}();

new TabPlugin({
    curEle: tab1,
    index: 1
});

//------
var example = new TabPlugin({
    curEle: tab2,
    index: 2
});
example.preIndex = 1;
example.initShow();

//------
var TP2 = new TabPlugin({
    curEle: tab3
});
TabPlugin.extend({
    changeBg: function () {
        var contentList = this.contentList;
        for (var i = 0; i < contentList.length; i++) {
            var item = contentList[i],
                itemList = item.getElementsByTagName('li');
            for (var j = 0; j < itemList.length; j++) {
                if (j % 2 === 0) {
                    itemList[j].style.background = '#FFF';
                    itemList[j].old = '#FFF';
                } else {
                    itemList[j].style.background = '#EEE';
                    itemList[j].old = '#EEE';
                }
                itemList[j].onmouseover = function () {
                    this.style.background = 'lightblue';
                };
                itemList[j].onmouseout = function () {
                    this.style.background = this.old;
                };
            }
        }
    }
});
TP2.changeBg();