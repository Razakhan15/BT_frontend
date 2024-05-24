"use client";
import Brain from "@/components/brain";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const Homepage = () => {
  const [file, setFile] = useState("");
  console.log(file);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = async (e) => {
    try {
      setLoading(true);
      var binaryData = [];
      binaryData.push(e.target.files[0]);
      setFile(
        URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
      );
      var form_data = new FormData();
      form_data.append("file", e.target.files[0]);
      const { data } = await axios.post(
        "http://127.0.0.1:5000/predict",
        form_data
      );
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert(error);
      setResult("");
      setFile("");
      setLoading(false);
    }
  };
  return (
    <motion.div
      className="h-full overflow-hidden"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="flex">
        <div className="lg:w-2/5 mt-5 w-full flex flex-col justify-center items-center">
          {file && (
            <div className="border-4 border-black p-5">
              <Image height={300} width={300} src={file} alt="img" />
            </div>
          )}
          <label htmlFor="file-input" className="sr-only">
            Choose file
          </label>
          <input
            onChange={handleChange}
            type="file"
            name="file-input"
            id="file-input"
            className="block border mt-10 w-1/2 border-gray-200 bg-white shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                file:bg-black file:border-0 file:text-white
                file:me-4
                file:py-3 file:px-4
                dark:file:bg-neutral-700 dark:file:text-neutral-400"
          />
          <h1 className="text-4xl font-bold mt-20">{loading ? "" : result}</h1>
        </div>
        <div className="hidden lg:block h-screen lg:w-3/5 mt-10">
          <Brain />
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
