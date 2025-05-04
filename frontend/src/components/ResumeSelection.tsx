import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import ResumeList from './ResumeList'
import type { Resume } from '../types/models'

interface ResumeSelectionProps {
  resumes: Resume[]
  loading: boolean
  error: string | null
  onSelect: (resumeId: string) => void
  hasLoadedOnce?: boolean
}

const ResumeSelection: React.FC<ResumeSelectionProps> = ({
  resumes,
  loading,
  error,
  onSelect,
  hasLoadedOnce = false,
}) => (
  <div className="py-4 px-2 sm:px-4">
    <Card className="shadow-sm rounded-lg">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="text-xl sm:text-2xl font-bold text-primary">
          Выберите резюме
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
          <Alert variant="destructive" className="mt-3 rounded-lg">
            <AlertDescription className="text-sm sm:text-base">
              {error}
            </AlertDescription>
          </Alert>
        )}
        {!loading && !error && resumes.length === 0 && hasLoadedOnce && (
          <Alert variant="default" className="mt-3 rounded-lg">
            <AlertDescription className="text-sm sm:text-base">
              Резюме не найдены
            </AlertDescription>
          </Alert>
        )}
        {!loading && !error && resumes.length > 0 && (
          <div className="overflow-x-auto">
            <ResumeList resumes={resumes} onSelect={onSelect} />
          </div>
        )}
      </CardContent>
    </Card>
  </div>
)

export default ResumeSelection
