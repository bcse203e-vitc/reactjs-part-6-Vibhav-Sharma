import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  LinearProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';

const Quizzes = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizProgress, setQuizProgress] = useState(0);

  useEffect(() => {
    const skill = localStorage.getItem('selectedSkill');
    if (skill) {
      setSelectedSkill(JSON.parse(skill));
    }
  }, []);

  // Example quiz data
  const quizData = {
    'Web Development': [
      {
        title: 'HTML & CSS Quiz',
        questions: [
          {
            question: 'What does HTML stand for?',
            options: [
              'Hyper Text Markup Language',
              'High Text Markup Language',
              'Hyperlink and Text Markup Language',
              'Home Tool Markup Language',
            ],
            correctAnswer: 'Hyper Text Markup Language',
          },
          {
            question: 'Which CSS property is used to change the text color?',
            options: [
              'text-color',
              'color',
              'font-color',
              'text-style',
            ],
            correctAnswer: 'color',
          },
          {
            question: 'What is the correct HTML element for inserting a line break?',
            options: [
              '<break>',
              '<lb>',
              '<br>',
              '<linebreak>',
            ],
            correctAnswer: '<br>',
          },
        ],
      },
      {
        title: 'JavaScript Quiz',
        questions: [
          {
            question: 'What is JavaScript?',
            options: [
              'A programming language',
              'A markup language',
              'A styling language',
              'A database language',
            ],
            correctAnswer: 'A programming language',
          },
          {
            question: 'Which operator is used for strict equality in JavaScript?',
            options: [
              '==',
              '===',
              '=',
              '==>',
            ],
            correctAnswer: '===',
          },
        ],
      },
    ],
  };

  const startQuiz = (quizIndex) => {
    setCurrentQuiz(quizData[selectedSkill.title][quizIndex]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResults(false);
    setQuizProgress(0);
  };

  const handleAnswerSelect = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      toast.error('Please select an answer!');
      return;
    }

    if (selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
      toast.success('Correct answer!');
    } else {
      toast.error('Incorrect answer. Try again!');
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setQuizProgress(((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResults(false);
    setQuizProgress(0);
  };

  if (!selectedSkill) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5" color="text.secondary" align="center">
          Please select a learning path first
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Knowledge Check
      </Typography>

      {!currentQuiz ? (
        <Grid container spacing={3}>
          {quizData[selectedSkill.title].map((quiz, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {quiz.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {quiz.questions.length} questions
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => startQuiz(index)}
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent>
            <Box sx={{ width: '100%', mb: 3 }}>
              <LinearProgress
                variant="determinate"
                value={quizProgress}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
                Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom>
              {currentQuiz.questions[currentQuestionIndex].question}
            </Typography>

            <FormControl component="fieldset" sx={{ mt: 2 }}>
              <RadioGroup value={selectedAnswer} onChange={handleAnswerSelect}>
                {currentQuiz.questions[currentQuestionIndex].options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={handleRestart}
                disabled={currentQuestionIndex === 0}
              >
                Restart
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedAnswer}
              >
                {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      <Dialog open={showResults} onClose={() => setShowResults(false)}>
        <DialogTitle>Quiz Results</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Your Score: {score} out of {currentQuiz?.questions.length}
          </Typography>
          <Typography variant="body1">
            Percentage: {((score / currentQuiz?.questions.length) * 100).toFixed(1)}%
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowResults(false)}>Close</Button>
          <Button onClick={handleRestart} variant="contained" color="primary">
            Try Again
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Quizzes; 