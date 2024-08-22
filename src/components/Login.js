import React, { useState, useRef } from "react";
import { Header } from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMG, PROFILE_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = e => {
    const message = checkValidData(emailRef.current.value, passwordRef.current.value);
    setErrorMessage(message);

    if (message) return;

    // Sign In / Sign Up
    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then(userCredential => {
          // Signed up
          updateProfile(auth.currentUser, {
            displayName: nameRef.current.value,
            photoURL: PROFILE_AVATAR,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            })
            .catch(error => {
              // An error occurred
              setErrorMessage(error.message);
            });

          // ...
        })
        .catch(error => {
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then(userCredential => {
          // Signed in
          // ...
        })
        .catch(error => {
          setErrorMessage("User not found!");
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-screen object-cover" src={BACKGROUND_IMG} alt="Background" />
      </div>
      <form onSubmit={e => e.preventDefault()} className="p-12 absolute bg-black bg-opacity-70 md:w-3/12 my-36 mx-auto right-0 left-0 text-white">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input ref={nameRef} type="text" placeholder="Full Name" className="p-4 my-2 w-full bg-gray-700" />}

        <input ref={emailRef} type="text" placeholder="Email Address" className="p-4 my-2 w-full bg-gray-700" />
        <input ref={passwordRef} type="password" placeholder="Password" className="p-4 my-2 w-full bg-gray-700" />
        <button className="p-4 my-6 bg-red-700 w-full rounded" onClick={handleButtonClick}>
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        {errorMessage && <p className="text-red-500 py-2 font-bold text-lg">{errorMessage}</p>}
        <p className="cursor-pointer" onClick={toggleSignInForm}>
          {!isSignInForm ? "Already Registered, Sign In Now!" : "New to Netflix? Sign Up Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
