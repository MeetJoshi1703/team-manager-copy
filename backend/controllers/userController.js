import User from '../models/userModel.js';

const createUser =async (req,res)=>{
    const userData = req.body;

    const highestUserId = await User.findOne().sort({ id: -1 }).limit(1).select('id');
    let nextUserId = 1; // Default ID if no user exists

    if (highestUserId) {
        // Increment the highest user ID by 1 to generate the next user ID
        nextUserId = highestUserId.id + 1;
    }
    userData.id = nextUserId;
    if(userData.available == 'on'){
        userData.available = true;
    }else{
        userData.available = false;
    }

    const userExist = await User.findOne({email:userData.email});
    if(userExist){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create(userData);

    if(user){
        res.status(201).json({
            _id:user._id,
            first_name:user.first_name,
            email:user.email,
            domain:user.domain
        });
    }else{
        res.status(400);
        throw new Error('invalid user data');
    }

}

const getUsers = async (req, res) => {
    
    const page = parseInt(req.query.page) || 1; // Current page, default is 1
    const limit = parseInt(req.query.limit) || 5; // Number of documents per page, default is 5
    const searchText = req.query.searchText; // Search text from query parameters
    const gender = req.query.gender; // Gender from query parameters
    const domain = req.query.domain; // Domain from query parameters
    const available = req.query.available; // Availability from query parameters
    
    try {
        let query = {};

        // If searchText exists, add a search condition based on the name field
        if (searchText) {
            query = { 
                $or: [
                    { first_name: { $regex: searchText, $options: 'i' } }, // Case-insensitive search
                    { last_name: { $regex: searchText, $options: 'i' } }   // Case-insensitive search
                ]
            };
        }

        // If gender exists, add a gender condition
        if (gender) {
            query.gender = gender;
        }

        // If domain exists, add a domain condition
        if (domain) {
            query.domain = { $in: domain.split(',') };
        }

        // If availability exists, add an availability condition
        if (available == 'true') {
            query.available = true; // Convert string to boolean
        }

        // Count total documents matching the query
        const count = await User.countDocuments(query);

        // Calculate total pages based on the count and limit
        const totalPages = Math.ceil(count / limit);
        
        // Find users based on the query, skip and limit for pagination
        const users = await User.find(query)
            .skip((page - 1) * limit)
            .limit(limit);

        // Send response with users data, current page, and total pages
        res.json({
            users,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        // Send error response if any error occurs
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, userData, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};