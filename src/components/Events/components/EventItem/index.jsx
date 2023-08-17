import styles from "./EventItem.module.css";
import HearthFilled from "../../../../assets/heart_filled.png";
import HeartUnfilled from "../../../../assets/heart_nofilled.png";
import useLikeEvents from "../../../../hooks/useLikeEvents";

const EventItem = (props) => {
  const { info, id, name, image, onEventClick } = props;
  const { isEventLike, toggleEventLike } = useLikeEvents(id);

  const handleSeemoreClick = (e) => {
    e.stopPropagation();
    onEventClick(id);
  };

  const handleHeartClick = () => {
    toggleEventLike();
  };

  return (
    <div className={styles.eventItemContainer}>
      <div className={styles.imageContainer}>
        <img
          src={isEventLike ? HearthFilled : HeartUnfilled}
          alt="Heart Button"
          className={styles.heartImage}
          title={"Me gusta"}
          onClick={handleHeartClick}
        />
        <img src={image} alt={name} width={200} height={200} />
      </div>
      <div className={styles.eventItemContainerInfo}>
        <h2 className={styles.eventItemContainerInfoTitulo}>{name}</h2>
        <p className={styles.eventItemContainerInfoInfo}>{info}</p>
        <button
          className={styles.eventItemContainerInfoButton}
          onClick={handleSeemoreClick}
          title={`Ver más de ${name}`}
        >
          Ver más
          {/*<Link to={`/detail/${id}`}>
                Ver más
</Link>*/}
        </button>
      </div>
    </div>
  );
};

export default EventItem;
