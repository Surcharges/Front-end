import { ChangeEvent, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { PlaceModel } from "@entities/place"
import { useReportViewModel } from "../model/viewmodels/useReportViewModel"

import { ErrorAlert, Footer, WrongAccess } from "@shared/ui"
import { PageHeader } from "./components/PageHeader"
import { UploadButton } from "./components/UploadButton"
import { NotExtractedFromImage } from "./components/NotExtractedFromImage"
import { InputAmounts } from "./components/InputAmounts"
import { ReportButton } from "./components/ReportButton"
import { UploadSuccess } from "./components/UploadSuccess"

export function Report() {

  const location = useLocation().state

  if (!location) {
    return (
      <WrongAccess />
    )
  }

  const { place } = location as { place: PlaceModel }

  const amountsViewModel = useReportViewModel(place)

  const handleFileChange = async (files: FileList) => {
    const file = files[0]
    amountsViewModel.extractAmounts(file)
  }

  const handleOnChangeTotalAmount = (event: ChangeEvent<HTMLInputElement>) => {
    amountsViewModel.setTotalAmount(event.target.value)
  }

  const handleOnChangeSurchargeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    amountsViewModel.setSurchargeAmount(event.target.value)
  }

  useEffect(() => {

    return () => {
      amountsViewModel.resetAllStores()
      console.log('Reset all stores')
    }

  }, [location.pathname])

  const navigate = useNavigate()

  const handleBackToPlace = () => {
    navigate('/place', {
      state: { id: place.id },
      replace: true
    })
  }

  return (
    <div className='ml-10 mr-10'>
      <PageHeader placeName={amountsViewModel.placeName} />
      <div className='flex flex-col items-center justify-center mt-4 gap-4'>
        <UploadButton
          loading={amountsViewModel.isUploadImageButtonLoading}
          disabled={amountsViewModel.isUploadImageButtonDisabled}
          onChange={handleFileChange}
        />
        <NotExtractedFromImage isExtracted={amountsViewModel.isExtracted} />
        <InputAmounts
          isCalculated={amountsViewModel.isCalculated}
          totalAmountValue={amountsViewModel.totalAmount}
          totalAmountDisabled={amountsViewModel.isTotalAmountTextFieldDisabled}
          totalAmountOnChange={handleOnChangeTotalAmount}
          surchargeAmountValue={amountsViewModel.surchargeAmount}
          surchargeAmountDisabled={amountsViewModel.isSurchargeAmountTextFieldDisabled}
          surchargeAmountOnChange={handleOnChangeSurchargeAmount}
        />
      </div>
      <div className='flex items-center justify-center mt-4'>
        <ReportButton
          isCalculated={amountsViewModel.isCalculated}
          loading={amountsViewModel.isReportButtonLoading}
          disabled={amountsViewModel.isReportButtonDisabled}
          onClick={amountsViewModel.reportSurcharge}
        />
      </div>
      <Footer />
      <ErrorAlert isError={amountsViewModel.isError} />
      {/* When the uploading is successed. Show dimmed cover */}
      <UploadSuccess
        isUploaded={amountsViewModel.isUploaded}
        placeName={amountsViewModel.placeName}
        goBack={handleBackToPlace}
      />
    </div>
  )
}