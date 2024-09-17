import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import "./Services.scss";
import { fetchServices, selectServices, setSelectedService } from '../app/informationSlice';
import { selectToken } from '../app/userSlice';
import { useEffect } from 'react';

export default function Services() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const services = useAppSelector(selectServices);
    const token = useAppSelector(selectToken);

    useEffect(() => {
        if (token) {
            dispatch(fetchServices(token));
        }
    }, [dispatch, token]);

    const handleServiceClick = (service: any) => {
        dispatch(setSelectedService(service));
        navigate('/service');
    };

    return (
        <section id="services">
            <div className="services-container">
                {services.map(service => (
                    <Link
                        key={service.service_code}
                        to="#"
                        onClick={() => handleServiceClick(service)}
                    >
                        <img src={service.service_icon} alt={service.service_name} />
                        <div>{service.service_name}</div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
