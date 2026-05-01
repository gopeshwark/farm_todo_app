import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [listSummaries, setListSummaries] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    reloadData().catch(console.error)
  },[])

  async function reloadData() {
    const respose = await axios.get("/api/lists")
    const data = await respose.data
    setListSummaries(data)
  }

  function handleNewToDoList(newName) {
    const updateData = async () => {
      const newListData = {
        name: newName
      }

      await axios.post("/api/lists", newListData)
      reloadData().catch(console.error)
    }
    updateData()
  }

  function handleDeleteToDoList(id) {
    const updateData = async () => {
      await axios.delete(`/api/lists/${id}`)
      reloadData().catch(console.error)
    }
    updateData()
  }

  function handleSelectList(id) {
    console.log("Selected item", id)
    setSelectedItem(id)
  }

  function backToList() {
    setSelectedItem(null)
    reloadData().catch(console.error)
  }

  if( selectedItem === null){
    return(
      <div className='App'>
        <ListToDoLists
          listSummaries={listSummaries}
          handleSelectList={handleSelectList}
          handleNewToDoList={handleNewToDoList}
          handleDeleteToDoList={handleDeleteToDoList}
        />
      </div>
    )
  } else {
    return(
      <div className='App'>
        <ToDoList listId={selectedItem} handleBackButton={backToList}/>
      </div>
    )
  }
}

export default App
