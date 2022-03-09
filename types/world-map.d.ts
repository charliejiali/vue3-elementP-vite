export interface PointsTy {
  name: string
  value: number[]
}

export interface CountryCoordTy {
  [propName: string]: {
    coordinate: number[],
    div_coordinate: number[],
    line_coordinate: number[],
    transform_origin: string
  }
}

export interface GuideLineTy {
  name: string,
  value: number,
  coords: [number[], number[]]
}
