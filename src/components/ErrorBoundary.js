import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Met à jour l'état pour afficher l'interface de secours
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // enregistrer l'erreur dans un service de rapport d'erreurs
    console.error("Error caught in Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // rendre n'importe quelle interface de secours
      return <h1>Quelque chose s'est mal passé.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;