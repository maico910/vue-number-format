export interface IFormatOptions {
  prefix: string
  suffix: string
  decimal: string
  thousand: string
  precision: number
  acceptNegative: boolean
  isInteger: boolean
  vueVersion?: string
}

export const defaultOptions: IFormatOptions = {
  prefix: 'R$ ',
  suffix: '',
  decimal: ',',
  thousand: '.',
  precision: 2,
  acceptNegative: true,
  isInteger: false
}
