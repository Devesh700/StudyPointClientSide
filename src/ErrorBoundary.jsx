import React from "react";
import ErrorPage from './ErrorPage'; // Ensure the path is correct

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false,errorInfo:null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({errorInfo:info.componentStack})
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI
      return <ErrorPage errorInfo={this.state.errorInfo}/>
    //   return <ErrorPage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
