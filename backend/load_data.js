require('dotenv').config();
const mongoose = require('mongoose');
const { User, Pass, Place } = require('./models/index.js');

mongoose.connect(process.env.MONGO_URI);

const data = require('./data.json');

const convertUserForDB = (user, pass) => {
  const data = {
    ...user,
  }
}

async function loadUsers() {
  try {
    const existingUsers = await User.find({});

    if (existingUsers.length === 0) {
      await Promise.all(data.users.map(async user => {
        const pass = await Pass.create({ level: 1 });
        return {
          ...user,
          pass_id: pass._id
        };
      }))
        .then(res => User.insertMany(res))
        .then(users => {
          users.forEach(user => {
            console.log(`User: ${user._id} has successfully been created`);
            console.log(`  - pass_id: ${user.pass_id}`);
          });
        })
    } else {
      for (const userData of data.users) {
        const existingUser = existingUsers.find(user => user.phone_number === userData.phone_number);

        if (!existingUser) {
          const pass = await Pass.create({ level: 1 });
          const user = await User.create({
            ...userData,
            pass_id: pass._id
          });
          console.log(`User: ${user._id} has successfully been created`);
          console.log(`\t- pass_id: ${user.pass_id}`);
        } else {
          console.log(`User: ${existingUser._id} is already in the Database`);
          console.log(`\t- pass_id: ${existingUser.pass_id}`);
        }
      }
    }
  } catch (err) {
    console.error('An error occurs in the loadUsers()', err);
  }
}

async function loadPlaces() {
  try {
    const existingPlaces = await Place.find({});

    if (existingPlaces.length === 0) {
      const places = await Place.insertMany(data.places);
      places.forEach(place => {
        console.log(`Place has successfully been created with the id => ${place._id}`);
      })
    } else {
      for (const placeData of data.places) {
        const existingPlace = existingPlaces.find(place => place.phone_number === placeData.phone_number);

        if (!existingPlace) {
            const place = await Place.create(placeData);
            console.log(`Place has successfully been created with the id => ${place._id}`);
        } else {
          console.log(`Place is already in the Database with the id => ${existingPlace._id}`);
        }
      }
    }
  } catch (err) {
    console.error('An error occurs in the loadPlaces()');
  }
}

async function loadData() {
  try {
    await loadUsers();
    // await loadPlaces();
    console.log('Données chargées avec succès');
  } catch (error) {
    console.error('Erreur lors du chargement des données :', error);
  } finally {
    mongoose.connection.close();
  };
};

mongoose.connection.on("connected", (err, res) => {
  console.log("Mongoose is connected")
  loadData();
})
