import React from 'react'
import { Button } from './ui/button'
import { ArrowRight } from 'lucide-react'
 //92239
const UpgradeButton = () => {
  return (
    <Button className='w-full'>
        Upgrade Now <ArrowRight className='h-5 w-5 ml-1.5' />
    </Button>
  )
}

export default UpgradeButton