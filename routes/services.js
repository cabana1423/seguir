var express = require('express'); 
var router = express.Router(); 
/* GET home page. */ 
router.get('/usuario', function(req, res, next) { 
  var datos =req.query;
  var name=datos.name;
  console.log(datos);
  console.log(name);
  res.status(200).json({ 
    msn: "Hola mundo" 
  }); 
});
router.post('/test', (req, res, next)=> { 
  req.body["msn"] = "Por el servidor"; 
  var data = req.body  
  res.status(200).json(data); 
}); 

module.exports = router;


