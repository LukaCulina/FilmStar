import { useState, useEffect } from 'react';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
import './Account.css'

const Account = () => {
  const [displayName, setDisplayName] = useState('');
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const getDisplayName = onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
    setDisplayName(doc.data()?.displayName);
  });

  const getMovies = onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
    setMovies(doc.data()?.Favorites);
  });

  useEffect(() => {
    getDisplayName();
    getMovies();
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)
  const deleteContent = async (ID) => {
      try {
        const result = movies.filter((item) => item.id !== ID)
        await updateDoc(movieRef, {
            Favorites: result
        })
      } catch (error) {
          console.log(error)
      }
  }

  return (
    <>
      <h1 className="my-favourites heading">Hello, {displayName}</h1>
      <h2 className="my-favourites list">My Favorites</h2>
      <div className="slider-container">
        <div id="slider" className="slider">
          {movies.map((item) => (
            <div key={item.id} className="media_item">
              <img
                className="media_image"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                alt={item?.title}
              />
              <div className="media_details">
                <p className="media_title">{item?.title}</p>
                <p onClick={() => deleteContent(item.id)} className="delete_icon">
                  <CloseIcon fontSize='large'></CloseIcon>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  </>
  );
};


export default Account;