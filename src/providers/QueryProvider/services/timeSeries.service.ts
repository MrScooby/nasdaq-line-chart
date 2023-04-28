import API from '../API'

interface IGetTimeSeriesResponse {
  dataset_data: {
    data: Array<Array<any>>
  }
}

export class TimeSeriesService {
  public static serviceName = 'timeSeries'

  public static getTimeSeries = (datasetCode?: string): Promise<{ data: IGetTimeSeriesResponse }> | null => {
    if (!datasetCode) {
      return null
    }

    return API.get(`datasets/WIKI/${datasetCode}/data.json`)
  }
}
