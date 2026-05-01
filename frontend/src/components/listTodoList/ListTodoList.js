import React, {useRef} from 'react'
import {BiSolidTrash} from "react-icons/bi"
import './ListTodoList.css'

const ListTodoList = ({
  listSummaries,
  handleSelectList,
  handleNewToDoList,
  handleDeleteToDoList
}) => {
  const labelRef = useRef()

  if(listSummaries === null){
    return <div className='listTodoLists loading'>Loading to-do lists ...</div>
  } else if(!listSummaries.length){
    return(
      <div className='listTodoLists'>
        <div className='box'>
          <label>
            New To-Do List: &nbsp;
            <input id={labelRef} type='text'/>
          </label>
          <button onClick={() => handleNewToDoList(document.getElementById(labelRef).value)}>
            New
          </button>
        </div>
        <p>Theere are no to-do lists!</p>
      </div>
    )
  }
  return (
    <div className='listTodoLists'>
      <h1>All To-Do Lists</h1>
        <div className='box'>
          <label>
            New To-Do List:&nbsp;
            <input id={labelRef} type='text'/>
          </label>
          <button onClick={() => handleNewToDoList(document.getElementById(labelRef).value)}>New</button>
        </div>
        {listSummaries.map((summary) => {
          return(
            <div key={summary.id} className='summary' onClick={() => handleSelectList(summary.id)}>
              <span className='name'>{summary.name} </span>
              <span className='count'>({summary.item_count} items)</span>
              <span className='flex'></span>
              <span className='trash' onClick={(e) => {
                e.stopPropagation()
                handleDeleteToDoList(summary.id)
              }}><BiSolidTrash/></span>
            </div>
          )
        })}
    </div>
  )
}

export default ListTodoList