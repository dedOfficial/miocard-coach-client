import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import BoardFooter from 'components/board/BoardFooter'

const TermsRoute: FC = () => {
  return (
    <div className="flex flex-col p-5 pt-0 max-w-3xl mx-auto">
      <div className="flex items-center justify-center w-full h-20 text-xl text-blue-900 font-semibold border-b-2 mb-4 bg-white">
        Terms of Services
      </div>
      <div className="pt-6">
        <p>HTN Coach End User License Agreement and Terms of Service</p>
        <p>Last Updated Date: May 11, 2022</p>
        <br />
        <p>1. Introduction and Eligibility</p>
        <p>
          Please read this End User License Agreement and Terms of Use (the
          “EULA”) carefully before using the HTN Coach mobile application.
        </p>
        <br />
        <p>
          Binding Agreement. This EULA constitutes a binding agreement between
          you and Informed Data Systems, Inc. and its affiliates and
          subsidiaries (“HTN Coach ,” “we,” “us,” and “our”) governing your use
          of the App. “App” means our HTN Coach mobile app (the “App”) and all
          Internet services under the control of HTN Coach that are operated in
          connection with the App. “You” and “users” mean all users of the App.
          BY INSTALLING OR OTHERWISE ACCESSING OR USING THE APP, YOU AGREE THAT
          YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THIS EULA. IF YOU
          DO NOT AGREE, THEN YOU MAY NOT DOWNLOAD OR USE THE APP.
        </p>
        <br />
        <p>
          You may use the App only if you are of legal age to form a binding
          contract (or, if you are a minor, if you have your parent’s or legal
          guardian’s permission to use the App, and your parent or legal
          guardian has read and agrees to this EULA on your behalf) and are not
          a person barred from receiving services under the laws of the United
          States or other applicable jurisdiction. You affirm that you have not
          been previously suspended from or removed as a user of the App.
        </p>
        <br />
        <p>
          You accept this EULA each time you access the App. If you do not
          accept this EULA, you must not use the App.
        </p>
        <br />
        <p>
          Revisions to Terms. We may revise this EULA at any time by posting an
          updated version. You should visit this page periodically to review the
          most current EULA, because you are bound by it. Your continued use of
          the App after a change to this EULA constitutes your binding
          acceptance of this EULA. Notwithstanding the preceding sentences of
          this paragraph, no revisions to this EULA will apply to any dispute
          between you and HTN Coach that arose prior to the date of that
          revision.
        </p>
        <br />
        <p>
          Privacy Policy. This EULA includes the HTN Coach Privacy Policy which
          is incorporated by reference into this EULA. By using the App you
          agree that you have read, understood, and agree to the data
          collection, use, and disclosure provisions set forth in the Privacy
          Policy.
        </p>
        <br />
        <p>
          The terms “post” and “posting” as used in this EULA mean the act of
          submitting, uploading, publishing, displaying, or similar action on
          the App.
        </p>
        <br />
        <p>
          Material Terms. As provided in greater detail in this EULA (and
          without limiting the express language of this EULA below), you
          acknowledge the following:
        </p>
        <br />
        <p>
          the App is licensed, not sold to you, and you may use the App only as
          set forth in this EULA;
        </p>
        <p>
          the use of the App may be subject to separate third party terms of
          service and fees, including, without limitation, your mobile network
          operator’s (the “Carrier”) terms of service and fees, including fees
          charged for data usage and overage, which are solely your
          responsibility;
        </p>
        <p>
          you consent to the collection, use, and disclosure of information you
          provide and other information obtained about you from your use of the
          App or otherwise, including personally identifiable information and
          location information, in accordance with the Privacy Policy;
        </p>
        <p>
          the App is provided “as is” without warranties of any kind and HTN
          Coach ’s liability to you is limited;
        </p>
        <p>
          disputes arising hereunder will be resolved by binding arbitration. By
          accepting this EULA, as provided in greater detail in Section 18 of
          this EULA, you and HTN Coach are each waiving the right to a trial by
          jury or to participate in a class action;
        </p>
        <p>
          the App may require access to the following services or resources on
          your mobile device: applicable device identifier, phone state and
          identity, location, Bluetooth connection, Apple’s HealthKit (for iOS
          device users) or Google Fit and data from other apps that utilize
          HealthKit or Google Fit, phone contacts list (if you want to send an
          invitation to friends), photo and video libraries, camera, and
          Internet and data services; and
        </p>
        <p>
          if you are using the App on an iOS-based device, you agree to and
          acknowledge the “Notice Regarding Apple” below.
        </p>
        <br />
        <p>2. The HTN Coach App</p>
        <br />
        <p>
          You are responsible for all charges, including data fees, from your
          Carrier, that are incurred through access of the App through a mobile
          device.
        </p>
        <br />
        <p>
          Third-Party Services. The App may link to third-party websites or
          applications to facilitate its provision of services to you. You are
          responsible for evaluating whether you want to access or use them. If
          you use these links, you will leave the App. Some of these third-party
          websites may use HTN Coach Content (defined below) under license from
          HTN Coach .{' '}
        </p>
        <br />
        <p>
          Social Sign-On. The App may allow or require you to register and log
          in using sign-on functionality provided by social networks, such as
          Facebook. You agree to abide by the social networks’ terms and
          conditions applicable to you.
        </p>
        <p>
          App Security. You are prohibited from violating, or attempting to
          violate, the security of the App. Any violations may result in
          criminal or civil penalties against you, as well as the termination of
          your privilege to use the App, at HTN Coach ’s sole discretion. HTN
          Coach reserves the right to investigate any alleged or suspected
          violations and, if a criminal violation is suspected, refer the
          suspected violation to the appropriate law enforcement agencies and
          cooperate fully with the investigations, including, but not limited
          to, the disclosure of any or all of your activities on or related to
          the App.
        </p>
        <br />
        <p>3. License</p>
        <p>
          The App is licensed, not sold, to you for use only under this EULA.
          HTN Coach reserves all rights not expressly granted to you. Subject to
          your complete and ongoing compliance with this EULA, HTN Coach hereby
          grants you a personal, limited, revocable, non-transferable license to
          use the App solely for your personal, non-commercial use, and to use
          the App on any compatible device that you own or control. You may not
          modify, alter, reproduce, distribute, or make the App available over a
          network where it could be used by multiple devices or users at the
          same time. You may not rent, lease, lend, sell, redistribute, copy or
          sublicense the App. You may not copy, decompile, reverse engineer,
          disassemble, attempt to derive the source code of, modify, or create
          derivative works of any portion of the App, any updates, or any part
          thereof (except as and only to the extent any foregoing restriction is
          prohibited by applicable law or Third Party Terms (as defined below)),
          nor attempt to disable or circumvent any security or other
          technological measure designed to protect the App or any content
          available through the App. If you breach these license restrictions,
          or otherwise exceed the scope of the licenses granted in this EULA,
          then you may be subject to prosecution and damages, as well as
          liability for infringement of intellectual property rights. The terms
          of this EULA will govern any updates provided to you by HTN Coach that
          replace or supplement the original App or any other portion of the
          App, unless that upgrade is accompanied by a separate license or
          revised EULA, in which case the terms of that license or revised EULA
          will govern.
        </p>
        <br />
        <p>4. Medical Information Disclaimer</p>
        <p>
          The information in the App is for informational purposes only. This
          information is in no way meant to be a substitute for medical
          treatment and may not be construed as medical advice, diagnosis, or
          treatment. Nothing contained in the App is intended to replace the
          services of a licensed, trained physician or health professional or to
          be a substitute for medical advice of a physician or trained health
          professional licensed in your jurisdiction. No action or inaction
          should be taken based solely on the information made available through
          the App. Instead, patients should consult with appropriate health
          professionals on any matter relating to their health and well-being.
          If you have any questions or concerns about diabetes treatment or
          treatment for other medical issues, you should contact your healthcare
          provider. You should never delay seeking medical advice, disregard
          medical advice, or discontinue medical treatment because of
          information provided in the App.
        </p>
        <br />
        <p>5. Third Party Software</p>
        <p>
          The software you download consists of a package of components,
          including certain third party software (“Third Party Software”)
          provided under separate license terms (the “Third Party Terms”), which
          can be found in the documentation for the App or the applicable help,
          notices, about, or source files. Your use of the Third Party Software
          in conjunction with the App in a manner consistent with the terms of
          this EULA is permitted, however, you may have broader rights under the
          applicable Third Party Terms and nothing in this EULA is intended to
          impose further restrictions on your use of the Third Party Software.
        </p>
        <br />
        <p>6. Financial Matters</p>
        <p>
          Consideration. You understand and agree that this EULA is entered into
          in consideration of your use of the App and other good and valuable
          consideration, the receipt and sufficiency of which are hereby
          acknowledged.
        </p>
        <br />
        <p>
          7. Your Account Cancellation. As permitted under the terms of this
          EULA, we have the right at any time for any reason or no reason to
          suspend or terminate your account, terminate this EULA, or refuse any
          and all current or future use of the App without notice, refund,
          obligation, or liability to you.
        </p>
        <br />
        <p>8. Location-Based Services</p>
        <p>
          Some of the features of the App may enable HTN Coach to access your
          location in order to tailor your experience with the App based on your
          location (“Location-Based Services”). In order to use certain
          Location-Based Services, certain features of your mobile phone must be
          enabled, such as GPS, Wi-Fi, and Bluetooth, which enable HTN Coach to
          identify your location through a variety of means, including GPS
          location, IP address, cell tower location, geo-fencing technology, or
          detection by physical on-location Wi-Fi or Bluetooth sensors, as
          available. To the extent your location is collected through Wi-Fi or
          Bluetooth sensors, those sensors, and the associated data services,
          may be provided by a third party, and you agree and acknowledge that
          the third party may access that information for the purpose of
          providing the data services to HTN Coach . If you choose to disable
          any Location-Based Services on your device, you will not be able to
          utilize certain features of the App. By enabling Location-Based
          Services on your device, you agree and acknowledge that (a) device
          data we collect from you is directly relevant to your use of the App,
          (b) HTN Coach may provide Location-Based Services related to and based
          on your then-current location, and (c) HTN Coach may use any
          information collected in connection with the provision of
          Location-Based Services in connection with its provision of the App.
          PLEASE NOTE THAT LOCATION DATA MAY NOT ALWAYS BE ACCURATE, AND HTN
          Coach DISCLAIMS ANY AND ALL WARRANTIES RELATED TO LOCATION-BASED
          SERVICES.
        </p>
        <br />
        <p>9. Communications</p>
        <p>You consent for HTN Coach to communicate with you . </p>
        <br />
        <p>
          We may also send you push notifications for those same purposes
          through the App itself. You consent for HTN Coach to contact you via
          unencrypted email in reference to any items that assist HTN Coach in
          providing services related to the App, such as reminders, shipment and
          delivery of supplies, health profile updates and any communications
          pertaining to your care, including information exchanged with HTN
          Coach coaches and email message campaigns.
        </p>
        <br />
        <p>
          Electronic Notices. By using the App, you agree that we may
          communicate with you electronically regarding security, privacy, and
          administrative issues relating to your use of the App. If we learn of
          a security system’s breach, we may attempt to notify you
          electronically by posting a notice via the App or sending an email to
          you.
        </p>
        <br />
        <p>
          Text Messages. By providing us with your mobile telephone number and
          requesting that we communicate information to you by text message, you
          consent to receive unencrypted SMS text messages at that number as
          requested. The App may allow you to receive messages from other users
          or from HTN Coach via SMS. You consent for HTN Coach to contact you
          via unencrypted SMS text messages in reference to any items that
          assist HTN Coach in providing services related to the App, such as
          reminders, shipment and delivery of supplies, health profile updates
          and any communications pertaining to your care, including information
          exchanged with HTN Coach coaches and email message campaigns.
        </p>
        <br />
        <p>
          While we do not charge a fee for text messages, your wireless service
          carrier may charge standard messaging, data, and other fees. You are
          responsible for these charges. We may send and receive text messages
          through cellular telephone operators or other networks, and the level
          of reliability may vary. We are not responsible for the timeliness or
          final delivery of the message, as this is out of our control and is
          the responsibility of the cellular telephone operator or other
          networks.
        </p>
        <br />
        <p>
          Telephone. You consent for HTN Coach to call your home number, mobile
          number or other alternative number and leave a message on voicemail in
          reference to any items that assist HTN Coach in providing services
          related to the App, such as reminders, insurance items, shipment and
          delivery of supplies, health profile updates and any calls pertaining
          to my care, including, but not limited to, conversations with HTN
          Coach coaches.
        </p>
        <br />
        <p>
          Sending Messages Through the App. The App may include functionality
          that allows you to send stickers or messages to other App users. You
          acknowledge that the App may include functionality that allows certain
          users to block you from sending them messages. You agree that you will
          not send messages to individuals who have requested that you not send
          them messages. We reserve the right to restrict the number of
          communications that you send to other users in any specified period to
          a number that HTN Coach deems appropriate in its sole discretion. You
          agree that your use of the App will not include sending unsolicited
          marketing messages or broadcasts (i.e., spam).
        </p>
        <br />
        <p>10. HTN Coach ’s Content Ownership and Use</p>
        <p>
          The contents of the App include: designs, text, graphics, images,
          video, information, logos, button icons, software, audio files,
          computer code, and HTN Coach content (collectively, the “HTN Coach
          Content”).{' '}
        </p>
        <br />
        <p>
          License to You. We authorize you, subject to this EULA, to access and
          use the App and HTN Coach Content solely for the use of the services
          provided by HTN Coach , at our discretion. Any other use is expressly
          prohibited. This license is revocable at any time without notice and
          with or without cause. Unauthorized use of HTN Coach Content may
          violate copyright, trademark, and applicable communications
          regulations and statutes and is strictly prohibited. You must preserve
          all copyright, trademarks, service marks, and other proprietary
          notices contained in the original HTN Coach Content on any copy you
          make of HTN Coach Content.
        </p>
        <br />
        <p>
          You may not copy, reproduce, republish, upload, post, transmit, or
          distribute material made available on or through the App in any way
          without written permission of the copyright owner. You may not
          download or copy materials that we do not make expressly available for
          download without our prior written permission. Modification of
          materials obtained from the App, including, but not limited to, User
          Content (as defined below), for any other purpose, including, without
          limitation, any commercial purpose, is a violation of the copyrights
          and other proprietary rights of HTN Coach or its licensors, unless you
          have obtained express written authorization to the contrary.
        </p>
        <p>
          No Commercial Use. No materials obtained from the App, even if
          authorized for download from the App, may be redistributed, nor may
          they be used for any commercial purpose, without HTN Coach ’s prior
          written permission.
        </p>
        <br />
        <p>
          Additional Licenses. Certain materials made available for download
          from or through the App may be subject to additional or different
          license terms and conditions, such as terms and conditions set forth
          in a Creative Commons license. Any of those terms and conditions will
          be identified in advance for those materials, and by downloading any
          materials governed by any other license terms and conditions, you
          hereby agree to be bound by and comply with those terms and
          conditions.
        </p>
        <br />
        <p>
          No Implied Rights. There are no implied licenses granted in this EULA.
          All rights not granted in this EULA are expressly reserved by HTN
          Coach , our licensors, or the copyright owner of any User Content.
        </p>
        <br />
        <p>
          HTN Coach Marks. HTN Coach , the HTN Coach logo, and other HTN Coach
          logos and product and App names are or may be trademarks of HTN Coach
          or its licensors (the “HTN Coach Marks”). Without our prior written
          permission, and except as solely enabled by any link as provided by
          us, you agree not to display or use in any manner the HTN Coach Marks.
        </p>
        <br />
        <p>11. Intellectual Property Rights and Our License to Use</p>
        <p>
          HTN Coach Claims No Ownership. The App may include features that
          enable you to post certain materials from your device to the App.
          Except for HTN Coach Content provided to you on or through the App,
          you agree that you, solely, are responsible for, and assume all
          liability and consequences regarding, the photos, video, audiovisual,
          audio, text, and any other media content that you post to or through
          the App along with all associated metadata (which may include, without
          limitation, your device type, applicable device identifier, IP
          address, phone state, as well as date, time, and application and
          location data associated with Internet and data services and the
          creation or submission or a particular piece of content) (collectively
          “Your User Content”).
        </p>
        <br />
        <p>
          HTN Coach ’s Use of Your User Content. By creating, posting, or
          sharing Your User Content on or through the App, and subject to the
          Privacy Policy, you grant HTN Coach a perpetual, transferrable,
          sublicensable, world-wide, non-exclusive, royalty-free license to
          reproduce, distribute, use, modify, remove, publish, transmit,
          publicly perform, publicly display, or create derivative works of Your
          User Content for any purpose without compensation to you, including
          for the purpose of promoting HTN Coach and the App, including after
          your account is cancelled or otherwise terminated. You waive any
          rights you may have regarding Your User Content being altered or
          manipulated in any way that may be objectionable to you, but please
          let us know if you object to any of those uses and where appropriate
          in our sole discretion, we will attempt to address your concerns. We
          reserve the right to refuse to accept, post, display, or transmit any
          User Content in our sole discretion. You acknowledge that HTN Coach
          has the perpetual and irrevocable right to delete any or all of your
          content and data from our servers and from the App, whether
          intentionally or unintentionally, and for any reason or no reason,
          without any liability of any kind to you or any other party.
        </p>
        <br />
        <p>
          You Acquire No Ownership of Others’ Content. You understand and agree
          that you will not obtain, through use of the App, any right, title, or
          interest (including intellectual property rights) in content delivered
          via the App.
        </p>
        <br />
        <p>
          You Must Have Rights to the Content You Post. You represent and
          warrant that: (a) you own the content posted by you on or through the
          App or otherwise have the right to grant the license set forth in this
          EULA; (b) the posting and use of Your User Content on or through the
          App does not violate the privacy rights, publicity rights, copyrights,
          contract rights, intellectual property rights, or any other rights of
          any person; (c) the posting of Your User Content on the App will not
          require HTN Coach to obtain any further licenses from or pay any
          royalties, fees, compensation, or other amounts or provide any
          attribution to any third parties; and (d) the posting of Your User
          Content on the App does not result in a breach of contract between you
          and a third party. You agree to pay all monies owing to any person as
          a result of posting Your User Content on the App. You also acknowledge
          and agree that Your User Content is non-confidential.
        </p>
        <br />
        <p>
          The App contains content from users and other HTN Coach licensors.
          Except as provided within this EULA, you may not copy, modify,
          translate, publish, broadcast, transmit, distribute, perform, display,
          or sell any content appearing on or through the App.
        </p>
        <br />
        <p>
          Consent to Use of Data. You agree that HTN Coach may collect and use
          technical data and related information, including, but not limited to,
          unique device identifiers and other technical information about your
          device, system and application software, and peripherals that is
          gathered periodically to facilitate the provision of software updates,
          product support, and other services to you (if any) related to the
          App, and to track and report your activity inside of the App,
          including for analytics purposes. Please see the HTN Coach Privacy
          Policy at{' '}
          <a
            target="_blank"
            href="http://onedrop.today/privacypolicy/"
            rel="noreferrer">
            http://onedrop.today/privacypolicy/
          </a>{' '}
          for more details regarding the information HTN Coach collects and how
          it uses and discloses that information.
        </p>
        <br />
        <p>12. Intellectual Property Policy</p>
        <p>
          HTN Coach respects the intellectual property of others and takes the
          protection of copyrights and all other intellectual property very
          seriously, and we ask our users to do the same. Infringing activity
          will not be tolerated on or through the App.
        </p>
        <br />
        <p>13. Suggestions and Submissions</p>
        <p>
          We appreciate hearing from our users and welcome your comments
          regarding the App. Please be advised, however, that if you send us
          creative ideas, suggestions, inventions, or materials (“Creative
          Ideas”), we will:
        </p>
        <br />
        <p>
          have a perpetual, irrevocable, non-exclusive right in and to any
          Creative Ideas and will own exclusive any derivative works based upon
          your Creative Ideas created by or for us;
        </p>
        <p>
          not be subject to any obligation of confidentiality and will not be
          liable for any use or disclosure of any Creative Ideas; and
        </p>
        <p>
          be entitled to unrestricted use of the Creative Ideas for any purpose
          whatsoever, commercial or otherwise, without compensation to you or
          any other person.
        </p>
        <br />
        <p>14. Content Disclaimers, Limitations, and Prohibitions</p>
        <p>
          We do not represent or guarantee the truthfulness, accuracy, or
          reliability of content posted by users (“User Content”). You accept
          that any reliance on material posted by other users or third-party
          service providers will be at your own risk. By using the App you
          accept the risk that you might be exposed to content that is
          objectionable or otherwise inappropriate.
        </p>
        <br />
        <p>
          You are solely responsible for Your User Content on the App. HTN Coach
          does not endorse any, nor is it responsible for, User Content on the
          App. You assume all risks associated with Your User Content, including
          anyone’s reliance on its quality, accuracy, or reliability. You may
          expose yourself to liability if, for example, Your User Content
          contains material that is false, intentionally misleading, or
          defamatory; violates third-party rights; or contains material that is
          unlawful or advocates the violation of any law or regulation.
        </p>
        <br />
        <p>
          You understand that by using the App, you may encounter data,
          information, applications, or materials from third parties, including
          other users of the App and other content, including HTN Coach Content
          (as defined below) (collectively, “Content”), that may be deemed
          offensive, harmful, indecent, objectionable, inaccurate, deceptive, or
          otherwise inappropriate which Content may or may not be identified as
          having explicit or inappropriate language or other material.
          Nevertheless, you agree that your use of the App and reliance upon any
          Content accessible through the App is at your sole risk and that HTN
          Coach will not have any liability to you for content that may be found
          to be offensive, indecent, or that is inaccurate, incomplete,
          untimely, invalid, illegal, indecent, of poor quality, or otherwise
          objectionable or inappropriate.
        </p>
        <br />
        <p>
          You agree to use the App only for its intended purpose. You must use
          the App in compliance with all privacy, data protection, intellectual
          property, and other applicable laws. The following uses of the App are
          prohibited. You may not:
        </p>
        <br />
        <p>
          attempt to interfere with, harm, reverse engineer, steal from, or gain
          unauthorized access to the App, user accounts, or the technology and
          equipment supporting the App;
        </p>
        <p>
          bypass, circumvent, damage, or otherwise interfere with any security
          or other features of the App designed to control the manner in which
          the App is used, harvest or mine Content from the App, or otherwise
          access or use the App in a manner inconsistent with individual human
          usage;
        </p>
        <p>
          use data mining, robots, or other data gathering devices on or through
          the App;
        </p>
        <p>
          post incomplete, false, or misleading information, impersonate another
          person, or misrepresent your affiliation with a person or entity;
        </p>
        <p>
          post or otherwise disclose personal information about another person
          via the App (including photos of other people) or obtained from the
          App without the consent of that person, or collect information about
          users of the App;
        </p>
        <p>post objectionable material;</p>
        <p>
          “stalk,” harass, abuse, harm, or advocate or incite harassment, abuse,
          or harm of another person or group, including HTN Coach employees;
        </p>
        <p>
          sell, transfer, or assign any of your rights to use the App to a third
          party without our express written consent;
        </p>
        <p>
          post advertising or marketing links or content, except as specifically
          allowed by this EULA;
        </p>
        <p>
          use the App after your account has been terminated or disabled,
          without our consent;
        </p>
        <p>
          use the App in an illegal way or to commit an illegal act in relation
          to the App or that otherwise results in fines, penalties, and other
          liability to HTN Coach or others;
        </p>
        <p>
          buy, sell, rent, lease, or otherwise offer in exchange for any
          compensation, access to your account without HTN Coach ’s prior
          written consent;
        </p>
        <p>
          access the App from a jurisdiction where it is illegal or
          unauthorized;
        </p>
        <p>reproduce any part of the App;</p>
        <p>solicit personal information from anyone under the age of 18;</p>
        <p>promote any criminal activity on the App; or</p>
        <p>
          assist or permit any persons in engaging in any of the activities
          described above or otherwise prohibited under this EULA.
        </p>
        <br />
        <p>15. Consequences of Violating this EULA</p>
        <p>
          We reserve the right to suspend or terminate your account and prevent
          access to the App for any reason, including if you engage in activity
          that, in HTN Coach ’s sole judgment, violates this EULA, without
          notice and at our discretion. We reserve the right to refuse to
          provide the App or any portion thereof to you in the future and we may
          block or prevent your future access to and use of the App or any
          portion thereof.
        </p>
        <br />
        <p>
          HTN Coach may review and remove any User Content at any time for any
          reason, including if you engage in activity which, in HTN Coach ’s
          sole judgment: violates this EULA; violates applicable laws, rules, or
          regulations; is abusive, disruptive, offensive, or illegal; or
          violates the rights of, or harms or threatens the safety of, users of
          the App.
        </p>
        <br />
        <p>
          You are responsible for any claims, fees, fines, penalties, and other
          liability incurred by us or others caused by or arising out of your
          breach of this EULA and your use of the App.
        </p>
        <p>
          You are solely responsible for maintaining backup copies of any User
          Content you post to the App. We are not responsible for the deletion
          or unavailability of any User Content.
        </p>
        <br />
        <p>16. HTN Coach ’s Liability</p>
        <p>
          Changes to the App. We may change, suspend, or discontinue any aspect
          of the App at any time, including hours of operation or availability
          of the App or any feature, without notice or liability.
        </p>
        <p>
          User Disputes. We are not responsible for any disputes or
          disagreements between you and any third party you interact with using
          the App. You assume all risk associated with dealing with third
          parties. You agree to resolve disputes directly with the other party.
          You release HTN Coach of all claims, demands, and damages in disputes
          among users of the App. You also agree not to involve us in those
          disputes. Use caution and common sense when using the App.
        </p>
        <p>
          Content Accuracy. We make no representations about accuracy,
          reliability, completeness, or timeliness of any contents of the App.
          Similarly, we make no representations about accuracy, reliability,
          completeness, or timeliness of any data from a third-party service
          provider or the quality or nature of third-party products or services
          obtained through the App. Use the App at your own risk.
        </p>
        <br />
        <p>
          Use of the App. We make no promises and disclaim all liability of
          specific results from the use of the App.
        </p>
        <br />
        <p>
          Released Parties Defined. “Released Parties” include HTN Coach and its
          affiliates, officers, employees, agents, service providers, partners,
          and licensors.
        </p>
        <br />
        <p>DISCLAIMER OF WARRANTIES</p>
        <p>
          YOU EXPRESSLY UNDERSTAND AND AGREE THAT: (i) YOUR USE OF THE APP IS AT
          YOUR SOLE RISK, AND THE APP IS PROVIDED ON AN “AS IS” AND “AS
          AVAILABLE” BASIS AND THE RELEASED PARTIES EXPRESSLY DISCLAIM ALL
          WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT
          LIMITED TO, WARRANTIES AS TO PRODUCTS OR SERVICES OFFERED BY
          BUSINESSES LISTED ON THE APP OR IMPLIED WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT; (ii) THE
          RELEASED PARTIES MAKE NO WARRANTY THAT (1) THE APP WILL MEET YOUR
          REQUIREMENTS, (2) THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
          ERROR-FREE, (3) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE
          APP WILL BE ACCURATE OR RELIABLE, (4) THE QUALITY OF ANY GOODS OR
          SERVICES AVAILABLE ON THE APP WILL MEET YOUR EXPECTATIONS, OR (5) ANY
          ERRORS IN THE APP WILL BE CORRECTED; AND (iii) ANY MATERIAL DOWNLOADED
          OR OTHERWISE OBTAINED THROUGH THE USE OF THE APP IS ACCESSED AT YOUR
          OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY
          DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA THAT
          RESULTS FROM THE DOWNLOAD OR USE OF THAT MATERIAL.
        </p>
        <br />
        <p>LIMITATION OF LIABILITY AND INDEMNIFICATION</p>
        <p>
          YOU EXPRESSLY UNDERSTAND AND AGREE THAT THE RELEASED PARTIES WILL NOT
          BE LIABLE TO YOU FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING, BUT NOT LIMITED TO,
          DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, OR DATA OR OTHER
          INTANGIBLE LOSSES (EVEN IF HTN Coach HAS BEEN ADVISED OF THE
          POSSIBILITY OF THOSE DAMAGES), RESULTING FROM: (i) THE USE OR THE
          INABILITY TO USE THE APP; (ii) THE COST OF PROCUREMENT OF SUBSTITUTE
          GOODS AND SERVICES RESULTING FROM ANY GOODS, DATA, INFORMATION, OR
          SERVICES OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO
          THROUGH, FROM, OR AS A RESULT OF THE APP; (iii) UNAUTHORIZED ACCESS TO
          OR ALTERATION OF YOUR TRANSMISSIONS OR DATA; (iv) STATEMENTS OR
          CONDUCT OF ANY USER OR THIRD PARTY ON THE APP; (v) YOUR RELIANCE ON
          CONTENT MADE AVAILABLE BY US; OR (vi) ANY OTHER MATTER RELATING TO THE
          APP. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN
          WARRANTIES OR THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL
          OR CONSEQUENTIAL DAMAGES. ACCORDINGLY, SOME OF THE ABOVE LIMITATIONS
          IN THIS PARAGRAPH MAY NOT APPLY TO YOU.
        </p>
        <br />
        <p>
          TO THE FULLEST EXTENT POSSIBLE BY LAW, OUR MAXIMUM LIABILITY ARISING
          OUT OF OR IN CONNECTION WITH THE APP OR YOUR USE OF HTN Coach CONTENT,
          REGARDLESS OF THE CAUSE OF ACTION (WHETHER IN CONTRACT, TORT, BREACH
          OF WARRANTY, OR OTHERWISE), WILL NOT EXCEED $100.
        </p>
        <br />
        <p>
          You agree to defend, indemnify, and hold harmless the Released Parties
          from and against any claims, actions, or demands, including without
          limitation reasonable legal and accounting fees, alleging or resulting
          from (1) your access, use, or misuse of the App, (2) your use of or
          reliance on any third-party content, (3) your use of or reliance on
          any HTN Coach Content, or (4) your breach of this EULA. HTN Coach will
          use reasonable efforts to notify you of the claim, action, or
          proceeding for which it seeks an indemnification from you upon
          becoming aware of it, but if HTN Coach is unable to communicate with
          you in a timely manner, your indemnification obligation will continue
          notwithstanding HTN Coach ’s inability to contact you in a timely
          manner.
        </p>
        <br />
        <p>17. General Terms</p>
        <p>
          This EULA constitutes the entire agreement between you and HTN Coach
          concerning your use of the App. Our failure to exercise or enforce any
          right or provision of this EULA does not constitute a waiver of that
          right or provision. If any provision of this EULA is found by a court
          of competent jurisdiction to be invalid, the parties nevertheless
          agree that the court should endeavor to give effect to the parties’
          intentions as reflected in the provision, and the other provisions of
          this EULA remain in full force and effect. Any summary sections,
          section titles, and annotations in this EULA and the Privacy Policy
          are for convenience only and have no legal or contractual effect. The
          provisions of this EULA that are intended to survive the termination
          of this EULA by their nature will survive the termination of this
          EULA, including, but not limited to, Sections 10 (HTN Coach ’s Content
          Ownership and Use), 11 (Intellectual Property Rights and Our License
          to Use), 13 (Suggestions and Submissions), 14 (Content Disclaimers,
          Limitations, and Prohibitions), 16 (HTN Coach ’s Liability), 17
          (General Terms), and 18 (Arbitration, Class Waiver, and Waiver of Jury
          Trial).
        </p>
        <br />
        <p>18. Arbitration, Class Waiver, and Waiver of Jury Trial</p>
        <p>
          This EULA and the relationship between you and HTN Coach is governed
          by the laws of the state of New York without regard to its conflict of
          law provisions that would result in the application of the laws of
          another jurisdiction. You and HTN Coach agree to submit to the
          personal and exclusive arbitration of any disputes relating to your
          use of the App under the rules of the American Arbitration
          Association. Arbitration is more informal than a lawsuit in court.
          Arbitration uses a neutral arbitrator instead of a judge or jury,
          allows for more limited discovery than in court, and is subject to
          very limited review by courts. Arbitrators can award the same damages
          and relief that a court can award.{' '}
        </p>
        <br />
        <p>
          The arbitration will be conducted in the English language. A single
          independent and impartial arbitrator will be appointed pursuant to the
          rules of the American Arbitration Association, as modified by this
          EULA. You and HTN Coach agree to comply with the following rules,
          which are intended to streamline the dispute resolution process and
          reduce the costs and burdens on the parties: (a) the arbitration will
          be conducted by telephone, online, or be solely based on written
          submissions, the specific manner to be chosen by the party initiating
          the arbitration; (b) the arbitration will not require any personal
          appearance by the parties or witnesses unless otherwise mutually
          agreed in writing by the parties; and (c) any judgment on the award
          rendered by the arbitrator may be entered in any court of competent
          jurisdiction.
        </p>
        <br />
        <p>
          Barring extraordinary circumstances, the arbitrator will issue his or
          her decision within 120 days from the date the arbitrator is
          appointed. The arbitrator may extend this time limit for an additional
          30 days in the interests of justice. All arbitration proceedings will
          be closed to the public and confidential and all records relating
          thereto will be permanently sealed, except as necessary to obtain
          court confirmation of the arbitration award. The award of the
          arbitrator will be in writing and will include a statement setting
          forth the reasons for the disposition of any claim.
        </p>
        <p>
          You also acknowledge and understand that, with respect to any dispute
          with the Released Parties arising out of or relating to your use of
          the App or this EULA:
        </p>
        <br />
        <p>YOU ARE GIVING UP YOUR RIGHT TO HAVE A TRIAL BY JURY;</p>
        <p>
          YOU ARE GIVING UP YOUR RIGHT TO SERVE AS A REPRESENTATIVE, AS A
          PRIVATE ATTORNEY GENERAL, OR IN ANY OTHER REPRESENTATIVE CAPACITY, OR
          TO PARTICIPATE AS A MEMBER OF A CLASS OF CLAIMANTS, IN ANY LAWSUIT
          INVOLVING ANY THAT DISPUTE; AND
        </p>
        <p>
          YOU MUST FILE ANY CLAIM WITHIN ONE YEAR AFTER THAT CLAIM AROSE OR IT
          IS FOREVER BARRED.
        </p>
        <p>
          Only if this arbitration provision is deemed to be null and void, then
          all disputes arising between you and HTN Coach under this EULA will be
          subject to the exclusive jurisdiction of the state and federal courts.
        </p>
        <br />
        <p>
          1.9 NOTICE REGARDING APPLE. You acknowledge that this EULA is between
          you and HTN Coach only, not with Apple or your phone manufacturer, and
          Apple or your phone manufacturer, are not responsible for the App or
          the content thereof. Apple or your phone manufacturer have no
          obligation whatsoever to furnish any maintenance and support services
          with respect to the App. In the event of any failure of the App to
          conform to any applicable warranty, then you may notify Apple or
          Google and Apple or Google will refund the purchase price for the
          relevant App to you; and, to the maximum extent permitted by
          applicable law, Apple or Google have no other warranty obligation
          whatsoever with respect to the App. Apple or Google are not
          responsible for addressing any claims by you or any third party
          relating to the App or your possession and/or use of the App,
          including, but not limited to: (i) product liability claims; (ii) any
          claim that the App fails to conform to any applicable legal or
          regulatory requirement; and (iii) claims arising under consumer
          protection or similar legislation. Apple or Google are not responsible
          for the investigation, defense, settlement, and discharge of any third
          party claim that the App or your possession and use of the App
          infringes that third party’s intellectual property rights. You agree
          to comply with any applicable third party terms, when using the App.
          Apple, Google and their subsidiaries, are third party beneficiaries of
          this EULA, and upon your acceptance of this EULA, Apple and Google
          will have the right (and will be deemed to have accepted the right) to
          enforce this EULA against you as a third party beneficiary of this
          EULA. You hereby represent and warrant that (i) you are not located in
          a country that is subject to a U.S. Government embargo, or that has
          been designated by the U.S. Government as a “terrorist supporting”
          country; and (ii) you are not listed on any U.S. Government list of
          prohibited or restricted parties. If HTN Coach provides a translation
          of the English language version of this EULA, the translation is
          provided solely for convenience, and the English version will prevail.
        </p>
      </div>
      <BoardFooter />
    </div>
  )
}

export default observer(TermsRoute)
