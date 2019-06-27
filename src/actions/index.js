import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onRegisterUser = (username, named, nameb, email, pass) => {
    return async dispatch => {
        
        axios.get('http://localhost:2019/users/:user', {
            params: {
                username: username
            }
        }).then(res => {
            if (res.data.length === 0) {
                axios.post('http://localhost:2019/reguser', {
                    username: username,
                    email: email,
                    password: pass
                }).then(res => {
                    dispatch({
                        type: 'AUTH_SUCCESS',
                        payload: 'Register Succeeded'
                    })
                    setTimeout(() => {
                        dispatch({
                             type: 'AUTH_NO_MESS' 
                            })
                    }, 3000)
                })
            } else {
                dispatch({
                    type: 'AUTH_ERROR',
                    payload: 'Username/email has been taken'
                })
                setTimeout(() => {
                    dispatch({
                         type: 'AUTH_NO_MESS' 
                        })
                }, 3000)
            }
        
        }).catch(err=>{
            console.log("\nRegister Click - Error: ", err);
        })
        
    }
}

export const onLoginClick = (user, pass) => {
    
    return (dispatch) => {
        axios.get('http://localhost:2019/users/:user/:pass', {
            params : {
                username: user,
                password: pass
            }
        }).then(res => {
            console.log(res.data);
            
            if (!res.data) {
                dispatch({
                    type: 'AUTH_ERROR',
                    payload: 'Username and Password gak match'
                })
                setTimeout(() => {
                    dispatch({
                        type: 'AUTH_NO_MESS'
                    })
                }, 3000)
            } else {
                const { id, username } = res.data[0]
                
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { id, username }
                })

                cookie.set("masihLogin", username, { path: '/' })
            }

        }).catch(err => {
            console.log("\nLogin Click - System Error: ", err)
        })
    }
}




export const onLogoutUser = () => {
    cookie.remove("masihLogin", { path: "/" });
    // cookie.remove("idLogin", { path: "/" });
    // cookie.remove("usernameLogin", { path: "/" });
    // cookie.remove("last_nameLogin", { path: "/" });
    // cookie.remove("first_nameLogin", {path:"/"});
    // cookie.remove("emailLogin", { path: "/" });
    return {
        type: 'LOGOUT_USER'
    }
}

export const keepLogin = (user) => {
    return dispatch => {
        axios.get('http://localhost:2019/users/:user', {
            params: {
                username: user
            }
        })
            .then(res => {
                if (res.data.length !== 0) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: { username: user }
                    })
                }
            }).catch(err=>{
                console.log("\nKeep Login - Error: ", err);
            })
    }
}