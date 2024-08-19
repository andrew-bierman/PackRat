import { ProfileContainer } from '../widgets';

interface ProfileScreenProps {
  userId?: string;
}
export const ProfileScreen = ({ userId }: ProfileScreenProps) => {
  return <ProfileContainer id={userId} />;
};
