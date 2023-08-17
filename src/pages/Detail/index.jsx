import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import useEventsResults from "../../state/events-results";

const Detail = () => {
  const { data } = useEventsResults();
  console.log(data);
  const { eventId } = useParams();
  const [eventData, seteventData] = useState({});
  const [error, seterror] = useState({});
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${
            import.meta.env.VITE_TICKETMASTER_API_KEY
          }`
        );
        const data = await response.json();
        seteventData(data);
        setisLoading(false);
      } catch (error) {
        seteventData({});
        seterror(error);
        setisLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  if (isLoading && Object.keys(eventData).length === 0) {
    return <div>Cargando Evento ⌛...</div>;
  }

  if (Object.keys(error).length > 0) {
    console.log(error);
    return <div>Ha ocurrido un error</div>;
  }
  console.log(eventData);
  return (
    <div className={styles.container}>
      <div className={styles.containerTitulo}>Detalles del Evento</div>
      <div className={styles.mainInfoContainer}>
        <img
          src={eventData.images?.[0].url}
          className={styles.eventImage}
          alt={eventData.name}
        />
        <h4 className={styles.eventName}>{eventData.name}</h4>
        <p className={styles.infoParagraph}>{eventData.info}</p>
        {eventData.dates?.start.dateTime ? (
          <p className={styles.dateParagraph}>
            {format(
              new Date(eventData.dates.start.dateTime),
              "d LLLL yyyy H:mm",
              { locale: es }
            ) + " hrs"}
          </p>
        ) : null}
      </div>
      <div className={styles.seatInfoContainer}>
        <h6 className={styles.seatMapTitle}>Mapa del Evento</h6>
        <img
          src={eventData.seatmap?.staticUrl}
          alt="Seat Map Event"
          className={styles.imagesSeatMapEvent}
        />
        <p className={styles.pleaseNoteLegend}>{eventData.pleaseNote}</p>
        <p className={styles.pleaseRangeLegend}>
          Rango de Precios: {eventData.priceRanges?.[0].min}-
          {eventData.priceRanges?.[0].max} {eventData.priceRanges?.[0].currency}
        </p>
        <a
          href={eventData.url}
          target="_blank"
          className={styles.goToShop}
          rel="noreferrer"
        >
          Ir por tus boletos
        </a>
      </div>
    </div>
  );
};

export default Detail;
