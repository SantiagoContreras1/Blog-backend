import Course from './course.model.js';

export const saveCourse = async (req,res) => {
    try {
        const data = req.body;

        const course = new Course({
            name: data.name,
            description: data.description,
            image: data.image
        })

        await course.save()

        res.status(201).json({
            message: 'Course saved successfully',
            course
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Error saving course',
            error: error.message
        });
    }
}

export const getCourses = async (req,res) => {
    try {
        const query = {state:true}

        const courses = await Course.find(query)

        res.status(200).json({
            message: 'Courses retrieved successfully',
            courses
        })


    } catch (e) {
        return res.status(500).json({
            message: 'Error fetching courses',
            error: e.message
        })
    }
}

export const updateCourse = async (req,res) => {
    try {
        const {id} = req.params
        const {...data} = req.body

        const updatedCourse = await Course.findByIdAndUpdate(id,data,{new:true})

        res.status(200).json({
            message: 'Course updated successfully',
            updatedCourse
        })
        
    } catch (e) {
        return res.status(500).json({
            msg: "Error updating courses",
            error: e.message
        })
    }
}

export const deleteCourse = async (req,res) => {
    try {
        const {id} = req.params
        const deletedCourse = await Course.findByIdAndUpdate(id,{state:false},{new:true})

        res.status(200).json({
            message: 'Course deleted successfully',
            deletedCourse
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error deleting course",
            error: error.message
        });
    }
}