import { isObjectEmpty } from '../../utils/isObjectEmpty';

const useHero = ({ imageDetails }) => {

  if (isObjectEmpty(imageDetails || {})) {
    imageDetails = {
      title: 'N/A',
      subtitle: 'N/A',
      source: require('../../assets/topographical-pattern.jpg'),
      alt: 'hero',
    };
  }
  
  return { ...imageDetails }

}

export default useHero