import ProfileSection from '../components/ProfileSection';
import BookingHistory from '../components/BookingHistory';
import Transactions from '../components/Transactions';

function Profile() {
  return (
    <div className="container profile-container pt-5">
      <ProfileSection />
      <BookingHistory />
      <Transactions />
    </div>
  );
}

export default Profile;
