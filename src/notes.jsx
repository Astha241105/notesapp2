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

  let sessionId = localStorage.getItem('sessionid');

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await axios.get("https://notes-backend-x9sp.onrender.com/notes/", {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionId}`,
             'Accept': "application/json",
          }
        });
        console.log(response.data.data)
        const updatedNotecount = [...notecount,  ...response.data.data];
        setNotecount(updatedNotecount);
        setAll(updatedNotecount);
        console.log("notes fetched successfully");
      } catch (err) {
        console.error('Error fetching notes:', err);
        setError(err.response?.data?.message || 'Error fetching notes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [setNotecount]);

  const saving = async () => {
    if (title === '' || content === '') {
      alert("Both title and content are required.");
      return;
    }

    const newNote =   { title, description: content } ;
    try {
      const response = await axios.post("https://notes-backend-x9sp.onrender.com/notes/", newNote, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`
        }
      });
      console.log(response.data.data);
      const updatedNotecount = [...notecount, response.data.data];
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

  const update = async (note) => {
    const noteToUpdate = note;
    if (noteToUpdate) {
      setTitle(noteToUpdate.title);
      setContent(noteToUpdate.description);
      await del(note);
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

  const del = async (note) => {
    try {
      sessionId = localStorage.getItem('sessionid');
      console.log(note._id);
      await axios.delete(`https://notes-backend-x9sp.onrender.com/notes/${note._id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionId}`
        }
      });
      console.log("deletion successful");
      const updatedNotecount = notecount.filter(n => n._id !== note._id);
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
          {Array.isArray(all) && all.map((note) => (
            <li key={note._id}>
              <b>
                <div id="div1" style={{ backgroundColor: note.marked ? '#E4B1F0' : '#433878' }}>{note.title} </div>
              </b>
              <div id="buttons">
                <button onClick={() => update(note)} className="operation">Open</button>
                <button onClick={() => del(note)} className="operation">Delete</button>
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
