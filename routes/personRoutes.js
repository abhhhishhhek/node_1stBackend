const express = require('express')
const Person = require('./../models/Person')
const router = express.Router()


//POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body // Assuming the request body contains the person data

        // now, create a new person document using the mongoose model
        const newPerson = new Person(data)

        //save the new person to the database
        const response = await newPerson.save()
        console.log('data saved')
        res.status(200).json(response)

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internall server error' })
    }
})

//GET method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched')
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// ---------dynamic routing---------

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType
        if (workType == 'chef' || 'manager' || 'waiter') {
            const response = await Person.find({ work: workType })
            console.log('response added')
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: 'Invalid work type' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// Update route
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id // Extract the id from the URL parameter
        const updatedPersonData = req.body // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }

        console.log('data updated')
        res.status(200).json(response)

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' })
    }
})

// -------- DELETE Route ---------

router.delete('/:id',async(req,res)=>{
    try {
        
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId)

        if(!response){
            return res.status(404).json({error: 'Person not found'})
        }
        console.log('data delete');
        res.status(200).json({message:'person deleted'})

    } catch (error) {
        console.log(err)
        res.status(500).json({error: 'Internal Server Error'})
    }
})
 


module.exports = router