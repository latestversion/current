function load(file,refscope){  var s = fs.readFileSync(file,"ascii");refscope.eval(s)}}
