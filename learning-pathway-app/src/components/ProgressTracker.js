import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
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
  EmojiEvents as AchievementIcon,
  LocalFireDepartment as StreakIcon,
  Timer as TimerIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ProgressTracker = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
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
        Your Learning Progress
      </Typography>

      <Grid container spacing={3}>
        {/* Progress Overview */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Progress
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
                  <BarChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#2196f3" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Learning Stats
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <StreakIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Current Streak"
                    secondary={`${streak} days`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TimerIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Time Spent"
                    secondary={`${timeSpent} hours`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Achievements
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
    </Container>
  );
};

export default ProgressTracker; 