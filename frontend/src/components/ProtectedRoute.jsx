import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from 'react'

function ProtectedRoute({ children }) {

    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        try {
            const response = await api.post('/api/token/refresh/', {
                refresh: refreshToken
            })

            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }

        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }

    }

    const auth = async () => {

        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decoded_token = jwtDecode(token)
        const token_expiration = decoded_token.exp
        const current_time = Date.now() / 1000

        if (token_expiration < current_time) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }

    }

    if (isAuthorized === null) {
        return <div className="">Loading...</div> // the loading component if you wish to style it.
    }

    return isAuthorized ? children : <Navigate to="/login" /> // if authorized then show the children else redirect to login page.

}

export default ProtectedRoute