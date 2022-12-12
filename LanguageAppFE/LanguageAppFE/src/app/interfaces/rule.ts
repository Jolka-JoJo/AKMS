export interface Rule{
  RuleId?: number,
  ruleTitle: string,
  ruleContent?: string,
  ruleImage?: string,
  userId: string,
  position?: number,
  visible?: boolean,
  filename?: string,
  isSaved?: boolean
}
