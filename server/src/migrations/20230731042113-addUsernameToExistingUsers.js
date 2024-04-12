// module.exports = {
//   async up(db, client) {
//     // TODO write your migration here.
//     // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
//     // Example:
//     // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});

//   },

//   async down(db, client) {
//     // TODO write the statements to rollback your migration (if possible)
//     // Example:
//     // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
//   }
// };

export const up = async (db) => {
  console.log('Adding usernames to existing users...');

  const cursor = db.collection('users').find({ username: { $exists: false } });

  while (await cursor.hasNext()) {
    const user = await cursor.next();

    if (!user.username) {
      let generatedUsername = user.email
        ? user.email.split('@')[0]
        : 'packratuser';

      // Check for existing username
      let exists = await db
        .collection('users')
        .findOne({ username: generatedUsername });

      let counter = 1;
      while (exists) {
        generatedUsername = `${generatedUsername}${counter}`;
        counter++;
        // Check again with the new generated username
        exists = await db
          .collection('users')
          .findOne({ username: generatedUsername });
      }

      // Update the user
      await db
        .collection('users')
        .updateOne(
          { _id: user._id },
          { $set: { username: generatedUsername } },
        );
    }
  }
};

export const down = async (db) => {
  // Here you can write steps to undo the changes in up() if necessary.
};
