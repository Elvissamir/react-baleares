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

    const handleDelete = async (image, index) => {
        try {
            console.log(index)
            const contentUrl = image.split('/') 
            const imageName = contentUrl[contentUrl.length - 1]

            const result = await imageService.deleteImage(imageName) 
            console.log('the result', result)

            const newImages = [...images]
            newImages.splice(index, 1)
            setImages(newImages)
        }
        catch (ex) {
            console.log(ex)
        }
    }

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
                    {images.map((image, index) => 
                        <div key={image} className='flex-col mr-3 w-full'>
                            <img className='w-52 h-28 mr-5' crossOrigin="anonymous" src={process.env.REACT_APP_API_URL+image} alt="" />
                            <button className='p-2 mt-2 text-white bg-red-500 rounded-sm' onClick={() => handleDelete(image, index)}>Delete</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default OptionsPage