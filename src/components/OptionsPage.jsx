import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from "react"
import { UserContext } from "./context/userContext"
import { NavLink } from 'react-router-dom';
import imageService from '../services/imageService';
import routes from '../routes';

function OptionsPage () {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const [images, setImages] = useState([])

    useEffect(() => {
        const fetchImages = async () => {
            const { data } = await imageService.getImages(currentUser.user)
            setImages(data)
        }
        
        fetchImages()
    }, [])

    return (
        <div className="content-wrapper">
            <p className='text-3xl font-bold'>Options page</p>
            <div className='mt-3'>
                <NavLink className='action-button p-2' to={ routes.auth.uploadImage.url }>
                    Upload Image
                </NavLink>
            </div>
            <div className='mt-8'>
                <p className='text-xl font-bold'>My images: </p>
                <div className='flex mt-3'>
                    {images.map(image => 
                        <img className='w-52 h-28' key={image} crossOrigin="anonymous" src={process.env.REACT_APP_API_URL+image} alt="" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default OptionsPage