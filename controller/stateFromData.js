
const data = 
{
    states: require("../model/states.json"),
    setState(data) 
    {
        this.states = data;
    },
};
  
// get states
const getAllStates = (req, res) => 
{
    res.json(data.states);
};


// get state
const getState = (req, res) => 
{
    const stateCode = req.params.stateCode;
    const state = data.states.find((state) => state.code === stateCode);
    
    if (!state) 
    {
        return res.status(400).json({ message: `State is not found.` });
    }
    res.json(state);
};

// get capital
const getCapital = (req, res) => 
{
    const stateCode = req.params.stateCode;
    const state = data.states.find((state) => state.code === stateCode);
    
    if (!state.capital_city) 
    {
        return res.status(400).json({ message: `Capital is not found.` });
    }

    res.json
    ({  
        message: `State: ${state.state} , Capital: ${state.capital_city}` 
    });
};


// get nickname
const getNickName = (req, res) => 
{
    const stateCode = req.params.stateCode;
    const state = data.states.find((state) => state.code === stateCode);
    
    if (!state.nickname) 
    {
        return res.status(400).json({ message: `Nickname is not found.` });
    }

    res.json
    ({  
        message: `State: ${state.state} , Nickname: ${state.nickname}` 
    });
};


// get population
const getPopulation = (req, res) => 
{
    const stateCode = req.params.stateCode;
    const state = data.states.find((state) => state.code === stateCode);
    
    if (!state.population) 
    {
        return res.status(400).json({ message: `Population is not found.` });
    }

    res.json
    ({  
        message: `State: ${state.state} , Population: ${state.population}` 
    });
};


// get admission
const getAdmission = (req, res) => 
{
    const stateCode = req.params.stateCode;
    const state = data.states.find((state) => state.code === stateCode);
    
    if (!state.admission_date) 
    {
        return res.status(400).json({ message: `Admission date is not found.` });
    }

    res.json
    ({  
        message: `State: ${state.state} , Admitted: ${state.admission_date}` 
    });
};


// get fun fact
const getFunFact = (req, res) => 
{
    const stateCode = req.params.stateCode;
    const state = data.states.find((state) => state.code === stateCode);
    
    if (!state.funfacts) 
    {
        return res.status(400).json({ message: `Fun fact is not found.` });
    }
    
    res.json
    ({  
        message: 
        `State: ${state.state} , Fun fact: ${
            state.funfacts[(Math.floor(Math.random() * state.funfacts.length))]
        }` 
    });
};
    

// create new state
const createNewState = (req, res) => 
{
    const newState = 
    {
        id: data.states.length
            ? data.states[data.states.length - 1].id + 1
            : 1,
        stateCode: req.body.stateCode,
        funfacts: req.body.funfacts,
    };

    if (!newState.stateCode) 
    {
        return res.status(400).json({ message: "State code is required." });
    }

    data.setState([...data.states, newState]);
    res.status(201).json(data.states);
};

  
// update state
const updateState = (req, res) => 
{
    const state = data.states.find
    (
        (st) => st.id === parseInt(req.body.id)
    );

    if (!state) 
    {
        return res
        .status(400)
        .json({ message: `State ${state} is not found.` });
    }

    if (req.body.stateCode) 
    {
        state.stateCode = req.body.stateCode;
    }
    if (req.body.funfacts) 
    {
        state.funfacts = req.body.funfacts;
    }

    const filteredArray = data.states.filter
    (
        (st) => st.id != parseInt(req.body.id)
    );

    const unsortedArray = [...filteredArray, state];

    data.setState
    (
        unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    );
    res.json(data.states);
};
  

// delete state
const deleteState = (req, res) => 
{
    const state = data.states.find
    (
        (st) => st.id === parseInt(req.body.id)
    );
    if (!state) 
    {
        return res
        .status(400)
        .json({ message: `State ${state} is not found.` });
    }

    const filteredArray = data.states.filter
    (
        (st) => st.id !== parseInt(req.body.id)
    );

    data.setState([...filteredArray]);
    res.json(data.states);
};
  

module.exports = 
{
      getAllStates,
      getState,
      getCapital,
      getNickName,
      getPopulation,
      getAdmission,
      getFunFact,
      createNewState,
      updateState,
      deleteState,
};