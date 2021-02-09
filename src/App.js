import './App.scss';
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader'
import { UserList } from './Components/UserList/UserList';

function App() {
  const [ users, setUsers ] = useState([]);
  const [ isCorrectData, setIsCorrectData ] = useState(true);

  const fileAdd = (data, fileinfo) => {
    if (!fileinfo.name.includes('.csv')) {
      setIsCorrectData(false);
      return;
    }

    setUsers(data.map((user, index) => {
      if (user.full_name === null || user.phone === null || user.email === null) {
        setIsCorrectData(false);
      }

      return {
        ...user,
        id: index + 1,
      }
    }));
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, "_"),
  };

  let listOfUsers;
  if ( isCorrectData ) {
    listOfUsers = users.map((user, index) => {
      const dublicate = users.find((item, inx) => (
        (item.email.trim().toLowerCase() === user.email.trim().toLowerCase() && index !== inx)
        || (String(user.phone).includes(item.phone) && index !== inx)
      ));

      return {
        ...user,
        dublicate: dublicate ? dublicate.id : "nope",
      }
    });
  }

  return (
    <div className="app">
      <CSVReader
        className="csv-reader-input"
        label="Import users"
        onFileLoaded={fileAdd}
        parserOptions={papaparseOptions}
      >
      </CSVReader>

      {isCorrectData ? (
          <UserList users={listOfUsers} />
        ) : (
          <div className="app__error">
            <p>File format is not correct</p>
          </div>
        )
      }
    </div>
  );
}

export default App;
