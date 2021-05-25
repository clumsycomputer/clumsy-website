import { Property } from 'csstype'

export interface SiteTheme extends Jss.Theme {
  pdfMode: boolean
  spacing: (scalar: number) => number
  palette: {
    lightGrey: Property.Color
  }
}

const siteTheme: SiteTheme = {
  pdfMode: false,
  spacing: (scalar) => scalar * 8,
  palette: {
    lightGrey: 'rgb(238,238,238)',
  },
}

export default siteTheme
