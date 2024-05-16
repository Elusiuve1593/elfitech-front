import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEventsThunk } from "../../redux/events/operations";
import { fetchEvents } from "../../redux/events/selector";
import { EventsSlice, Participant } from "../../redux/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/redux_hooks";
import styles from "./Participants.module.scss";

export const Participants = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { docs, page, limit } = useAppSelector<EventsSlice>(fetchEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);

  useEffect(() => {
    dispatch(fetchEventsThunk({ page, limit }));
  }, [dispatch]);

  useEffect(() => {
    const filtered = docs
      .find((doc) => doc._id === id)
      ?.participants.filter((participant) => {
        const fullName = participant.fullName.toLowerCase();
        const email = participant.email.toLowerCase();
        const search = searchTerm.toLowerCase();
        return fullName.includes(search) || email.includes(search);
      });

    setFilteredParticipants(filtered || []);
  }, [docs, id, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles["participants-container"]}>
      {filteredParticipants.length === 0 ? (
        <h2>No participants found</h2>
      ) : (
        <div>
          <div>
            <input
              className={styles["search-input"]}
              type="text"
              placeholder="Search by full name or email"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <h2>Participants</h2>
          <ul className={styles["participants-list"]}>
            {filteredParticipants.map(
              (participant: Participant, index: number) => (
                <li key={index}>
                  <p>
                    <span className={styles["participants-data"]}>Full Name:</span> {participant.fullName}
                  </p>
                  <p>
                    <span className={styles["participants-data"]}>Email:</span> {participant.email}
                  </p>
                  <p>
                    <span className={styles["participants-data"]}>Date of Birth:</span> {participant.dateOfBirth}
                  </p>
                  <p>
                    <span className={styles["participants-data"]}>Event Source:</span> {participant.eventSource}
                  </p>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
