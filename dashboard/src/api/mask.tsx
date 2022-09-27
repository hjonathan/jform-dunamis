export interface maskService {
  getMaskType(): MaskType[]
}

export interface MaskType {
  mask: string,
  tokens: object
}

const maskType: MaskType[] = [
  {
    mask: 'email',
    tokens: {
      'email': {
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      }
    }
  } as MaskType
]
