const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");

let db = {
    User : require('./users.js')(sequelize, Sequelize)
}

Object.keys(db).forEach( modelName => {
    if(db[modelName].associate) {
        db[modelName].associate(db);
    }
})

async function connecting() {
    await sequelize.sync({force : true});
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.connecting = connecting;

module.exports = db;