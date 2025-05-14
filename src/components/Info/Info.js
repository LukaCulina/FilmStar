import { useState, useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import Carousel from '../Carousel/Carousel';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import GradeIcon from '@mui/icons-material/Grade';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CloseIcon from '@mui/icons-material/Close';
import './Info.css'

export default function InfoModal({children, media_type, id, keyword}) {
  const key = process.env.REACT_APP_API_KEY;
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const fetchData = async() => {
    const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${key}&language=en-US`
    )
    const data = await response.json();
    console.log(data);
    setContent(data);
  };

  const fetchVideo = async() => {
    const response = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${key}&language=en-US`
    )
    const data = await response.json();
    setVideo(data.results[0]?.key);
  };

  useEffect(()=>{
    fetchData();
    fetchVideo();
  },[])

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '75%',
    bgcolor: '#1d2129',
    border: '2px solid #000',
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
    color:'white',
  };

  const movieID = doc(db, 'users', `${user?.email}`);

  const setFavorite = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        Favorites: arrayUnion({
          id: content.id,
          title: content.title || content.name,
          img: content.backdrop_path,
        }),
      });
    } else {
      alert('Please log in to save to favorites!');
    }
  };

  return (
    <>
      <div onClick={handleOpen} className={keyword === "home"? "home" : "media"}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <img
              className='background_image landscape'
              alt={content.name || content.title}
              src={content.backdrop_path
              ? `${img_500}/${content.backdrop_path}`
              : unavailableLandscape}
            />
            <img
              className='background_image portrait'
              alt={content.name || content.title}
              src={content.poster_path
              ? `${img_500}/${content.poster_path}`
              : unavailable}
            />
            {content && (
              <div className='InfoModal'>
                <p className='fav_button' onClick={setFavorite}>
                  {like ? (
                  <FavoriteIcon className='heart' fontSize="large"/>
                  ) : (
                  <FavoriteBorderIcon className='heart' fontSize="large"/>
                  )}
                </p>
                <p className='close' onClick={handleClose}>
                  <CloseIcon fontSize='large'></CloseIcon>
                </p>
                <div className='mini_poster'>
                  <img className='InfoModal_portrait'
                    alt={content.name || content.title}
                    src={content.poster_path
                    ? `${img_500}/${content.poster_path}`
                    : unavailable}
                  />
                </div>
                <div className='landscape_poster'>
                  <img className='InfoModal_landscape'
                    alt={content.name || content.title}
                    src={content.backdrop_path
                    ? `${img_500}/${content.backdrop_path}`
                    : unavailableLandscape}
                  />
                </div>
                <div className='InfoModal_about'>
                  <h1 className='InfoModal_title'>
                    {content.name || content.title}
                  </h1>
                  {content.tagline && (
                    <span className='tagline'>{content.tagline}</span>
                  )}
                  <span className='genre_list'>
                      {content.genres &&
                      content.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="InfoModal_genre">
                      {genre.name}
                      </span>
                    ))}
                  </span>
                  <span className='InfoModal_details'>
                    <p>{media_type === "movie" ? `Movie` : `TV series`}</p>
                    <div className='rating'><GradeIcon/><p>{String(content.vote_average).split('.').length > 1 ? (content.vote_average).toFixed(1) : content.vote_average}</p></div>
                    {content.runtime ? (
                      <p>{content.runtime} min</p>
                      ) : (
                      <p>
                        {content.number_of_seasons}{" "}
                        {content.number_of_seasons === 1 ? "season" : "seasons"}
                      </p>
                    )}
                    <p>{(content.first_air_date && new Date(content.first_air_date).getFullYear()) || (content.release_date && new Date(content.release_date).getFullYear())}</p>
                  </span>
                  <span className='InfoModal_description'>
                    {content.overview}
                  </span>
                  <div>
                    <Carousel id={id} media_type={media_type}/>
                  </div>
                  <button
                    className='trailer'
                    onClick={() => {
                      window.open(`https://www.youtube.com/watch?v=${video}`, '_blank');
                    }}
                  >
                    Watch the Trailer<YouTubeIcon/>
                  </button>
                </div>
              </div>)
            }
          </Box>
        </Fade>
      </Modal>
    </>
  );
}