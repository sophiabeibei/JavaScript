class Dialog{
    constructor(content,callback){
        this.content=content;
        this.callback=callback;
        this.init();
    }

    init(){
        this.createMark();

        //->移除分两种情况
        this.markEvent();
        this.timer = setTimeout(()=>{
            this.removeMark();
        },2000);
    }

    createMark(){
        this.removeMark();//->创建新的mark之前,先把之前的mark移除掉;
        let mark = document.createElement("div");
        mark.className = "mark";
        mark.innerHTML = `
        <div class="mark">
    <div class="box">
        <h3>系统提示</h3>
        <div class="content">${this.content}</div>
    </div>
</div>`;
        document.body.appendChild(mark);
        this.mark = mark;
    };

    removeMark(){
        clearTimeout(this.timer);
        let mark = this.mark;
        if(mark){
            document.body.removeChild(mark);
            this.callback && this.callback();
        }
    }

    markEvent(){
        let mark = this.mark;
        if(!mark){
            return;
        }
        if(typeof $ !=="undefined"){
            //->说明当前已经有zepto了
            $(mark).tap((e)=>{
                if(e.target.className === "mark"){
                    this.removeMark();
                }
            });
        }
    }
}
// new Dialog([content],[callback]);//->让显示出来







//这是一个建议的dialog插件

/*dialog: 弹出层组件*/
