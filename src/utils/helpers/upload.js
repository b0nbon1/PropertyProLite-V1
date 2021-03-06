import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import image from '../../database/images';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const save = (db, obj) => {
    db.push(obj);
};

const upload = async (req, id) => {
    if (req.files == null) return undefined;
    const file = req.files.photo;
    const photo = await cloudinary.v2.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) return undefined;
        return result.url;
    });
    const propertyId = { propertyId: id };
    const Image = Object.assign(photo, propertyId);
    await save(image, Image);
    return photo.url;
};

export default upload;
