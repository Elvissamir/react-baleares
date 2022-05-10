import httpService from "./httpService";

const imagesEndpoint = `${process.env.REACT_APP_API_URL}/images`

const upload = data => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    return httpService.post(imagesEndpoint, data, config)
}

const imageService = {upload}

export default imageService