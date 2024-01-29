import { useState } from 'react';
const useAccordionState = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prevState) => !prevState);

  return [expanded, toggleExpanded];
};

export default useAccordionState;
