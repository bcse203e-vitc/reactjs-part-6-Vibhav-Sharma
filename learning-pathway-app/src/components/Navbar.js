import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import {
  School as SchoolIcon,
  Timeline as TimelineIcon,
  Quiz as QuizIcon,
  EmojiEvents as EmojiEventsIcon,
  Forum as ForumIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';

const Navbar = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <SchoolIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Learning Pathway
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<TimelineIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/select-skill"
            startIcon={<SchoolIcon />}
          >
            Select Skill
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/progress"
            startIcon={<TimelineIcon />}
          >
            Progress
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/quizzes"
            startIcon={<QuizIcon />}
          >
            Quizzes
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/certificate"
            startIcon={<EmojiEventsIcon />}
          >
            Certificate
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/community"
            startIcon={<ForumIcon />}
          >
            Community
          </Button>
          <IconButton color="inherit" onClick={toggleTheme}>
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 