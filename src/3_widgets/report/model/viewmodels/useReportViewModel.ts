import { useMemo } from "react"

import { useAmountStore } from "../stores/useAmountStore"
import { usePlaceStore } from "../stores/usePlaceStore"
import { useUploadStore } from "../stores/useUploadStore"

import { UploadSurchargeInformation } from "../usecases/UploadSurchargeInformation"

import { PlaceModel } from "@entities/place"

export const useReportViewModel = (initialPlaceModel: PlaceModel) => {

  // place store
  const _placeModelStore = usePlaceStore(initialPlaceModel)
  const _placeModel = _placeModelStore((state) => state.placeModel)

  // amount store
  const _image = useAmountStore((state) => state.image)
  const totalAmount = useAmountStore((state) => state.totalAmount)
  const surchargeAmount = useAmountStore((state) => state.surchargeAmount)
  const _isCalculating = useAmountStore((state) => state.isCalculating)
  const isCalculated = useAmountStore((state) => state.isCalculated)
  const isExtracted = useAmountStore((state) => state.isExtracted)
  const setTotalAmount = useAmountStore((state) => state.setTotalAmount)
  const setSurchargeAmount = useAmountStore((state) => state.setSurchargeAmount)
  const _extractAmounts = useAmountStore((state) => state.extractAmounts)

  // upload store
  const _isUploading = useUploadStore((state) => state.isUploading)
  const isUploaded = useUploadStore((state) => state.isUploaded)
  const isError = useUploadStore((state) => state.isError)
  const _setIsUploading = useUploadStore((state) => state.setIsUploading)
  const _setIsUploaded = useUploadStore((state) => state.setIsUploaded)
  const setIsError = useUploadStore((state) => state.setIsError)

  const placeName = useMemo((): string => {
    return _placeModel.displayName.text
  },
    [_placeModel]
  )

  const isUploadImageButtonLoading = useMemo(() => {
    return _isCalculating
  }, [_isCalculating])

  const isUploadImageButtonDisabled = useMemo(() => {
    return _isUploading
  }, [_isUploading])

  const isTotalAmountTextFieldDisabled = useMemo(() => {
    return _isCalculating || _isUploading
  }, [_isCalculating, _isUploading])

  const isSurchargeAmountTextFieldDisabled = useMemo(() => {
    return _isCalculating || _isUploading
  }, [_isCalculating, _isUploading])

  const isReportButtonLoading = useMemo(() => {
    return _isUploading
  }, [_isUploading])

  const isReportButtonDisabled = useMemo(() => {
    return _isCalculating || totalAmount === '' || surchargeAmount === ''
  }, [_isCalculating, totalAmount, surchargeAmount])

  const extractAmounts = async (file: File) => {
    await _extractAmounts(file)
  }

  const reportSurcharge = async () => {

    _setIsUploading(true)

    try {

      await UploadSurchargeInformation(
        {
          placeId: _placeModel.id,
          image: _image,
          totalAmount: parseFloat(totalAmount),
          surchargeAmount: parseFloat(surchargeAmount)
        }
      )

      _setIsUploaded(true)

    } catch {

      setIsError(true)

      setTimeout(() => {
        setIsError(false)
      }, 3000);

    } finally {
      _setIsUploading(false)
    }

  }

  const resetAmountStore = useAmountStore((state) => state.reset)
  const resetUploadStore = useUploadStore((state) => state.reset)

  const resetAllStores = async () => {
    resetAmountStore()
    resetUploadStore()
  }

  return {
    placeName,
    totalAmount,
    surchargeAmount,
    isUploadImageButtonLoading,
    isUploadImageButtonDisabled,
    isTotalAmountTextFieldDisabled,
    isSurchargeAmountTextFieldDisabled,
    isReportButtonLoading,
    isReportButtonDisabled,
    isCalculated,
    isExtracted,
    isUploaded,
    isError,
    setTotalAmount,
    setSurchargeAmount,
    extractAmounts,
    reportSurcharge,
    resetAllStores
  }
}