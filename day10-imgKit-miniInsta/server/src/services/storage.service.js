import Imagekit from "imagekit";

const storageInstance = new Imagekit({
  urlEndPoint: process.env.IK_URL,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

//imagekit ko btate h ki is credentials hm use krne waale h
export const sendFiles = async (file, fileName) => {
  const obj = {
    file, //file:file
    fileName, //fileName:fileName
    folder: "cohort-3", //is folder m save ho jaayega
  };

  
  return await storageInstance.upload(obj);
};
