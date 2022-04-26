import React, { useState, useEffect } from "react"
import { Link } from  "react-router-dom"
import "./Home.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {  toast } from 'react-toastify'


const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    getUsers()
  },[])
  const navigate = useNavigate()
  const getUsers = async() => {
    const response = await axios.get("http://localhost:5000/api/user/")
    if(response.status === 200){
      setData(response.data)
    }
  }

  const onDeleteUser = async(id) => {
    if(window.confirm('Are you sure that you wanted to delete that user record')){
      const response = await axios.delete(`http://localhost:5000/api/user/${id}`)
        if(response.status === 200){
          toast.success(response.data.message)
          navigate('/')
        }
    }
    
  }

  return(
    <div style={{marginTop: "150px"}}>
      <table className="styled-table">
        <thead>
        <tr>
          <th style={{textAlign: "center"}} >N°</th>
          <th style={{textAlign: "center"}} >Name</th>
          <th style={{textAlign: "center"}} >Email</th>
          <th style={{textAlign: "center"}} >Contact</th>
          <th style={{textAlign: "center"}} >Action</th>
        </tr>
        </thead>
        <tbody>
        { data && data.map((item, index) => {
          return(
            <tr key={index}>
            <td scope='row'>{index + 1}</td>
            <td scope='row'>{item.name}</td>
            <td scope='row'>{item.email}</td>
            <td scope='row'>{item.contact}</td>
            <Link to={`/update-user/${item._id}`}>
              <button className="btn btn-edit">Edit</button>
            </Link>
            <Link to={`/delete/${item._id}`}>
              <button className="btn btn-delete" onClick={() => onDeleteUser(item._id)}>Delete</button>
            </Link>
            <Link to={`/view/${item._id}`}>
              <button className="btn btn-view">View</button>
            </Link>

            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
