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

// find student by id

router.get("/:studentId", async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});



//Give score to a student
router.post('/:studentId/score', async (req, res) => {
  const { studentId } = req.params;
  const { score, type } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).send({ error: 'Student not found' });
    }

    student.score.push({ score, type });
    await student.save();

    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update a student's score by score type
router.put('/:studentId/score/:scoreType', async (req, res) => {
    const { studentId, scoreType } = req.params;
    const { score } = req.body;
  
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).send({ error: 'Student not found' });
      }
  
      const existingScoreIndex = student.score.findIndex(s => s.type === scoreType);
      if (existingScoreIndex === -1) {
        return res.status(404).send({ error: 'Score type not found' });
      }
  
      student.score[existingScoreIndex].score = score;
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