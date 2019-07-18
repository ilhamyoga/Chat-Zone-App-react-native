// import firebase from 'firebase';

// class FirebaseSDK {
//   constructor() {
//     if (!firebase.apps.length) {
//       //avoid re-initializing
//       firebase.initializeApp({
//         apiKey: "AIzaSyAaQpl6ZzkcrYtPEM_zVImO4FW4wbjzwHk",
//         authDomain: "chatzone-b6423.firebaseapp.com",
//         databaseURL: "https://chatzone-b6423.firebaseio.com",
//         projectId: "chatzone-b6423",
//         storageBucket: "",
//         messagingSenderId: "396480333710",
//         appId: "1:396480333710:web:3ae921845cf0712f"
//       });
//     }
//   }
//   login = async (user, success_callback, failed_callback) => {
//     await firebase
//       .auth()
//       .signInWithEmailAndPassword(user.email, user.password)
//       .then(success_callback, failed_callback);
//   };
//   createAccount = async user => {
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(user.email, user.password)
//       .database().ref('users/' + user.email).set({name: user.name})
//       .then(
//         function() {
//           console.warn(
//             'created user successfully. User email:' +
//               user.email +
//               ' name:' +
//               user.name
//           );
//           var userf = firebase.auth().currentUser;
//           userf.updateProfile({ displayName: user.name }).then(
//             function() {
//               console.warn('Updated displayName successfully. name:' + user.name);
//               alert(
//                 'User ' + user.name + ' was created successfully. Please login.'
//               );
//             },
//             function(error) {
//               console.warn('Error update displayName.');
//             }
//           );
//         },
//         function(error) {   
//           console.error('got error:' + typeof error + ' string:' + error.message);
//           alert('Create account failed. Error: ' + error.message);
//         }
//       );
//   };
// }
// const firebaseSDK = new FirebaseSDK();
// export default firebaseSDK;