import { Model } from 'sequelize';

export default class Requirement extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        documentTypeId: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Requirement',
        tableName: 'requirements',
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(models) {
    Requirement.belongsTo(models.DocumentType, {
      foreignKey: 'documentTypeId',
    });
  }
}
