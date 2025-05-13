import {Schema,model} from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const PublicationSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    course:{
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required:true,
        autopopulate: true
    },
    creationDate:{
        type:Date,
        default: Date.now
    },
    image:{
        type:String
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true
    }],
    state:{
        type:Boolean,
        default:true
    }
})

PublicationSchema.methods.toJSON = function () {
    const {__v,_id,...publication} = this.toObject()
    publication.id = _id

    // Ajustar la fecha a formato local ISO sin zona horaria
    publication.creationDate = new Date(publication.creationDate).toLocaleString("es-GT", {
        timeZone: "America/Guatemala"
    })


    return publication
}

PublicationSchema.plugin(mongooseAutoPopulate)

export default model("Publication", PublicationSchema)