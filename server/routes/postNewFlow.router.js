import express from 'express';
import pool from '../modules/pool.js';

const postNewFlow = express.Router();

postNewFlow.post('/', async ( req, res ) => {
    const newFlowData = req.body;
    const newStepArray = req.body.steps[0];
    console.log(newStepArray);
    // This will have an array of steps in that we have to loop through
    try {
      // Begin a transaction
      await pool.query('BEGIN');
        //Start with building the flow column, this gives us the id.
        const newFlow = await pool.query(`INSERT INTO "flows" (title, is_published)
                                            VALUES ($1, true)
                                                RETURNING id`, [newFlowData.title]);      
        const newFlowId = newFlow.rows[0].id;

        // Then we are going to the versions table and creating the new version based on the flow ID,
        // It is automatically set to one. 
        const newVersion = await pool.query(`INSERT INTO "versions" (flow_id)
                                                    VALUES ($1)
                                                        RETURNING id`, [newFlowId])
        // Returning the id for this to send to the version steps table. 
        const newVersionId = newVersion.rows[0].id   

        //Then we loop through the newStepArray, and add the steps one at a time.  
            for (const step of newStepArray) {
              console.log('This is the step loop:', step);
                //  Start with the first step in the array and pupulate the step row with the first object
                const newStepResult = await pool.query(`INSERT INTO "steps" (instructions, content) 
                                                            VALUES ($1, $2) 
                                                            RETURNING id`, [step.steps.instructions, step.steps.content]);  
                // Return the id of that newly created object
                const newStepId = newStepResult.rows[0].id;
                                                
                // Add the new step to the version_steps table with the newly created version id from newVersion, 
                // And the newStepId from newStepId
                const newVersionSteps = await pool.query(`INSERT INTO "version_steps" (versions_id, steps_id ) 
                                                            VALUES ($1, $2)
                                                                RETURNING versions_id`, [newVersionId, newStepId]);
        
                //Repeat until there are no steps left. 
            }
      // Commit the transaction
      await pool.query('COMMIT');
      res.status(201).json({ message: 'Step added successfully' });
    } catch (error) {
      // Rollback the transaction in case of an error
      await pool.query('ROLLBACK');
      console.error('Error adding step:', error);
      res.sendStatus(500);
    }
})

export default postNewFlow