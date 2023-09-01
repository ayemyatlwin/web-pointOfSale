import { Group } from "@mantine/core";
import { useGetMediaQuery } from "../../Feature/API/mediaApi";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  AiOutlineClose,
  AiOutlineCloudUpload,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { BsImages, BsFillGridFill } from "react-icons/bs";
import React, { useState } from "react";
import { Table } from "@mantine/core";
import { RiDeleteBin5Line } from "react-icons/ri";
import { PiCopyDuotone } from "react-icons/pi";
import Breadcrumb from "../../Components/Breadcrumb";
import { useUploadMediaMutation } from "../../Feature/API/mediaApi";
import Cookies from "js-cookie";
import { useDeleteMediaMutation } from "../../Feature/API/mediaApi";
import Pagination from "../../Components/Pagination";

//Expanded image component
const ExpandedImageView = ({ image, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
    <div className="max-w-3xl mx-auto p-4">
      <button
        onClick={onClose}
        className="mt-4  py-2  bg-transparent text-white rounded-lg"
      >
        <AiOutlineClose className=" text-3xl" />
      </button>
      <img src={image.url} alt="" className="rounded-lg" />
    </div>
  </div>
);
const Mediapgwpic = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteMedia] = useDeleteMediaMutation(); //deleting media calling
  const token = Cookies.get("token"); //cookie retrieving
  const [uploadMedia] = useUploadMediaMutation(); //media upload calling
  const { data: mediaData, isLoading, isError } = useGetMediaQuery(token); //media upload retrieving
  const media = mediaData || [];
  const [expandedImageId, setExpandedImageId] = useState(null); //expanded image state
  const [displayState, setDisplayState] = useState(false); //toggle view state
  const [displayState2, setDisplayState2] = useState(false); //toggle view sttae
  const [pictures,setPictures]=useState([]);
  console.log(mediaData);
 
  //func that upload media from dropzone
  const handleDropzoneUpload = async (acceptedFiles) => {
    try {
      console.log(acceptedFiles);
      
      const photos = new FormData();
      for (let i = 0; i < acceptedFiles.length; i++) {
        photos.append("photos[]", acceptedFiles[i], acceptedFiles[i].name);
      }
      for (const value of photos.entries()) {
        console.log(value);
        console.log(token);
      }
      // Use the mutation hook to upload the array of files
      const result = await uploadMedia({ photos, token });

      if (result.error) {
        // Handle any errors here
        console.error("Error uploading files:", result.error);
      } else {
        // Handle success, e.g., update your component state
      alert('File uploaded sucessfully')
      }
    } catch (error) {
      alert.error("An error occurred:", error)
    }
  };
  const images = mediaData?.data; 
  console.log(images);//inserting retrieved arr from server into a veraible
  //data within the table
  const rows = images?.map((element) => {
    let date_time = element.updated_at.split("T");
    const copyPictureInfo = (element) => {
      const infoToCopy = `Name: ${element.name}\nAccount: ${element.account}\nDate: ${date_time[0]}\nTime: ${date_time[1]}\nFile Size: ${element.file_size}`;

      // Create a temporary text area to hold the information
      const textArea = document.createElement("textarea");
      textArea.value = infoToCopy;

      // Append the text area to the document
      document.body.appendChild(textArea);

      // Select and copy the text
      textArea.select();
      document.execCommand("copy");

      // Remove the temporary text area
      document.body.removeChild(textArea);

      // Alert the user that the information has been copied
      alert("Picture information copied to clipboard.");
    };
    console.log(element);

    return (
      <tr key={element.id}>
        <td className=" text-white">{element.id}</td>
        <td className=" text-white">
          <img className=" w-[50px] h-[50px] my-6" src={element.url} alt="" />
        </td>
        <td className=" text-white">{element.account}</td>
        <td className=" text-white">{date_time[0]}</td>
        <td className=" text-white">{date_time[1]}</td>
        <td className=" text-white">{element.file_size}</td>
        <td className=" text-white">
          {" "}
          <div className="  flex">
            <RiDeleteBin5Line
              onClick={() => handleDelete(element.id,token)}
              className=" text-lg m-1 cursor-pointer hover:text-red-700"
            />
            <PiCopyDuotone
              onClick={() => copyPictureInfo(element)}
              className=" text-lg m-1 cursor-pointer hover:text-blue-700"
            />
          </div>
        </td>
      </tr>
    );
  });
  //func for deleting media
  const handleDelete = async (id, token) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this media?"
    );
    if (isConfirmed) {
      try {
        // Call the deleteMedia mutation with the id of the picture to delete
        const result = await deleteMedia({ id, token });

        if (result.error) {
          // Handle any errors here
          console.error("Error deleting media:", result.error);
        } else {
          // Handle success, e.g., update your component state
          console.log("Media deleted successfully:", result.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  return (
    <div className="  ">
      <div className=" p-10">
        <Breadcrumb
          title={"Media"}
          firstRoute={"Media"}
          secondRoute={"Uploader"}
          showBtn={false}
        />

        <Dropzone
          className=" mt-6 mb-10 bg-softblack  hover:bg-softblack border border-solid"
          onDrop={handleDropzoneUpload} // Call the upload function here
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...props}
        >
          <Group
            className=" mx-auto w-[250px] rounded-lg   "
            position="center"
            spacing="xl"
            style={{ minHeight: "220px", pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <AiOutlineCloudUpload />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <FcCancel />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <BsImages className="   text-blue-700  text-5xl " />
            </Dropzone.Idle>

            <div className="  ">
              <p className=" text-white text-lg ">
                <span className=" text-blue-600 underline">Browse</span> or drag
                an image
              </p>
            </div>
          </Group>
        </Dropzone>
        <div className=" pb-4 flex justify-between items-center">
          <Breadcrumb showBtn={false} firstRoute={"Media"} secondRoute={"Uploaded photo"} />
          <div className="">
            <AiOutlineOrderedList
              onClick={() => setDisplayState(false) && setDisplayState2(true)}
              className={`${displayState ? "text-blue-800" : "text-gray-300"} ${
                displayState ? "border-blue-800" : "border-gray-300"
              } hover:text-blue-800 hover:border-blue-800 text-gray-300 border cursor-pointer border-solid border-gray-300 mx-2 inline`}
            />
            <BsFillGridFill
              onClick={() => setDisplayState(true) && setDisplayState2(false)}
              className={`${
                !displayState ? "text-blue-800" : "text-gray-300"
              } ${
                !displayState ? "border-blue-800" : "border-gray-300"
              } hover:text-blue-800 hover:border-blue-800 text-gray-300  cursor-pointer border border-solid border-gray-300 inline`}
            />
          </div>
        </div>
        <div
          className={`${
            displayState ? "flex" : "hidden"
          }   my-6 overflow-y-auto  flex-wrap  justify-center gap-10 items-center`}
        >
          {images?.map((i) => {
            console.log(i.url);
            return (
              <img
                key={i.id}
                src={i.url}
                className=" cursor-pointer  hover:opacity-80  rounded-2xl w-[300px] h-[200px]"
                onClick={() =>
                  setExpandedImageId(i.id === expandedImageId ? null : i.id)
                }
                alt=""
              />
            );
          })}
          {expandedImageId !== null && (
            <ExpandedImageView
              image={images.find((i) => i.id === expandedImageId)}
              onClose={() => setExpandedImageId(null)}
            />
          )}
        </div>
        <div
          className={`${!displayState ? "block" : "hidden"} overflow-y-auto`}
        >
          <Table>
            <thead>
              <tr>
                <th className=" text-gray-300">NO</th>
                <th className=" text-gray-300">File PREVIEW</th>
                <th className=" text-gray-300">ACCOUNT</th>
                <th className=" text-gray-300">DATE</th>
                <th className=" text-gray-300">TIME</th>
                <th className=" text-gray-300">FILE SIZE</th>
                <th className=" text-gray-300">ACTION</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <div>
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          last_page={mediaData.to}
         
        />
      </div>
        </div>
      </div>
    </div>
  );
};

export default Mediapgwpic;
