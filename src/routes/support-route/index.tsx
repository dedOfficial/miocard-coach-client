/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import BoardFooter from 'components/board/BoardFooter'

import { mainWrapperStyle } from '../boardRoute/BoardRoute.styled'
import { wrapperStyle, titleStyle, spanStyle, linkStyle } from './styles'

const SupportRoute: FC = () => {
  return (
    <div className={mainWrapperStyle}>
      <div className="flex items-center justify-center w-full h-20 text-xl text-blue-900 font-semibold border-b-2 mb-4 bg-white">
        Support page
      </div>

      <div className={wrapperStyle}>
        <div>
          <h1 className={titleStyle}>
            Tell me more about the coaching program
          </h1>
          <p>
            We are offering a program of coaching that helps people to optimize
            lifestyle, replace bad habits with good ones, help with better
            nutrition and better sleep.
          </p>
        </div>

        <div>
          <h1 className={titleStyle}>
            Tell me more about the coaching process
          </h1>
          <ul>
            <li>We will research and develop a motivation strategy;</li>
            <li>Also, we will provide an educational content;</li>
            <li>Together we will work on your self-efficacy;</li>
            <li>And we will use gamification to make it more fun;</li>
            <li>
              We will collect and analyze data on lifestyle: sleep, physical
              activity, bad habits, etc;
            </li>
            <li>
              We will provide and explain the monthly report with your data.
            </li>
          </ul>
        </div>

        <div>
          <h1 className={titleStyle}>
            How can coaching help me improve my life?
          </h1>
          <ul>
            <li>
              <span className={spanStyle}>We educate</span>
              <br />
              about potential risks caused by weight gain, bad habits, and
              harmful lifestyle and what actions may improve your current
              situation.
            </li>
            <li>
              <span className={spanStyle}>We assist</span> <br />
              by helping to complete the desired action in your current
              situation and environment. Such as monitoring your food intake,
              compliance recommendations for removing unhealthy habits, creating
              new good habits…
            </li>
            <li>
              <span className={spanStyle}>We monitor</span> <br />
              your progress, we remind, we assess your progress, and intervene
              when needed.
            </li>
          </ul>
        </div>

        <div>
          <h1 className={titleStyle}>What if I don't like it?</h1>
          <p>
            To make the coaching process more interesting you will be able to
            choose your coaching plan and receive awards for progress in
            coaching. During coaching you can always change the work plan, you
            can at any time refuse the chosen method of work and change to
            another that will be more convenient for you. So we can assure you
            that our journey will be very interesting and useful for you.
          </p>
        </div>

        <div>
          <h1 className={titleStyle}>
            What if I forget that I have a session and will not show up?
          </h1>
          <p>
            The coach and health assistant will remind you an hour before the
            meeting that you have a session. And you will have time to prepare
            for it if you forget. If you do not show up for the session at the
            specified time, you will receive an SMS reminder. If you still do
            not show up after that, we will call you, because we will worry
            about you and want to know if maybe you need some help. So be
            prepared that you will be called if you do not show up for the
            session and do not warn about your absence. However, remember that
            we call you not to bother you, but we call you to make sure you are
            well.
          </p>
        </div>

        <div>
          <h1 className={titleStyle}>
            What if I can't show up to the session at the agreed time?
          </h1>
          <p>
            That is okay, it happens. You will get reminders and also I can
            check in with you. If for some reason you do not manage to join the
            chat, we can offer a different time to meet if needed. Or if
            something comes up and the time/day is no longer a good one send me
            a message here and we can try and reschedule. However, if you
            reschedule session time, please schedule at a later time due, not
            sooner.
          </p>
        </div>

        <div>
          <div className={titleStyle}>Contact us</div>
          <a href="mailto:htncoach@gmail.com" className={linkStyle}>
            htncoach@gmail.com
          </a>
        </div>

        <div className="mb-5">
          <div className={titleStyle}>About us</div>
          <p>
            SensoAI Systems Inc. <br />
            12086 Dunbar St Maple Ridge, BC, V2X 5T6 Canada <br />
            <span className="font-semibold">Duns: </span>240346605
            <br />
            <span className="font-semibold">Phone: </span>+1 (604) 763-14-62
          </p>
        </div>
      </div>

      <BoardFooter />
    </div>
  )
}

export default observer(SupportRoute)
