import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

function Form({ token }) {
  const [form, setForm] = useState({ title: '', language: '', tags: '', code: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/snippets', form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert('Snippet added!');
    setForm({ title: '', language: '', tags: '', code: '' });
  };

  return (
    <div className="form-container">
      <h2>Add New Snippet</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Language" value={form.language}
          onChange={(e) => setForm({ ...form, language: e.target.value })} required />
        <input placeholder="Tags (comma separated)" value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })} />
        <textarea rows="5" placeholder="Your code here..."
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}></textarea>
        <button type="submit">Add Snippet</button>
      </form>
    </div>
  );
}

export default Form;
