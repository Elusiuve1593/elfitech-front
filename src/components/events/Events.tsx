import { useEffect } from "react";
import { fetchEventsThunk } from "../../redux/events/operations";
import { fetchEvents } from "../../redux/events/selector";
import { EventsSlice } from "../../redux/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/redux_hooks";
import { AppDispatch } from "../../redux/store";
import { Pagination } from "../pagination/Pagination";
import { useNavigate } from "react-router-dom";
import styles from "./Events.module.scss";

export const Events = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { docs, page, limit, totalPages } =
    useAppSelector<EventsSlice>(fetchEvents);

  useEffect(() => {
    dispatch(fetchEventsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <div className={styles["events-container"]}>
      <h1>Events</h1>
      <div className={styles["events-grid"]}>
        {docs.map(({ _id, date, description, organization, title }) => (
          <div className={styles["event-card"]} key={_id}>
            <div className={styles["event-details"]}>
              <div>{title}</div>
              <div>{description}</div>
              <div>{organization}</div>
              <div>{date}</div>
            </div>
            <div className={styles["button-container"]}>
              <button onClick={() => navigate(_id)}>register</button>
              <button onClick={() => navigate(`participants/${_id}`)}>view</button>
            </div>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} />
    </div>
  );
};
