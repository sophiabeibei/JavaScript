class Dialog {
    constructor(content, callback) {
        this.content = content;
        this.callback = callback;
        this.init();
    }

    init() {
        this.createMark();

        //->移除MARK
        this.markEvent();
        this.timer = setTimeout(()=> {
            this.removeMark();
        }, 2000);
    }

    createMark() {
        //->创建新的之前先把之前的移除掉
        this.removeMark();

        //->创建新的
        let mark = document.createElement('div');
        this.mark = mark;
        mark.className = 'mark';
        mark.innerHTML = `<div class="box">
            <h3>系统提示</h3>
            <div class="content">${this.content}</div>
        </div>`;
        document.body.appendChild(mark);
    }

    removeMark() {
        clearTimeout(this.timer);
        let mark = this.mark;
        if (mark) {
            document.body.removeChild(mark);
            this.callback && this.callback();
        }
    }

    markEvent() {
        let mark = this.mark;
        if (!mark) return;

        if (typeof $ !== 'undefined') {
            $(mark).tap((e)=> {
                if (e.target.className === 'mark') {
                    this.removeMark();
                }
            });
        }
    }
}