import { AppBar, Autocomplete, CircularProgress, Container, TextField, Toolbar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { DatasetContext } from '../../../providers/DatasetProvider'
import { DatasetsService, IDataset } from '../../../providers/QueryProvider/services/datasets.service'
import { useDebounce } from 'use-debounce'

export const DatasetsSearchBar = () => {
  const datasetContext = useContext(DatasetContext)
  const [value, setValue] = useState<any>(null)
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 400)

  const companiesQuery = useQuery([DatasetsService.serviceName, debouncedQuery], () => DatasetsService.getDatasets(debouncedQuery), {
    select: data => {
      return data.data.datasets
    },
  })

  const setDataset = (dataset: IDataset) => {
    setValue(dataset.name)
    datasetContext.setDatasetCode(dataset.dataset_code)
  }

  useEffect(() => {
    if (companiesQuery.isFetched && companiesQuery.data && companiesQuery.data.length > 0 && !value) {
      setDataset(companiesQuery.data[0])
    }
  }, [companiesQuery.data, companiesQuery.isFetched])

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          {!datasetContext.datasetCode ? <CircularProgress color="info" size="small" /> : (
            <Autocomplete
              value={value}
              onChange={(event: any, newValue: string | null) => {
                const dataset = companiesQuery.data?.find((item: any) => item.name === newValue)
                if (dataset) {
                  setDataset(dataset)
                }
              }}
              size="small"
              style={{ flex: 1 / 2 }}
              disableClearable
              inputValue={query}
              onInputChange={(event, newInputValue) => {
                setQuery(newInputValue)
              }}
              id="company"
              options={companiesQuery.data?.map((item: any) => item.name) || []}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Company" />}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
