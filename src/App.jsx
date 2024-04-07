import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import User from './pages/User'
import Team from './pages/Team'
import CreateTeam from './components/CreateTeam'
import AddUser from './components/AddUser'
import { Toaster } from 'react-hot-toast'
import UserInfo from './components/UserInfo'
import EditUserModal from './components/EditUserModal'
import TeamInfo from './components/TeamInfo'

const App = () => {
  return (
    <>
<Routes>

{/*  routes */}
  <Route path='/' element={
      <Layout/>
  }>
  <Route index={true} path='' element={<User/>}/>
  <Route  path='team' element={<Team/>}/>
  <Route  path='add-team' element={<CreateTeam/>}/>
  <Route  path='user-info/:id' element={<UserInfo/>}/>
  <Route  path='add-user' element={<AddUser/>}/>
  <Route  path='team/team-info/:id' element={<TeamInfo/>}/>
  </Route>
</Routes>
    <Toaster/>
    </>
  )
}

export default App