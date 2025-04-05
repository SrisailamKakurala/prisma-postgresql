import { Router } from "express";
const router = Router();
import { createUser, getAllUsers, getUser, updateUser, deleteUser } from "../controllers/user.controller.js";


router.post('/signin', createUser);
router.get('/users', getAllUsers);
router.get('/user/:id', getUser);
router.put('/user/update/:id', updateUser);
router.delete('/user/delete/:id', deleteUser);


export default router;