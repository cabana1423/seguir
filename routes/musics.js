var express=require('express');
var metadata=require("file-metadata");
var sha1 =require("sha1");
var router=express.Router();
var fileUpload = require("express-fileupload");
var MUSICS=require("../database/music");
router.use(fileUpload({
    fileSize:50*1024*1024
}));
router.post("/sendfile", (req, res)=>{
    console.log(req.files);
    var mp3 =req.files.file;
    var path=__dirname.replace(/\/routes/g, "/mp3");
    var date =new Date();
    var sing=sha1(date.toString()).substr(1,5);
    var totalpath=path + "/"+sing + "_"+ mp3.name.replace(/\s/g, "_");
    mp3.mv(totalpath,async(err)=>{
        if(err){
            return res.status(300).send({msn: "error al escribir el archivo en el disco "});
        }
        //revisar metadata
        var meta =await metadata(totalpath);
        var obj={};
        if(meta.durationSeconds!=null){
            obj["duration"]=meta.durationSeconds;
        }
        if(meta.audioBitRate!=null){
            obj["bitrate"]=meta.audioBitRate;
        }
        if(meta.fsSize!=null){
            obj["size"]=meta.fsSize;
        }
        if(meta.displayName!=null){
            obj["title"]=meta.displayName;
        }
        obj["totalpath"]=totalpath;
        obj["relativepath"]="";
        var music=new MUSICS(obj);
        music.save((err,docs)=>{
            if(err){
                res.status(500).json({msn:"error"})
                return;
            }
        });
        res.status(200).json({name: mp3.name});    
    });
});
router.get("getfile/", async(req, res, next)=>{
    var params=req.query;
    if(params==null){
        res.status(300).json({msn: "error es necesario una ID"});
        return;
    }
    var id = params.id ;
    var music=await MUSICS.find({_id: id});
    if(music.length>0){
        var path=music[0].pathfile;
        res.sendFile(path);
        return;
    }
    res.status(300).json({msn: "error en la peticion"});
    return;
});
module.exports=router;
