import { initializeApp } from "firebase/app";

import {
   getFirestore,
   collection, 
   onSnapshot,
   addDoc, 
   deleteDoc,
   doc,
   query, 
   where,
   orderBy, 
   serverTimestamp,
   getDoc
  } from 'firebase/firestore'

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
const CollRef = collection(db, 'books');

//Queries 
//const q = query(CollRef, where('author', '==', 'asmaa Ahmed'))

// order by queries 
const q = query(CollRef, orderBy('createdAt', 'desc'))
//get collection data 
/*
getDocs(CollRef).then((snapShot) => {
  let books = [];
  // console.log(snapShot)
  snapShot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
}).catch((err) => {
  console.log(err.message)
})
*/

//get realtime collection data 
onSnapshot( q , (snapShot) => {
  let books = [];
  snapShot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
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

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  addDoc(CollRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
    .then(() => {
      addBookForm.reset();
    })
})


// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', deleteBookForm.id.value)
  deleteDoc(docRef).then(() => deleteBookForm.reset())
})

//get a single Document 

const docRef = doc(db, 'books', "lwD7IrvHfhzaqaKZQerE")

getDoc(docRef).then((doc) =>{
    console.log(doc.data(), doc.id);
})

onSnapshot(docRef, (doc)=>{
  console.log(doc.data(), doc.id);
})