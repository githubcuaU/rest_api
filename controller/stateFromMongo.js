
const States = require("../model/States");
  
// get all states
const getAllStates = async (req, res) => 
{
    const states = await States.find();
    if (!states) 
    {
        return res.status(400).json({ message: "No states are found!" });
    }
    res.json(states);
};

// get state
const getState = async (req, res) => 
{
    if (!req?.params?.id) 
    {
        return res.status(400).json({ message: "State id is required!" });
    }

    const state = await States.findOne({ _id: req.params.id }).exec();

    if (!state) 
    {
        res
        .status(400)
        .json({ message: `No state matches with ID ${req.params.id} ` });
    }
    res.json(state);
};


// create new state
const createNewState = async (req, res) => 
{
    if (!req.body?.stateCode) 
    {
        return res
        .status(400)
        .json({ message: "State code is required!" });
    }
    try 
    {
        const result = await States.create
        ({
            stateCode: req.body.stateCode,
            funfacts: req.body.funfacts,
        });
        res.status(201).json(result);
    } 
    catch (error) 
    {
        console.log(error);
    }
};


// update state
const updateState = async (req, res) => 
{
    if (!req.body?.id) 
    {
        return res.status(400).json({ message: "State id is required!" });
    }

    const state = await States.findOne({ _id: req.body.id }).exec();

    if (!state) 
    {
        res
        .status(400)
        .json({ message: `No state matches with ID ${req.body.id}` });
    }

    if (req.body?.stateCode) state.stateCode = req.body.stateCode;
    const result = await state.save();
    res.json(result);
};


// delete state
const deleteState = async (req, res) => 
{
    if (!req.body?.id) 
    {
        return res.status(400).json({ message: "State id is required!" });
    }

    const state = await States.findOne({ _id: req.body.id }).exec();

    if (!state) 
    {
        res
        .status(400)
        .json({ message: `No state matches with ID ${req.body.id}` });
    }
    const result = await state.deleteOne({ _id: req.body.id });
    res.json(result);
};


module.exports = 
{
    getAllStates,
    getState,
    createNewState,
    updateState,
    deleteState,
};