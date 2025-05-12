import {Schema,model} from 'mongoose';

const CourseSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

CourseSchema.methods.toJSON = function () {
    const {__v, _id, ...course} = this.toObject();
    course.id = _id;
    return course;
}

export default model('Course', CourseSchema);