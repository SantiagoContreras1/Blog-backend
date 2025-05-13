import { Router } from "express";

import {saveComment,getComments,updateComment,deleteComment} from "./comment.controller.js";

import { existPublication } from "../middlewares/existencias.js";

const router = Router()

router.post(
    "/save",
    [existPublication],
    saveComment
)

router.put(
    "/update/:id",
    [existPublication],
    updateComment
)

router.delete(
    "/delete/:id",
    deleteComment
)

router.get("/",getComments)

export default router