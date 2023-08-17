import Navbar from "../../components/Navbar";
import Events from "../../components/Events";
import { useState, useRef, useEffect, useCallback } from "react";
import useEventsData from "../../hooks/useEventsData";
import ReactPaginate from "react-paginate";
import styles from "./Home.module.css";
/*import useEventsResults from "../../state/events-results";*/

const Home = () => {
  const { events, isLoading, error, fetchEvents, pages } = useEventsData();
  const [isToggle, setisToggle] = useState(false);

  /*const {data,isLoading,error,fetchEvents}=useEventsResults();
  
  const events=data?._embedded?.events||[];
  const pages=data?.page||{};*/

  const [searchTerm, setsearchTerm] = useState("");
  const refContainer = useRef();

  const fetchMyEvents = () => fetchEvents();
  const fetchMyEventsRef = useRef();
  fetchMyEventsRef.current = fetchMyEvents;

  useEffect(() => {
    fetchMyEventsRef.current();
  }, []);

  const handleNavbarSearch = (term) => {
    console.log(refContainer.current.setSearch(""));
    setsearchTerm(term);
    fetchEvents(`&keyword=${term}`);
  };

  const handlePageClick = useCallback(
    ({ selected }) => {
      fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
    },
    [searchTerm, fetchEvents]
  );

  const renderEvents = () => {
    if (isLoading) {
      return <div>Cargando resultados...</div>;
    }

    if (error) {
      return <div>Ha ocurrido un error</div>;
    }

    return (
      <>
        <div>
          <button onClick={() => setisToggle(!isToggle)}>
            {isToggle ? "ON" : "OFF"}
          </button>
          <Events searchTerm={searchTerm} events={events} />
          <ReactPaginate
            className={styles.pagination}
            nextClassName={styles.next}
            previousClassName={styles.previous}
            pageClassName={styles.page}
            activeClassName={styles.activePage}
            disabledClassName={styles.disabledPage}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pages.totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar onSearch={handleNavbarSearch} ref={refContainer} />
      {renderEvents()}
    </>
  );
};

export default Home;
