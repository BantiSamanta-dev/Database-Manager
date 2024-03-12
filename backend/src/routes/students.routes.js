import express from 'express';
import Student from '../models/student.models.js';

const router = express.Router();

// create students

router.post('/', async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).send(student);
    } catch (err) {
      res.status(400).send(err);
    }
  });

// get all students

router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Give score to a student
router.post('/:studentId/scores', async (req, res) => {
  const { studentId } = req.params;
  const { score, type } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    student.scores.push({ score, type });
    await student.save();

    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a student's score by score type
router.put('/:studentId/scores/:scoreType', async (req, res) => {
  const { studentId, scoreType } = req.params;
  const { score } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    const existingScoreIndex = student.scores.findIndex(s => s.type === scoreType);
    if (existingScoreIndex === -1) {
      return res.status(404).send({ error: 'Score type not found' });
    }

    student.scores[existingScoreIndex].score = score;
    await student.save();

    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a student
router.delete('/:studentId', async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findByIdAndDelete(studentId);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});



export default router