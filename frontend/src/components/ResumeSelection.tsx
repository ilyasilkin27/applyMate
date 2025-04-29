import React from 'react'
import ResumeList, { Resume } from './ResumeList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import AlertMessage from './AlertMessage'
import { Loader2 } from 'lucide-react'

interface ResumeSelectionProps {
  resumes: Resume[]
  loading: boolean
  error: string | null
  onSelect: (id: string) => void
  hasLoadedOnce: boolean
}

const ResumeSelection: React.FC<ResumeSelectionProps> = ({
  resumes,
  loading,
  error,
  onSelect,
  hasLoadedOnce,
}) => {
  return (
    <div className="py-6 flex justify-center">
      <Card className="w-full max-w-md bg-white shadow-xl rounded-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-hhtext">
            Выберите резюме
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-hhred" size={32} />
              <span className="sr-only">Загрузка...</span>
            </div>
          )}

          {error && (
            <AlertMessage message={error} variant="danger" className="mt-2" />
          )}

          {!loading && !error && resumes.length === 0 && hasLoadedOnce && (
            <AlertMessage
              message="Резюме не найдены"
              variant="info"
              className="mt-2"
            />
          )}

          {!loading && !error && resumes.length > 0 && (
            <ResumeList resumes={resumes} onSelect={onSelect} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ResumeSelection
