import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const handleSuccess = (response) => {
    console.log('Google Login Success:', response);
    // Ajoutez ici votre logique de gestion du succès
  };

  const handleError = (error) => {
    console.error('Google Login Error:', error);
    // Ajoutez ici votre logique de gestion des erreurs
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
  );
};

export default GoogleLoginButton;