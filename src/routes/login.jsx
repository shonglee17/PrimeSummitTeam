import React, {useEffect} from 'react';

import {useNavigate, useLocation} from 'react-router-dom';
import {useAuth} from '../auth';
import {Snow} from '../snow';


function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  
  useEffect(function() {
    auth.tryLoginActiveSession(function() {
      navigate(from);
    });
  }, [navigate]);

  let from = location.state?.from?.pathname || '/';

  function handleSubmit(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let username = formData.get('username');
    let password = formData.get('password');

    auth.signin(
      username,
      password,
      function() {
        navigate(from, {replace: true});
      },
      function(userSessionData) {
        auth.handleNewPassword(username, password, userSessionData, function() {
          navigate(from, {replace: true});
        });
      },
    );
  }

  return (
    <div>
      <Snow></Snow>
      <form className="loginBackgorund" onSubmit={handleSubmit}>
        <div className="container white">
          <label style={{marginRight: '10px'}}>
            <b>Username</b>{' '}
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            required
          />
        </div>
        <div className="container white">
          <label style={{marginRight: '10px'}}>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            required
          />
        </div>
        <button type="submit" style={{marginLeft: '15px', width: '15%'}}>
          Login
        </button>
      </form>
    </div>
  );
}

export {LoginPage};



// function LoginPage() {
//   let navigate = useNavigate();
//   let location = useLocation();
//   let auth = useAuth();
//   useEffect(() => {
//     auth.tryLoginActiveSession(() => {
//       navigate(from);
//     });
//   }, [navigate]);

//   let from = location.state?.from?.pathname || '/';

//   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     let formData = new FormData(event.currentTarget);
//     let username = formData.get('username') as string;
//     let password = formData.get('password') as string;

//     auth.signin(
//       username,
//       password,
//       () => {
//         // Send them back to the page they tried to visit when they were
//         // redirected to the login page. Use { replace: true } so we don't create
//         // another entry in the history stack for the login page.  This means that
//         // when they get to the protected page and click the back button, they
//         // won't end up back on the login page, which is also really nice for the
//         // user experience.
//         navigate(from, {replace: true});
//       },
//       (userSessionData: any) => {
//         auth.handleNewPassword(username, password, userSessionData, () => {
//           navigate(from, {replace: true});
//         });
//       },
//     );
//   }

//   return (
//     <div>
//       <Snow></Snow>
//       <form className="loginBackgorund" onSubmit={handleSubmit}>
//         <div className="container white">
//           <label style={{marginRight: '10px'}}>
//             <b>Username</b>{' '}
//           </label>
//           <input
//             type="text"
//             placeholder="Enter Username"
//             name="username"
//             required
//           />
//         </div>
//         <div className="container white">
//           <label style={{marginRight: '10px'}}>
//             <b>Password</b>
//           </label>
//           <input
//             type="password"
//             placeholder="Enter Password"
//             name="password"
//             required
//           />
//         </div>
//         <button type="submit" style={{marginLeft: '15px', width: '15%'}}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export {LoginPage};
