import React, { useEffect, useState } from "react";

import firebase from "firebase";

import "./style.css";

import Avatar from '@material-ui/core/Avatar';

import { db } from "./firebase";

import { SvgIcon } from "@material-ui/core";
import { ReactComponent as favouriteborder } from "./Icons/favouriteborder.svg";
import { ReactComponent as favourite } from "./Icons/favourite.svg";

function Post(props) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [isLiked, setIsLiked] = useState({liked: false,});
    const [likeList, setLikeList] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if (props.postId) {
            unsubscribe = db
            .collection("posts")
            .doc(props.postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            });
        }

        return () => {
            unsubscribe();
        };

    });

    useEffect(() => {
        db.collection('posts').doc(props.postId).collection('likes').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().username === props.user.displayName) {
                    setIsLiked({
                        liked: true,
                        likeId: doc.id,
                    })
                }
            })
        })
    }, [props.postId, props.user]);

    useEffect(() => {
        const unsubscribe = db.collection('posts').doc(props.postId).collection('likes').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setLikeList(snapshot.docs.map((doc) => ({
                username: doc.data().username,
            })));
        });

        return () => {
            unsubscribe();
        }
    });

    const postComment = (event) => {
        db.collection('posts').doc(props.postId).collection('comments').add({
            username: props.user.displayName,
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    }

    const handleLike = (event) => {
        if(isLiked.liked) {
            db.collection('posts').doc(props.postId).collection('likes').doc(isLiked.likeId).delete();
            setIsLiked({
                liked: false,
            })
        }
        else {
            db.collection('posts').doc(props.postId).collection('likes').add({
                username: props.user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((doc) => {
                setIsLiked({
                    liked: true,
                    likeId: doc.id,
                })
            })
        }
    }

    return (
        <div className="post">
            
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt={props.username}
                    src="/static/images/avatar/3.jpg" 
                />
                <h4 className="post_username">{props.username}</h4>
            </div>

            <div className="post_image">
                <img src={props.imageUrl} />
            </div>

            <div className="post_footer">
                {
                    props.user && (
                        <div className="post_likes">
                            <button className="likeButton" type="submit" onClick={handleLike}>
                                {
                                    isLiked.liked
                                    ?
                                    <SvgIcon className="likeIcon2" component={favourite} />
                                    :
                                    <SvgIcon className="likeIcon1" component={favouriteborder} />
                                }
                            </button>
                        </div>
                    )
                }
                
                <div>
                    {
                        likeList?.length
                        ?
                        <h4 className="likeCount">{likeList.length} {likeList.length===1 ? 'like' : 'likes'}</h4>
                        : 
                        <p disabled></p>
                    }
                    
                </div>

                <div className="postCaption">
                    <h4>{props.username}</h4> {props.caption}
                </div>

                <div className="comments">
                    {
                        comments.map((comment) => (
                            <p>
                                <h4>{comment.username}</h4> {comment.text}
                            </p>
                        ))
                    }
                </div>

                {
                    props.user && (
                        <form className="commentBox">
                            <input
                                className="commentInput"
                                type="text"
                                placeholder="Add a comment..."
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                            />
                            <button
                                className="postButton"
                                type="submit"
                                disabled={!comment}
                                onClick={postComment}
                            >
                                Post
                            </button>
                        </form>
                    )
                }

            </div>

        </div>     
    );
}

export default Post;