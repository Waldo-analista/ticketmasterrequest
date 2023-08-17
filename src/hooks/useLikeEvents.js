import { useState } from "react";
import { LIKED_EVENTS_STORAGE_KEY } from "../utils/constants";



const checkisEventLiked=(eventId)=>{
    const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY))||[];

    return likedEvents.includes(eventId);
}   

const useLikeEvents=(eventId)=>{

    const [isEventLike,setisEventLike] = useState(checkisEventLiked(eventId));

    const toggleEventLike=()=>{
        const likedEvents =JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY))||[];
        
        const eventIndex=likedEvents.indexOf(eventId);

        if(eventIndex!==-1){
            likedEvents.splice(eventIndex,1);
            setisEventLike(false);
        }else{
            likedEvents.push(eventId);
            setisEventLike(true);
        }
        localStorage.setItem(LIKED_EVENTS_STORAGE_KEY,JSON.stringify(likedEvents));

    }

    return ({isEventLike,toggleEventLike});

}


export default useLikeEvents;