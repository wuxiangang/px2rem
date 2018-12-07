var fs = require('fs')
var path=require('path');
var config = require('./config/config.json');
var filePath = config.path;
var htmlpx = 20;
var types = config.filterTypes;

function exists(path){  
     return fs.existsSync(path)
} 

function callback (v, a, c) {
	const n = parseInt(v);
	if (n === 1) return v;
	return n / htmlpx + 'rem'
}

function transform (file, fontPath, e) {
	const currentPath = fontPath +'/'+ file;
	if (fs.statSync(currentPath).isDirectory()) {
		fs.readdir(currentPath, 'utf8', function (err,data) {
			data.forEach((item, index) => {
			  	return transform(item, currentPath)
			})
		})
	} else {
		const p = file.match(/\.((?!\.).)*$/);
		if (!p || !types.includes(p[0].replace(/\./, ''))) return
		if (config.minJs === 'false' && file.includes('.min')) return
			console.log(currentPath)
		fs.readFile(currentPath,'utf8',function(err,files){
			var result = files.replace(/\d+px(?!(\s*(\!\s*important\s*)*(\)\s*\{|\)*\;*\s*\/\*no)))/gi, callback);
			fs.writeFile(currentPath, result, 'utf8', function (err) {
			     if (err) return console.log(err);
			});
		})
	}
}	

//readdir方法读取文件名
//readFile方法读取文件内容
//writeFile改写文件内容
filePath.forEach((dir, i) => {
	if (!exists(dir)) return console.log('not exist', dir);
	fs.readdir(dir, 'utf8', function (err,data) {
		data.forEach((item, index) => {
			transform(item, dir)
		});
	 
	})
})