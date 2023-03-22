import express from 'express';
import pool from '../modules/pool.js';

const router = express.Router();

//Get all flows from the flows table
router.get('/', (req, res) => {
  pool
    .query(`SELECT * FROM "flows";`)
    .then(results => {
      res.send(results.rows);
      console.log(results.rows);
    })
    .catch(error => {
      console.log('Error making SELECT for flows:', error);
      res.sendStatus(500);
    });
});

//Get flow titles and latest versions of each flow
router.get('/latest-versions', async (req, res) => {
    try {
        const query = `
            SELECT
                flows.id,
                flows.title,
                flows.is_published,
                flows.current_version_id,
                versions.id AS version_id,
                versions.flow_id,
                versions.versions_number
            FROM
                flows
            LEFT JOIN
                versions ON flows.id = versions.flow_id
            WHERE
                versions.versions_number = (
                    SELECT
                        MAX(versions_number)
                    FROM
                        versions v
                    WHERE
                        v.flow_id = flows.id
                );
        `;

        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching latest versions:', error);
        res.sendStatus(500);
    }
});



export default router;

