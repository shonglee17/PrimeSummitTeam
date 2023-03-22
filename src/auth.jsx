import * as React from 'react';
import {cognitoAuthProvider} from './authProvider';
import {CognitoUser} from 'amazon-cognito-identity-js';


let AuthContext = React.createContext(null);

function AuthProvider({children}) {
  let [user, setUser] = React.useState(null);

  let signin = (
    userName,
    password,
    callback,
    newPasswordCallback,
  ) => {
    return cognitoAuthProvider.signin(
      userName,
      password,
      (username, jwtToken) => {
        setUser({
          username: username,
          token: jwtToken,
        });
        callback();
      },
      newPasswordCallback,
    );
  };

  let handleNewPassword = (
    userName,
    newPassword,
    sessionUserAttributes,
    callback,
  ) => {
    return cognitoAuthProvider.handleNewPassword(
      newPassword,
      sessionUserAttributes,
      (username, jwtToken) => {
        setUser({
          username: username,
          token: jwtToken,
        });
        callback();
      },
    );
  };

  let signout = (callback) => {
    return cognitoAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let tryLoginActiveSession = (callback) => {
    return cognitoAuthProvider.tryLoginActiveSession(
      (userName, jwtToken) => {
        setUser({
          username: userName,
          token: jwtToken,
        });
        callback();
      },
    );
  };

  let value = {
    user,
    signin,
    signout,
    handleNewPassword,
    tryLoginActiveSession,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
}

function useAuth() {
  return React.useContext(AuthContext);
}

export { AuthContext, useAuth, AuthProvider };


// interface AuthContextType {
//   user: any;
//   signin: (
//     userName: string,
//     password: string,
//     callback: Function,
//     newPasswordCallback: Function,
//   ) => void;
//   handleNewPassword: (
//     userName: string,
//     password: string,
//     sessionUserAttributes: any,
//     callback: Function,
//   ) => void;
//   signout: (callback: VoidFunction) => void;
//   tryLoginActiveSession: (callback: Function) => void;
// }

// let AuthContext = React.createContext<AuthContextType>(null!);

// function AuthProvider({children}: {children: React.ReactNode}) {
//   let [user, setUser] = React.useState<any>(null);

//   let signin = (
//     userName: string,
//     password: string,
//     callback: Function,
//     newPasswordCallback: Function,
//   ) => {
//     return cognitoAuthProvider.signin(
//       userName,
//       password,
//       (username: string, jwtToken: string) => {
//         setUser({
//           username: username,
//           token: jwtToken,
//         });
//         callback();
//       },
//       newPasswordCallback,
//     );
//   };

//   let handleNewPassword = (
//     userName: string,
//     newPassword: string,
//     sessionUserAttributes: any,
//     callback: Function,
//   ) => {
//     return cognitoAuthProvider.handleNewPassword(
//       newPassword,
//       sessionUserAttributes,
//       (username: string, jwtToken: string) => {
//         setUser({
//           username: username,
//           token: jwtToken,
//         });
//         callback();
//       },
//     );
//   };

//   let signout = (callback: VoidFunction) => {
//     return cognitoAuthProvider.signout(() => {
//       setUser(null);
//       callback();
//     });
//   };

//   let tryLoginActiveSession = (callback: Function) => {
//     return cognitoAuthProvider.tryLoginActiveSession(
//       (userName: string, jwtToken: string) => {
//         setUser({
//           username: userName,
//           token: jwtToken,
//         });
//         callback();
//       },
//     );
//   };

//   let value = {
//     user,
//     signin,
//     signout,
//     handleNewPassword,
//     tryLoginActiveSession,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// function useAuth() {
//   return React.useContext(AuthContext);
// }

// export {AuthContext, useAuth, AuthProvider};

// export type {AuthContextType};
