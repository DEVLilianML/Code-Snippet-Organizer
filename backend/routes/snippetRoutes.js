const express = require('express');
const router = express.Router();
const Snippet = require('../models/Snippet');
const auth = require('../middleware/authMiddleware');

// ✅ Get all snippets 
router.get('/', auth, async (req, res) => {
  try {
    const q = req.query.q || '';
    const searchRegex = new RegExp(q, 'i');

    const snippets = await Snippet.find({
      $or: [
        { title: searchRegex },
        { language: searchRegex },
        { tags: { $in: [searchRegex] } }
      ]
    }).sort({ createdAt: -1 });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch snippets' });
  }
});

// ✅ Create snippet
router.post('/', auth, async (req, res) => {
  try {
    const { title, language, tags, code } = req.body;

    const newSnippet = new Snippet({
      title,
      language,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      code,
      author: req.user.id
    });

    await newSnippet.save();
    res.status(201).json(newSnippet);
  } catch {
    res.status(400).json({ message: 'Failed to add snippet' });
  }
});

// ✅ Update snippet 
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, language, tags, code } = req.body;

    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (language !== undefined) updateFields.language = language;
    if (tags !== undefined)
      updateFields.tags = tags.split(',').map((t) => t.trim());
    if (code !== undefined) updateFields.code = code;

    const updated = await Snippet.findByIdAndUpdate(req.params.id, updateFields, {
      new: true
    });

    res.json(updated);
  } catch {
    res.status(500).json({ message: 'Failed to update snippet' });
  }
});

// ✅ Delete snippet
router.delete('/:id', auth, async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Snippet deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete snippet' });
  }
});

module.exports = router;