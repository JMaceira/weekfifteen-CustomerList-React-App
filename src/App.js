import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const MOCK_API_URL = 'https://6496f10083d4c69925a341bd.mockapi.io/CustomerList/CustomerList';

  const[customerList, setcustomerList] = useState([{}])
  
  const [newCustomerListName, setNewCustomerListName] = useState('')
  const [newCustomerListAddress, setNewCustomerListAddress] = useState('')
  const [newCustomerListPhoneNumber, setNewCustomerListPhoneNumber] = useState('')
  
  const [updatedCustomerListName, setUpdatedCustomerListName] = useState('')
  const [updatedCustomerListAddress, setUpdatedCustomerListAddress] = useState('')
  const [updatedCustomerListPhoneNumber, setUpdatedCustomerListPhoneNumber] = useState('')
  
  //// CRUD operations for Application ////
  
  /// using function getCustomers in order to fetch the mockAPI url and turn the data it receives into json.
  function getCustomers(){
    fetch(MOCK_API_URL)
    .then(data => data.json())
    .then(data => setcustomerList(data))
  }
  
  /// useEffect in order to get the list of customers whenever the page re-renders and console.logging it
  useEffect(() => {
    getCustomers()
    // console.log(customerList)
  },[]) /// empty array makes it only happen one time 
  
  
  // Using method DELETE in order to get the specific customer from customerlist by id and then re-rendering the list of customers
  function deleteCustomer(id){
    fetch(`${MOCK_API_URL}/${id}`, {
      method: 'DELETE'
    }).then(() => getCustomers())
  }
  
  // using POST method in the fucntion postNewCustomer in order to post new customers in the customerlist and new info for each customer. 
  function postNewCustomer(e){
    e.preventDefault()
  
    console.log(newCustomerListName, newCustomerListAddress, newCustomerListPhoneNumber)
  
    fetch(MOCK_API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"}, /// Helping the backend be able to read the code that is posted.
      body: JSON.stringify({                        /// Making the information being passed into new variables for new customer on customerlist.
        Address: newCustomerListAddress,
        Name: newCustomerListName,
        PhoneNumber: newCustomerListPhoneNumber,
    })
    }).then(() => getCustomers())
  }
  
  // using PUT method in order to update customer information from customerList
  // passing in a parameter to later call it to obtain a specific customer from the customerList by ID 
  function updateCustomer(e,customerObject){
    e.preventDefault()
  
    let updatedCustomerObject = {
      ...customerObject,                  /// used to spread out all the key value pairs from an existing object
      Address: updatedCustomerListAddress,
      Name: updatedCustomerListName,
      PhoneNumber: updatedCustomerListPhoneNumber,
    }
  
    fetch(`${MOCK_API_URL}/${customerObject.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedCustomerObject),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => getCustomers())
  }
  
  
    return (
      <div className="App">
  
     {/* Creating a form where users can update customers information from customer list by inputting data of their choosing. */}
        <form>
        <h2>POST A NEW CUSTOMER </h2>
        <label htmlFor='Name'>Name</label>
        <input id='Name'onChange={(e) => setNewCustomerListName(e.target.value)}></input> {/* targeting the value inside the container that the user inputs using the onChange method and using (e)event for targeting  */}
        
        <label htmlFor='Address'>Address</label>
        <input id='Address' onChange={(e) => setNewCustomerListAddress(e.target.value)}></input>
        
        <label htmlFor='PhoneNumber'>PhoneNumber</label>
        <input id='PhoneNumber' onChange={(e) => setNewCustomerListPhoneNumber(e.target.value)}></input>
        <button onClick={(e) => postNewCustomer(e)}>Submit</button>
        </form>
  
        {/* Mapping over the customerList array and returning the individual customers information and inclduing delete button as well for each */}
        {customerList.map((customer, index) => (
          <div key={index}  className='customerContainer'>
            <div>
              Name: {customer.Name}<br></br>
              Address: {customer.Address} <br></br>
              PhoneNumber: {customer.PhoneNumber}<br></br>
              <button onClick={() => deleteCustomer(customer.id)} className='btn btn-Primary'>DELETE</button>
            </div>
            <form>
              <h3>Update This User</h3>
              <label>Update Name</label>
              <input onChange={(e) => setUpdatedCustomerListName(e.target.value)}></input><br></br>
              
              <label>Update Address</label>
              <input onChange={(e) => setUpdatedCustomerListAddress(e.target.value)}></input><br></br>
              
              <label>Update PhoneNumber</label>
              <input onChange={(e) => setUpdatedCustomerListPhoneNumber(e.target.value)}></input><br></br>
              <button onClick={(e) => updateCustomer(e, customer)}>Update</button>
            </form>
          </div>
        ))}
      </div>
    );
}

export default App;
