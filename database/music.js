var mongoose = require("./connect");
var musicSchema=mongoose.Schema({
    title: {
        type:String,
        required: [true,"el titulo es requerido" ],
    },
    subtitle:{
        type:String,
        required:[true,"el subtitulo es nesesario"]
    },
    genero:Array,
    commentaries:[{body:String,date:Date}],
    likes:[{_iduser:{
        type:String,
        required:[true, "el usuario es nesario"],        
    },
    date:{
        type:Date,
        default: new Date(),
    }    
    }],
    Album:{
        type:String,
        required:[true, "el album es necesario"]
    },
    year:Number,
    image:{
        type:String,
        required:[true, "la ruta de la imagen es necesaria"]
    },
    pathfile:{
        type:String,
        required:[true, "la ruta de la cancion es necesaria"]
    }
});
var MUSIC=mongoose.model("muica", musicSchema);
module.exports=MUSIC;
