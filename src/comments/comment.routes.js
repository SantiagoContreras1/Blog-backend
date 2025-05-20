import { Router } from "express";

import {saveComment,getComments,updateComment,deleteComment, searchCommentById} from "./comment.controller.js";

import { existPublication } from "../middlewares/existencias.js";

const router = Router()

router.post(
    "/save",
    [existPublication],
    saveComment
)

router.put(
    "/update/:id",
    updateComment
)

router.delete(
    "/delete/:id",
    deleteComment
)

router.get("/", getComments)

router.get(
    "/:id",
    searchCommentById
)

export default router