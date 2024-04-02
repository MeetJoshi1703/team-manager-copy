import express from 'express';
const router = express.Router();

import { 
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser 
} from '../controllers/userController.js';

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUserById).delete(deleteUser).put(updateUser);




// GET /api/users: Retrieve all users with pagination support.
// GET /api/users/:id: Retrieve a specific user by ID.
// POST /api/users: Create a new user.
// PUT /api/users/:id: Update an existing user.


export default router;