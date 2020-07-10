var express=require("express");
var router =express.Router();
var USER=require("../database/user");
//lista de usuarios
router.get("/user",(req,res)=>{
    var filter={};
    var params = req.query;
    var select="";
    var aux={};
    var order={};
    if(params.nick!=null){
        var expresion = new RegExp(params.nick);
        filter["nick"]=expresion;
    }

    if(params.filters!=null){
        select=params.filters.replace(/,/g, " ");
    }
    if(params.agegt!=null){
        var gt=parseInt(params.agegt);
        aux["$gt"]=gt;
    }
    if(params.agelt!=null){
        var gl=parseInt(params.agelt);
        aux["$lt"]=gl;
    }
    if(aux!={}){
        filter["age"]=aux;
    }
    if(params.order!=null){
        var data =params.order.split(",");
        var number=parseInt(data[1]);
        order [data[0]]=number;
    }

    USER.find(filter).
    select(select).
    sort(order).
    exec((err,docs)=>{
        if(err){
            res.status(500).json({msn:"error en el servidor"});
            return;
        }
        res.status(200).json(docs);
        return;
    });
});
router.post("/user",(req,res)=>{
    var userRest =req.body;
    var userDB=new USER(userRest);
    userDB.save((err, docs)=>{
        if(err){
            var errors =err.errors;
            var keys=Object.keys(errors);
            var msn={};
            for(var i =0;i<keys.length;i++){
                msn[keys[i]]=errors[keys[i]].message;
            }

            res.status(500).json(msn);
            return;
        }
        res.status(200).json(docs);
        return;
    })    
});
router.put("/user",async(req,res)=>{
    var params=req.query;
    var bodydata =req.body;
    if (params.id==null){
        res.status(300).json({msn: "el paramero I es necesario"});
        return;
    }
    var allowkeylist = ["nick", "email", "age"];
    var keys = Object.keys(bodydata);
    var updateobjectdata={};
    for(var i=0;i<keys.length;i++){
        if(allowkeylist.indexOf(keys[i]) > -1){
            updateobjectdata[keys[i]]=bodydata[keys[i]];
        }
    }

    USER.update({_id: params.id},{$set: updateobjectdata},(err, docs)=>{
        if(err){
            res.status(500).json({msn: "existen problemas en la base de datos"});
            return;
        }
        res.status(200).json(docs);
    });
});
router.delete("/user",(req,res)=>{
    var params=req.query;
    if (params.id==null){
        res.status(300).json({msn: "el paramero I es necesario"});
        return;
    }
    USER.remove({_id: params.id},(err, docs)=>{
        if(err){
            res.status(500).json({msn: "existen problemas en la base de datos"});
            return;
        }
        res.status(200).json(docs);
    });
});
module.exports=router;