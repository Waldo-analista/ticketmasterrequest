import { useEffect,useState} from "react";

const useEventsData=()=>{
    const [data,setData]=useState([]);
    const [isLoading,setisLoading]=useState(true);
    const [error,setError]=useState()
    

    const fetchEvents= async (params)=>{
        try{
                const requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
            const response=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params?params:''}`, requestOptions)
            const data=await response.json();
            setData(data);
            setisLoading(false);
            console.log(data)
            
        }catch(error){
            setError(error)
        }

    }

    

    return {
        events:data._embedded?.events||[],
        isLoading,
        error,
        fetchEvents,
        pages:data?.page||{}
    }
}


export default useEventsData;


/*
        setTimeout(()=>{
            try{
                setData(eventsJSON);
                setisLoading(false);
            }
            catch(error){
                setError(error)
            }
            
        },4000)*/