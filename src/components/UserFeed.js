import React, { useEffect, useState } from "react";

import Post from "./Post.js";
import ImageUpload from "./ImageUpload";
//import Status from "./Status";
//import Profile from "./Profile";


import instaLogo from "./Images/Instagram logo.png";

import "./style.css";

import { auth, db } from "./firebase.js";

//import Avatar from '@material-ui/core/Avatar';
//import { SvgIcon } from "@material-ui/core";
//import { ReactComponent as favouriteborder } from "./Icons/favouriteborder.svg";
//import { ReactComponent as favourite } from "./Icons/favourite.svg";

import { useHistory } from "react-router";
import { Button } from "@material-ui/core";

function UserFeed(props) {
    const [posts, setPosts] = useState([]);
    //const [status, setStatus] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const unsubscribe = db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data(),
            })));
        })

        return () => {
            unsubscribe();
        }

    }, []);

    useEffect(() => {
        if(props.user == undefined) {
            auth.signOut();
            history.push("/login");
        }
    });
    
    /*useEffect(() => {
        db.collection('posts').where('username', '==', props.user.displayName).collection('comments').orderBy('timestamp', 'desc').get().then((snapshot) => {
            if(snapshot.exists()) {
                setStatus((snapshot) => {
                    snapshot.forEach((doc) => ({
                        comment: doc.data().username,
                    }))
                });
            }
        })

    }, []);
    
    useEffect(() => {
        db.collection('posts').where('username', '==', props.user.displayName).collection('likes').orderBy('timestamp', 'desc').get().then((snapshot) => {
            if(snapshot.exists()) {
                setStatus((snapshot) => {
                    snapshot.forEach((doc) => ({
                        like: doc.data().username,
                    }))
                });
            }
        })

    }, []);*/

    function handleLogOut() {
        auth.signOut();
        history.push("/login");
    }

    function openNav() {
        document.getElementById("myNav").style.width = "100%";
    }

    function closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

    return (
        <div className="app">
            <header>
                <div className="header">
                    <img 
                        className="instaLogo2"
                        src={instaLogo}
                        alt="Instagram"
                    />

                    <div className="options">

                        <div className="logoutButton">
                            <Button className="logoutButton" onClick={handleLogOut} variant="contained">Log Out</Button>
                        </div>

                        <div className="hamIcon" onClick={openNav}>
                            <div className="hamBar"></div>
                            <div className="hamBar"></div>
                            <div className="hamBar"></div>
                        </div>

                        <div id="myNav" className="overlay">
                            <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>

                            <div className="overlay-content">
                                <button onClick={handleLogOut} className="overlayLogout">Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            
            <main>
                <div className="posts">
                    {
                        props.user
                        &&
                        posts.map(({id, post}) => (
                            <Post
                                key={id}
                                postId={id}
                                user={props.user}
                                username={post.username}
                                imageUrl={post.imageUrl}
                                caption={post.caption}
                            />
                        ))
                    }
                </div>

                {
                    props.user
                    ?
                    <ImageUpload username={props.user.displayName} />
                    :
                    <h3>Login to Upload</h3>
                }

            </main>
        </div>
    );
}

export default UserFeed;