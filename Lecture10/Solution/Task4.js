function selectFile(file) {
  return Promise.resolve(file);
}


function uploadFile(file) {
  return new Promise((resolve,reject) => {
    if (file !=="myPhoto.png"){
	reject("File don't match");
	}
else{
  setTimeout(() => {
      resolve("Upload complete: " + file);
    }, 1500);

}
   }); 
}

function confirmUpload(message) {
  console.log(message);
  return Promise.resolve();
}

// Chain the promises
selectFile("myPhoto.png")
  .then((file) => {
    return uploadFile(file);
  })
  .then((uploadMessage) => {
    return confirmUpload(uploadMessage);
  })
  .catch((err) => {
    console.error("Something went wrong:", err);
  });