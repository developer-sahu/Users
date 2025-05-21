
import {Team} from "../model/index.js"

export const createTeam = async (req, res, next) => {
    try {
        const { team_name, discription } = req.body;

        const CheckTeam = await Team.findOne({
            where: { team_name }
        })

        if (CheckTeam) {
            return res.status(400).json({ error: "Team Already Exists" });
        }

        const newTeam = await Team.create({
            team_name,
            department , 
            discription ,
        });
        res.status(201).json({ message: "Team Created Successfully" , newTeam });

    } catch (error) {
        console.error(error);
        next(error);
    }
};
