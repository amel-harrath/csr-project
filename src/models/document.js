import { Model } from 'sequelize';

export default class Document extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        fileLink: DataTypes.STRING,
        status: {
          type: DataTypes.STRING,
          defaultValue: 'submitted',
        },
        expiresAt: DataTypes.DATE,
        companyId: DataTypes.INTEGER,
        documentTypeId: DataTypes.INTEGER,
      },
      {
        sequelize,
        modelName: 'Document',
        tableName: 'documents',
        underscored: true,
        timestamps: true,
      }
    );
  }

  static associate(models) {
    Document.belongsTo(models.Company, { foreignKey: 'companyId' });
    Document.belongsTo(models.DocumentType, {
      foreignKey: 'documentTypeId',
    });
  }
}
