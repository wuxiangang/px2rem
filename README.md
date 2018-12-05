# PX转REM

## 运行
node px2rem

``` bash
# 配置
{
  // 配置目标文件
  "path": ["./css", "./views"],
  // 是否对压缩.min.js进行操作
  "minJs": "false",
  // 转rem文件类型
  "filterTypes": ["css", "scss", "html", "less", "styl", "vue"]
}

# 说明
对正常编写模式（css，scss，less），在后面加/*no*/取消转rem，媒体函数将不进行转变，
对非正常模式（stylus），一律转rem，加/*no*/不进行转变。

# 测试
html { 
	font-size: 80px; /*no*/ //不转rem
}

@media screen  and (max-width: 800px) { //不转rem

}

body {
	width: 30px //转rem
}

.cc {
	height: calc(100vh - 60px); //转rem
}

.aa {
	height: calc(100vh - 60px); /*no*/ //不转rem
}

/*stylus*/
@media screen  and (max-width: 800px)  //转rem
	.aa 
		height 40px //转rem
		width calc( 100% -  200px ) //转rem
	.column-count
		width calc( 100% -  200px ) /*no*/ //不转rem


@media screen  and (max-width: 800px) /*no*/ //不转rem
	.aa 
		height 40px
```
