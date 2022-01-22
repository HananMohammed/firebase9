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
   getDoc,
   updateDoc
  } from 'firebase/firestore';

  import { 
    getAuth, 
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
   } from "firebase/auth";

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
const auth = getAuth();

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
const unsubCol = onSnapshot( q , (snapShot) => {
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

const unsubDoc = onSnapshot(docRef, (doc)=>{
  console.log(doc.data(), doc.id);
})

//update Document 

const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const docRef = doc(db, 'books', updateBookForm.id.value)
  updateDoc(docRef, {  title:'Updated Title'}).then(()=>{updateBookForm.reset();})
})


//Authentication
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = signupForm.email.value
  const password = signupForm.password.value
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    //  console.log(user);
      signupForm.reset();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
})



const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const email = loginForm.email.value
  const password = loginForm.password.value
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential)=>{
    const user = userCredential.user;
   // console.log(user);
    loginForm.reset();
  })
})


//logout 
const logout = document.querySelector('.logout')
logout.addEventListener('click', (e)=>{
  e.preventDefault()
  signOut(auth).then(()=>{ 
   // console.log('The USer Signed Out')
   }).catch((err)=>{
      console.log(err.message)
   })
   
})


//Subscribing to Auth Changes 

const unsubAuth = onAuthStateChanged(auth, (user)=>{
  console.log('User Status Changed : ', user);
})

//unsubscribe from changes (Auth and Db)
const unSubscribe = document.querySelector('.unSubscribe')
unSubscribe.addEventListener('click', (e)=>{
  e.preventDefault()
  console.log('unsubscribing .....')
  unsubCol()
  unsubDoc()
  unsubAuth()
})
