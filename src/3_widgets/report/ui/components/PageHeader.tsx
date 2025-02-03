interface IPageHeaderProps {
  placeName: string
}

export function PageHeader(props: IPageHeaderProps) {
  return (
    <div>
      <div className='flex flex-col items-center justify-center mt-10'>
        <p className='sm:text-3xl text-xl mr-2 text-center'>You are going to report surcharge information for</p>
        <p className='sm:text-5xl text-2xl font-bold text-center'>{props.placeName}</p>
      </div>
      <p className='text-center mt-10'>
        Please take or select a photo of the receipt or terminal screen for recognising surcharge information.
      </p>
      <p className='text-center font-bold'>
        Please Note. When you report this information, the photo will be uploaded to the server to verify the information.
      </p>
    </div>
  )
}