const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const userRoutes = require('./routes/userRoutes');
const snippetRoutes = require('./routes/snippetRoutes');

//  Use routes
app.use('/api/users', userRoutes);
app.use('/api/snippets', snippetRoutes);

console.log("UserRoutes:", typeof userRoutes);
console.log("SnippetRoutes:", typeof snippetRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' DB connection failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
