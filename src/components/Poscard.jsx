import React from "react";
import authconfig from "../Appwrite/Config";
import { Link } from "react-router-dom";

function Postcard({
    $id,
    featuredimg,
    title,
}){
    return(
        <Link to={`/post/${$id}`}>
            <div className=" w-full bg-gray-300 rounded-xl p-4 ">
                <div className='w-full justify-center mb-4'>
                    <img src={authconfig.getfile(featuredimg)} alt={'fdfd'}/>
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    )
}

export default Postcard