

exports.index = function(req, res){
  res.render('index');
};

exports.game = function(req, res){
  res.render('part1');
};

exports.movement = function(req, res){
  res.render('movement');
};