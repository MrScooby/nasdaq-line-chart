import API from '../API'

export interface IDataset {
  name: string
  dataset_code: string
  id: number
}

interface IGetDatasetsResponse {
  datasets: IDataset[]
}

export class DatasetsService {
  public static serviceName = 'datasets'

  public static getDatasets = (query?: string): Promise<{ data: IGetDatasetsResponse }> => {
    return API.get('datasets.json', {
      params: {
        database_code: 'WIKI',
        query
      }
    })
  }
}
