import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface Resume {
  id: string
  title: string
  first_name: string
  middle_name?: string
  last_name: string
}

interface ResumeListProps {
  resumes: Resume[]
  onSelect: (id: string) => void
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes, onSelect }) => {
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setSelectedResumeId(id)
    onSelect(id)
  }

  return (
    <Card className="w-full max-w-md bg-white shadow rounded-xl border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-hhtext">
          Выберите резюме
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="resumeSelect" className="mb-2 block text-hhtext">
          Резюме
        </Label>
        <Select value={selectedResumeId || ''} onValueChange={handleSelect}>
          <SelectTrigger
            id="resumeSelect"
            className="w-full border-hhborder focus:border-hhred focus:ring-hhred/30"
          >
            <SelectValue placeholder="Выберите резюме" />
          </SelectTrigger>
          <SelectContent>
            {resumes.map((resume) => (
              <SelectItem key={resume.id} value={resume.id}>
                {resume.title} — {resume.first_name}{' '}
                {resume.middle_name ? resume.middle_name + ' ' : ''}
                {resume.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  )
}

export default ResumeList
