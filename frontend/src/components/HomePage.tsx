import { useState, useEffect } from 'react'
import Logout from './Logout'
import ResumeSelection from './ResumeSelection'
import CoverLetter from './CoverLetter'
import RecommendedVacancies from './RecommendedVacancies'
import useFetchResumes from '../api/fetchResumes'
import SearchVacancies from './SearchVacancies'
import AlertMessage from './AlertMessage'
import {
  loadFromLocalStorage,
  saveToLocalStorage,
  saveTokensToSessionStorage,
} from '../utils/storageUtils'
import { applyAllVacancies, applyVacancy } from '../utils/handleApply'
import { useLocation } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

const HomePage = () => {
  const location = useLocation()
  const {
    resumes,
    loading: resumesLoading,
    error: resumesError,
  } = useFetchResumes()
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)
  const [coverLetters, setCoverLetters] = useState<Record<string, string>>(
    loadFromLocalStorage('coverLetters', {})
  )
  const [customAlert, setCustomAlert] = useState<string | null>(null)
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false)

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

  const handleCoverLetterChange = (resumeId: string, text: string) => {
    setCoverLetters((prev) => ({
      ...prev,
      [resumeId]: text,
    }))
  }

  const handleApplyVacancy = async (vacancyId: string) => {
    await applyVacancy(
      selectedResumeId!,
      vacancyId,
      coverLetters[selectedResumeId ?? ''] || '',
      setCustomAlert
    )
  }

  const handleApplyAllVacancies = async (vacancyIds: string[]) => {
    await applyAllVacancies(
      selectedResumeId!,
      vacancyIds,
      coverLetters[selectedResumeId ?? ''] || '',
      setCustomAlert
    )
  }

  return (
    <div className="min-h-screen bg-hhbg p-6">
      <Card className="w-full max-w-5xl mx-auto shadow-xl rounded-xl border-0 mb-8">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-3xl font-bold text-hhtext">
            ApplyMate
          </CardTitle>
          <Logout />
        </CardHeader>
        <CardContent>
          <ResumeSelection
            resumes={resumes}
            loading={resumesLoading}
            error={resumesError}
            onSelect={setSelectedResumeId}
            hasLoadedOnce={true}
          />
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCoverLetterModal(true)}
              className="flex items-center gap-2 border-hhred text-hhred hover:bg-hhred hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">edit</span>
              Сопроводительное письмо
            </Button>
          </div>
        </CardContent>
      </Card>

      {selectedResumeId && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="shadow-xl rounded-xl border-0 h-full">
            <CardContent className="p-6">
              <SearchVacancies
                selectedResumeId={selectedResumeId}
                onApply={handleApplyVacancy}
              />
            </CardContent>
          </Card>
          <Card className="shadow-xl rounded-xl border-0 h-full">
            <CardContent className="p-6">
              <RecommendedVacancies
                selectedResumeId={selectedResumeId}
                onApply={handleApplyAllVacancies}
                onApplyAll={handleApplyAllVacancies}
              />
              {customAlert && (
                <AlertMessage
                  message={customAlert}
                  variant="warning"
                  className="mt-4"
                />
              )}
            </CardContent>
          </Card>
        </div>
      )}

      <Dialog
        open={showCoverLetterModal}
        onOpenChange={setShowCoverLetterModal}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Редактировать сопроводительное письмо</DialogTitle>
          </DialogHeader>
          <CoverLetter
            value={coverLetters[selectedResumeId ?? ''] || ''}
            onChange={(text) =>
              handleCoverLetterChange(selectedResumeId ?? '', text)
            }
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default HomePage
