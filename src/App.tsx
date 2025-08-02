import React from 'react';
import UserProfile from './components/UserProfile';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="demo-section">
        <UserProfile userId="1" />
      </div>
    </div>
  );
}

export default App;