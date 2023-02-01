import React, { useState } from 'react';
import Visualization from '../components/Visualization/Visualization';
import './App.css';
import { SortingStatus } from '../types/SortingStatus';

function App() {
  const [sortingStatus, setSortingStatus] =
    useState<SortingStatus>('not solved');
  const [newSetTrigger, setNewSetTrigger] = useState(1);

  const inverseSortingStatus = () => {
    if (sortingStatus === 'solving') {
      setSortingStatus('paused');
    } else {
      setSortingStatus('solving');
    }
  };

  const handleNewSetClick = () => {
    setNewSetTrigger(prev => prev + 1);
    setSortingStatus('not solved');
  };

  return (
    <main className="App--main">
      <h1>Bubble Sort</h1>
      <Visualization
        setSortingStatus={setSortingStatus}
        sortingStatus={sortingStatus}
        newSetTrigger={newSetTrigger}
      />
      <span className="App--status">{sortingStatus}</span>
      <section className="btns--wrapper">
        <button onClick={handleNewSetClick}>New set</button>
        <button onClick={inverseSortingStatus}>
          {sortingStatus === 'solving' ? 'Pause' : 'Start'}
        </button>
      </section>
    </main>
  );
}

export default App;
