import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCc3e8BVTAE3BnpaZmt4FLZqbHgwEs3rBI",
  authDomain: "fir-9-16f43.firebaseapp.com",
  projectId: "fir-9-16f43",
  storageBucket: "fir-9-16f43.appspot.com",
  messagingSenderId: "325187442162",
  appId: "1:325187442162:web:a76cc1274640500f56076b",
  measurementId: "G-ZQ58PSTEFV"
};
//initialize App 
const app = initializeApp(firebaseConfig)

//initialize Services 
const db = getFirestore(app);

//collection reference
const Books = collection(db, 'books');

//get collection data 
getDocs(Books).then((snapShot) => {
  let books =[];
 // console.log(snapShot)
 snapShot.docs.forEach((doc)=>{
    books.push({...doc.data(), id: doc.id})
 })
 console.log(books)
}).catch((err)=>{
  console.log(err.message)
})

/*
async function getBooks(db) {
  const booksCol = collection(db, 'books');
  const bookSnapshot = await getDocs(booksCol);
  const bookList = bookSnapshot.docs.map(doc => doc.data());
  console.log(bookList)
  return bookList;
}
getBooks(db)
*/