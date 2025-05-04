import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { Resume } from '../types/models'

interface ResumeListProps {
  resumes: Resume[]
  onSelect: (resumeId: string) => void
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes, onSelect }) => {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

  const handleSelect = (value: string) => {
    setSelectedResumeId(value)
    onSelect(value)
  }

  return (
    <Card className="border-0 shadow-sm rounded-lg">
      <CardContent className="p-4">
        <div className="grid gap-2">
          <Label htmlFor="resume-select">Выберите резюме</Label>
          <Select onValueChange={handleSelect} value={selectedResumeId || ''}>
            <SelectTrigger id="resume-select" className="w-full">
              <SelectValue placeholder="Выберите резюме" />
            </SelectTrigger>
            <SelectContent>
              {resumes.map((resume) => (
                <SelectItem key={resume.id} value={resume.id}>
                  {resume.title} - {resume.first_name} {resume.middle_name}{' '}
                  {resume.last_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResumeList
