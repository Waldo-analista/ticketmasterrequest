import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LIKED_EVENTS_STORAGE_KEY } from "../../../../utils/constants";
import EventItem from "../../../../components/Events/components/EventItem";

const LikeEvents=()=>{
    const [events,setEvents]=useState([]);
    const [isLoading,setisLoading]=useState(false);
    const [error,setError]=useState({});

    const navigate=useNavigate();

    useEffect(()=>{
        const fetchEventsDetails=async ()=>{
            try{
                setisLoading(true);
                const likedEvents=JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY))||[];

                const results=[];
                for(const eventId of likedEvents){
                    
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                  };

                const response=await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}/?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`, requestOptions)
                const data=await response.json();
                results.push(data);
            
                }

                setEvents(results);
                console.log(results);

            }catch(error){
                setError(error)
            }finally{
                setisLoading(false);
            }

        }

        fetchEventsDetails();

    },[]);


    if(Object.keys(error).length>0){
        return <div>Ha ocurrido un Error</div>
    }

    if(isLoading){
        return <div>Cargando Resultados...</div>
    }

    const handleEventItemClick=(id)=>{
        navigate(`/detail/${id}`); 
    }

    return (
        <>
        <div>
            {events.map((eventItem, index)=>
                <EventItem 
                key={`liked-event-item-${eventItem.id}-${index}`}
                name={eventItem.name}
                info={eventItem.info}
                image={eventItem.images[0].url}
                onEventClick={handleEventItemClick}
                id={eventItem.id}                
                />
            )}
        </div>
        </>
    )
}

export default LikeEvents;