import httpService from "./httpService";

const imagesEndpoint = `${process.env.REACT_APP_API_URL}/myimages`

const upload = data => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return httpService.post(imagesEndpoint, data, config)
}

const getImages = user => {
    return httpService.get(imagesEndpoint, user)
}

const deleteImage = imageName => {
    return httpService.delete(imagesEndpoint, { data: { imageName } })
}

const imageService = {upload, getImages, deleteImage}

export default imageService