import EventItem from "./components/EventItem";

import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Events = ({ searchTerm, events }) => {
  console.log("rendered events");
  const navigate = useNavigate();

  const handleEventItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const renderEvents = () => {
    let eventsFiltered = events;
    if (searchTerm.length > 0) {
      eventsFiltered = eventsFiltered.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    return eventsFiltered.map((eventItem) => {
      return (
        <EventItem
          key={`event-item-${eventItem.id}`}
          name={eventItem.name}
          info={eventItem.info}
          image={eventItem.images[0].url}
          onEventClick={handleEventItemClick}
          id={eventItem.id}
        />
      );
    });
  };

  return (
    <>
      <div style={{ fontWeight: 700 }}>Eventos</div>
      {renderEvents()}
    </>
  );
};

export default memo(Events);
