import { Router } from "express";
import UserController from "../controllers/userController.js";
import { check } from "express-validator";
const router: Router = Router();
const validateUser = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email")
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .withMessage("Invalid email format"),
    check("password")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .withMessage(
            "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
];
// Get all users
router.get("/users", UserController.getAll);

// Get user by ID
router.get("/users/:id", UserController.getOne);

// Create a new user
router.post("/users", UserController.register);

// Update an existing user
router.put("/users/:id", UserController.update);

// Delete an existing user
router.delete("/users/:id", UserController.delete);

export default router;
