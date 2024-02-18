import { cn } from '@/lib/utils'
import React from 'react'

interface MessageProps {
    message: ,
    isNextMessageSamePerson: boolean
}

const Message = ({ message, isNextMEssageSamePerson }: MessageProps) => {
  return (
    <div className={cn("flex items-end")}>Message</div>
  )
}

export default Message