import Publication from "../publications/publication.model.js";
import Course from "../courses/course.model.js";

export const findForCourse = async (name) => {
    const course = await Course.findOne({ name });

    if (!course) {
        throw new Error("Course not found");
    }

    return course._id;
}

export const findForDate = async (asc = true) => {
    const publications = await Publication.find().sort({
        creationDate: asc ? (1) : (-1)
    }).populate('course');

    return publications
}