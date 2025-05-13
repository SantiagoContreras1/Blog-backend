import { Router } from "express";

import { savePublication, getPublications, searchPublication, updatePublication, deletePublication } from "./publication.controller.js";

import { existCourse } from "../middlewares/existencias.js";

const router = Router()

router.post(
    "/save",
    [existCourse],
    savePublication
)

router.put(
    "/update/:id",
    [existCourse],
    updatePublication
)

router.delete(
    "/delete/:id",
    deletePublication
)

router.get("/",getPublications)

router.get("/:id",searchPublication)

export default router