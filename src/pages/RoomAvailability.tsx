import RoomStatusSection from '../components/RoomStatusSection';
import PredictiveAvailabilitySection from '../components/PredictiveAvailabilitySection';
import CalenderScheduling from '../components/CalenderScheduling';

function RoomAvailability() {
  return (
    <div className="container profile-container pt-5">
      <h1 className="fw-bolder mb-4">Room Availability</h1>
      <RoomStatusSection />
      <PredictiveAvailabilitySection />
      <CalenderScheduling />
    </div>
  );
}

export default RoomAvailability;
