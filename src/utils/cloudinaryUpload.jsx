
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


// import AWS from 'aws-sdk';

// // Initialize the S3 client
// const s3 = new AWS.S3({
//   accessKeyId: "AKIAQZS32TMAIQ22KNFF",
//   secretAccessKey: "SimtLw13s4huT4zy6Gse7medQ+f4HbGJlcmecXY7",
//   // region: "us-east-1" // specify your S3 bucket region
// });

// const uploadToS3 = async (file) => {
//   try {
//     // Prepare the S3 upload parameters
//     const params = {
//       Bucket: "cutnova-s3",
//       Key: file.name, // The name of the file in S3
//       Body: file,
//       ContentType: file.type, // MIME type of the file
//       ACL: 'public-read' // Set permissions, if needed
//     };

//     // Upload the file to S3
//     const response = await s3.upload(params).promise();

//     // Return the S3 file URL if upload is successful
//     return response.Location;
//   } catch (error) {
//     console.error("File upload error", error);
//     throw error;
//   }
// };

// export default uploadToS3;
