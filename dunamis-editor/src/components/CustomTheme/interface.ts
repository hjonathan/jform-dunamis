export interface pallete {
  accent: string;
  error: string;
  info: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
}
export interface Theme {
  fontFamily?: string;
  name: string;
  light: pallete;
  dark?: pallete;
}
export interface Padding {
  bottom: string;
  left: string;
  top: string;
  right: string;
}
export interface Margin {
  left: string;
  top: string;
  right: string;
  bottom: string;
}
