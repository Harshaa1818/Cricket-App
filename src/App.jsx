import { useEffect, useState } from 'react'
import './App.css'
import { Button, TextField, Grid2, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material'
import { players } from './Data/index'
import './App.css'

function App() {
  const [currValue, setCurrValue] = useState("")
  const[searchData, setSearchData] = useState([])
  const [flag, setFlag] = useState(true)
  const [anotherFlag, setAnotherFlag] = useState(false)
  const [info, setInfo] = useState({})

  const handleChange = (e) => {
    setCurrValue(e.target.value)
    //console.log(currValue)
    setAnotherFlag(false)
  

    const res = handleApi(currValue)
    setSearchData(res)
    setFlag(true)
     
    
  }
  

  const handleSearch = () => {
    setFlag(false)
   searchData.map((item)=>{
     if(item.name.toLowerCase() === currValue.toLowerCase()){
       setInfo(item)
       setAnotherFlag(true)
       
     }
   })
  }
  useEffect(()=>{
    currValue === "" ? setFlag(false) : setFlag(true)
  },[currValue])

  const handleApi = (curr) => {
    return players.filter((item)=>{
      return item.name.toLowerCase().includes(curr.toLowerCase())

    })
  }

  const handleClick = (name) => {
    setCurrValue(name)
    setFlag(false)
  }

  return (
    
    <>
    <div className='background'></div>
    <div className='content'>
      <div className='content-box'>
    <h1> Your Personalised Cricket App!!!</h1>
     <div style={{marginTop:'50px'}}>
      <TextField label='search your fav player' value={currValue} onChange={handleChange}></TextField>
      <Grid2 sx={{marginTop:'20px'}}>
     

      { flag &&
      (searchData.length==0 ? <h1>No result found</h1> : searchData.map((item, index) =>(
        <div key={index}>
          <h3 onClick={()=>handleClick(item.name)}>{item.name}</h3>
        </div> 
      )))
      }
       {!anotherFlag &&  <Button variant='contained' color='primary' onClick={handleSearch}>Search</Button>}
       </Grid2>
      {
        anotherFlag &&
        <div>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Jersey No.</TableCell>
              <TableCell>Total Runs</TableCell>
              <TableCell>Total Wickets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
              <TableCell>{info.name}</TableCell>
              <TableCell>{info.team}</TableCell>
              <TableCell>{info.Jersey}</TableCell>
              <TableCell>{info.runs}</TableCell>
              <TableCell>{info.wickets}</TableCell>
            </TableRow>
            </TableBody>
          </Table>
         
        </div>
      }
     </div>
     </div>
     </div>
    </>
  )
}

export default App
