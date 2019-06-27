const init = {
    id: "",
    username: "",
    nama_depan: "",
    nama_belakang: "",
    email: "",
    password: "",
    error: "",
    success: ""
}


const AuthReducer = (state = init, action) => {
    switch (action.type) {
        case 'BERHASIL_LOGIN':
            return {
                ...state, 
                id: action.payload.id, 
                nama_depan: action.payload.nama_depan,
                nama_belakang: action.payload.nama_belakang,
                username: action.payload.username,
                email: action.payload.email
            }
            
        case 'AUTH_ERROR':
            return {...state, error: action.payload, success: ''}

        case 'AUTH_SUCCESS':
            return {...state, error: '', success: action.payload}

        case 'ERROR_LOGIN':
            return {...state, error: action.payload}

        case 'NO_MESSAGE':
            return {...state, error: '', success: ''}

        case 'LOGOUT_USER':
            return {...state, ...init} 
            
        default:
            return state
    }
}

export default combineReducers(
    {
        auth:AuthReducer // berisi data init di atas
    }
)