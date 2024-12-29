import React from 'react'
interface SummaryChildPropsTypes{
    title: string
    content: string
}

const SummaryChild:React.FC<SummaryChildPropsTypes> = ({title,content}) => {
  return (
    <div className='flex flex-col items-center w-[120px] text-center '>
        <h3 className='text-blue-700 text-4xl font-bold' >{content}</h3>
        <p className='text-sm' >{title}</p>
    </div>
  )
}

export default SummaryChild
