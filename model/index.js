





// Team Creation  Association //
User.hasMany(Team, { foreignKey: 'teamLeaderId', as: 'ledTeams' });
Team.belongsTo(User, { foreignKey: 'teamLeaderId', as: 'teamLeader' });
