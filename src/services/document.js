import Document from 'src/models/document';
import DocumentType from 'src/models/document-type';
import CustomError from 'src/utils/errors';

export default class DocumentService {
  static async addDocument(documentTypeSlug, companyId, expiresAt, fileLink) {
    const documentType = await DocumentType.findOne({
      where: { slug: documentTypeSlug },
    });
    if (!documentType) {
      throw new CustomError(
        'Document type not found',
        'DOCUMENT_TYPE_NOT_FOUND',
        404
      );
    }
    const document = await Document.create({
      documentTypeId: documentType.id,
      companyId,
      expiresAt,
      fileLink,
    });
    return document;
  }

  static async updateDocument(documentId, status) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new CustomError('Document not found', 'DOCUMENT_NOT_FOUND', 404);
    }
    document.status = status;
    await document.save();
    return document;
  }

  static async deleteDocument(documentId) {
    const document = await Document.findByPk(documentId);
    if (document) {
      await document.destroy();
    }
  }
  static async getAllDocuments(companyId) {
    const documentTypes = await DocumentType.findAll({
      attributes: ['id', 'name', 'description'],
      include: [
        {
          model: Document,
          attributes: ['id', 'fileLink', 'status', 'expiresAt'],
          where: { companyId },
          required: false,
        },
      ],
    });
    const today = new Date();
    await Promise.all(
      documentTypes.map(async (docType) => {
        const documents = docType.Documents || [];

        await Promise.all(
          documents.map(async (doc) => {
            if (doc.expiresAt && new Date(doc.expiresAt) < today) {
              doc.status = 'expired';
              await doc.save();
            }
          })
        );
      })
    );
    return documentTypes;
  }
}
