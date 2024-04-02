import express from 'express';
const router = express.Router();

import { 
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam 
} from '../controllers/teamController.js';

router.route('/').post(createTeam).get(getTeams);
router.route('/:id').get(getTeamById);

export default router;