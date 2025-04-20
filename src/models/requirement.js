import { Model } from 'sequelize';

export default class Requirement extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: 'Requirement',
        tableName: 'requirements',
        underscored: true,
        timestamps: true,
        defaultScope: {
          attributes: ['id', 'name', 'description'],
        },
      }
    );
  }
  static associate(models) {
    Requirement.belongsToMany(models.DocumentType, {
      through: 'requirement_document_type',
      foreignKey: 'requirement_id',
    });
  }
}
