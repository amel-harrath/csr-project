import xlsx from 'xlsx';
import db from 'src/models/index.js';

const excelFilePath = 'src/utils/assets/data.xlsx';

async function seedDatabase() {
  // Read the Excel file
  const workbook = xlsx.readFile(excelFilePath);
  const requirements = workbook.SheetNames[0];
  const documentTypes = workbook.SheetNames[1];

  const requirementsWorksheet = workbook.Sheets[requirements];
  const documentTypeWorksheet = workbook.Sheets[documentTypes];

  // Parse the data into JSON
  const requirementsData = xlsx.utils.sheet_to_json(requirementsWorksheet);
  const documentTypesData = xlsx.utils.sheet_to_json(documentTypeWorksheet);

  const transaction = await db.sequelize.transaction();

  try {
    const documentTypeMap = new Map();

    // Prepare queries to insert document types
    const documentTypesInserts = documentTypesData.map(async (row) => {
      // Insert document type if not exists
      const [type] = await db.sequelize.query(
        `INSERT INTO document_types ("slug", "name", "description", "created_at", "updated_at") 
         VALUES (:slug, :name, :description, NOW(), NOW()) 
         ON CONFLICT ("slug") DO NOTHING
         RETURNING "id"`,
        {
          replacements: {
            slug: row.Document,
            name: row.name,
            description: row.description,
          },
          transaction,
        }
      );
      const documentTypeId = type[0]?.id;
      documentTypeMap.set(row.Document, documentTypeId);
    });

    // Execute document types insertion
    await Promise.all([...documentTypesInserts]);

    // Prepare queries to insert requirements and the mapping
    const requirementInserts = requirementsData.map(async (row) => {
      const documentSlugs = row.document.split(',').map((slug) => slug.trim());

      const documentTypeIds = [];

      for (const slug of documentSlugs) {
        const documentTypeId = documentTypeMap.get(slug);
        if (documentTypeId !== undefined) {
          documentTypeIds.push(documentTypeId);
        }
      }

      if (documentTypeIds.length === 0) {
        console.log(`Skipped requirement: ${row.name} `);
        return;
      }

      const [requirement] = await db.sequelize.query(
        `INSERT INTO requirements ("name", "description", "created_at", "updated_at") 
         VALUES (:name, :description, NOW(), NOW()) 
         ON CONFLICT ("name") DO NOTHING
         RETURNING "id"`,
        {
          replacements: {
            name: row.name,
            description: row.description,
          },
          transaction,
        }
      );
      const requirementId = requirement[0]?.id;

      if (requirementId) {
        // Create associations in the requirement_document_type table
        const insertAssociations = documentTypeIds.map(
          async (documentTypeId) => {
            await db.sequelize.query(
              `INSERT INTO requirement_document_type ("requirement_id", "document_type_id", "created_at", "updated_at") 
             VALUES (:requirement_id, :document_type_id, NOW(), NOW()) 
             ON CONFLICT ("requirement_id", "document_type_id") DO NOTHING`,
              {
                replacements: {
                  requirement_id: requirementId,
                  document_type_id: documentTypeId,
                },
                transaction,
              }
            );
          }
        );

        await Promise.all(insertAssociations);
      }
    });

    await Promise.all([...requirementInserts]);

    await transaction.commit();
    console.log('Database seeded successfully');
  } catch (error) {
    // Rollback the transaction if there is an error
    await transaction.rollback();
    console.error('Error seeding the database:', error);
  }
}

seedDatabase();
