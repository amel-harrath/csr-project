import { Model } from 'sequelize';

export default class Company extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Company',
        tableName: 'companies',
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(models) {
    Company.hasMany(models.User, { foreignKey: 'companyId' });
    Company.hasMany(models.Document, { foreignKey: 'companyId' });
  }
}
