export type CmsType = "ABOUT_US" | "PRIVACY_POLICY" | "TERMS_CONDITIONS";



export interface CmsApiResponse {
  statusCode: number;
  message: string;
  data: CmsContent;
}



export interface CmsContent {
  id: string;
  createdAt: string;
  updatedAt: string;
  aboutUsEn: string;
  aboutUsAr: string;
    privacyAr: string;
  privacyEn: string;
    termsEn: string;
  termsAr: string;
}

export interface CmsState {
  cms: CmsContent | null;
  loading: boolean;
  error: string | null;
}