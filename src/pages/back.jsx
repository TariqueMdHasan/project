import { useNavigate, useLocation } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";

function Back() {
    const navigate = useNavigate()
    const location = useLocation()

    if (location.pathname === '/') return null

    return (
        <div>
            <button 
                className="p-2 fixed  text-white rounded-full hover:bg-gray-700 z-20 ml-2 mt-2 cursor-pointer" 
                onClick={() => navigate(-1)}
            >
                <IoArrowBack />
            </button>
        </div>
    )
}

export default Back
