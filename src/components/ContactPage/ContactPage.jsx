import ContactList from 'components/ContactList/ContactList';
import ContactForm from 'components/ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { Component } from 'react';
import Filter from 'components/Filter/Filter';
import styles from './contactPage.module.scss';

class ContactPage extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = data => {
    const checkForMatch = this.state.contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    if (checkForMatch) {
      return alert(`${data.name} is already in contacts`);
    }
    const newContact = { id: nanoid(2), ...data };
    this.setState(prevState => {
      return { contacts: [...prevState.contacts, newContact] };
    });
  };

  handleRemove = name => {
    this.setState(prevState => {
      const newState = prevState.contacts.filter(item => item.name !== name);
      return { contacts: newState };
    });
  };

  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  //Функция ниже возвращает либо contacts либо отфильтрованый массив с контактами.
  //Дальше она передается в клмпонент ContactList который создает разметку искользуя эти данные

  filterSearch = () => {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const newContact = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return newContact;
  };

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm addContact={this.addContact} />
          <h2 className={styles.title}>Contacts</h2>
          <Filter filter={this.onFilter} filterValue={this.state.filter} />
          {this.state.contacts.length !== 0 && (
            <ContactList
              filterSearch={this.filterSearch()}
              remove={this.handleRemove}
            />
          )}
        </div>
      </div>
    );
  }
}

export default ContactPage;
