import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai';
import ProfileImage from "../components/ProfileImage"
import ImageUploading from "react-images-uploading";
import {RiImageEditFill} from 'react-icons/ri'

function Userpic({onUpdate, profpic}) {
  const [images, setImages] = useState(profpic);
  console.log(profpic);
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList);
    setImages(imageList);
    onUpdate(imageList[0].data_url);
  };
  console.log(profpic);


  return (
    <>
      <ImageUploading
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg"]}
        resolutionType="ratio"

      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="relative md:-right-8 xl:-right-8 ">
            <button className='text-white'
              style={isDragging ? { color: "red" } : null}
              onClick={() => {
                setImages(null);
                onImageUpload();
              }}
              {...dragProps}
            >
            <RiImageEditFill size="25px"/>
            </button>

                


          </div>
        )}
      </ImageUploading>
      {profpic?.length ? <img src={profpic}  className='object-cover rounded-full w-52 h-52 md:mr-10'/> : <img className='object-cover rounded-full w-52 h-52 md:mr-10' src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"/>}
      
    </>
    
    // </div>
  )
}


export default Userpic