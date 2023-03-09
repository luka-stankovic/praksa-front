import { Avatar } from '@mui/material'
import React from 'react'

function NotificationReportCard() {
  return (
    <div className="grid grid-rows-2 grid-flow-col py-2 gap-1 border-b-2">
            <div className="row-span-2 flex justify-center items-center mr-2">
              <Avatar />
            </div>
            <div className="col-span-1 flex items-start">
              <p>Obavestenje da je nesto uradjeno stize ovde</p>
            </div>
            <div className="col-span-1 flex items-start">
              <p>2h ago , Social Media Plan</p>
            </div>
          </div>
  )
}

export default NotificationReportCard