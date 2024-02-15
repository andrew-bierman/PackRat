export const useScoreData = (type, data) => {
  const id = data.id;
  const totalScore = data.total_score;
  const grades = data.grades;
  const scores = data.scores;

  const isAlreadyScored = totalScore !== 0;

  const textData = {
    pack: {
      title: isAlreadyScored ? 'Pack Score' : 'Score this pack!',
      subheader: 'See how this pack matches up with our scoring system!',
      description:
        'PackRating is our proprietary scoring system that rates packs based on their weight, essential items, and redundancy and versatility. We worked with experts to create a system that is as objective as possible. The higher the score, the better the pack!',
    },
    trip: {
      title: isAlreadyScored ? 'Trip Score' : 'Score this trip!',
      subheader: 'See how this trip matches up with our scoring system!',
      description:
        'PackRating is our proprietary scoring system that rates trips based on their weight, essential items, and redundancy and versatility. We worked with experts to create a system that is as objective as possible. The higher the score, the better the trip!',
    },
  };

  const title = textData[type].title;
  const subheader = textData[type].subheader;
  const description = textData[type].description;

  return {
    id,
    totalScore,
    grades,
    scores,
    isAlreadyScored,
    title,
    subheader,
    description,
  };
};
