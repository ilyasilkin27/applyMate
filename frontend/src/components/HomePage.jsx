import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logout from './Logout';
import ResumeSelection from './ResumeSelection';
import CoverLetter from './CoverLetter';
import RecommendedVacancies from './RecommendedVacancies';
import useFetchResumes from '../api/fetchResumes';
import SearchVacancies from './SearchVacancies';
import AlertMessage from './AlertMessage';
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  saveTokensToSessionStorage,
} from '../utils/storageUtils';
import { applyAllVacancies, applyVacancy } from '../utils/handleApply';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
  const location = useLocation();
  const {
    resumes,
    loading: resumesLoading,
    error: resumesError,
  } = useFetchResumes();
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [coverLetter, setCoverLetter] = useState(
    loadFromLocalStorage('coverLetter', '')
  );
  const [customAlert, setCustomAlert] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    saveToLocalStorage('coverLetter', coverLetter);
  }, [coverLetter]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      saveTokensToSessionStorage(accessToken, refreshToken);
      window.history.replaceState({}, document.title, '/home');
    }
  }, [location]);

  const handleApplyVacancy = async (vacancyId) => {
    await applyVacancy(
      selectedResumeId,
      vacancyId,
      coverLetter,
      setCustomAlert
    );
  };

  const handleApplyAllVacancies = async (vacancyIds) => {
    await applyAllVacancies(
      selectedResumeId,
      vacancyIds,
      coverLetter,
      setCustomAlert
    );
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-center align-items-center mb-3">
        <h1>ApplyMate</h1>
        <Logout />
      </div>

      <ResumeSelection
        resumes={resumes}
        loading={resumesLoading}
        error={resumesError}
        onSelect={setSelectedResumeId}
      />

      {selectedResumeId && (
        <>
          <CoverLetter value={coverLetter} onChange={setCoverLetter} />
          <Row className="mt-4">
            <Col md={6}>
              <RecommendedVacancies
                selectedResumeId={selectedResumeId}
                coverLetter={coverLetter}
                onApply={handleApplyAllVacancies}
                onApplyAll={handleApplyAllVacancies}
              />
              <AlertMessage message={customAlert} variant="warning" />
            </Col>
            <Col md={6}>
              <SearchVacancies
                selectedResumeId={selectedResumeId}
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                onApply={handleApplyVacancy}
                coverLetter={coverLetter}
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default HomePage;
