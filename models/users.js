module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {};

    User.init({
        userId : {
            primaryKey : true,
            autoIncrement : true,
            type : Sequelize.INTEGER,
            allowNull : false
        },
        userName : {
            type : Sequelize.STRING,
            allowNull : false
        },
        name : {
            type : Sequelize.STRING
        }
    }, {
        sequelize
    });

    User.associate = (models) => {
        User.belongsToMany(User, {
            as : 'Followers',
            through : 'UsersFollowers',
            foreignKey : 'userId',
            otherKey : 'followerUserId'
        });

        User.belongsToMany(User, {
            as: 'FollowingUsers',
            through: 'UsersFollowers',
            foreignKey: 'followerUserId',
            otherKey: 'userId'
          });
    }


    return User;
}