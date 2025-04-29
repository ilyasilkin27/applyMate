import React from 'react'
import { Textarea } from '@/components/ui/textarea'

export interface CoverLetterProps {
  value: string
  onChange: (value: string) => void
}

const CoverLetter: React.FC<CoverLetterProps> = ({ value, onChange }) => (
  <section className="mt-4 p-4 bg-white rounded-lg shadow border flex flex-col gap-3">
    <h4 className="text-lg font-semibold text-hhtext mb-1">
      Сопроводительное письмо
    </h4>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="min-h-[120px] resize-none border-hhborder focus:border-hhred focus:ring-hhred/30 text-hhtext placeholder:text-hhsecondary"
      placeholder="Введите текст письма..."
      aria-label="Сопроводительное письмо"
    />
  </section>
)

export default CoverLetter
