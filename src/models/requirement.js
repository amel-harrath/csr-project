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
    Requirement.belongsToMany(models.DocumentType, {
      through: 'requirement_document_type',
      foreignKey: 'requirement_id',
      as: 'documentTypes',
    });
  }
}
