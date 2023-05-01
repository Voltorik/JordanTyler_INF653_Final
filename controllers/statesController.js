const States = require('../models/States');

const getAllStates = async (req, res) => {
    let states = req.states;
    const result = [];

    if (req.query.contig === 'true') {
        states = states.filter(state => state.code !== 'AK' && state.code !== 'HI');
    } else if (req.query.contig === 'false') {
        states = states.filter(state => state.code === 'AK' || state.code === 'HI');
    }

    const statesDB = await States.find();
    for (let i = 0; i < states.length; i++) {
      let find = statesDB.find(state => state.stateCode === states[i].code);
      if (find) {
        states[i].funfacts = find['funfacts'];
      }
    }
    
    res.status(200).json(states);
}

const getState = async (req, res) => {
    const stateDB = await States.findOne({stateCode: req.code});
    if (stateDB) {
        req.state.funfacts = stateDB.funfacts;
    }
    res.status(200).json(req.state);
}

const getFunFact = async (req, res) => {
    const stateDB = await States.findOne({stateCode: req.code});

    if (!stateDB) {
        return res.status(404).json({ 'message': 'No Fun Facts found for ' + req.state.state});
    }

    const result = {
        funfact: stateDB.funfacts[Math.floor(Math.random() * stateDB.funfacts.length)]
    }

    res.status(200).json(result);
}

const getStateCapital = (req, res) => {
    const result = {
        "state": req.state.state,
        "capital": req.state.capital_city
    }
    res.json(result);
}

const getStateNickname = (req, res) => {
    const result = {
        "state": req.state.state,
        "nickname": req.state.nickname
    }
    res.json(result);
}

const getStatePopulation = (req, res) => {
    const result = {
        "state": req.state.state,
        "population": req.state.population.toLocaleString('en-US')
    }
    res.json(result);
}

const getStateAdmission =  (req, res) => {
    const result = {
        "state": req.state.state,
        "admitted": req.state.admission_date.toLocaleString('en-US')
    }
    res.json(result);
}

const postFunFact = async (req, res) => {
    if (!req.body?.funfacts) {
        return res.status(400).json({ 'message': 'State fun facts value required'});
    } else if (!Array.isArray(req.body.funfacts)) {
        return res.status(400).json({ 'message': 'State fun facts value must be an array'});
    }
  
    // Does state have any fun facts
    const state = await States.findOne({stateCode: req.code});
    
    if (!state) {
        try {
            const result = await States.create({
                stateCode: req.code,
                funfacts: req.body.funfacts
            })
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
        }
    } else {
        try {
            state.funfacts = state.funfacts.concat(req.body.funfacts);
            const result = await state.save();
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
        }
    }
}

const updateFunFact = async (req, res) => {
    if (!req.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required'});
    } else if (!req.body?.funfact) {
        return res.status(400).json({ 'message': 'State fun fact value required'});
    }

    const stateDB = await States.findOne({stateCode: req.code});
    const index = req.body.index - 1;

    if (!stateDB) {
        return res.status(404).json({ 'message': 'No Fun Facts found for ' 
        + req.state.state});
    }
    
    if (req.body.index > stateDB.funfacts.length){
        return res.status(404).json({ 'message': 'No Fun Fact found at that index for ' 
        + req.state.state });
    }

    stateDB.funfacts.splice(index, 1, req.body.funfact);
    const result = await stateDB.save();
    res.status(200).json(result);
}


const deleteFunFact = async (req, res) => {
    if (!req.body?.index) {
        return res.status(400).json({ 'message': 'State fun fact index value required'});
    }

    const stateDB = await States.findOne({stateCode: req.code});
    const index = req.body.index - 1;

    if (!stateDB) {
        return res.status(404).json({ 'message': 'No Fun Facts found for ' 
        + req.state.state});
    }
    
    if (req.body.index > stateDB.funfacts.length){
        return res.status(404).json({ 'message': 'No Fun Fact found at that index for ' 
        + req.state.state });
    }

    stateDB.funfacts.splice(index, 1);
    const result = await stateDB.save();
    res.status(200).json(result);
}

module.exports= {
    getAllStates,
    getState,
    getFunFact,
    getStateCapital,
    getStateNickname,
    getStatePopulation,
    getStateAdmission,
    postFunFact,
    updateFunFact,
    deleteFunFact
}