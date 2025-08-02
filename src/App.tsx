import React from 'react';
import UserProfile from './components/UserProfile';
import SWRProvider from './providers/SWRProvider';
import './App.css';

const App: React.FC = () => {
  return (
    <SWRProvider>
      <div className="app">
        <div className="demo-section">
          <UserProfile userId="1" />
        </div>
      </div>
    </SWRProvider>
  );
}

export default App;