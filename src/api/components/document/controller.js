import DocumentService from 'src/services/document';

export default class DocumentController {
  async addDocument(req, res, next) {
    try {
      const user = req.user;
      const companyId = user.companyId;

      const { file, expirationDate, documentType } = req.body;
      const newDoc = await DocumentService.addDocument(
        documentType,
        companyId,
        expirationDate,
        file
      );
      return res.status(201).json(newDoc);
    } catch (error) {
      console.error('Error creating document:', error);
      return next(error);
    }
  }

  async updateDocumentStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedDocument = await DocumentService.updateDocument(id, status);
      return res.status(200).json(updatedDocument);
    } catch (error) {
      console.error('Error updating document status:', error);
      next(error);
    }
  }

  async deleteDocument(req, res) {
    try {
      const { id } = req.params;
      await DocumentService.deleteDocument(id);
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting document:', error);
      next(error);
    }
  }

  async getAllDocuments(req, res) {
    try {
      const user = req.user;
      const companyId = user.companyId;
      const documents = await DocumentService.getAllDocuments(companyId);
      return res.status(200).json(documents);
    } catch (error) {
      console.error('Error fetching documents:', error);
      next(error);
    }
  }
  async getAllDocumentTypes(req, res) {
    try {
      const documentTypes = await DocumentService.getAllDocumentTypes();
      return res.status(200).json(documentTypes);
    } catch (error) {
      console.error('Error fetching documents:', error);
      next(error);
    }
  }
}
