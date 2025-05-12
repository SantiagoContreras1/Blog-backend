import Course from './course.model.js';

export const saveCourse = async (req,res) => {
    try {
        const data = req.body;

        const course = new Course({
            name: data.name,
            description: data.description
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