import React from 'react';
import RemovePost from './Assets/RemovePost';
import {Link} from 'react-router-dom'

function PostCard({name, description, id}) {
    return (
        <div
          tabindex="0"
          aria-label="card 1"
          class="focus:outline-none shadow-lg shadow-black rounded-2xl 2xl:w-full mb-7 bg-gray-300 p-6"
        >
          <div class="flex items-center  border-b border-gray-400 pb-6">
            <div class="flex items-start justify-between w-full">
              <Link to ={`/homep/postdetail/${id}`}> 
              <div class="pl-3 w-full">
                <p
                  tabindex="0"
                  class="focus:outline-none text-xl font-medium leading-5 text-verdeOscuro"
                > 
                  {name} <br/>
                  Vacante {id}
                </p>      
              </div>
              </Link>
              <div role="img" aria-label="bookmark">
                <p class="focus:outline-none" width="28" height="28">
               <RemovePost
               id = {id}/>
                </p>
              </div>
            </div>
          </div>
          <div class="px-2">
            <p
              tabindex="0"
              class="focus:outline-none text-sm leading-5 py-2 text-gray-600"
            >
              {description}
            </p>
          </div>
        </div>
      );
    
  
  
}

export default PostCard;
