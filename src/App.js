import React, { useState, useEffect } from "react";

// Components
import Filter from "./components/filter";
import PersonForm from "./components/person-form";
import Persons from "./components/persons";
import Notification from "./components/notification";

// Services & helpers
import personServices from "./services/persons";

//styles
import "./app.css";

// APP Component
const App = () => {
  // States
  const [persons, setPersons] = useState([]);
  const [personsFilteredByName, setPersonsFilteredByName] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newNameFilter, setNewNameFilter] = useState("");

  const [notification, setNotification] = useState({
    text: "",
    type: "",
  });

  // Promise: Load data from json-server
  useEffect(() => {
    personServices.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setPersonsFilteredByName(initialPersons);
    });
  }, []);

  useEffect(() => {
    setPersonsFilteredByName(
      persons.filter((person) => {
        let _name = person.name.toLowerCase();
        let _filter = newNameFilter.toLowerCase();
        return _name.includes(_filter);
      })
    );
  }, [persons, newNameFilter]);

  // HANDLERS: for controlled components
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleNameFilterChange = (e) => {
    setNewNameFilter(e.target.value.toLowerCase());
  };

  // ADD: person to phonebook
  const addPerson = (e) => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newPhone,
    };

    personServices
      .create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewPhone("");
        setNotification({
          text: "The person has been added",
          type: "notification",
        });
        clearNotification();
      }).catch((error) => {
        setNotification({
          text: error.response.data.error,
          type: "error",
        });
        clearNotification();
      });
  };

  // REMOVE: Person from phonebook
  const removePerson = (personId) => {
    if (window.confirm("Do you really want to delete?")) {
      personServices
        .remove(personId)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== personId));
          setNotification({
            text: "The person has been removed",
            type: "notification",
          });
          clearNotification();
        })
        .catch(() => {
          const removedPersonName = persons.find(
            (person) => personId === person.id
          ).name;
          setNotification({
            text: `Information of ${removedPersonName} has already removed from server`,
            type: "error",
          });
          clearNotification();
          setPersons(persons.filter((person) => person.id !== personId));
        });
    }
  };

  // Clear notifications after timeout
  const clearNotification = (delay = 2) => {
    const timer = setTimeout(() => {
      setNotification({ text: "" });
      clearInterval(timer);
    }, delay * 1000);
  };

  // Render
  return (
    <>
      <Notification text={notification.text} type={notification.type} />

      <h1>Phonebook APP</h1>

      <section>
        <h2>Add new</h2>
        <PersonForm
          onSubmit={addPerson}
          inputNameOnChange={handleNameChange}
          inputNameValue={newName}
          inputPhoneOnChange={handleNumberChange}
          inputPhoneValue={newPhone}
        />
      </section>
      <section>
        <h2>Contact list</h2>
        <Filter onChange={handleNameFilterChange} />
        {
          personsFilteredByName.length > 0 ?
            <Persons persons={personsFilteredByName} handleDelete={removePerson} />
            : <p>Nothin for <strong>{newNameFilter}</strong></p>
        }
      </section>
    </>
  );
};

export default App;
