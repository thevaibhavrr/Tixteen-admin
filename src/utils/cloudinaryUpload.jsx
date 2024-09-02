
import axios from 'axios';

const uploadToCloudinary = async (file) => {
  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Tixteen-admin");
    // data.append("folder", "Tixteen Admin")

    
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dnjhxyruk/upload`,
      data
    );

    if (response.status === 200) {
      return response.data.url;
    } else {
      throw new Error('Failed to upload to Cloudinary');
    }
  } catch (error) {
    console.error("File upload error", error);
    throw error;
  }
};

export default uploadToCloudinary;
