import React from 'react'

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import TodoList from '../components/TodoList/TodoList'
import PatchDelete from '../pages/PatchDelete/PatchDelete'

const Routing =() => {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/TodoList' element= {<TodoList />} />
            <Route path='/PatchDelete' element= {<PatchDelete />} />
          </Routes>
        </Router>
    </div>
  )
}

export default Routing