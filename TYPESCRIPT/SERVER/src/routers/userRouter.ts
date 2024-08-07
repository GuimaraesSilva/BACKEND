import { Router } from "express";
import UserController from "../controllers/userController.js";
import { check } from "express-validator";
import { checkRole } from "../middlewares/authMiddleware.js";

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
router.get("/users", checkRole(["USER", "ADMIN"]), UserController.getAll);

// Get user by ID
router.get("/users/:id", UserController.getOne);

// Register a new user
router.post("/users/register", 
    [check("name").notEmpty().withMessage("Name is required"),
    check ('email').isEmail().withMessage("Invalid email format"),
    check ('password').isStrongPassword(),
    check ('role').isIn(["USER", "ADMIN", "GUEST"]).withMessage('Invalid role'),
    check ('avatarFile').custom((value, {req}) => {
        if (!req.files || !req.files.avatar) {
            throw new Error ('Avatar is required.')
        }
        const avatar = req.files.avatarFile;
        const allowedMimes = ['image/jpeg', 'image/png']

        if (!allowedMimes.includes(avatar.mimetype)) {
            throw new Error ('Invalid image format. Only JPEG or PNG are allowed.')
        }
        if (avatar.size > 5 * 1024 * 1024) { // Equivale 5 MB 
            throw new Error ('Image size exceeds the max limit of 5MB.')
        }

        return true;
    })
]
,UserController.register);

// Login user
router.post('/users/login',[
    check ('email').isEmail().withMessage("Invalid email format"),
    check ('password').notEmpty().withMessage('Password is required'),
], 
UserController.login);

// Update an existing user
router.put("/users/:id", checkRole(["USER", "ADMIN"]), UserController.update);

// Delete an existing user
router.delete("/users/:id", checkRole(["ADMIN"]), UserController.delete);

export default router;
