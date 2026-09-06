import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const App = () => {
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name); //formData k last m values add hpo jaayega
    //key-->name, val-->data.name(jo form s data ya val aaya hoga)
    formData.append("email", data.email);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }
    //file upload k liye array m milega, isliye 0 index use kiya

    await axios.post("http://localhost:3000/user/create", formData, {
      withCredentials: true,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register("name")}
          type="text"
          placeholder="Enter your name"
        />
        <br />
        <input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
        />
        <br />
        <input
          {...register("images")}
          multiple
          type="file"
          placeholder="Upload your profile pic"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default App;
