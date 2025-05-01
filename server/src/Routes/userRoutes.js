import { Router } from "express";
import { register, signIn, signOut } from "../Controllers.js/userController.js";

import multer from "multer";

const upload = multer();
const router = Router();

router.route("/register").post(upload.none(), register);

router.route("/sign-in").get(signIn);

router.route("/sign-out").get(signOut);

export default router;
