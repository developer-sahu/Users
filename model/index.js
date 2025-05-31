import User from "./user.js";
import Team from "./team.js";

// Team Creation Association
Team.hasMany(User, { foreignKey: 'teamId', as: 'members' });
User.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });

// Team Leader Association
Team.belongsTo(User, { foreignKey: 'teamleaderId', as: 'teamLeader' });
User.hasOne(Team, { foreignKey: 'teamleaderId', as: 'ledTeam' });

Team.belongsToMany(User, { as: 'managers', through: 'TeamManagers' });
User.belongsToMany(Team, { as: 'managedTeams', through: 'TeamManagers' });

export { User, Team };