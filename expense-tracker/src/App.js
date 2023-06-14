import './App.css';
import { useEffect,useState } from "react";

function App() {
  const [name, setname] = useState('');
  const [datetime, setdatetime] = useState('');
  const [description, setdescription] = useState('');
  const [transactions, settransactions] = useState([]);
  useEffect(()=>{
      getTransactions().then(settransactions);
  }, []);

  async function getTransactions(){
    const url_url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url_url);
    return await response.json();
  }


  function addNewTransaction(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    console.log(url);
    const price = name.split(' ')[0];
    fetch( url , {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ 
        price,
        name:name.substring(price.length+1),
        description,
        datetime 
      })
    }).then(response => {
      response.json().then(json => {
        setname('');
        setdatetime('');
        setdescription('');
        console.log('result', json);
      });
    });
  }
  let balance = 0;
  
  for(const transaction of transactions){
    balance = balance + transaction.price; 
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];
  
  return (
    <main>
      <h1>{balance}<span>.</span><span>{fraction}</span> </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basics">
          <input type="text"
            value={name}
            onChange={ev => setname(ev.target.value)}
            placeholder={'+999 new iphone'} />

          <input value={datetime}
            onChange={ev => setdatetime(ev.target.value)}
            type="datetime-local" />
        </div>
        <div className="description">
          <input type="text"
            value={description}
            onChange={ev => setdescription(ev.target.value)}
            placeholder={'description'} />
        </div>
          <button type="submit">Add new transaction </button>
        </form>
        <div className="transactions">
          {transactions.length > 0 && transactions.map( transaction => (
            <div className="transaction">
            <div className="left">
              <div className="name">{transaction.name}</div>
              <div className="description">{transaction.description}</div>
            </div>
            <div className="right">
              <div className={"price " + ((transaction.price<0)?'red':'green')}>{transaction.price}</div>
              <div className="datetime">2022-12-18 15:45</div>
            </div>
          </div>       
          ))}   
        </div>
    </main>
  );
}

export default App;
