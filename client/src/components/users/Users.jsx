import React,{useState , useEffect} from 'react'
import './Users.css'
import axios from 'axios'
import search2 from '../../assets/image.png'
import logout from '../../assets/logout.png'
import studio from '../../assets/studio.png'
import people from '../../assets/person.png'
import { useNavigate } from 'react-router-dom'

function Users() {

  const navigate = useNavigate()

  const [users, setUsers] = useState([])

  async function getData() {
    const res = await axios.get(`http://localhost:3000/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='search mons white'>
      <div className="bgBlack"></div>

      <nav className='white mons'>
        <div className="nav55">
          <img src={studio} alt="" className="logoImg" onClick={() => navigate('/')} />
          <div className="navList">
            <div className="navLIS" onClick={() => navigate('/recs')}>MOVIES</div>
            <div className="navLIS" onClick={() => navigate('/tvrecs')}>TV SHOWS</div>
            <div className="navLI">USERS</div>
            {localStorage.getItem('userID') && <div className="navLIS" onClick={() => getUserInfoForNav()}>PROFILE</div>}
            <div className="navLIS" onClick={() => navigate('/search')}><img src={search2} alt="" /></div>
            {localStorage.getItem('userID') && <div className="" onClick={() => {
              localStorage.setItem('userID', '')
              location.reload()
            }}><img src={logout} className='logoutImg' /></div>}
            {!localStorage.getItem('userID') && <div className="loginButtonNav" onClick={() => navigate('/login')}>LOGIN / SIGNUP</div>}
          </div>
        </div>
      </nav>

            <div className="usersDisplayArea">
              {users && console.log(users)}
              {users && users.map((el,index) => {
                return <div className="usersDisplayTile" onClick={() => navigate(`/user/${el.username}`)}>
                  {el.profilePic ? <img src={el.profilePic} alt="" className="usersTileProfile" />
                                 : <div className='usersProfilePicNA'>
                                    <img src={people} alt="" className="userSil" />
                                  </div>}
                  <div className="usersTileUsername">{el.username}</div>
                </div>
              })}
            </div>
    </div>
  )
}

export default Users