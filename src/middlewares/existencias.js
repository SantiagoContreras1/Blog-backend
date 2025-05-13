import Course from "../courses/course.model.js"
import Publication from "../publications/publication.model.js"

export const existCourse = async (req,res,next) => {
    try {
        const {course} = req.body

        const curso = await Course.findById(course)

        if(!course){
            return res.status(404).json({
                message: 'Course not found'
            })
        }

        if(!curso.state){
            return res.status(400).json({
                message: 'Course is inactive or deleted'
            })
        }

        next()
        
    } catch (e) {
        return res.status(500).json({
            message: 'Error checking course existence',
            error: e.message
        })
    }
}

export const existPublication = async (req,res,next) => {
    try {
        const {post} = req.body
        const publication = await Publication.findById(post)

        if(!publication){
            return res.status(404).json({
                message: 'Publication not found'
            })
        }

        if(!publication.state){
            return res.status(400).json({
                message: 'Publication is inactive or deleted'
            })
        }

        next()
    } catch (e) {
        return res.status(500).json({
            message: 'Error checking publication existence',
            error: e.message
        })
    }
}