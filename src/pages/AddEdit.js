import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import "./AddEdit.css"
import {  toast } from 'react-toastify'

const initialState = {
  name: "",
  email: "",
  contact: "",
};

const AddUser = () => {
  const [state, setState] = useState(initialState)

  const { name, email, contact } = state
  const navigate = useNavigate()
  const addUser  = async (data) => {

    const response = await axios.post("http://localhost:5000/api/user", data)
    if(response.status === 200){
      toast.success(response.data.message)
      console.log(response)
    }
  }
  const updateUser  = async (data, id) => {
    const response = await axios.patch(`http://localhost:5000/api/user/${id}`, data)
    if(response.status === 200){
      toast.success(response.data.message)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !email || !contact){
      toast.error("Please provide value into each field")
    }else{
      if(!id) {
        addUser(state)
      } else {
        updateUser(state, id)
      }
      setTimeout(() => navigate('/'), 500)
    }
  }

  const {id} = useParams()

  useEffect(() => {
    if(id){
      getSingleUser(id)
    }
  }, [id])

  const getSingleUser = async (id) =>{
    const response = await axios.get(`http://localhost:5000/api/user/${id}`)
      if(response.status === 200){
        setState(response.data)

      }

  }


  const handleInputChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",


        }}
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          id='name'
          name='name'
          placeholder="Enter your name ..."
          onChange={handleInputChange}
          value={name}
        />
        <input
          type='email'
          id='email'
          name='email'
          placeholder="Enter your email ..."
          onChange={handleInputChange}
          value={email}
        />
        <input
          type='number'
          id='contact'
          name='contact'
          placeholder="Enter your contact ..."
          onChange={handleInputChange}
          value={contact}
        />
        <input type="submit" value={id ? "Update" : "Add"} />
      </form>
    </div>
  );
};
export default AddUser
