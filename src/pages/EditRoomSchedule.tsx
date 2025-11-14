import RoomManagementOverview from '../components/RoomManagementOverview';
import CustomRoomAvailability from '../components/CustomRoomAvailability';
import BulkScheduleManagement from '../components/BulkScheduleManagement';

function EditRoomSchedule() {
  return (
    <div className="container pt-5">
      <RoomManagementOverview />
      <CustomRoomAvailability />
      <BulkScheduleManagement />
    </div>
  );
}

export default EditRoomSchedule;
