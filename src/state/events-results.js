import { create } from "zustand";

/*Store para almacenar valores de manera global*/ 
const useEventsResults= create((set) => ({
    data:[],
    isLoading:true,
    error:null,
    fetchEvents: async (params)=>{
        try{
                const requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
            const response=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${params?params:''}`, requestOptions)
            const data=await response.json();

             set(()=>({data,isLoading:false}))
            console.log(data)
            
        }catch(error){
            set(()=>{error})
        }

    }
  }))



export default useEventsResults;