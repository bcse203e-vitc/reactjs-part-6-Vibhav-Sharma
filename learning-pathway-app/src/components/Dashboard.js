import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
} from '@mui/material';
import {
  School as SchoolIcon,
  Timeline as TimelineIcon,
  EmojiEvents as EmojiEventsIcon,
  Forum as ForumIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const skill = localStorage.getItem('selectedSkill');
    if (skill) {
      setSelectedSkill(JSON.parse(skill));
    }
  }, []);

  // Example progress data for the chart
  const progressData = [
    { name: 'Week 1', progress: 25 },
    { name: 'Week 2', progress: 50 },
    { name: 'Week 3', progress: 75 },
    { name: 'Week 4', progress: 100 },
  ];

  // Example achievements
  const availableAchievements = [
    { id: 1, title: 'First Milestone', description: 'Complete your first learning milestone', icon: '🎯' },
    { id: 2, title: 'Streak Master', description: 'Maintain a 7-day learning streak', icon: '🔥' },
    { id: 3, title: 'Quiz Champion', description: 'Score 100% on any quiz', icon: '🏆' },
    { id: 4, title: 'Resource Explorer', description: 'Complete all resources in a module', icon: '📚' },
  ];

  const handleStartLearning = () => {
    navigate('/select-skill');
  };

  const handleContinueLearning = () => {
    navigate('/roadmap');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Your Learning Journey
      </Typography>

      {!selectedSkill ? (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Get Started with Your Learning Path
            </Typography>
            <Typography variant="body1" paragraph>
              Choose a skill you want to master and we'll create a personalized learning pathway for you.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SchoolIcon />}
              onClick={handleStartLearning}
            >
              Start Learning
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {/* Progress Overview */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Progress in {selectedSkill.title}
                </Typography>
                <Box sx={{ width: '100%', mb: 2 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                  <Typography variant="body2" color="text.secondary" align="right" sx={{ mt: 1 }}>
                    {progress}% Complete
                  </Typography>
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="progress" stroke="#2196f3" />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleContinueLearning}
                >
                  Continue Learning
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Stats
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <TimelineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Current Streak"
                      secondary={`${streak} days`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <SchoolIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Modules Completed"
                      secondary="2/4"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmojiEventsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Achievements"
                      secondary="3 unlocked"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Achievements */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Achievements
                </Typography>
                <Grid container spacing={2}>
                  {availableAchievements.map((achievement) => (
                    <Grid item xs={12} sm={6} md={3} key={achievement.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Typography variant="h4" sx={{ mr: 1 }}>
                              {achievement.icon}
                            </Typography>
                            <Typography variant="subtitle2">
                              {achievement.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {achievement.description}
                          </Typography>
                          <Chip
                            label="Unlocked"
                            color="success"
                            size="small"
                            sx={{ mt: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Learning Milestones */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Learning Milestones
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="HTML & CSS Fundamentals"
                      secondary="Completed"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="JavaScript Essentials"
                      secondary="Completed"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <UncheckedIcon color="disabled" />
                    </ListItemIcon>
                    <ListItemText
                      primary="React Development"
                      secondary="In Progress"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <UncheckedIcon color="disabled" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Backend Development"
                      secondary="Not Started"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard; 