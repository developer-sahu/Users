import  {Team, Assigned } from '../model/index.js'


export const assignTeamLeader = async (req, res) => {
    try {
        const { teamId, username, teamleader } = req.body;

        const team = await Team.findByPk(teamId, {
            include: ['members'],
        });

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        const userInTeam = team.members.some(member => member.username === username);
        if (!userInTeam) {
            return res.status(400).json({ message: "User is not part of the team" });
        }
        const existingTeamLeader = await Assigned.findOne({ where: { teamleader, username } });
        if (existingTeamLeader) {
            return res.status(400).json({ message: "Team leader already assigned" });
        }
        const newTeamLeader = await Assigned.create({ teamleader, username });
        team.teamLeaderId = newTeamLeader.id;
        await team.save();
        res.status(200).json({
            message: 'Team leader assigned successfully',
            teamLeader: newTeamLeader
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

