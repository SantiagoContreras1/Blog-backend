import Comment from "./comment.model.js";
import Publication from "../publications/publication.model.js";

export const saveComment = async (req,res) => {
    try {
        const data = req.body
        const post = await Publication.findById(data.post)

        const comment = new Comment({
            name: data.name,
            comment: data.comment,
            post: data.post
        })

        post.comments.push(comment._id)
        await post.save()
        await comment.save()

        const populatedComment = await Comment.findById(comment._id)
            .populate({
                path: "post",
                select: "title description"
            })

        res.status(201).json({
            message: 'Comment saved successfully',
            populatedComment
        })
    } catch (e) {
       return res.status(500).json({
            message: 'Error saving comment',
            error: e.message
        }) 
    }
}

export const getComments = async (req,res) => {
    try {
        const query = {state:true}

        const comments = await Comment.find(query)

        res.status(200).json({
            message: 'Comments retrieved successfully',
            comments
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Error fetching comments',
            error: e.message
        })
    }
}

export const updateComment = async (req,res) => {
    try {
        const {id} = req.params
        const {...data} = req.body

        const updatedComment = await Comment.findByIdAndUpdate(id,{
            name: data.name,
            comment: data.comment
        },{new:true})

        if(!updatedComment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.status(200).json({
            message: 'Comment updated successfully',
            updatedComment
        })

    } catch (e) {
        return res.status(500).json({
            message: 'Error updating comment',
            error: e.message
        })
    }
}

export const deleteComment = async (req,res) => {
    try {
        const {id} = req.params

        const comment = await Comment.findById(id)

        if (!comment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        // Eliminar el comentario del array
        await Publication.findByIdAndUpdate(comment.post,{
            $pull: { comments: comment._id }
        })

        // Marcar el comentario como eliminado
        const deletedComment = await Comment.findByIdAndUpdate(id,{
            state: false
        },{new:true})

        res.status(200).json({
            message: 'Comment deleted successfully',
            deletedComment
        })
    } catch (e) {
        return res.status(500).json({
            message: 'Error deleting comment',
            error: e.message
        })
    }
}