import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
  deleteField,
  addDoc,
  collection,
  Timestamp,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
export default Timestamp;
// All data to using in project
export let state = {
  userInfo: {
    bill: 0,
    nickname: "USER",
    email: "undefined@gmail.com",
    id: "123",
  },
  currency: {
    usd: null,
    eur: null,
  },
  records: [],
  categories: [],
  refreshLimitInfo: [],
};
// Reseting state to default
export function resetAllState() {
  state = {
    userInfo: {
      bill: 0,
      nickname: "USER",
      email: "undefined@gmail.com",
      id: "123",
    },
    currency: {
      usd: null,
      eur: null,
    },
    records: [],
    categories: [],
    refreshLimitInfo: [],
  };
}
// Log out user from page
export async function logOut(auth) {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .then(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is signed in:", user);
        } else {
          console.log("No user is signed in.");
        }
      });
    })
    .catch((error) => {
      console.error("Sign out error:", error);
      return error;
    });
}
// Calculating percent for limit page
export function calculatePercentLimitBar(value) {
  const category = state.categories.find((el) => el.info.title == value);
  const categoryLimit = Number(category.info.limit);
  const recordsCategory = state.records.filter(
    (el) => el.info.category == category.info.title
  );
  if (recordsCategory.length === state.refreshLimitInfo[0])
    return state.refreshLimitInfo[1];
  const sumOfRecords = recordsCategory.reduce((accumulator, record) => {
    if (record.info.type == "outcome")
      return accumulator + Number(record.info.sum);
    if (record.info.type == "income")
      return accumulator - Number(record.info.sum);
  }, 0);
  const percentLimit = Math.round((sumOfRecords * 100) / categoryLimit).toFixed(
    0
  );
  state.refreshLimitInfo.push(recordsCategory.length);
  state.refreshLimitInfo.push(percentLimit);
  return percentLimit;
}
// Adding record to database
export async function addRecordToDataBase(
  db,
  category,
  type,
  sum,
  description,
  id
) {
  try {
    const currentDate = Timestamp.now();
    const docRef = await addDoc(
      collection(db, `users/${state.userInfo.id}/records`),
      {
        category: category,
        type: type,
        sum: sum,
        description: description,
        date: currentDate,
        id: id,
      }
    );
    const lastDoc = await getLastDocument(db, "records", "date");
    console.log(lastDoc);
    const record = {
      id: lastDoc.id,
      info: lastDoc.data(),
    };

    state.records.push(record);
    return "Adding record to database is success";
  } catch (e) {
    console.error("Error adding category: ", e);
  }
}
// Adding category to database
export async function addCategoryToDataBase(limit, currency, title, db, id) {
  try {
    const currentDate = Timestamp.now();
    const docRef = await addDoc(
      collection(db, `users/${state.userInfo.id}/categories`),
      {
        limit: limit,
        currency: currency,
        title: title,
        timestamp: currentDate,
      }
    );

    const lastDoc = await getLastDocument(db, "categories");

    const category = {
      id: lastDoc.id,
      info: lastDoc.data(),
    };

    state.categories.push(category);
    console.log(state.categories);
    return "Adding category to database is success";
  } catch (e) {
    console.error("Error adding category: ", e);
  }
}
// Removing category from database
export async function removeCategoryFromDatabase(title, db) {
  const ref = collection(db, `users/${state.userInfo.id}/categories/`);

  const querySnapshot = await getDocs(ref);
  querySnapshot.forEach(async (doc) => {
    if (doc.data().title == title) {
      await deleteDoc(doc.ref);
    }
  });
}
// Removing record from database
export async function removeRecordFromDatabase(id, db) {
  const ref = collection(db, `users/${state.userInfo.id}/records/`);
  const item = state.records.find((item) => item.id === id);
  state.records = state.records.filter((item) => item.id !== id);
  const querySnapshot = await getDocs(ref);
  querySnapshot.forEach(async (doc) => {
    if (doc.data().id == item.info.id) {
      await deleteDoc(doc.ref);
    }
  });
}

// Queries to get data from database
export async function getAllCertainData(db, queryParameter) {
  const q = query(
    collection(db, `users/${state.userInfo.id}/${queryParameter}`)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const allDocsCategory = querySnapshot.docs;
    allDocsCategory.forEach((obj) => {
      state[queryParameter].push({
        id: obj.id,
        info: obj.data(),
      });
    });
  }
}
// Getting last document from database
export async function getLastDocument(
  db,
  queryParameter,
  sortParameter = "timestamp"
) {
  try {
    const q = query(
      collection(db, `users/${state.userInfo.id}/${queryParameter}`),
      orderBy(sortParameter, "desc"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const lastDoc = querySnapshot.docs[0];
      const lastDocData = lastDoc.data();
      return lastDoc;
    } else {
      console.log("Collection is empty");
    }
  } catch (error) {
    console.error("Error to get document:", error);
  }
}
// Change limit
export async function changeLimitCategoryDataBase(ref, limit, db) {
  const testUpdate = doc(db, `users/${state.userInfo.id}/categories/${ref}`);
  await updateDoc(testUpdate, {
    limit: limit,
  });
}
// Converting currency
export function convertCurrency(amount, operation, currency) {
  if (operation == "buy" && currency == "dollar") {
    const result =
      amount * (state.currency.usd + (state.currency.usd * 2, 2) / 100);
    return result;
  } else if (operation == "sell" && currency == "dollar") {
    const result = amount * state.currency.usd;
    return result;
  } else if (operation == "buy" && currency == "euro") {
    const result =
      amount * (state.currency.eur + (state.currency.eur * 2, 2) / 100);
    return result;
  } else if (operation == "sell" && currency == "euro") {
    const result = amount * state.currency.eur;
    return result;
  }
}
// Deleting records from database
export async function deleteDataFromDatabase(id, field, db) {
  delete state.records[id];
  const washingtonRef = doc(db, `users/${state.userInfo.id}`);

  await updateDoc(washingtonRef, {
    records: state.records,
  });
}
// Getting newly exchange
export async function getRelevantExchange(url) {
  try {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        return data.filter(
          (currency) => currency.cc == "EUR" || currency.cc == "USD"
        );
      })
      .then((data) => {
        state.currency.usd = data[0].rate;
        state.currency.eur = data[1].rate;
        return { usd: state.currency.usd, eur: state.currency.eur };
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.log(error);
  }
}
// Adding user to database after registration
export async function AddUserToDataBase(db, email, nickname, userId) {
  state.userInfo.id = userId;
  try {
    await setDoc(doc(db, `users`, `${userId}`), {
      email: email,
      nickname: nickname,
      bill: 0,
    });
    return "Adding user to database is success";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
// Getting user info after login
export async function getUserInfo(db, id) {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userInfo = docSnap.data();
      return userInfo;
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error(error);
  }
}
// Chossing login or register user
export async function registerOrLoginUser(
  email,
  password,
  nickname = " ",
  method,
  db
) {
  const auth = getAuth();
  const userEmail = email;
  const userPassword = password;
  if (method) {
    const userNickname = nickname;
    return await createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        const userInfo = AddUserToDataBase(
          db,
          userEmail,
          userNickname,
          user.uid
        );
        state.userInfo.email = userEmail;
        state.userInfo.nickname = userNickname;
        console.log("Register success");
        return { isOk: true, result: userInfo };
      })
      .catch((error) => {
        console.error(error);
        return { isOk: false, error: error.message };
      });
  } else {
    return await signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        state.userInfo.id = user.uid;
        const userInfo = getUserInfo(db, user.uid);
        getAllCertainData(db, "records");
        getAllCertainData(db, "categories");
        return userInfo;
      })
      .then((userInfo) => {
        state.userInfo.bill = userInfo.bill;
        state.userInfo.nickname = userInfo.nickname;
        state.userInfo.email = userInfo.email;
        return { isOk: true, result: userInfo };
      })
      .catch((error) => {
        console.error(error);
        return { isOk: false, error: error.message };
      });
  }
}
