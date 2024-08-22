import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch(error => {
        // An error happened.
      });
  };

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = e => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py2 bg-gradient-to-b from-black z-10 w-full flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="Logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map(lang => (
                <option value={lang.identifier}>{lang.name}</option>
              ))}
            </select>
          )}
          <button className="py-2 px-4 m-2 text-white mx-4 my-2 bg-purple-800 rounded-lg" onClick={handleGptSearchClick}>
            {showGptSearch ? "Home" : "GPT Search"}
          </button>
          <img className="w-12 h-12" src={user?.photoURL} alt="User icon" />
          <button className="font-bold text-white" onClick={handleSignOut}>
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};
