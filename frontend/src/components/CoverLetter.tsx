import React from 'react'
import { Textarea } from '@/components/ui/textarea'

interface CoverLetterProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const CoverLetter: React.FC<CoverLetterProps> = ({ value, onChange }) => (
  <div className="mt-4 p-3">
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[150px] border-primary"
      placeholder="Введите текст письма..."
    />
  </div>
)

export default CoverLetter
