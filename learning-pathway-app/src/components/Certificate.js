import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Grid,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';

const Certificate = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [userName, setUserName] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const skill = localStorage.getItem('selectedSkill');
    if (skill) {
      setSelectedSkill(JSON.parse(skill));
    }
    setCompletionDate(new Date().toLocaleDateString());
  }, []);

  const generateCertificate = () => {
    if (!userName) {
      toast.error('Please enter your name');
      return;
    }

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Add background
    doc.setFillColor(240, 240, 240);
    doc.rect(0, 0, 297, 210, 'F');

    // Add border
    doc.setDrawColor(41, 128, 185);
    doc.setLineWidth(2);
    doc.rect(10, 10, 277, 190);

    // Add header
    doc.setFontSize(30);
    doc.setTextColor(41, 128, 185);
    doc.text('Certificate of Completion', 148.5, 40, { align: 'center' });

    // Add content
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('This is to certify that', 148.5, 60, { align: 'center' });

    doc.setFontSize(25);
    doc.setTextColor(41, 128, 185);
    doc.text(userName, 148.5, 85, { align: 'center' });

    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text('has successfully completed the course in', 148.5, 110, { align: 'center' });

    doc.setFontSize(25);
    doc.setTextColor(41, 128, 185);
    doc.text(selectedSkill?.title || 'Web Development', 148.5, 135, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(`Completed on: ${completionDate}`, 148.5, 160, { align: 'center' });

    // Add signature
    doc.setFontSize(14);
    doc.text('Course Instructor', 148.5, 180, { align: 'center' });

    // Save the PDF
    doc.save(`certificate-${userName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
    toast.success('Certificate downloaded successfully!');
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
        Certificate of Completion
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generate Your Certificate
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Completion Date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  margin="normal"
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={() => setShowPreview(true)}
                  sx={{ mt: 2 }}
                >
                  Preview Certificate
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={generateCertificate}
                  sx={{ mt: 2 }}
                >
                  Download Certificate
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Certificate Details
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" paragraph>
                  <strong>Course:</strong> {selectedSkill.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Duration:</strong> {selectedSkill.duration}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Level:</strong> {selectedSkill.level}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Completion Date:</strong> {completionDate}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Certificate Preview</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              p: 4,
              bgcolor: '#f0f0f0',
              border: '2px solid #2980b9',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" color="primary" gutterBottom>
              Certificate of Completion
            </Typography>
            <Typography variant="h6" paragraph>
              This is to certify that
            </Typography>
            <Typography variant="h4" color="primary" paragraph>
              {userName}
            </Typography>
            <Typography variant="h6" paragraph>
              has successfully completed the course in
            </Typography>
            <Typography variant="h4" color="primary" paragraph>
              {selectedSkill.title}
            </Typography>
            <Typography variant="body1" paragraph>
              Completed on: {completionDate}
            </Typography>
            <Typography variant="body2">
              Course Instructor
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPreview(false)}>Close</Button>
          <Button onClick={generateCertificate} variant="contained" color="primary">
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Certificate; 