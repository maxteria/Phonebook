import React from "react";

const Person = ({ name, number, id, handleDelete }) => (
  <li>
    <span>{name} </span><span>{number} </span><button onClick={() => handleDelete(id)}>delete</button>
  </li>
);

const Persons = ({ persons, handleDelete }) => {
  return (
    <>
      <ul>
        {persons.map((person) => (
          <Person key={person.name} name={person.name} number={person.number} id={person.id} handleDelete={handleDelete} />
        ))}
      </ul>
    </>
  );
};

export default Persons;
