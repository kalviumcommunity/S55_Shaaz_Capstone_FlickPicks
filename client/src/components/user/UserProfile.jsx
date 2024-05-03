import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserProfile() {

  const LOCALHOST_LINK = "http://localhost:3000/"
  const RENDER_LINK = "https://s55-shaaz-capstone-flickpicks.onrender.com/"

  const [image, setImage] = useState()

  const convertToBase64 = (e) => {
    console.log(e)

    var read = new FileReader()
    read.readAsDataURL(e.target.files[0])
    read.onload = () => {
      console.log(read.result)
      setImage(read.result)
    }
    read.onerror = err => {
      console.log("You have an error ", err)
    }
  }

  const handleSubmit = async() => {
    const res = await axios.post(`${LOCALHOST_LINK}profileUpdate/shaaaaz`,{"imageLink" : image})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }


  return (
    <div>
      <input
        type="file"
        name='file'
        accept='image/'
        onChange={convertToBase64} />
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  )
}

export default UserProfile