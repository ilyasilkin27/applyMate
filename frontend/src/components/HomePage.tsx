import React, { useState, useEffect } from 'react'
import Logout from './Logout'
import ResumeSelection from './ResumeSelection'
import CoverLetter from './CoverLetter'
import RecommendedVacancies from './RecommendedVacancies'
import useFetchResumes from '../api/fetchResumes'
import SearchVacancies from './SearchVacancies'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  saveTokensToSessionStorage,
} from '../utils/storageUtils'
import { applyAllVacancies, applyVacancy } from '../utils/handleApply'
import { useLocation } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface CoverLetters {
  [resumeId: string]: string
}

const HomePage: React.FC = () => {
  const location = useLocation()
  const {
    resumes,
    loading: resumesLoading,
    error: resumesError,
  } = useFetchResumes()
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)
  const [coverLetters, setCoverLetters] = useState<CoverLetters>(
    loadFromLocalStorage<CoverLetters>('coverLetters', {})
  )
  const [customAlert, setCustomAlert] = useState<string | null>(null)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [showCoverLetterModal, setShowCoverLetterModal] =
    useState<boolean>(false)

  useEffect(() => {
    saveToLocalStorage('coverLetters', coverLetters)
  }, [coverLetters])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (accessToken && refreshToken) {
      saveTokensToSessionStorage(accessToken, refreshToken)
      window.history.replaceState({}, document.title, '/home')
    }
  }, [location])

  const handleCoverLetterChange = (resumeId: string | null, text: string) => {
    if (!resumeId) return
    setCoverLetters((prev) => ({
      ...prev,
      [resumeId]: text,
    }))
  }

  const handleApplyVacancy = async (vacancyId: string) => {
    await applyVacancy(
      selectedResumeId,
      vacancyId,
      coverLetters[selectedResumeId ?? ''] || '',
      setCustomAlert
    )
  }

  const handleApplyAllVacancies = async (vacancyIds: string[]) => {
    await applyAllVacancies(
      selectedResumeId,
      vacancyIds,
      coverLetters[selectedResumeId ?? ''] || '',
      setCustomAlert
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <Card className="mb-4">
          <CardHeader className="p-4">
            <div className="flex gap-2">
              <ModeToggle />
              <Logout />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <ResumeSelection
              resumes={resumes}
              loading={resumesLoading}
              error={resumesError}
              onSelect={setSelectedResumeId}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCoverLetterModal(true)}
              className="mt-2"
            >
              <span className="mr-2">✏️</span>
              Сопроводительное письмо
            </Button>
          </CardContent>
        </Card>
        {selectedResumeId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <SearchVacancies
                  selectedResumeId={selectedResumeId}
                  searchKeyword={searchKeyword}
                  setSearchKeyword={setSearchKeyword}
                  onApply={handleApplyVacancy}
                  coverLetter={coverLetters[selectedResumeId] || ''}
                />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <RecommendedVacancies
                  selectedResumeId={selectedResumeId}
                  coverLetter={coverLetters[selectedResumeId] || ''}
                  onApply={handleApplyAllVacancies}
                  onApplyAll={handleApplyAllVacancies}
                />
                {customAlert && (
                  <Alert variant="destructive">
                    <AlertDescription>{customAlert}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        <Dialog
          open={showCoverLetterModal}
          onOpenChange={setShowCoverLetterModal}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Сопроводительное письмо</DialogTitle>
            </DialogHeader>
            <CoverLetter
              value={coverLetters[selectedResumeId ?? ''] || ''}
              onChange={(text) =>
                handleCoverLetterChange(selectedResumeId, text)
              }
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default HomePage
