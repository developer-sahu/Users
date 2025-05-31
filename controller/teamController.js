import { Team, User } from "../model/index.js"

export const createTeam = async (req, res, next) => {
    try {
        const { team_name, description, department } = req.body;

        const checkTeam = await Team.findOne({
            where: { team_name }
        })
        if (checkTeam) {
            return res.status(400).json({ error: "Team Already Exists" });
        }
        const newTeam = await Team.create({
            team_name,
            description,
            department,
        });
        return res.status(201).json({ message: "Team Created Successfully", newTeam });
    } catch (error) {
        console.error(error);
        next(error)
    }
};

export const assignUser = async (req, res, next) => {
    const { userId, teamId } = req.body;
    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingMember = await User.findOne({
            where: { id: userId, teamId },
        });
        if (existingMember) {
            return res.status(400).json({ message: "User already assigned to this team" });
        }

        const team = await Team.findByPk(teamId, {
            include: [
                { model: User, as: "members" },
            ]
        });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        user.teamId = teamId;
        await user.save();

        return res.status(200).json({ message: " User assigned to team sucessfully ", user })

    } catch (error) {
        console.error(" UserTeam failed ", error);
        res.status(500).json({ message: "Internal Server", error });
        next(error)
    }
};

export const removeUser = async (req, res, next) => {

    const { userId, teamId } = req.body;

    try {
        const user = await User.findByPk(userId);
        const team = await Team.findByPk(teamId);

        if (!user || !team) {
            return res.status(404).json({ message: "User and Team not found" });
        }

        user.teamId = null;
        await user.save();

        res.status(200).json({ message: "User Remove from Team", user })
    } catch (error) {
        console.error("Remove Failed", error);
        res.status(500).json({ message: " Internal Server Error", error })
        next(error)
    }

}

export const assignTeamLeader = async (req, res, next) => {
    const { userId, teamId } = req.body;

    try {
        if (!userId || !teamId) {
            return res.status(400).json({ message: "User ID and Team ID are required" });
        }

        const user = await User.findByPk(userId, {
            include: [{
                model: Team,
                as: 'ledTeam',
                attributes: ["id"],
                required: false
            }]
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user?.ledTeam && user.ledTeam.id !== teamId) {
            return res.status(400).json({ message: "User is already a team leader of another team" });
        }

        const team = await Team.findByPk(teamId);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        team.teamleaderId = userId;
        user.teamId = teamId;
        await team.save();
        await user.save();

        return res.status(200).json({ message: "Team leader assigned successfully", team });
    } catch (error) {
        console.error("Assign Team Leader failed", error);
        res.status(500).json({ message: "Internal Server Error", error });
        next(error);
    }
}

export const removedTeamLeader = async (req, res , next) =>{
    const { teamId } = req.body;
    try {
        const team = await Team.findByPk(teamId);
        if (!team){
            return res.status(404).json({message :"Team not found"})
        }

        team.teamleaderId = null ;
        await team.save();
        return res.status(200).json({message : "Teamleader Removed successfully " , team});
    } catch (error) {
        console.error ("Failed", error);
        res.status(500).json({message : "Internal Server Error " , error});
        next(error);
    }

}

export const assignManagersToTeam = async (req, res, next) => {
    const { teamId, managerIds } = req.body;

    try {
        const team = await Team.findByPk(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        const managers = await User.findAll({
            where: { id: managerIds }
        });

        if (managers.length !== managerIds.length) {
            return res.status(404).json({ message: "One or more managers not found" });
        }

        await team.setManagers(managers);

        return res.status(200).json({ message: "Managers assigned to team successfully", team });
    } catch (error) {
        console.error("Assign Managers failed", error);
        res.status(500).json({ message: "Internal Server Error", error });
        next(error);
    }
}

