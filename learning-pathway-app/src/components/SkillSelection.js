import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { toast } from 'react-toastify';

const skills = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Learn modern web development with React, Node.js, and databases',
    image: 'https://source.unsplash.com/random/400x300?web-development',
    duration: '6 months',
    level: 'Beginner to Advanced',
  },
  {
    id: 2,
    title: 'Data Science',
    description: 'Master data analysis, machine learning, and visualization',
    image: 'https://source.unsplash.com/random/400x300?data-science',
    duration: '8 months',
    level: 'Intermediate',
  },
  {
    id: 3,
    title: 'Cybersecurity',
    description: 'Learn about network security, ethical hacking, and security protocols',
    image: 'https://source.unsplash.com/random/400x300?cybersecurity',
    duration: '7 months',
    level: 'Intermediate',
  },
  {
    id: 4,
    title: 'Mobile Development',
    description: 'Build cross-platform mobile apps with React Native',
    image: 'https://source.unsplash.com/random/400x300?mobile-app',
    duration: '6 months',
    level: 'Beginner to Advanced',
  },
];

const SkillSelection = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    // Save selected skill to localStorage
    localStorage.setItem('selectedSkill', JSON.stringify(selectedSkill));
    toast.success(`Selected ${selectedSkill.title} learning path!`);
    setOpenDialog(false);
    navigate('/roadmap');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Select Your Learning Path
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Choose a skill you want to master and we'll create a personalized learning pathway for you.
      </Typography>

      <Grid container spacing={4}>
        {skills.map((skill) => (
          <Grid item xs={12} sm={6} md={3} key={skill.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={skill.image}
                alt={skill.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {skill.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {skill.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {skill.duration}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Level: {skill.level}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => handleSkillSelect(skill)}
                >
                  Select Path
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Learning Path Selection</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to start learning {selectedSkill?.title}?
            This will create a personalized learning pathway for you.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SkillSelection; 