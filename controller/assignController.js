import { Team, User, Assigned } from "../model/index.js";

export const assignTeamLeader = async (req, res) => {
    try {
        const { teamId, userId  , teamleaderId} = req.body;

        const team = await Team.findByPk(teamId);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        team.teamleader = userId; 
        await team.save();

        res.status(200).json({ message: 'Team leader assigned successfully', team });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};