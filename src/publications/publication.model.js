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
    }
})

PublicationSchema.methods.toJSON = function () {
    const {__v,_id,...publication} = this.toObject()
    publication.id = _id
    return publication
}

export default model("Publication", PublicationSchema)