import { Router } from "express";

import { saveCourse, getCourses, updateCourse, deleteCourse } from "./course.controller.js";

const router = Router()

router.post(
    "/save",
    saveCourse
)

router.put(
    "/update/:id",
    updateCourse
)

router.delete(
    "/delete/:id",
    deleteCourse
)

router.get("/",getCourses)

export default router