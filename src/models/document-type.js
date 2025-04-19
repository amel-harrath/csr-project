import { Model } from 'sequelize';

export default class DocumentType extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        slug: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
      },
      {
        sequelize,
        modelName: 'DocumentType',
        tableName: 'document_types',
        underscored: true,
        timestamps: true,
      }
    );
  }
  static associate(models) {
    DocumentType.belongsToMany(models.Requirement, {
      through: 'requirement_document_type',
      foreignKey: 'document_type_id',
      as: 'requirements',
    });
    DocumentType.hasMany(models.Document, {
      foreignKey: 'documentTypeId',
    });
  }
}
