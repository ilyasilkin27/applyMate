import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { css } from '../../styled-system/css';
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

const HomePage: React.FC = () => {
  const location = useLocation();
  const {
    resumes,
    loading: resumesLoading,
    error: resumesError,
  } = useFetchResumes();
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [coverLetters, setCoverLetters] = useState<Record<string, string>>(
    loadFromLocalStorage("coverLetters", {})
  );
  const [customAlert, setCustomAlert] = useState<{ variant: 'success' | 'danger' | 'warning' | 'info'; message: string } | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [showCoverLetterModal, setShowCoverLetterModal] = useState<boolean>(false);

  useEffect(() => {
    saveToLocalStorage("coverLetters", coverLetters);
  }, [coverLetters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      saveTokensToSessionStorage(accessToken, refreshToken);
      window.history.replaceState({}, document.title, "/home");
    }
  }, [location]);

  const handleCoverLetterChange = (resumeId: string, text: string): void => {
    setCoverLetters((prev) => ({
      ...prev,
      [resumeId]: text,
    }));
  };

  const handleApplyVacancy = async (vacancyId: string): Promise<void> => {
    if (!selectedResumeId) return;
    await applyVacancy(
      selectedResumeId,
      vacancyId,
      coverLetters[selectedResumeId] || "",
      setCustomAlert
    );
  };

  const handleApplyAllVacancies = async (vacancyIds: string[]): Promise<void> => {
    if (!selectedResumeId) return;
    await applyAllVacancies(
      selectedResumeId,
      vacancyIds,
      coverLetters[selectedResumeId] || "",
      setCustomAlert
    );
  };

  return (
    <div className={css({
      padding: '4',
      minHeight: '100vh',
      backgroundColor: 'gray.50'
    })}>
      <div className={css({
        boxShadow: 'sm',
        marginBottom: '4',
        backgroundColor: 'white',
        borderRadius: '3',
        padding: '4'
      })}>
        <div className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4'
        })}>
          <h1 className={css({
            margin: '0',
            color: 'primary',
            fontSize: '2rem',
            fontWeight: 'bold'
          })}>
            ApplyMate
          </h1>
          <Logout />
        </div>

        <ResumeSelection
          resumes={resumes}
          loading={resumesLoading}
          error={resumesError}
          onSelect={setSelectedResumeId}
        />
        <button
          onClick={() => setShowCoverLetterModal(true)}
          className={css({
            marginLeft: '2',
            padding: '2',
            border: '1px solid',
            borderColor: 'primary',
            color: 'primary',
            backgroundColor: 'transparent',
            borderRadius: '3',
            cursor: 'pointer',
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: '2',
            '&:hover': {
              backgroundColor: 'primary.50'
            }
          })}
        >
          <span>✏️</span>
          Сопроводительное письмо
        </button>
      </div>

      {selectedResumeId && (
        <div className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4'
        })}>
          <div className={css({
            boxShadow: 'sm',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '3',
            padding: '4'
          })}>
            <SearchVacancies
              selectedResumeId={selectedResumeId}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              onApply={handleApplyVacancy}
              coverLetter={coverLetters[selectedResumeId] || ""}
            />
          </div>

          <div className={css({
            boxShadow: 'sm',
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '3',
            padding: '4'
          })}>
            <RecommendedVacancies
              selectedResumeId={selectedResumeId}
              onApply={handleApplyAllVacancies}
              onApplyAll={handleApplyAllVacancies}
            />
            <AlertMessage message={customAlert?.message || ''} variant={customAlert?.variant || 'warning'} />
          </div>
        </div>
      )}

      {showCoverLetterModal && (
        <div className={css({
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: '1000'
        })}>
          <div className={css({
            backgroundColor: 'white',
            borderRadius: '3',
            padding: '4',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto'
          })}>
            <div className={css({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '4'
            })}>
              <h2 className={css({
                margin: '0',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              })}>
                Редактировать сопроводительное письмо
              </h2>
              <button
                onClick={() => setShowCoverLetterModal(false)}
                className={css({
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'gray.600',
                  '&:hover': {
                    color: 'gray.900'
                  }
                })}
              >
                ×
              </button>
            </div>
            <div className={css({
              backgroundColor: 'white',
              borderRadius: '3',
              padding: '4'
            })}>
              <CoverLetter
                value={selectedResumeId ? coverLetters[selectedResumeId] || "" : ""}
                onChange={(text) => selectedResumeId && handleCoverLetterChange(selectedResumeId, text)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

 