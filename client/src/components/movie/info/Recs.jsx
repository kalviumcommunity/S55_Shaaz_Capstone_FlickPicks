import React from 'react'
import next from '../../../assets/next.png'
import arrow from '../../../assets/arrow.png'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../nav/Nav'
import studio from '../../../assets/studio.png'
import search2 from '../../../assets/image.png'
import logout from '../../../assets/logout.png'

function Recs() {

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [recommendations, setRecommendations] = useState([])

  const { id } = useParams()

  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const RECOMMENDATIONS_URL = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`


  const API_METHOD = (passed_url) => {
    return {
      method: 'GET',
      url: passed_url,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjYxNmNlYTAzZmFiNTU0YWM1NGEyZTdlMWE4YzIwMiIsInN1YiI6IjY1ZjI4Y2MxMmZkZWM2MDE4OTIzM2E4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eccxvzxCctqBTZ8lXeSUHgTBcc5r17hhsNLVy845QA4'
      }
    }
  }

  const axios_request = (URL, location) => {
    axios.request(API_METHOD(URL))
      .then(function (response) {
        location(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {

    axios_request(MOVIE_URL, setData)
    axios_request(RECOMMENDATIONS_URL, setRecommendations)

  }, [id])

  const handleMovieClick = (movie_id) => {
    console.log(movie_id)
    navigate(`/movie/${movie_id}`)
  }

  async function getUserInfoForNav(){
    const ID = localStorage.getItem('userID')
    const res = axios.get(`http://localhost:3000/userByID/${ID}`)
    .then(res => {
        console.log(res)
        navigate(`/user/${res.data.username}`)
    })
    .catch(err => console.log(err))
}

useEffect(() => {
  document.title = `${data.title} - Recommendations`
}, [data])

  return (
    <>
    <div className=" mons">

    <nav className='white mons pta'>
                        <div className="nav55">
                            <img src={studio} alt="" className="logoImg" onClick={() => navigate('/')}/>
                            <div className="navList">
                                <div className="navLIS" onClick={() => navigate('/recs')}>MOVIES</div>
                                <div className="navLIS" onClick={() => navigate('/tvrecs')}>TV SHOWS</div>
                                <div className="navLIS" onClick={() => navigate('/users')}>USERS</div>
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
      <div className="castBackArea">

      <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} className='backdropofcast' />
        <div className="gradientofcast"></div>
        </div>

        <div className="recsCenterMovie">

          <div className="flex-end" onClick={() => navigate(`/movie/${id}`)}>
            <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="poster" className="" />
            <div className="title white">{data.title}</div>
          </div>

          <h1 className='white cast flex-center ml4'>
            Recommendations
          </h1>

          <div className='recsPage'>
            {recommendations.results && recommendations.results.map((el, index) => {
              return (
                <div className='rec white' key={index} onClick={() => handleMovieClick(el.id)}>
                  <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} alt="backdrop" className='recBackdrop' />
                  <div className="partialGrad white"></div>
                  <div className="recDesc">
                    <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt="poster" className='recPoster' />
                    <div className="recTitle"></div>
                  </div>
                  <div className='mons white recT'>
                    {el.title}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Recs