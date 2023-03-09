import React, { useState } from "react";
import NotificationTabsButton from "./NotificationTabsButton";
import NotificationReportCard from "./NotificationReportCard";
import { Link } from "react-router-dom";


function NotificationPop() {

    // NOTIFICATION SORT
    const [currentCard, setCurrentCard] = useState(1);

  return (
    <div className="flex flex-col w-auto ">

      <div className="w-full flex justify-between items-center px-2 py-3">
        <h1 className="font-bold text-2xl">Notification</h1>
        <p className="text-black shadow-sm text-sm underline font-bold cursor-pointer">Mark all as read</p>
      </div>

      <div className="flex w-auto px-5 border-b-2">
        <NotificationTabsButton setCurrentCard={setCurrentCard} text={"All"} value={1} 
                                width={"w-auto"}
                                // itemInFocus={"focus:border-b-2 focus:border-black focus:font-bold"}
                                focused={currentCard}/>
        <NotificationTabsButton setCurrentCard={setCurrentCard} text={"Onboaring"} value={2}
                                width={"w-auto"}
                                // itemInFocus={"focus:border-b-2 focus:border-black focus:font-bold"}
                                focused={currentCard}/>
        <NotificationTabsButton setCurrentCard={setCurrentCard} text={"Mentor"} value={3} 
                                width={"w-auto"}
                                // itemInFocus={"focus:border-b-2 focus:border-black focus:font-bold"}
                                focused={currentCard}/>
      </div>

      <div className="px-2">
        {currentCard == 1 && 
          <div className="">
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
          </div>
        }
        {currentCard == 2 && 
          <div className="">
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
          </div>
        }
        {currentCard == 3 && 
          <div className="">
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
            <NotificationReportCard />
          </div>
        }
      </div>

    </div>
  )
}

export default NotificationPop