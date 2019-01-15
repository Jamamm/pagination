# pagination
这是一个原生JS写的分页插件  [预览链接](https://jamccc.github.io/pagination/ "预览链接")

使用方法：
```
new myPagination({
        id: 'pagination',
        curPage:1, //初始页码
        pageTotal: 50, //总页数
		pageAmount: 10,  //每页多少条
        dataTotal: 500, //总共多少条数据
		pageSize: 5, //可选,分页个数
        showPageTotalFlag:true, //是否显示数据统计
        showSkipInputFlag:true, //是否支持跳转
        getPage: function (page) {
            //获取当前页数
            console.log(page);
        }
    })
```
