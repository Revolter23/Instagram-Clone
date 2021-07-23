import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import UserFeed from "./components/UserFeed";

import { auth } from "./components/firebase";

function App() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                setUser(authUser);
            }
            else {
                setUser(null);
            }
        })

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <Router>
            <div>
                {
                    user
                    ?
                    <Redirect to={`/${user.displayName}`}/>
                    :
                    null
                }
                <Switch>
                    <Route path="/" exact component={LogIn}/>
                    <Route path="/login" exact component={LogIn}/>
                    <Route path="/signup" component={SignUp} />
                    <Route path="/:user">
                        <UserFeed user={user} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;