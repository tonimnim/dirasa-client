import { apiClient } from "./client";
import { encodePath, jsonBody, withQuery } from "./query";
import type { components } from "@/types/generated/school";

type Schema = components["schemas"];
type Version = number | string;
type Page = { page?: number; pageSize?: number };

const root = "/api/v1/school/academics";
const yearPath = (yearId: string) => `${root}/years/${encodePath(yearId)}`;

export type AcademicYear = Schema["AcademicYearDetails"];
export type AcademicYearSummary = Schema["AcademicYearSummary"];
export type Stage = Schema["StageView"];
export type GradeLevel = Schema["GradeLevelView"];
export type Subject = Schema["SubjectView"];
export type ClassSection = Schema["ClassSectionView"];

export const academicsApi = {
  getSettings: () => apiClient<Schema["AcademicSettingsDetails"]>(`${root}/settings`),
  updateSettings: (input: Schema["UpdateAcademicSettingsInput"]) =>
    apiClient<Schema["AcademicSettingsDetails"]>(`${root}/settings`, { method: "PUT", body: jsonBody(input) }),

  listYears: (params: Page & { status?: Schema["AcademicYearStatus"] } = {}) =>
    apiClient<Schema["PagedResponseOfAcademicYearSummary"]>(withQuery(`${root}/years`, params)),
  currentYear: () => apiClient<AcademicYear>(`${root}/years/current`),
  getYear: (yearId: string) => apiClient<AcademicYear>(yearPath(yearId)),
  createYear: (input: Schema["CreateAcademicYearInput"]) =>
    apiClient<AcademicYear>(`${root}/years`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateYear: (yearId: string, input: Schema["UpdateAcademicYearInput"]) =>
    apiClient<AcademicYear>(yearPath(yearId), { method: "PUT", body: jsonBody(input) }),
  deleteYear: (yearId: string) => apiClient<void>(yearPath(yearId), { method: "DELETE" }),
  activateYear: (yearId: string, input: Schema["ActivateAcademicYearInput"]) =>
    apiClient<AcademicYear>(`${yearPath(yearId)}/activate`, { method: "POST", body: jsonBody(input) }),
  transitionYear: (yearId: string, action: "close" | "lock" | "unlock" | "publish" | "unpublish", version: Version) =>
    apiClient<AcademicYear>(`${yearPath(yearId)}/${action}`, { method: "POST", body: jsonBody({ version }) }),
  copyYear: (yearId: string, input: Schema["CopyAcademicYearInput"]) =>
    apiClient<Schema["CopyAcademicYearResult"]>(`${yearPath(yearId)}/copy`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  getPeriods: (yearId: string) => apiClient<Schema["YearPeriodsView"]>(`${yearPath(yearId)}/periods`),
  replacePeriods: (yearId: string, input: Schema["ReplacePeriodsInput"]) =>
    apiClient<Schema["YearPeriodsView"]>(`${yearPath(yearId)}/periods`, { method: "PUT", body: jsonBody(input) }),
  getWorkingWeek: (yearId: string) => apiClient<Schema["YearWorkingWeekView"]>(`${yearPath(yearId)}/working-week`),
  replaceWorkingWeek: (yearId: string, input: Schema["ReplaceWorkingWeekInput"]) =>
    apiClient<Schema["YearWorkingWeekView"]>(`${yearPath(yearId)}/working-week`, { method: "PUT", body: jsonBody(input) }),

  listStages: (params: Page = {}) => apiClient<Schema["PagedResponseOfStageView"]>(withQuery(`${root}/stages`, params)),
  getStage: (stageId: string) => apiClient<Stage>(`${root}/stages/${encodePath(stageId)}`),
  createStage: (input: Schema["CreateStageInput"]) =>
    apiClient<Stage>(`${root}/stages`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateStage: (stageId: string, input: Schema["UpdateStageInput"]) =>
    apiClient<Stage>(`${root}/stages/${encodePath(stageId)}`, { method: "PUT", body: jsonBody(input) }),
  deleteStage: (stageId: string) => apiClient<void>(`${root}/stages/${encodePath(stageId)}`, { method: "DELETE" }),

  listGradeLevels: (params: Page & { stageId?: string; isActive?: boolean; includeInactive?: boolean } = {}) =>
    apiClient<Schema["PagedResponseOfGradeLevelView"]>(withQuery(`${root}/grade-levels`, params)),
  getGradeLevel: (gradeLevelId: string) => apiClient<GradeLevel>(`${root}/grade-levels/${encodePath(gradeLevelId)}`),
  createGradeLevel: (input: Schema["CreateGradeLevelInput"]) =>
    apiClient<GradeLevel>(`${root}/grade-levels`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateGradeLevel: (gradeLevelId: string, input: Schema["UpdateGradeLevelInput"]) =>
    apiClient<GradeLevel>(`${root}/grade-levels/${encodePath(gradeLevelId)}`, { method: "PUT", body: jsonBody(input) }),
  setGradeLevelActive: (gradeLevelId: string, active: boolean, version: Version) =>
    apiClient<GradeLevel>(`${root}/grade-levels/${encodePath(gradeLevelId)}/${active ? "activate" : "deactivate"}`, { method: "POST", body: jsonBody({ version }) }),
  resequenceGradeLevels: (input: Schema["ResequenceGradeLevelsInput"]) =>
    apiClient<GradeLevel[]>(`${root}/grade-levels/resequence`, { method: "POST", body: jsonBody(input) }),
  deleteGradeLevel: (gradeLevelId: string) => apiClient<void>(`${root}/grade-levels/${encodePath(gradeLevelId)}`, { method: "DELETE" }),
  getOfferings: (gradeLevelId: string, academicYearId: string) =>
    apiClient<Schema["GradeLevelOfferingsView"]>(withQuery(`${root}/grade-levels/${encodePath(gradeLevelId)}/subjects`, { academicYearId })),
  replaceOfferings: (gradeLevelId: string, academicYearId: string, input: Schema["ReplaceOfferingsInput"]) =>
    apiClient<Schema["GradeLevelOfferingsView"]>(withQuery(`${root}/grade-levels/${encodePath(gradeLevelId)}/subjects`, { academicYearId }), { method: "PUT", body: jsonBody(input) }),

  listSubjects: (params: Page & { search?: string; category?: Schema["SubjectCategory"]; isActive?: boolean; includeInactive?: boolean } = {}) =>
    apiClient<Schema["PagedResponseOfSubjectView"]>(withQuery(`${root}/subjects`, params)),
  getSubject: (subjectId: string) => apiClient<Schema["SubjectDetails"]>(`${root}/subjects/${encodePath(subjectId)}`),
  createSubject: (input: Schema["CreateSubjectInput"]) =>
    apiClient<Schema["SubjectDetails"]>(`${root}/subjects`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateSubject: (subjectId: string, input: Schema["UpdateSubjectInput"]) =>
    apiClient<Schema["SubjectDetails"]>(`${root}/subjects/${encodePath(subjectId)}`, { method: "PUT", body: jsonBody(input) }),
  setSubjectActive: (subjectId: string, active: boolean, version: Version) =>
    apiClient<Schema["SubjectDetails"]>(`${root}/subjects/${encodePath(subjectId)}/${active ? "activate" : "deactivate"}`, { method: "POST", body: jsonBody({ version }) }),
  deleteSubject: (subjectId: string) => apiClient<void>(`${root}/subjects/${encodePath(subjectId)}`, { method: "DELETE" }),

  listClasses: (params: Page & { academicYearId?: string; gradeLevelId?: string; search?: string } = {}) =>
    apiClient<Schema["PagedResponseOfClassSectionView"]>(withQuery(`${root}/classes`, params)),
  getClass: (classSectionId: string) => apiClient<ClassSection>(`${root}/classes/${encodePath(classSectionId)}`),
  createClass: (input: Schema["CreateClassSectionInput"]) =>
    apiClient<ClassSection>(`${root}/classes`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateClass: (classSectionId: string, input: Schema["UpdateClassSectionInput"]) =>
    apiClient<ClassSection>(`${root}/classes/${encodePath(classSectionId)}`, { method: "PUT", body: jsonBody(input) }),
  deleteClass: (classSectionId: string) => apiClient<void>(`${root}/classes/${encodePath(classSectionId)}`, { method: "DELETE" }),
  copyClasses: (yearId: string, input: Schema["CopyClassSectionsInput"]) =>
    apiClient<Schema["CopyClassSectionsResult"]>(`${yearPath(yearId)}/copy-classes`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),

  listBreaks: (yearId: string, kind?: Schema["BreakKind"]) =>
    apiClient<Schema["YearBreaksView"]>(withQuery(`${yearPath(yearId)}/breaks`, { kind })),
  getBreak: (yearId: string, breakId: string) => apiClient<Schema["CalendarBreakView"]>(`${yearPath(yearId)}/breaks/${encodePath(breakId)}`),
  createBreak: (yearId: string, input: Schema["CreateCalendarBreakInput"]) =>
    apiClient<Schema["CalendarBreakView"]>(`${yearPath(yearId)}/breaks`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateBreak: (yearId: string, breakId: string, input: Schema["UpdateCalendarBreakInput"]) =>
    apiClient<Schema["CalendarBreakView"]>(`${yearPath(yearId)}/breaks/${encodePath(breakId)}`, { method: "PUT", body: jsonBody(input) }),
  deleteBreak: (yearId: string, breakId: string) => apiClient<void>(`${yearPath(yearId)}/breaks/${encodePath(breakId)}`, { method: "DELETE" }),

  listDayOverrides: (yearId: string) => apiClient<Schema["YearDayOverridesView"]>(`${yearPath(yearId)}/day-overrides`),
  getDayOverride: (yearId: string, overrideId: string) => apiClient<Schema["CalendarDayOverrideView"]>(`${yearPath(yearId)}/day-overrides/${encodePath(overrideId)}`),
  createDayOverride: (yearId: string, input: Schema["CreateCalendarDayOverrideInput"]) =>
    apiClient<Schema["CalendarDayOverrideView"]>(`${yearPath(yearId)}/day-overrides`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
  updateDayOverride: (yearId: string, overrideId: string, input: Schema["UpdateCalendarDayOverrideInput"]) =>
    apiClient<Schema["CalendarDayOverrideView"]>(`${yearPath(yearId)}/day-overrides/${encodePath(overrideId)}`, { method: "PUT", body: jsonBody(input) }),
  deleteDayOverride: (yearId: string, overrideId: string) => apiClient<void>(`${yearPath(yearId)}/day-overrides/${encodePath(overrideId)}`, { method: "DELETE" }),

  calendarToday: (scope: { gradeLevelId?: string; classSectionId?: string } = {}) =>
    apiClient<Schema["SchoolCalendarToday"]>(withQuery(`${root}/calendar/today`, scope)),
  calendarDays: (params: { from: string; to: string; gradeLevelId?: string; classSectionId?: string }) =>
    apiClient<Schema["SchoolCalendarDays"]>(withQuery(`${root}/calendar/days`, params)),
  calendarDay: (date: string, scope: { gradeLevelId?: string; classSectionId?: string } = {}) =>
    apiClient<Schema["SchoolDayInfo"]>(withQuery(`${root}/calendar/days/${encodePath(date)}`, scope)),
  nextSchoolDay: (params: { after: string; gradeLevelId?: string; classSectionId?: string }) =>
    apiClient<Schema["SchoolDayInfo"] | undefined>(withQuery(`${root}/calendar/next-school-day`, params)),

  listTemplates: (params: Page & { country?: string } = {}) =>
    apiClient<Schema["PagedResponseOfCurriculumTemplateSummary"]>(withQuery(`${root}/templates`, params)),
  getTemplate: (code: string, templateVersion?: number) =>
    apiClient<Schema["CurriculumTemplateDetail"]>(withQuery(`${root}/templates/${encodePath(code)}`, { templateVersion })),
  applyTemplate: (code: string, input: Schema["ApplyCurriculumTemplateInput"]) =>
    apiClient<Schema["ApplyCurriculumTemplateResult"]>(`${root}/templates/${encodePath(code)}/apply`, { method: "POST", body: jsonBody(input), idempotencyKey: true }),
};
