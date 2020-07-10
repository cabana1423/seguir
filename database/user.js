var mongoose= require("./connect");
var USERSCHEMA = new mongoose.Schema({
    nick :{
        type: String,
        required :[true, "el nick es necesario"]
    },
    email:{
        type :String,
        required:[true , "el email es obligado"],
        validate:{
            validator:(value)=>{
                return /^[\w\.]+@[\w\.]+\.\w{3,3}$/.test(value);
            },
            message: props => `${props.value} no es valido`
        }    
    },
    age:{
        type: Number,
        required :[true, "la edad es necesaria"]
    },
    password:{ 
        type: String,
        required:[true,"password necesario"]
    },
    roles: {
        type:Array,
        default:[]
    },
    playlist: {
        type:Array,
        default:[]
    },
    create:{
        type: Date,
        default: new Date()
    }
});
var USER = mongoose.model("user", USERSCHEMA);
module.exports=USER;
