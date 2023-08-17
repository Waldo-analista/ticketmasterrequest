import { Link, Outlet, useLocation,useNavigate} from "react-router-dom";
import styles from './profile.module.css';


const Profile=()=>{
    const {pathname}=useLocation();
    const navigate=useNavigate();

    const handleTabClick=(path)=>{
        navigate(`/profile/${path}`);
    }

    return (<div>
                <Link 
                to='/'
                className={styles.homeLink}
                >Inicio</Link>
                <div className={styles.tabContainer}>
                    <span 
                    className={`${pathname.includes('my-info')?styles.active:''} ${styles.tab}`}
                    onClick={()=>handleTabClick('my-info')}
                    style={{marginRight:12}}
                    >Mi Información</span>
                    <span 
                    className={`${pathname.includes('liked-events')?styles.active:''} ${styles.tab}`}
                    onClick={()=>handleTabClick('liked-events')}
                    >Eventos Favoritos</span>
                </div>
                <Outlet />
            </div>);


}

export default Profile;