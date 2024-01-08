import { useDispatch } from 'react-redux';
import { useSelector } from '../redux/useSelector';
import { addPark, addTrail } from '~/store/dropdownStore';
import { selectAllTrails } from '~/store/trailsStore';

export const useCardTrip = () => {
  const dispatch = useDispatch();
  const currentTrail = useSelector((state) => state.dropdown.currentTrail);
  const currentPark = useSelector((state) => state.dropdown.currentPark);
  const trailsDetails = useSelector(selectAllTrails); // updated selector for new trails slice
  const currentShape = trailsDetails.filter(
    (trail: any) => trail.properties.name == currentTrail,
  );

  const addTrailFn = (isTrail, isPark, value) => {
    if (isTrail) {
      dispatch(addTrail(value));
    } else if (isPark) {
      dispatch(addPark(value));
    }
  };

  return {
    currentTrail,
    currentPark,
    currentShape,
    addTrailFn,
  };
};
