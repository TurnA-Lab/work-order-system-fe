interface RawFilterForm {
  department: string;
  class3: string;
  year: string;
  schoolYear: string;
  status: number | null;
}

export interface ConstructionFilterForm extends RawFilterForm {
  level: string;
}

export type AchievementFilterForm = RawFilterForm;

export type AwardFilterForm = ConstructionFilterForm;

export interface BonusFilterForm {
  year: string;
  master: string;
  department: string;
}

export type PerformanceFilterForm = BonusFilterForm;

export interface UserFilterForm {
  dptName: string;
  name: string;
  worknum: string;
}
