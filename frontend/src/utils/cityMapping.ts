export const cityToIdMapping: Record<string, string> = {
  'Москва': '1',
  'Санкт-Петербург': '2',
  'Петрозаводск': '3',
  'Новосибирск': '4',
  'Екатеринбург': '3',
  'Казань': '88',
  'Нижний Новгород': '66',
  'Челябинск': '104',
  'Самара': '78',
  'Уфа': '99',
  'Ростов-на-Дону': '76',
  'Краснодар': '53',
  'Пермь': '72',
  'Воронеж': '36',
  'Волгоград': '34',
  'Красноярск': '54'
}

export const getCityId = (cityName: string): string | null => {
  return cityToIdMapping[cityName] || null
}

export const isValidCity = (cityName: string): boolean => {
  return cityName in cityToIdMapping
} 