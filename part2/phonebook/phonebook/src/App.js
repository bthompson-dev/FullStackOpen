import { useState } from "react";

const People = ({people}) => {
  return(
    <div>
      {people.map( person => {
        return <Person name={person.name} number={person.number} key={person.name}/>
      })}
    </div>
  )
}

const Person = ({name, number}) => {
  return <p>{name} - {number}</p>;
}

const Filter = ({filter, handleFilterChange}) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}

const App = () => {
  const [persons, setPersons] = useState([
     { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("")

  const addPerson = (event) => {
    event.preventDefault();

    let names = persons.map(person => person.name);
    
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
        setPersons(persons.concat({ name: newName, number: newNumber }));
        setNewName("");
        setNewNumber("");
    }
  }

  const filteredPeople = filter !== '' ?
  persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  }) : persons;



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

   const handleNumberChange = (event) => {
     setNewNumber(event.target.value);
   };

   const handleFilterChange = (event) => {
     setFilter(event.target.value)
   }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new entry</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <People people={filteredPeople} />
    </div>
  );
};

export default App;
