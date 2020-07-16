var mongoose = require("./connect");
var musicSchema=mongoose.Schema({
    title: {
        type:String,
        default:"NO TITULO",
        required: [true,"el titulo es requerido" ],
    },
    subtitle:{
        type:String,
        default:"None data",
        required:[true,"el subtitulo es nesesario"]
    },
    duration:{
        type:String
    },
    bitrate:{
        type:String
    },
    size:{
        type:String
    },
    genero:Array,
    commentaries:[{body:String,date:Date}],
    likes:[{_iduser:{
        type:String,
        default:"None USER",
        required:[true, "el usuario es nesario"],        
    },
    date:{
        type:Date,
        default: new Date(),
    }    
    }],
    Album:{
        type:String,
        default:"None ALBUM",
        required:[true, "el album es necesario"]
    },
    year:Number,
    image:{
        type:String,
        default:"No IMAGE",
        required:[true, "la ruta de la imagen es necesaria"]
    },
    relativepath:{
        type:String
    },
    pathfile:{
        type:String,
        required:[true, "la ruta de la cancion es necesaria"]
    }
});
var MUSIC=mongoose.model("muica", musicSchema);
module.exports=MUSIC;
