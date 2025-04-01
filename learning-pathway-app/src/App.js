import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import SkillSelection from './components/SkillSelection';
import Roadmap from './components/Roadmap';
import ProgressTracker from './components/ProgressTracker';
import Quizzes from './components/Quizzes';
import Certificate from './components/Certificate';
import Community from './components/Community';

// Create theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <main style={{ padding: '20px', marginTop: '64px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/select-skill" element={<SkillSelection />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/progress" element={<ProgressTracker />} />
              <Route path="/quizzes" element={<Quizzes />} />
              <Route path="/certificate" element={<Certificate />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </main>
          <ToastContainer position="bottom-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 