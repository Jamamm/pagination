class Pagination {
    constructor(_ref) {
        const {
            id,
            pageSize,
            pageTotal,
            curPage,
            getPage,
            showPageTotalFlag,
            showSkipInputFlag,
            pageAmount,
            dataTotal
        } = _ref
        this.id = id;
        this.ul = document.createElement('ul');
        this.pageSize = pageSize || 5; //分页个数
        this.pageTotal = pageTotal || 1; //总共多少页
        this.pageAmount = pageAmount || 0; //每页多少条
        this.dataTotal = dataTotal || 0; //总共多少数据
        this.curPage = curPage || 1; //初始页码
        this.getPage = getPage;
        this.showPageTotalFlag = showPageTotalFlag || false; //是否显示数据统计
        this.showSkipInputFlag = showSkipInputFlag || false; //是否支持跳转

        this.init();
    }
    //初始化
    init() {
        const that = this;
        const pagination = document.getElementById(this.id);
        pagination.innerHTML = '';
        this.ul.innerHTML = '';
        pagination.appendChild(this.ul);
        //首页
        this.firstPage();
        //上一页
        this.lastPage();
        //分页
        this.getPages().forEach((item) => {
            const li = document.createElement('li');
            if (item == this.curPage) {
                li.className = 'active';
            } else {
                li.onclick = function () {
                    that.curPage = parseInt(this.innerHTML);
                    that.init();
                    that.getPage(that.curPage);
                };
            }
            li.innerHTML = item;
            this.ul.appendChild(li);
        });
        //下一页
        this.nextPage();
        //尾页
        this.finalPage();

        //是否支持跳转
        if (this.showSkipInputFlag) {
            this.showSkipInput();
        }
        //是否显示总页数,每页个数,数据
        if (this.showPageTotalFlag) {
            this.showPageTotal();
        }
    }
    //首页
    firstPage() {
        const li = document.createElement('li');
        li.innerHTML = '首页';
        this.ul.appendChild(li);
        if (this.dataTotal !== 0) {
            li.onclick = () => {
                const val = parseInt(1);
                this.curPage = val;
                this.getPage(this.curPage);
                this.init();
            };
        }
    }
    //上一页
    lastPage() {
        const li = document.createElement('li');
        li.innerHTML = '<';
        if (parseInt(this.curPage) > 1) {
            li.onclick = () => {
                this.curPage = parseInt(this.curPage) - 1;
                this.init();
                this.getPage(this.curPage);
            };
        } else {
            li.className = 'disabled';
        }
        this.ul.appendChild(li);
    }
    //分页
    getPages() {
        let pag = [];
        if (this.curPage <= this.pageTotal) {
            if (this.curPage < this.pageSize) {
                //当前页数小于显示条数
                let i = Math.min(this.pageSize, this.pageTotal);
                while (i) {
                    pag.unshift(i--);
                }
            } else {
                //当前页数大于显示条数
                let middle = this.curPage - Math.floor(this.pageSize / 2),
                    //从哪里开始
                    i = this.pageSize;
                if (middle > this.pageTotal - this.pageSize) {
                    middle = this.pageTotal - this.pageSize + 1;
                }
                while (i--) {
                    pag.push(middle++);
                }
            }
        } else {
            console.log('当前页数不能大于总页数');
        }
        if (!this.pageSize) {
            console.log('显示页数不能为空或者0');
        }
        return pag;
    }
    //下一页
    nextPage() {
        const li = document.createElement('li');
        li.innerHTML = '>';
        if (parseInt(this.curPage) < parseInt(this.pageTotal)) {
            li.onclick = () => {
                this.curPage = parseInt(this.curPage) + 1;
                this.init();
                this.getPage(this.curPage);
            };
        } else {
            li.className = 'disabled';
        }
        this.ul.appendChild(li);
    }
    //尾页
    finalPage() {
        const li = document.createElement('li');
        li.innerHTML = '尾页';
        this.ul.appendChild(li);
        if (this.dataTotal !== 0) {
            li.onclick = () => {
                this.curPage = parseInt(this.pageTotal);
                this.getPage(this.curPage);
                this.init();
            };
        }
    }
    //是否支持跳转
    showSkipInput() {
        const li = document.createElement('li');
        li.className = 'totalPage';
        const span1 = document.createElement('span');
        span1.innerHTML = '跳转到';
        li.appendChild(span1);
        const input = document.createElement('input');
        input.setAttribute("type", "number");
        input.onkeydown = (oEvent) => {
            if (oEvent.keyCode == '13') {
                const val = parseInt(oEvent.target.value);
                if (typeof val === 'number' && val <= this.pageTotal && val > 0) {
                    this.curPage = val;
                    this.getPage(this.curPage);
                } else {
                    alert("请输入正确的页码")
                }
                this.init();
            }
        };
        li.appendChild(input);
        const span2 = document.createElement('span');
        span2.innerHTML = '页';
        li.appendChild(span2);
        this.ul.appendChild(li);
    }
    //是否显示总页数,每页个数,数据
    showPageTotal() {
        const li = document.createElement('li');
        li.innerHTML = '共&nbsp' + this.pageTotal + '&nbsp页';
        li.className = 'totalPage';
        this.ul.appendChild(li);
        const li2 = document.createElement('li');
        li2.innerHTML = '每页&nbsp' + this.pageAmount + '&nbsp条';
        li2.className = 'totalPage';
        this.ul.appendChild(li2);
        const li3 = document.createElement('li');
        li3.innerHTML = '合计&nbsp' + this.dataTotal + '&nbsp条数据';
        li3.className = 'totalPage';
        this.ul.appendChild(li3);
    }
}