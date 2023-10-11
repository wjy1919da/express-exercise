const express = require('express');
const router = express.Router();
const Joi = require('joi');
const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];
function validateCourse(course) {
    const schema = Joi.object({
        // id: Joi.number().integer().min(1).required(),
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}
router.post('/', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1, 
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.get('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});
router.put('/:id', (req, res) => {
    var course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    const {error} = validateCourse(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    course.name = req.body.name;
    res.send(course);
});
// router.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params);
// });
router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(courses);
});
module.exports = router;