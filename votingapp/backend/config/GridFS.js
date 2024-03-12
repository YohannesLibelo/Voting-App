const mongoose = require('mongoose');
const { GridFSBucket, ObjectId } = require('mongodb');
const connectDB = require('./connect'); // Import your database connection function

// Connect to MongoDB
connectDB();

// Get the default mongoose connection
const connection = mongoose.connection;

// Create a GridFSBucket instance
let gfs;
connection.once('open', () => {
  gfs = new GridFSBucket(connection.db, {
    bucketName: 'uploads', // Name of the GridFS bucket
  });
});

// Function to upload a file to GridFS
const uploadFile = (filename, stream) => {
  return new Promise((resolve, reject) => {
    const writeStream = gfs.openUploadStream(filename);
    stream.pipe(writeStream);
    writeStream.on('error', reject);
    writeStream.on('finish', () => {
      resolve(writeStream.id);
    });
  });
};

// Function to download a file from GridFS by file ID
const downloadFileById = (fileId) => {
  return new Promise((resolve, reject) => {
    const readStream = gfs.openDownloadStream(ObjectId(fileId));
    let buffer = Buffer.alloc(0);
    readStream.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk]);
    });
    readStream.on('end', () => {
      resolve(buffer);
    });
    readStream.on('error', reject);
  });
};



module.exports = {
  uploadFile,
  downloadFileById,
};
