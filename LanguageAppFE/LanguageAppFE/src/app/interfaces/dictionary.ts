export interface dictionary{
  wordPhraseId?: number,
  wordPhraseContent: string,
  definition?: string,
  translation : string,
  userId?: string ,
  isHidden?: boolean,
  categories?: number[],
  newCategories?: category[],
  categoriesList?: category[]
}

export interface category{
  CategoryId?: number,
  CategoryName: string,
  userId?: string,
  position?: number
}
