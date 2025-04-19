import { Model } from 'sequelize';
export default class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        companyId: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(models) {
    User.belongsTo(models.Company, { foreignKey: 'companyId' });
  }
}
