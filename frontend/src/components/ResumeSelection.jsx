import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import ResumeList from './ResumeList';

const ResumeSelection = ({ resumes, loading, error, onSelect }) => {
  if (loading) {
    return (
      <div className="spinnerOverlay">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (resumes.length === 0) {
    return <Alert variant="info">No resumes found.</Alert>;
  }

  return <ResumeList resumes={resumes} onSelect={onSelect} />;
};

export default ResumeSelection;
