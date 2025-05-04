import React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface CoverLetterProps {
  value: string
  onChange: (value: string) => void
}

const CoverLetter: React.FC<CoverLetterProps> = ({ value, onChange }) => (
  <div className="mt-4 p-3 bg-muted rounded-lg shadow-sm">
    <Label className="text-lg font-medium text-primary mb-3 block">
      Сопроводительное письмо
    </Label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[150px] border-primary"
      placeholder="Введите текст письма..."
    />
  </div>
)

export default CoverLetter
