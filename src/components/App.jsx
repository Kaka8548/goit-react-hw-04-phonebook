import { useState, useEffect } from 'react';
import ContactList from './phonebookSection/contactList/ContactList';
import { ContactForm } from './contactForm/ContactForm';
import Filter from './filter/Filter';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contact-list')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contact-list', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isInContact = contacts.find(
      contact => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isInContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    console.log(newContact);

    setContacts(prevState => [newContact, ...prevState]);
  };

  const getFilterQuery = event => {
    setFilter(event.target.value.toLowerCase());
  };

  const getFilteredList = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  };

  const deleteItem = itemId => {
    setContacts(contacts.filter(({ id }) => id !== itemId));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />

      <h2>Contacts</h2>
      {contacts.length > 0 ? (
        <>
          <Filter handleChange={getFilterQuery} />
          <ContactList
            contacts={getFilteredList()}
            onDeleteBtnClick={deleteItem}
          />
        </>
      ) : (
        <p>There are no contacts in your contact list. Try to make one.</p>
      )}
    </div>
  );
}
