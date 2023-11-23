import React, { FC } from 'react'
import { observer } from 'mobx-react-lite'

import BoardFooter from 'components/board/BoardFooter'

const PrivacyRoute: FC = () => {
  return (
    <div className="flex flex-col p-5 pt-0 max-w-3xl mx-auto">
      <div className="flex items-center justify-center w-full h-20 text-xl text-blue-900 font-semibold border-b-2 mb-4 bg-white">
        Privacy Policy
      </div>
      <div className="pt-6">
        <p>Privacy Policy</p>
        <p>Effective Date: May 11, 2022</p>
        <br />
        <p>Welcome to HTN Coach.</p>
        <br />
        <p>Information We Collect</p>
        <p>
          “Personal Information” is information that identifies you as an
          individual or relates to an identifiable individual. Our Services may
          ask to collect Personal Information, including:
        </p>
        <br />
        <p>Name;</p>
        <p>Email address;</p>
        <p>Telephone number;</p>
        <br />
        <p>IP address;</p>
        <p>Gender;</p>
        <p>Height and weight;</p>
        <p>Certain information from your device;</p>
        <br />
        <p>
          We need to collect Personal Information in order to provide the
          requested Services to you. If you do not provide the information
          requested, we may not be able to provide the Services.
        </p>
        <br />
        <p>
          If you disclose any Personal Information relating to other people to
          us or to our service providers in connection with the Services, you
          represent that you have the authority to do so and to permit us to use
          the information in accordance with this Privacy Policy.
        </p>
        <br />
        <p>
          Respecting other people’s privacy is important. Please do not post any
          content that includes identifying information about another person
          without that person’s explicit consent. If you disclose any Personal
          Information relating to other people in connection with the Services,
          you represent that you have the authority to do so and to permit us to
          use the information in accordance with this Privacy Policy.
        </p>
        <br />
        <p>
          Communications: We will collect information you provide when you
          communicate with us, such as any communications you send to customer
          support. We will also collect information that you may submit as part
          of participation in a promotional event.
        </p>
        <br />
        <p>
          Information Others Share About You: Users may provide information to
          our Services when uploading photos and tagging information posted to
          the service with notes, and we cannot control the content of these
          posts. There may be users that want to refer you to our Services and
          as such may also provide your email address or phone number to us to
          invite you to use our Services.
        </p>
        <br />
        <p>
          HTN Coach Cookies and Usage Data: We collect industry standard data
          from everyone who visits our Services. We may use common technologies,
          such as cookies, “clear gifs” and “web beacons,” to automatically
          collect information such as your IP address or other device address or
          ID, web browser and/or device type, the web pages or sites that you
          visit just before or just after you use our Service, the pages or
          other content you view or otherwise interact with on our Service, and
          the dates and times that you visit, access, or use our Services. We
          also may use these technologies to collect information regarding your
          interaction with email messages, such as whether you opened, clicked
          on, or forwarded a message. This information is gathered from all
          users and may be connected with other information we collect from you
          and are used to improve our communications or Services to you.
        </p>
        <br />
        <p>
          Analytics: We may use Google Analytics, which uses cookies and similar
          technologies to collect and analyze information about use of the
          Services and report on activities and trends. This service may also
          collect information regarding the use of other websites, apps and
          online resources. You can learn about Google’s practices by going to{' '}
          <a
            target="_blank"
            href="https://www.google.com/policies/privacy/partners/"
            rel="noreferrer">
            www.google.com/policies/privacy/partners/
          </a>
          , and exercise the opt-out provided by Google by downloading the
          Google Analytics opt-out browser add-on, available at{' '}
          <a
            target="_blank"
            href="https://tools.google.com/dlpage/gaoptout"
            rel="noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
        <br />
        <p>
          Location Information: We offer features that may require specific
          location data. If you choose to use these features, we may collect
          data about your physical location from your mobile device if your
          Operating System settings are enabled to send it to us. We cannot
          access this information without your explicit approval to share this
          data with us. We stop collecting this type of data when you stop using
          the feature.
        </p>
        <br />
        <p>How We Use Your Information</p>
        <p>
          To Provide the Services: We use your Personal Information to provide
          the Services’ functionality to you, including arranging access to your
          account and providing customer service.
        </p>
        <br />
        <p>
          We will engage in these activities to manage our contractual
          relationship with you, and/or to comply with a legal obligation.
        </p>
        <br />
        <p>
          Communications: Your Personal Information is used to communicate with
          you, including by sending email messages, push notifications, or text
          messages. We may send administrative messages related to account
          management, customer service, system maintenance, or other related
          concerns. We will engage in these activities to manage our contractual
          relationship with you and/or to comply with a legal obligation.
        </p>
        <br />
        <p>
          We may also use your Personal Information to send or to inform you
          about new features or products that we think you would be interested
          in. We will engage in this activity with your consent or where we have
          a legitimate business interest.
        </p>
        <br />
        <p>
          Aggregate Data: We may anonymize and aggregate Personal Information
          collected through our Services so that it will no longer be considered
          Personal Information. We do so to generate other data for our use,
          which we may use for any purpose, as it no longer identifies you or
          any other individual.
        </p>
        <br />
        <p>
          To Accomplish Our Business Purposes: We may use Personal Data in data
          analysis, for example, to improve the efficiency of our Services. We
          may also use such information for other purposes, including but not
          limited to, fraud and security monitoring purposes, to conduct audits
          to address legal, regulatory or contractual requirements, to maintain
          and improve our current Services, or to identify usage trends to
          determine which aspects of our Services are most valuable to users. We
          engage in these activities to manage our contractual relationship with
          you, to comply with a legal obligation, and/or based on our legitimate
          interest.
        </p>
        <br />
        <p>
          With Your Consent: We will use your information for any other purpose
          for which the information was provided by you or for which you provide
          consent.
        </p>
        <br />
        <p>
          Please read “Preferences” below to learn about what controls we offer
          over the sharing of your data.
        </p>
        <br />
        <p>
          Vendors and Service Providers: We may share information we receive
          with vendors and service providers we use only in connection with
          providing you our Services. Such providers may include, among others,
          data analytics, web hosting, and payment processing.
        </p>
        <br />
        <p>
          As Required By Law and Similar Disclosures: We may access, preserve,
          and disclose information if we believe doing so is required or
          appropriate to: comply with applicable law and regulations; cooperate
          with law enforcement requests and legal process, such as a court order
          or subpoena; enforce our terms and conditions; respond to your
          requests; or protect your, our, or others’ rights, property, or
          safety. This may include laws outside your country of residence.
        </p>
        <br />
        <p>
          Merger, Sale, or Other Corporate Transactions: If we are involved in a
          merger, acquisition, financing due diligence, reorganization,
          bankruptcy, receivership, sale of our assets, or transition of service
          to another provider, we have a legitimate interest in disclosing or
          transferring your Personal Information as part of such a transaction.
        </p>
        <br />
        <p>
          With Your Consent: We may also disclose your information with your
          permission.
        </p>
        <br />
        <p>
          HTN Cosch may receive and maintain certain Personal Information from
          or on behalf of a HIPAA covered entity which considered “protected
          health information” or “PHI” and is protected by federal and state
          laws. For example, we may receive PHI in the form of enrollment data
          from your hospital in connection with an offering for the Services.
        </p>
        <br />
        <p>Use and Disclosure of Other Information</p>
        <p>
          In addition, the Services may collect “Other Information,” which does
          not reveal your specific identity or does not directly relate to an
          identifiable individual. Our Services collect Other Information such
          as:
        </p>
        <br />
        <p>HTN Coach App usage data;</p>
        <p>Location information;</p>
        <p>Browser and device information; and</p>
        <p>
          Information collected through cookies, pixel tags and other
          technologies.
        </p>
        <p>
          We may use and disclose Other Information for any purpose, except
          where we are required to do otherwise under applicable law. If we are
          required to treat Other Information as Personal Information under
          applicable law, we may use and disclose it for the purposes for which
          we use and disclose Personal Information as detailed in this Policy.
          In some instances, we may combine Other Information with Personal
          Information. If we do, we will treat the combined information as
          Personal Information as long as it is combined.
        </p>
        <br />
        <p>Information Security</p>
        <p>
          We use certain managerial, and technical safeguards that are designed
          to protect the integrity and security of information that we collect
          and store. Please be aware that no security measures are perfect, and
          we cannot ensure or warrant the security of any information you
          transmit to us or store on our Services.
        </p>
        <br />
        <p>
          Our Services are not directed to children under thirteen (13), and we
          do not knowingly collect Personal Information from children under 13.
        </p>
        <br />
        <p>International Users</p>
        <p>
          By using the Services, you understand that your information will be
          transferred to countries outside of your country of residence,
          including the United States, which may have data protection rules that
          are different from those of your country. In certain circumstances,
          courts, law enforcement agencies, regulatory agencies or security
          authorities in those other countries may be entitled to access your
          Personal Information.
        </p>
        <br />
        <p>
          Retention: We retain Personal Information for as long as needed or
          permitted in light of the purpose(s) for which it was obtained and
          consistent with applicable law. The criteria used to determine our
          retention period include: the length of time we have an ongoing
          relationship with you; legal obligations; or whether retention is
          advisable in light of our legal position. Any user may request to have
          their Personal Information deleted at any time.
        </p>
        <br />
        <p>Third-Party Services</p>
        <p>
          This Privacy Policy does not address, and we are not responsible for,
          the privacy, information, or other practices of any third parties,
          including any third party operating any website or service to which
          the Services link. The inclusion of a link on the Services does not
          imply endorsement of the linked site or service by us or by our
          affiliates.
        </p>
        <br />
        <p>
          In addition, we are not responsible for the information collection,
          use, disclosure, or security policies or practices of other
          organizations, such as Facebook, Apple, Google, Microsoft, Amazon, or
          any other app developer, app provider, social media platform provider,
          operating system provider, wireless service provider, or device
          manufacturer, including with respect to any Personal Information you
          disclose to other organizations through or in connection with the App.
        </p>
        <br />
        <p>Sensitive Information</p>
        <p>
          Unless we request it, we ask that you not send us, and you not
          disclose, any sensitive Personal Information (e.g., Social Security
          numbers, information related to racial or ethnic origin, political
          opinions, religion or other beliefs, or criminal background) on or
          through the Services or otherwise to us.
        </p>
        <br />
        <p>Changes to Our Privacy Policy</p>
        <p>
          We may revise this policy from time to time. When we do, we will post
          the revised policy on this page, and the revised version will be
          effective when it is posted. By continuing to access or use our
          Services after those changes become effective, you are agreeing to be
          bound by the revised policy.
        </p>
      </div>
      <BoardFooter />
    </div>
  )
}

export default observer(PrivacyRoute)
