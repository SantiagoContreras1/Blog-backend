import Publication from "./publication.model.js";
import Course from "../courses/course.model.js";

import {findForCourse,findForDate} from "../helpers/publications-filters.js"

export const savePublication = async (req,res) => {
    try {
        const data = req.body

        const course = await Course.findById(data.course)


        const publication = new Publication({
            title: data.title,
            description: data.description,
            image: data.image,
            course: course._id
        })

        await publication.save()

        res.status(201).json({
            message: 'Publication saved successfully',
            publication
        })

    } catch (e) {
        return res.status(500).json({
            message: 'Error saving publication',
            error: e.message
        })
    }
}

export const getPublications = async (req,res) => {
    try {
        const query = {state:true}
        const { forCourse, forDate } = req.query

        // Filter by course
        if(forCourse) {
            query.course = await findForCourse(forCourse)
        }

        // Filter by date
        if(forDate){
            query.date = await findForDate(forDate)
        }

        const publications = await Publication.find(query)

        res.status(200).json({
            message: 'Publications retrieved successfully',
            publications
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Error fetching publications',
            error: e.message
        })
    }
}

export const searchPublication = async (req,res) => {
    try {
        const {id} = req.params

        const publication = await Publication.findById(id)

        if (!publication) {
            return res.status(404).json({
                message: 'Publication not found'
            })
        }

        res.status(200).json({
            message: 'Publication retrieved successfully',
            publication
        })

    } catch (e) {
        return res.status(500).json({
            message: 'Error searching publication',
            error: e.message
        })
    }
}

export const updatePublication = async (req,res) => {
    try {
        const {id} = req.params
        const {...data} = req.body
        
        const course = await Course.findById(data.course)
        if (!course) {
            return res.status(404).json({
                message: 'Course not found'
            })
        }

        const updatedPublication = await Publication.findByIdAndUpdate(id, {
            title: data.title,
            description: data.description,
            course: course._id
        }, {new:true})

        if (!updatedPublication) {
            return res.status(404).json({
                message: 'Publication not found'
            })
        }

        res.status(200).json({
            message: 'Publication updated successfully',
            publication: updatedPublication
        })

    } catch (e) {
        return res.status(500).json({
            message: 'Error updating publication',
            error: e.message
        })
    }
}

export const deletePublication = async (req,res) => {
    try {
        const {id} = req.params

        const publication = await Publication.findByIdAndUpdate(id, {state:false}, {new:true})

        if (!publication) {
            return res.status(404).json({
                message: 'Publication not found'
            })
        }

        res.status(200).json({
            message: 'Publication deleted successfully',
            publication
        })


    } catch (e) {
        return res.status(500).json({
            message: 'Error deleting publication',
            error: e.message
        })
    }
}