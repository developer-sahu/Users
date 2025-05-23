import User from "./user.js";
import Team from "./team.js";
import Assigned from "./assign.js";

// Team Creation Association
Team.hasMany(User, { foreignKey: 'teamId', as: 'members' });
User.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

// Team Leader Association
Team.belongsTo(User, { foreignKey: 'teamleaderId', as: 'teamleader' });
User.hasMany(Team, { foreignKey: 'teamleaderId', as: 'ledTeams' });

export { User, Team, Assigned };