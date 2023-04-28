import { useContext, useMemo } from 'react'
import { DatasetContext } from '../../../providers/DatasetProvider'
import { useQuery } from 'react-query'
import { TimeSeriesService } from '../../../providers/QueryProvider/services/timeSeries.service'
import { Alert, Box, CircularProgress, Typography } from '@mui/material'
import { AxisOptions, Chart } from 'react-charts'

export const DatasetLinearChart = () => {
  const datasetContext = useContext(DatasetContext)
  const timeSeriesQuery = useQuery(
    [TimeSeriesService.serviceName, datasetContext.datasetCode],
    () => TimeSeriesService.getTimeSeries(datasetContext.datasetCode),
    {
      select: (data) => data?.data?.dataset_data?.data?.map((item) => ({
        date: item[0],
        close: item[4],
      })),
      enabled: !!datasetContext.datasetCode,
    }
  )

  const primaryAxis = useMemo(
    (): AxisOptions<IDatasetData> => ({
      getValue: datum => new Date(datum?.date),
    }),
    []
  )

  const secondaryAxes = useMemo(
    (): AxisOptions<IDatasetData>[] => [
      {
        getValue: datum => datum?.close,
        elementType: 'line',
      },
    ],
    []
  )

  if (timeSeriesQuery.isLoading) {
    return (
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    )
  }

  if (timeSeriesQuery.isError && timeSeriesQuery.error) {
    return (
      <Box mb={4}>
        <Alert severity="error">{(timeSeriesQuery.error as any)?.message}</Alert>
      </Box>
    )
  }

  if (!timeSeriesQuery.data || !datasetContext.datasetCode) {
    return <Typography textAlign="center">No data</Typography>
  }

  return (
    <Box position="relative" style={{ height: 500 }}>
      <Chart
        options={{
          data: [{
            label: 'Close',
            data: timeSeriesQuery.data,
          }],
          primaryAxis,
          secondaryAxes,
        }}
      />
    </Box>
  )
}
