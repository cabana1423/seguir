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

router.post('/divisas', function(req, res, next) {
  var entrada = req.body;
  if (entrada.mon ==null && entrada.cant==null && entrada.camb==null) {
      res.status(500).json({"msn":"datos incorrectos"
  });
  return;
  } 
  var moneda ={
    RUB:63.6425520313,
    HRK:6.7290738889,
    JPY:107.6524584204,
    THB:30.5643915296,
    CHF:0.988639462,
    EUR:0.9088430428,
    MYR:4.1814959556,
    BGN:1.7775152231,
    TRY:5.6850858857,
    CNY:7.1070617104,
    NOK:9.0179950922,
    NZD:1.583931655,
    ZAR:14.868581296,
    USD:1,
    MXN:19.4398800327,
    SGD:1.3764427883,
    AUD:1.471326002,
    ILS:3.5040443515,
    KRW:1193.9107516132,
    PLN:3.9819140234, 
    BO:6.96
      
  }
  if(moneda[entrada.mon]>1){
      var conv_dolar = Number(entrada.cant)/moneda[entrada.mon]
      
  }  
  else {
      var conv_dolar = Number(entrada.cant)*moneda[entrada.mon]      
  }
  if(moneda[entrada.camb]>1){
      var resultado = conv_dolar *moneda[entrada.camb]
  }
  else {
      var resultado = conv_dolar / moneda[entrada.camb]
  }
  res.status(500).json({
      "moneda":entrada.mon,
      "cambio":entrada.camb,
      "resultado":resultado
  });

});
module.exports = router;


