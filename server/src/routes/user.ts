import { Router } from "express";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import User from "../model/user.ts";

const saltRounds = 10;
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if(user) return res.send("Email exists");
    else{
        req.body.password = await bcrypt.hash(req.body.password, saltRounds);
        User.create(req.body);
    }
    return res.send("user registered");
});

export default userRouter;
