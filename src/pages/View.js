import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"
import "./View.css"


const View = () => {
  const [ user, setUser] = useState(null)

  const {id} = useParams()

  useEffect(() => {
    if(id){
      getSingleUser(id)
    }
  }, [id])

  const getSingleUser = async (id) =>{
    const response = await axios.get(`http://localhost:5000/api/user/${id}`)
      if(response.status === 200){
        setUser(response.data)

      }

  }

  return(
    <div style={{ marginTop: "150px"}}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <di className="container">
          <strong>ID : </strong>
          <strong>{user._id}</strong>
          <br/>
          <strong>Name : </strong>
          <strong>{user.name}</strong>
          <br/>
          <strong>Contact : </strong>
          <strong>{user.contact}</strong>
          <br/>
        </di>
      </div>
    </div>
  )
}

export default View
