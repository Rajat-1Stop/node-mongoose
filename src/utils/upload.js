const fs = require('fs');
const path = require('path');
const sharp = require('sharp'); // Sharp uses a high-quality compression algorithm

const rootFolder = `${require.main.path}/public/uploads`;
const { convertToFile } = require('./convertFile');
const { ApiError } = require('../handler');

// Upload single file to specific folder with specific name
const uploadSingle = async (data, next) => {
    try {
        const folderPath = path.join(rootFolder, data.folder);
        const convertedFile = await convertToFile(data.file);
        if(Buffer.isBuffer(convertedFile)){
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath, { recursive: true });
            }
            // Compress the image
            const resizedImageBuffer = await sharp(convertedFile)
                .resize(600, 400, {
                    fit: sharp.fit.inside,
                    withoutEnlargement: true,
                }) // Adjust the desired width and height as per your requirement
                .toBuffer();
            
            const filePath = path.join(folderPath, data.fileName);
            fs.writeFileSync(filePath, resizedImageBuffer, 'binary');
            return true;
        }
        next(ApiError.badRequest('File is empty.'));
        return false;
    } catch (error) {
        next(ApiError.internal(error.message));
        return false;
    }
};

// Delete single file from specific folder
const deleteSingle = async (data) => {
    const folderPath = path.join(rootFolder, data.folder);
    const filePath = path.join(folderPath, data.fileName);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
    
};

module.exports = { uploadSingle, deleteSingle };