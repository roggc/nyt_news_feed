type OkType = 'OK'

type ImageType = 'image'

export interface IMultimedia {
  url: string
  type: ImageType | string
}

export interface IResult {
  byline: string
  title: string
  published_date: string
  geo_facet: string[]
  des_facet: string[]
  multimedia: IMultimedia
  id: string
}

export interface IData {
  status: OkType | string
  results: any[]
}
