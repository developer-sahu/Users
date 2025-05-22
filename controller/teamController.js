
import { Team, User } from "../model/index.js"

export const createTeam = async (req, res) => {
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
        res.status(201).json({ message: "Team Created Successfully", newTeam });
    } catch (error) {
        console.error(error);
    }
};

export const assignTouser = async (req, res, next) => {
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

        const team = await Team.findByPk(teamId);
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        user.teamId = teamId;
        await user.save();

        return res.status(200).json({ message: " User assigned to team sucessfully ", user })

    } catch (error) {
        console.error(" Assigned failed ", error);
        res.status(500).json({ message: "Internal Server", error });
        next(error)
    }
};


export const removeTouser = async (req, res, next) => {

    const { userId } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: " User and Team not found" });
        }

        user.teamId = null;
        await user.save()

        res.status(200).json({ message: "User Remove from Team", user })
    } catch (error) {
        console.error("Remove Failed", error);

        res.status(500).json({ message: " Internal Server Error", error })
        next(error)
    }

}