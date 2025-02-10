import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
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
import { BsThreeDotsVertical } from 'react-icons/bs';

const HomePage = () => {
  const location = useLocation();
  const {
    resumes,
    loading: resumesLoading,
    error: resumesError,
  } = useFetchResumes();
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [coverLetters, setCoverLetters] = useState(
    loadFromLocalStorage('coverLetters', {})
  );
  const [customAlert, setCustomAlert] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);

  useEffect(() => {
    saveToLocalStorage('coverLetters', coverLetters);
  }, [coverLetters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      saveTokensToSessionStorage(accessToken, refreshToken);
      window.history.replaceState({}, document.title, '/home');
    }
  }, [location]);

  const handleCoverLetterChange = (resumeId, text) => {
    setCoverLetters(prev => ({
      ...prev,
      [resumeId]: text
    }));
  };

  const handleApplyVacancy = async (vacancyId) => {
    await applyVacancy(
      selectedResumeId,
      vacancyId,
      coverLetters[selectedResumeId] || '',
      setCustomAlert
    );
  };

  const handleApplyAllVacancies = async (vacancyIds) => {
    await applyAllVacancies(
      selectedResumeId,
      vacancyIds,
      coverLetters[selectedResumeId] || '',
      setCustomAlert
    );
  };

  return (
    <Container fluid className="p-4 min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Card className="shadow-sm mb-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0" style={{ color: '#0d6efd' }}>ApplyMate</h1>
            <Logout />
          </div>

          <ResumeSelection
            resumes={resumes}
            loading={resumesLoading}
            error={resumesError}
            onSelect={setSelectedResumeId}
          />
        </Card.Body>
      </Card>

      {selectedResumeId && (
        <Row className="g-4">
          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="p-4">
                <SearchVacancies
                  selectedResumeId={selectedResumeId}
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                  onApply={handleApplyVacancy}
                  coverLetter={coverLetters[selectedResumeId] || ''}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Рекомендованные вакансии</h5>
                  <Button 
                    variant="light" 
                    onClick={() => setShowCoverLetterModal(true)}
                    className="p-1"
                  >
                    <BsThreeDotsVertical size={20} />
                  </Button>
                </div>
                <RecommendedVacancies
                  selectedResumeId={selectedResumeId}
                  coverLetter={coverLetters[selectedResumeId] || ''}
                  onApply={handleApplyAllVacancies}
                  onApplyAll={handleApplyAllVacancies}
                />
                <AlertMessage message={customAlert} variant="warning" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <Modal
        show={showCoverLetterModal}
        onHide={() => setShowCoverLetterModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Редактировать сопроводительное письмо</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CoverLetter
            value={coverLetters[selectedResumeId] || ''}
            onChange={(text) => handleCoverLetterChange(selectedResumeId, text)}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HomePage;
