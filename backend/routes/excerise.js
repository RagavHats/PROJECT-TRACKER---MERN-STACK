const router = require('express').Router();
let Exercies = require('../modules/exercies.module');

router.route('/').get((req,res) => {
    Exercies.find()
    .then(exercies => res.json(exercies))
    .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const newExercise = new Exercies({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
    .then(() => res.json('exercise Added'))
    .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/:id').get((req,res) =>{
    Exercies.findById(req.params.id)
    .then(exercies => res.json(exercies))
    .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/:id').delete((req,res) =>{
    Exercies.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exerice Deleted"))
    .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/update/:id').post((req,res) =>{
    Exercies.findById(req.params.id)
    .then(exercies => {
        exercies.username = req.body.username;
        exercies.description = req.body.description;
        exercies.duration = Number(req.body.duration);
        exercies.date = Date.parse(req.body.date);

        exercies.save()
        .then(() => res.json("Exerice Updated"))
         .catch(err => res.status(400).json('Error : ' + err));
    })
    .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;