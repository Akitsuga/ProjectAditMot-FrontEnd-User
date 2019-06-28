import axios from 'axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onRegisterUser = (username, named, nameb, email, pass) => {
    return dispatch => {
        axios.get(`http://localhost:2019/check/:username/:email`, {
            params: {
                username, email
            }
        })
        .then(res => {
            console.log(res)
            
            if (!res.data.length) {
                axios.post('http://localhost:2019/reguser', {
                    username,
                    nama_depan: named,
                    nama_belakang: nameb,
                    email,
                    password: pass
                }).then(res => {
                    console.log(res);
                    dispatch({
                        type: 'AUTH_ERROR',
                        payload: res.data
                    })
                }).catch(err => {
                    console.log(err);
                })
            } else {
                dispatch({
                    type: 'AUTH_ERROR',
                    payload: 'Failed to register'
                })
            }
        })     
        // dispatch({
                //     type: 'LOGIN_SUCCESS',
                //     payload: { id, username }
    //             })

    //             cookie.set("masihLogin", username, { path: '/' })

    //         } else {
    //             dispatch({
    //                 type: 'AUTH_ERROR',
    //                 payload: 'Username and Password gak match'
    //             })
    //             setTimeout(() => {
    //                 dispatch({
    //                     type: 'AUTH_NO_MESS'
    //                 })
    //             }, 3000)
    //         }

    //     }).catch(err => {
    //         console.log("\nLogin Click - System Error: ", err)
    //     })
    // }

    // return async dispatch => {
        // try{
        //     const cuser = await axios.get(`http://localhost:2019/users/username/${username}`)
        //     const cmail = await axios.get(`http://localhost:2019/users/email/${email}`)
        //     console.log(cuser)
        //     console.log(cmail)
        //     if(cuser.data.length === 0 & cmail.data.length === 0){
        //         await axios.post('/reguser', {
        //             username,
        //             nama_depan:named,
        //             nama_belakang:nameb,
        //             email,
        //             password:pass
        //         }).then(res => {
        //             dispatch({
        //                 type:'AUTH_SUCCESS',
        //                 payload: 'Register Success'
        //             })
        //             setTimeout(() => {
        //                 dispatch({
        //                     type: 'SET_TIMEOUT'
        //                 })
        //             }, 3000)
        //         })
        //     } else if(cuser.data.length !== 0 & cmail.data.length === 0){
        //         return dispatch({
        //             type: 'AUTH_ERROR',
        //             payload: 'Username has taken'
        //         })
        //     } else if(cuser.data.length === 0 & cmail.data.length !== 0){
        //         return dispatch({
        //             type: 'AUTH_ERROR',
        //             payload: 'Email has taken'
        //         })
        //     } else {
        //         return dispatch ({
        //             type: 'AUTH_ERROR',
        //             payload: 'Email and username has been taken'
        //         })
        //     }
        // } catch (err){
        //     console.log(`it's an error. Now what to do with this ${err}`);
        // }
    // }
}}


export const onLoginClick = (user, pass) => {
    
    return (dispatch) => {
        axios.get('http://localhost:2019/users/:user/:pass', {
            params : {
                username: user,
                password: pass
            }
        }).then(res => {
            // console.log(res);
            
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
                console.log(res.data);
                
                const { id, username } = res.data
                
                dispatch({
                    type: 'BERHASIL_LOGIN',
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