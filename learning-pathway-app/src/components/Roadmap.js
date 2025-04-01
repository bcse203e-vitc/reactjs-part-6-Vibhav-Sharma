import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Roadmap = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const skill = localStorage.getItem('selectedSkill');
    if (!skill) {
      toast.error('Please select a skill first!');
      navigate('/select-skill');
      return;
    }
    setSelectedSkill(JSON.parse(skill));
  }, [navigate]);

  // Example roadmap data structure
  const roadmapData = {
    'Web Development': [
      {
        title: 'HTML & CSS Fundamentals',
        resources: [
          { type: 'Article', title: 'HTML Basics', link: '#' },
          { type: 'Video', title: 'CSS Layouts', link: '#' },
          { type: 'Quiz', title: 'HTML & CSS Quiz', link: '#' },
        ],
        duration: '2 weeks',
      },
      {
        title: 'JavaScript Essentials',
        resources: [
          { type: 'Article', title: 'JavaScript Basics', link: '#' },
          { type: 'Video', title: 'ES6 Features', link: '#' },
          { type: 'Quiz', title: 'JavaScript Quiz', link: '#' },
        ],
        duration: '3 weeks',
      },
      {
        title: 'React Development',
        resources: [
          { type: 'Article', title: 'React Components', link: '#' },
          { type: 'Video', title: 'React Hooks', link: '#' },
          { type: 'Quiz', title: 'React Quiz', link: '#' },
        ],
        duration: '4 weeks',
      },
      {
        title: 'Backend Development',
        resources: [
          { type: 'Article', title: 'Node.js Basics', link: '#' },
          { type: 'Video', title: 'Express.js', link: '#' },
          { type: 'Quiz', title: 'Backend Quiz', link: '#' },
        ],
        duration: '3 weeks',
      },
    ],
  };

  const handleNext = () => {
    if (activeStep === (roadmapData[selectedSkill?.title]?.length || 0) - 1) {
      toast.success('Congratulations! You\'ve completed the roadmap!');
      navigate('/certificate');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
      setProgress((prevProgress) => prevProgress + 25);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setProgress((prevProgress) => prevProgress - 25);
  };

  if (!selectedSkill) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Learning Roadmap: {selectedSkill.title}
      </Typography>
      
      <Box sx={{ width: '100%', mb: 4 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 10, borderRadius: 5 }}
        />
        <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
          {progress}% Complete
        </Typography>
      </Box>

      <Stepper activeStep={activeStep} alternativeLabel>
        {roadmapData[selectedSkill.title]?.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography variant="subtitle2">{step.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {step.duration}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {roadmapData[selectedSkill.title][activeStep].title}
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {roadmapData[selectedSkill.title][activeStep].resources.map((resource, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={resource.type}
                        color="primary"
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="subtitle2">{resource.title}</Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      href={resource.link}
                      target="_blank"
                    >
                      Access Resource
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={activeStep === roadmapData[selectedSkill.title].length - 1 ? <CheckCircleIcon /> : <UncheckedIcon />}
            >
              {activeStep === roadmapData[selectedSkill.title].length - 1 ? 'Complete' : 'Next'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Roadmap; 