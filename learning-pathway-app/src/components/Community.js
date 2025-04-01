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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Community = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const skill = localStorage.getItem('selectedSkill');
    if (skill) {
      setSelectedSkill(JSON.parse(skill));
    }
  }, []);

  // Example posts data
  const examplePosts = [
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=1',
      content: 'Just completed the HTML & CSS module! Any tips for JavaScript?',
      timestamp: '2 hours ago',
      likes: 15,
      dislikes: 2,
      comments: 5,
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'https://i.pravatar.cc/150?img=2',
      content: 'Looking for study buddies for the React module. Anyone interested?',
      timestamp: '5 hours ago',
      likes: 8,
      dislikes: 0,
      comments: 3,
    },
    {
      id: 3,
      author: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=3',
      content: 'Can someone explain the concept of hooks in React?',
      timestamp: '1 day ago',
      likes: 12,
      dislikes: 1,
      comments: 7,
    },
  ];

  useEffect(() => {
    setPosts(examplePosts);
  }, []);

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast.error('Please enter some content for your post');
      return;
    }

    const post = {
      id: posts.length + 1,
      author: 'Current User',
      avatar: 'https://i.pravatar.cc/150?img=4',
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      dislikes: 0,
      comments: 0,
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setOpenDialog(false);
    toast.success('Post created successfully!');
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleDislike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, dislikes: post.dislikes + 1 }
        : post
    ));
  };

  const handleComment = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Community Discussion
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Create Post
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedSkill.title} Discussion Forum
              </Typography>
              <List>
                {posts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={post.avatar} alt={post.author} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography component="span" variant="subtitle1">
                              {post.author}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {post.timestamp}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography
                            component="span"
                            variant="body1"
                            color="text.primary"
                            sx={{ display: 'block', mt: 1 }}
                          >
                            {post.content}
                          </Typography>
                        }
                      />
                      <ListItemSecondaryAction>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton onClick={() => handleLike(post.id)}>
                            <ThumbUpIcon color="primary" />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                              {post.likes}
                            </Typography>
                          </IconButton>
                          <IconButton onClick={() => handleDislike(post.id)}>
                            <ThumbDownIcon color="error" />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                              {post.dislikes}
                            </Typography>
                          </IconButton>
                          <IconButton onClick={() => handleComment(post)}>
                            <CommentIcon />
                            <Typography variant="caption" sx={{ ml: 0.5 }}>
                              {post.comments}
                            </Typography>
                          </IconButton>
                          <IconButton>
                            <ShareIcon />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < posts.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPost ? 'Add a Comment' : 'Create a New Post'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={selectedPost ? 'Your Comment' : 'What\'s on your mind?'}
            fullWidth
            multiline
            rows={4}
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreatePost} variant="contained" color="primary">
            {selectedPost ? 'Comment' : 'Post'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Community; 