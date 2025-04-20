import Requirement from 'src/models/requirement';
import Document from 'src/models/document';
import DocumentType from 'src/models/document-type';

export default class RequirementService {
  static async getAllRequirements(companyId) {
    const requirements = await Requirement.findAll({
      include: [
        {
          model: DocumentType,
          required: false,
          through: { attributes: [] },
          include: [
            {
              model: Document,
              where: { companyId },
              required: false,
            },
          ],
        },
      ],
    });
    const now = new Date();

    const enrichedRequirements = requirements.map((requirement) => {
      const isValid = this.getRequirementStatus(requirement, now);
      return {
        id: requirement.id,
        name: requirement.name,
        descriprion: requirement.description,
        status: isValid ? 'valid' : 'invalid',
      };
    });

    return enrichedRequirements;
  }

  static async getRequirementDetails(requirementId, companyId) {
    const requirement = await Requirement.findOne({
      where: { id: requirementId },
      include: [
        {
          model: DocumentType,
          required: false,
          through: { attributes: [] },
          include: [
            {
              model: Document,
              where: { companyId },
              order: [['createdAt', 'DESC']],
              required: false,
            },
          ],
        },
      ],
    });

    const now = new Date();
    const isValid = this.getRequirementStatus(requirement, now);
    return {
      id: requirement.id,
      name: requirement.name,
      descriprion: requirement.description,
      status: isValid ? 'valid' : 'invalid',
      documentTypes: requirement.DocumentTypes,
    };
  }

  static getRequirementStatus(requirement, date) {
    const isValid = requirement.DocumentTypes.every((docType) =>
      docType.Documents.some(
        (doc) => doc.status === 'validated' && new Date(doc.expiresAt) > date
      )
    );
    return isValid;
  }
}
