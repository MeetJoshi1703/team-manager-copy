import Team from '../models/teamModel.js';
import User from '../models/userModel.js';

const createTeam = async (req, res) => {

    const teamData = req.body;
    
    
    try {
        const team = await Team.create({
            team_id: teamData.team_id,
            name: teamData.name,
            description: teamData.description,
            members: teamData.members,
            member_id: teamData.member_id
          });

        const memberIds = teamData.member_id;
        await Promise.all(memberIds.map(async memberId => {
            // Assuming you have a User model and it has an 'availability' field
            const user = await User.findById(memberId);
            if (user) {
                user.available = false;
                await user.save();
            }
        }));


        res.status(201).json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTeams = async (req, res) => {
    try {
        const teams = await Team.find({});
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        const team = await Team.findById(id);
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTeam = async (req, res) => {
    const { id } = req.params;
    const teamData = req.body;

    try {
        const team = await Team.findByIdAndUpdate(id, teamData, { new: true });
        res.json(team);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const team = await Team.findByIdAndDelete(id);
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
            return;
        }
        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { 
    createTeam,
    getTeams,
    getTeamById, 
    updateTeam, 
    deleteTeam 
};
