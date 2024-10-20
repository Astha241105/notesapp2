import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notecount, setNotecount] = useState([]);
  const [all, setALL] = useState([]);
  const [search, setSearch] = useState('');

  
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      arr.push({ t: key, c: localStorage.getItem(key) });
    }
    setNotecount(arr);
    setALL(arr);
  }, []);

  function saving() {
    if(title==''){
      alert("Give title");
    }
    else if(content==''){
      alert("Give content");
    }
    else if(notecount.find(n=>n.t==title)){
      alert("Notes with given title already exist");
    }
    else{
    localStorage.setItem(title, content);
    const updatedNotecount = [...notecount, { t: title, c: content }];
    setNotecount(updatedNotecount);
    setALL(updatedNotecount);
    setTitle('');
    setContent('');
    setSearch(''); }
  }


  function update(d) {
    setTitle(d);
    setContent(localStorage.getItem(d));
    localStorage.removeItem(d);
  }

  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = notecount.filter((note) =>
        note.t.toLowerCase().startsWith(keyword.toLowerCase())
      );
      setALL(results);
    } else {
      setALL(notecount);
    }

    setSearch(keyword);
  };

  return (
     <div id="container">
      <div id="container1">
        <input
          placeholder="Title" value={title} id="title" onChange={(e) => setTitle(e.target.value)}/>
        <textarea rows="4" cols="8" id="content" value={content} onChange={(e) => setContent(e.target.value)}/>
        <button onClick={saving} id="save">Save</button></div>
        <div id="container2">
        <input placeholder="Search for your notes" id="search"value={search} onChange={filter}/>
        <ul id="noteslist">
          {all.map((note) => (
            <li key={note.t} onClick={() => update(note.t)}>
             <b><div id="div1">{note.t}</div></b> 
              <div>{note.c}</div>
            </li>))}
        </ul></div></div>
       );
}

export default App;
