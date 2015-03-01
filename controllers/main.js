// show the home page (will also have our login links)
exports.index = function(req, res) {
    res.render('index.html');
};

exports.hakkinda = function(req,res){
    res.render('hakkinda.html');
};