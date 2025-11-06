import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './List.css';
import SearchBar from './SearchBar';

function List({ token }) {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ title: '', language: '', tags: '', code: '' });

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    const { data } = await axios.get('http://localhost:5000/api/snippets', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setSnippets(data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/snippets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSnippets();
  };

  const startEditing = (snippet) => {
    setEditingId(snippet._id);
    setEditData({
      title: snippet.title,
      language: snippet.language,
      tags: Array.isArray(snippet.tags) ? snippet.tags.join(', ') : snippet.tags || '',
      code: snippet.code,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ title: '', language: '', tags: '', code: '' });
  };

  const saveEdit = async (id) => {
    await axios.put(
      `http://localhost:5000/api/snippets/${id}`,
      { ...editData },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchSnippets();
    setEditingId(null);
  };

  const filtered = snippets.filter((s) =>
    [s.title, s.language, Array.isArray(s.tags) ? s.tags.join(', ') : s.tags]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="snippet-list">
      <SearchBar search={search} setSearch={setSearch} />

      {search && filtered.length === 0 ? (
  <p style={{ color: 'red', fontWeight: 'bold' }}>
    No snippets found — try a different search!
  </p>
   ) : (

        filtered.map((s) => (
          <div key={s._id} className="snippet-card">
            {editingId === s._id ? (
              <>
                <input
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                />
                <input
                  value={editData.language}
                  onChange={(e) => setEditData({ ...editData, language: e.target.value })}
                />
                <input
                  value={editData.tags}
                  onChange={(e) => setEditData({ ...editData, tags: e.target.value })}
                />
                <textarea
                  rows="5"
                  value={editData.code}
                  onChange={(e) => setEditData({ ...editData, code: e.target.value })}
                />
                <button onClick={() => saveEdit(s._id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{s.title}</h3>
                <p><strong>Language:</strong> {s.language}</p>
                <p><strong>Tags:</strong> {Array.isArray(s.tags) ? s.tags.join(', ') : s.tags}</p>
                <pre>{s.code}</pre>
                <button className='edit-btn' onClick={() => startEditing(s)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default List;
