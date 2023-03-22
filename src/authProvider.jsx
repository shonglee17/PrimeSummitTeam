import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js';

import * as AWS from 'aws-sdk/global';

import config from '../config';

const poolData = {
  UserPoolId: config.userPoolId,
  ClientId: config.clientId,
};
const userPool = new CognitoUserPool(poolData);
/**
 * This represents some generic auth provider API, like Firebase.
 */
const cognitoAuthProvider = {
    isAuthenticated: false,
    jwtToken: '',
    cognitoUser: {},
    tryLoginActiveSession(callback) {
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.getSession(function (err, result) {
                if (result) {
                    var accessToken = result.getAccessToken().getJwtToken();
                    cognitoAuthProvider.jwtToken = accessToken;
                    console.log('You are now logged in.');
                    //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                    AWS.config.region = 'us-west-1';
                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: 'us-west-1:7b749e82-7231-4f83-8b42-bce90babaa83',
                        Logins: {
                            // Change the key below according to the specific region your user pool is in.
                            'cognito-idp.us-west-1.amazonaws.com/us-west-1_cbWWM9irb': result
                                .getIdToken()
                                .getJwtToken(),
                        },
                    });
                }
            });
            AWS.config.credentials.refresh((error) => {
                if (error) {
                    console.error(error);
                }
                else {
                    console.log('Successfully logged!');
                    cognitoAuthProvider.isAuthenticated = true;
                    callback(cognitoUser === null || cognitoUser === void 0 ? void 0 : cognitoUser.getUsername(), cognitoAuthProvider.jwtToken);
                }
            });
        }
        //call refresh method in order to authenticate user and get new temp credentials
    },
    signin(userName, password, callback, newPasswordCallback) {
        var authenticationData = {
            Username: userName,
            Password: password,
        };
        var authenticationDetails = new AuthenticationDetails(authenticationData);
        var userData = {
            Username: userName,
            Pool: userPool,
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoAuthProvider.cognitoUser = cognitoUser;
        return cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();
                cognitoAuthProvider.jwtToken = accessToken;
                //POTENTIAL: Region needs to be set if not already set previously elsewhere.
                AWS.config.region = 'us-west-1';
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-west-1:7b749e82-7231-4f83-8b42-bce90babaa83',
                    Logins: {
                        // Change the key below according to the specific region your user pool is in.
                        'cognito-idp.us-west-1.amazonaws.com/us-west-1_cbWWM9irb': result
                            .getIdToken()
                            .getJwtToken(),
                    },
                });
                //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                AWS.config.credentials.refresh((error) => {
                    if (error) {
                        console.error(error);
                    }
                    else {
                        // Instantiate aws sdk service objects now that the credentials have been updated.
                        // example: var s3 = new AWS.S3();
                        console.log('Successfully logged!');
                        cognitoAuthProvider.isAuthenticated = true;
                        callback(cognitoUser.getUsername(), accessToken);
                    }
                });
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.
                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                // store userAttributes on global variable
                newPasswordCallback(userAttributes);
            },
            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
                cognitoAuthProvider.isAuthenticated = false;
            },
        });
    },
    signout(callback) {
        cognitoAuthProvider.isAuthenticated = false;
        var cognitoUser = userPool.getCurrentUser();
        if (cognitoUser != null) {
            cognitoUser.signOut();
        }
        callback();
    },
    handleNewPassword(newPassword, sessionUserAttributes, callback) {
        cognitoAuthProvider.cognitoUser.completeNewPasswordChallenge(newPassword, sessionUserAttributes, callback(cognitoAuthProvider.cognitoUser.getUsername(), cognitoAuthProvider.jwtToken));
    },
};
function handleAWSLogin() { }
export { cognitoAuthProvider };