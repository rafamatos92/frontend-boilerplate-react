import React, { useEffect, useState } from 'react';
import './Form.css';

function Form() {
  useEffect(() => {
    getTransactions();
  }, []);

  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (status === false) {
      setStatus(true);
      setTimeout(() => {
        setStatus(false);
        setWarningMessage("");
      }, 5000);
    } else {
      setWarningMessage(
        'You need to wait for 5 seconds before sending a duplicate transaction.'
      );
    }
  };

  const getTransactions = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setTransactions(data);
  };

  return (
    <div className='page-container'>
      <h1>Account Management App</h1>
      <h3>Submit new transaction</h3>
      <form onSubmit={submit} data-type='transaction-form'>
        <div className='form-container'>
          <div className='input-line'>
            <span>Account ID: </span>
            <input data-type='account-id' />
          </div>
          <div className='input-line'>
            <span>Amount: </span>
            <input data-type='amount' />
          </div>
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </div>
      </form>
      <h5 data-type="warning-message" className="warning-message">{warningMessage}</h5>
      <h3>Recently submitted transactions</h3>
      <div>
        {transactions.map(({ name, website, phone }) => {
          return (
            <div className='transaction-box'>
              <h3>
                {website} from {name}
              </h3>
              <h3>
                Current {name}'s balance is {phone}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Form;
