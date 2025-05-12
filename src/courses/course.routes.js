import { Router } from "express";

import { saveCourse, getCourses, updateCourse } from "./course.controller.js";

const router = Router()

router.post(
    "/save",
    saveCourse
)

router.put(
    "/update/:id",
    updateCourse
)

router.get("/",getCourses)

export default router