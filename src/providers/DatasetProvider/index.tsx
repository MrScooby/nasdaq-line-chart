import React, { createContext, PropsWithChildren, useMemo, useState } from 'react'

export const DatasetContext = createContext<ICompanyContextProps>({
  datasetCode: undefined,
  setDatasetCode: (code: string) => {},
})

const DatasetProvider = (props: PropsWithChildren<any>) => {
  const [datasetCode, setDatasetCode] = useState<string | undefined>()

  const value = useMemo(
    () => ({
      datasetCode,
      setDatasetCode,
    }),
    [datasetCode],
  )

  return <DatasetContext.Provider value={value}>{props.children}</DatasetContext.Provider>
}

export default DatasetProvider
