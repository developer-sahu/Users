import User from "./user.js"
import Team from "./team.js";


// Team Creation  Association 
Team.hasMany(User, { foreignKey: 'teamId', as: 'members' });
User.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });


export { User, Team };
