import express from "express";
import userRegister from "../controllers/user.js";
import { upload } from "../middlewares/multer.js";

const router =express.Router();

router.post('/register',upload.fields([
    {
        name:"avator",
        maxCount:1
    },
    {
        name:"coverImage",
        maxCount:1
    }
]),
    userRegister);

export default router;