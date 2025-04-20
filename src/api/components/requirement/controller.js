import RequirementService from 'src/services/requirement';

export default class RequirementController {
  async getAllRequirements(req, res) {
    try {
      const { user } = req;
      const companyId = user.companyId;
      const requirements = await RequirementService.getAllRequirements(
        companyId
      );
      return res.status(200).json(requirements);
    } catch (error) {
      console.error('Error fetching requirements:', error);
      next(error);
    }
  }

  async getRequirementDetails(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;
      const companyId = user.companyId;
      const requirementDetails = await RequirementService.getRequirementDetails(
        id,
        companyId
      );
      return res.status(200).json(requirementDetails);
    } catch (error) {
      console.error('Error fetching requirement details:', error);
      next(error);
    }
  }
}
