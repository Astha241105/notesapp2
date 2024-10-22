import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notes.css';

function Notes() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notecount, setNotecount] = useState([]);
  const [all, setAll] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await axios.get("https://notes-backend-x9sp.onrender.com/notes/", {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
          }
        });

        setNotecount(response.data);
        setAll(response.data);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err.response?.data?.message || 'Error fetching notes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const saving = async () => {
    if (title === '' || content === '') {
      alert("Both title and content are required.");
      return;
    }

    const newNote = { title, content };
    try {
      const response = await axios.post("https://notes-backend-x9sp.onrender.com/notes/", newNote, { withCredentials: true });
      const updatedNotecount = [...notecount, { ...response.data, marked: false }];
      setNotecount(updatedNotecount);
      setAll(updatedNotecount);
      setTitle('');
      setContent('');
      setSearch('');
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save the note. Please try again.');
    }
  };

  const update = async (noteId) => {
    const noteToUpdate = notecount.find(note => note.id === noteId);
    if (noteToUpdate) {
      setTitle(noteToUpdate.title);
      setContent(noteToUpdate.content);
      await del(noteId);
    }
  };

  const filter = (e) => {
    const keyword = e.target.value;
    if (keyword !== '') {
      const results = notecount.filter(note =>
        note.title.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setAll(results);
    } else {
      setAll(notecount);
    }
    setSearch(keyword);
  };

  const del = async (noteId) => {
    try {
      await axios.delete(`https://notes-backend-x9sp.onrender.com/notes/${noteId}`, { withCredentials: true });
      const updatedNotecount = notecount.filter(note => note.id !== noteId);
      setNotecount(updatedNotecount);
      setAll(updatedNotecount);
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Failed to delete the note. Please try again.');
    }
  };

  const toggleMark = async (noteId) => {
    const updatedNotecount = notecount.map(note => {
      if (note.id === noteId) {
        const newMarkedState = !note.marked;
        return { ...note, marked: newMarkedState };
      }
      return note;
    });
    setNotecount(updatedNotecount);
    setAll(updatedNotecount);
  };

  return (
    <div id="container">
      <div id="container1">
        <input placeholder="Title" value={title} id="title" onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Add some content" rows="4" cols="8" id="content" value={content} onChange={(e) => setContent(e.target.value)} />
        <button onClick={saving} id="save">Save</button>
      </div>
      <div id="container2">
        <input placeholder="Search for your notes" id="search" value={search} onChange={filter} />
        <ul id="noteslist">
          {all.map((note) => (
            <li key={note.id}>
              <b>
                <div id="div1" style={{ backgroundColor: note.marked ? '#E4B1F0' : '#433878' }}>{note.title} </div>
              </b>
              <div id="buttons">
                <button onClick={() => update(note.id)} className="operation">Open</button>
                <button onClick={() => toggleMark(note.id)} className="operation">
                  {note.marked ? 'Unmark' : 'Mark'}
                </button>
                <button onClick={() => del(note.id)} className="operation">Delete</button>
              </div>
            </li>
          ))}
        </ul>
        {isLoading && <p>Loading notes...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default Notes;
