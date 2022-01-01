module.exports = (sequelize, Sequelize) => {
    class Post extends Sequelize.Model {};
    
    Post.init({
        postId : {
            primaryKey : true,
            autoIncrement : true, 
            type : Sequelize.INTEGER,
            allowNull : false
        },
        content : {
            type : Sequelize.TEXT,
            allowNull : false
        },
        type : {
            type : Sequelize.ENUM,
            values : ['text', 'image', 'link'],
            defaultValue : 'text'
        }
    }, {
        sequelize
    });

    Post.associate = (models) => {

        // Author
        Post.belongsTo(models.User, {
            as : 'Author',
            foreignKey : 'userId',
            targetKey : 'userId'
        });

        // Likes
        Post.belongsToMany(models.User, {
            as : 'Likers',
            through : 'UserLikedPosts',
            foreignKey : 'postId'
        });
    }

    return Post;
}