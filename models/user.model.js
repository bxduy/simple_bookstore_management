const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
        },
        resetPasswordExpires: {
            type: DataTypes.DATE,
        }
    });
    return User;
};

export default userModel;