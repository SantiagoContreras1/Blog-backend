import {Schema,model} from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";

const CommentSchema = new Schema({
    name:{
        type:String
    },
    comment:{
        type:String,
        required:true
    },
    publicationDate:{
        type:Date,
        default: Date.now
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required:true
    },
    state:{
        type:Boolean,
        default:true
    }
})

CommentSchema.methods.toJSON = function() {
    const {__v,_id,...comment} = this.toObject()
    comment.id = _id

    comment.publicationDate = new Date(comment.publicationDate).toLocaleString("es-GT", {
        timeZone: "America/Guatemala"
    })

    return comment
}

CommentSchema.plugin(mongooseAutoPopulate)

export default model("Comment", CommentSchema)