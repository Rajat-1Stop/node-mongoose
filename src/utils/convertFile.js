const { getTime } = require('date-fns');

// Create a function that converts a base64 string to a file and return file object
const convertToFile = (base64String) => {
    // const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const mimeType = base64String[1];
    const base64Data = base64String[2];
    
    // Create a buffer from the base64 data
    const buffer = Buffer.from(base64Data, 'base64');
    buffer.fileName = getTime(new Date());
    buffer.mimeType = mimeType;
    
    return buffer;
}

const getFileExtension = (base64String) => {
    const mimeType = base64String[1];
    const mimeTypeSplit = mimeType.split('/');
    const extension = mimeTypeSplit[1];
    return extension;
};

module.exports = {convertToFile, getFileExtension};