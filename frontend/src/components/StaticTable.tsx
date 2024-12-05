import React, {useState} from 'react'

const StaticTable = () => {
    const [data, setData] = useState<any>([])
  const [idselect, setIdSelect] = useState<number|null>(null);

  const getData = async() =>{
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: 'GET',
      })

      const databack = await response.json()
      setData(databack)

      console.log(databack);
      

    } catch (error) {
      console.log(`error: ${error}`);
      
    }
  }
  return (
    <><button onClick={getData}>click me </button>
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>phone</th>
            <th>email</th>
            <th>username</th>
            <th>website</th>
            <th>address</th>
            <th>company</th>
          </tr>
        </thead>
        <tbody>
          {data.map((each:any)=>(
           
            <tr key={each.id} onClick={()=>setIdSelect(each.id)}>
              <td>{each.id}</td>
              <td>{each.name}</td>
              <td>{each.phone}</td>
              <td>{each.email}</td>
              <td>{each.username}</td>
              <td>{each.website}</td>
              <td>{`${each.address.street}, ${each.address.suite}, ${each.address.city}, ${each.address.zipcode}`}</td>
              <td>{`${each.company.name}`}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {idselect && <Modal data={data.find((item:any)=> item.id === idselect)} setIdSelect={setIdSelect}/>}
    </>
  )
}

export default StaticTable

const Modal = ({ data, setIdSelect }: any) => {
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className='btn-flex'><button onClick={() => setIdSelect(null) }>Close</button></div>
          
          <h1>{data.name}</h1>
          <p>Contact details: {data.phone}</p>
          <p>Email: {data.email}</p>
          <p>UserName: {data.username}</p>
          <p>Website: {data.website}</p>
          
          <p>{`Address:${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}`}</p>
          
          
          <p>Company: {data.company.name}</p>
        </div>
      </div>
    );
  };