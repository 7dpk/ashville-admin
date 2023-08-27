import React from 'react';
import Navbar from './components/NavBar';
import { useState } from 'react';
// import AddComponent from './AddComponent'; // Import your "Add" component
// import ListComponent from './ListComponent'; // Import your "List" component
import Add from './components/Add';
import List from './components/List'
const App = () => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const renderComponent = (selectedMenu) => {
    switch (selectedMenu) {
      case 'add':
        return <Add/>;
      case 'list':
        return <List/>;
      default:
        return <List/>;
    }
  };

  return (
    <div>
      <Navbar setSelectedMenu={setSelectedMenu} />
      {renderComponent(selectedMenu)}
    </div>
  );
};

export default App;
