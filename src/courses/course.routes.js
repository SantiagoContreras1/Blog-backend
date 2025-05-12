import { Router } from "express";

import { saveCourse } from "./course.controller.js";

const router = Router()

router.post(
    "/save",
    saveCourse
)

export default router