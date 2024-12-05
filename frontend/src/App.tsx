import { useState } from 'react'
import './App.css'
import DynamicTable from './components/DynamicTable'

function App() {
  const [data, setData] = useState<any>([])

  const getData = async() =>{
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method:'GET'
      })
      const datta = await response.json()
      setData(datta)
    } catch (error) {
      console.error(`error: ${error}`);
      
    }
  }

  return (
    <>
    <button onClick={getData}>click me</button>
    <DynamicTable data={data}/>
    </>
  )
}

export default App


