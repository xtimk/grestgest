import { useState } from 'react';
import './App.css';

function App() {
  const [activities, setActivities] = useState([
    {name: 'Gruppo bambini', description: "Attivita gruppo bambini"},
    {name: 'Calcio piccoli', description: "Attivita calcio fino a terza elementare"},
  ]);

  function addActivity() {
    setActivities(prevState => [...prevState, {name: "Falegnameria " + (prevState.length), description: "Attivita di falegnameria"}])
  }

  return (
    <>
      <h1>Grest Management</h1>
      <ul>
        {activities.map((item, index) => (
          <li key={index}>
            {item.name} -  {item.description}
          </li>
        ))}
      </ul>
      <button onClick={addActivity}>Add Activity</button>
    </>
  );
}

export default App;
