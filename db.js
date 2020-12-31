module.exports = function buildDB(db) {
  const clubSessionCollection = db.collection('club_sessions');
  const eventsCollection = db.collection('events');
  const tacoCollection = db.collection('tacos');
  const crabsCollection = db.collection('crabs');

  async function updateCrabs(doc) {
    const existing = await crabsCollection.findOne({ uid: doc.uid });
    if (existing) {
      return crabsCollection.findOneAndUpdate(
        { uid: doc.uid },
        { $inc: { crabs: doc.crabs } },
        { returnOriginal: false }
      );
    }
    return crabsCollection.findOneAndUpdate(
      { uid: doc.uid },
      { $set: doc },
      {
        upsert: true,
        returnOriginal: false,
      }
    );
  }

  async function updateTacos(doc) {
    const existing = await tacoCollection.findOne({ uid: doc.uid });
    if (existing) {
      return tacoCollection.findOneAndUpdate(
        { uid: doc.uid },
        { $inc: { tacos: doc.tacos } },
        { returnOriginal: false }
      );
    }
    return tacoCollection.findOneAndUpdate(
      { uid: doc.uid },
      { $set: doc },
      {
        upsert: true,
        returnOriginal: false,
      }
    );
  }

  async function getActiveClubSession() {
    return clubSessionCollection.findOne({ in_session: true });
  }

  async function insertClubSession(doc = {}) {
    return clubSessionCollection.insertOne({
      ...doc,
      in_session: true,
      date_start: new Date(),
      nominations: {},
    });
  }

  async function endClubSession() {
    return clubSessionCollection.updateOne(
      { in_session: true },
      { $set: { in_session: false } }
    );
  }

  async function insertClubNomination(author, nomination) {
    return clubSessionCollection.updateOne(
      { in_session: true },
      { $set: { [`nominations.${author}.${nomination}`]: [] } }
    );
  }

  // async function voteForClubNomination(author, nomination) {
  //   return clubSessionCollection.updateOne(
  //     { in_session: true },
  //     { $set: { [`nominations.${author}.${nomination}`]: [] } }
  //   );
  // }

  // async function removeClubNomination(author, nomination) {
  //   return clubSessionCollection.updateOne(
  //     { in_session: true },
  //     { $pull: { [`nominations.${author}`]: nomination } }
  //   );
  // }

  async function insertEvent(doc) {
    return eventsCollection.insertOne(doc);
  }

  return {
    getActiveClubSession,
    insertClubSession,
    endClubSession,
    insertClubNomination,
    //  removeClubNomination,
    insertEvent,
    updateTacos,
    updateCrabs,
  };
};
