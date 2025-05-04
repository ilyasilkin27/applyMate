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
  <div className="py-4">
    <Card className="border-0 shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          Выберите резюме
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {loading && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mt-3 rounded-lg">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && !error && resumes.length === 0 && hasLoadedOnce && (
          <Alert variant="default" className="mt-3 rounded-lg">
            <AlertDescription>Резюме не найдены</AlertDescription>
          </Alert>
        )}

        {!loading && !error && resumes.length > 0 && (
          <ResumeList resumes={resumes} onSelect={onSelect} />
        )}
      </CardContent>
    </Card>
  </div>
)

export default ResumeSelection
