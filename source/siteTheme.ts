import { Property } from 'csstype'

export interface SiteTheme extends Jss.Theme {
  pdfMode: boolean
  spacing: (scalar: number) => number
  palette: {
    lightGrey: Property.Color
    blue: Property.Color
    lime: Property.Color
    mustardGold: Property.Color
    purple: Property.Color
  }
}

const siteTheme: SiteTheme = {
  pdfMode: false,
  spacing: (scalar) => scalar * 8,
  palette: {
    lightGrey: '#EEEEEE',
    blue: '#2962FF',
    lime: '#CDDC39',
    mustardGold: '#FFC107',
    purple: '#673AB7',
  },
}

export default siteTheme
