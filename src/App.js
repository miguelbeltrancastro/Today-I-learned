import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./style.css"

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

function App(){
  const [showForm, setShowForm] = useState(false);
  const [facts,setFacts] = useState([]);

  useEffect(function() {   
    async function getFacts() {
      const { data: facts, error } = await supabase
      .from('facts')
      .select('*');
      setFacts(facts); 
    }
    getFacts();
  },[])

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm}/>
      {showForm ? <NewFactForm setFacts = {setFacts} setShowForm ={setShowForm}/> : null}
      <main className="main">
        <CategoryFilter />
        <FactList facts={facts}/>
      </main>
    </>
  );
}

function Header({showForm, setShowForm}){
  const appTitle = "Today I Learned";
  return(
    <header class="header">
      <div className="logo">
        <img
          src="logo.png"
          heght="68"
          width="68"
          alt="Today I learned logo"
        />
        <h1>{appTitle}</h1>
      </div>
      <button className="btn btn-large btn-open"
        onClick={()=>setShowForm((show)=> !show)}
      >{showForm ?  "Close" : "Share a fact"}</button>
    </header>
  );
}

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;  
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({setFacts, setShowForm}){
  const [text, setText] = useState("");
  const textLentght = text.length;
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("  ");

  function handleSubmit(e){
    // 1. Preven browser reload
    e.preventDefault();
    // 2. check if data is valid, create a new fact
    if (text && isValidHttpUrl(source) && category && textLentght <= 200) {
      //3. create a new fact object
      const newFact = {
        id: Math.round(Math.random()*1000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),}
      //4. add new fact to the UI
        setFacts((facts)=>[newFact, ...facts])
      //5. reset input fields
      setText("");
      setSource("");
      setCategory("");
      //6. close form
      setShowForm(false);
    }
  }
  return(
    <form className="fact-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Share a fact with the world..." value = {text} onChange={(e) =>setText(e.target.value)}/>
        <span>
          {200 - textLentght}
        </span>
        <input type="text" placeholder="Trustworthy source" value = {source} onChange={(e) =>setSource(e.target.value)}/>
        <select value = {category} onChange={(e) =>setCategory(e.target.value)}>
          <option value="">Choose category</option>
          {CATEGORIES.map((cat) => <option key = {cat.name} value={cat.name}>{cat.name.toUpperCase()}</option>)}
        </select>
        <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter(){
  return (
    <aside>
      <ul>
        <li><button className="btn btn-all-categories">All</button></li>  
          {CATEGORIES.map((cat) =>     (<li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{backgroundColor: cat.color}}>
              {cat.name}
            </button>
        </li>))}
      </ul>
    </aside>
  );
}

function FactList({facts}){
  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact)=> <Fact key={fact.id} fact={fact}/>)}
      </ul>
      Ther are {facts.length} facts in the database. Add your own!
    </section>
  );
}

function Fact({fact}){
  return(
    <li className="fact">
      <p>
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          >(Source)</a
        >
      </p>
      <span className="tag" style={{backgroundColor: CATEGORIES.find(cat => cat.name === fact.category).color}}>
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {fact.votesInteresting}</button>
        <button>🤯 {fact.votesMindblowing}</button>
        <button>⛔ {fact.votesFalse}</button>
      </div>
    </li>
  );
}

export default App