import React from "react";

import { Footer } from "../../components/footer/footerContent";
import Navbar from "../../components/header";

import { privacyContent } from "./privacyData";

import "./style.css";
import { tableData } from "../terms/termsData";
import { Link } from "react-router-dom";

export const PrivacyPolicy = () => {
  return (
    <div>
      <div className="privacy-policy-section px-4">
        <div style={{ paddingTop: 20 }}>
          <Navbar logo backIcon languageIcon backIconURL={-1} />
        </div>

        <h1>Privacy Policy</h1>

        <ul className="unorder-list">
          {privacyContent.general_term.map((term) => (
            <li key={term?.id}>
              <h5 className="privacy-paragraph-title">
                {term.id}. {term?.heading}{" "}
              </h5>

              {term?.detail ? (
                <p className="privacy-paragraphOne">{term?.detail}</p>
              ) : null}

              {term?.sub_data?.map((sub_data) => (
                <>
                  <p
                    className="privacy-paragraphOne privacy-sub-para"
                    key={sub_data?.id}
                  >
                    {sub_data?.sub_heading ? (
                      <strong className="sub-heading">
                        <span className="marker-span">
                          <span className="sub-header-marker" />
                        </span>{" "}
                        {sub_data?.sub_heading}:
                      </strong>
                    ) : null}{" "}
                    {!sub_data?.sub_heading ? (
                      <span className="marker-span">
                        <span className="sub-header-marker" />
                      </span>
                    ) : null}{" "}
                    {sub_data?.sub_detail}
                    {sub_data?.child_sub_data?.length ? ":" : ""}
                  </p>

                  {sub_data?.child_sub_data?.length ? (
                    <>
                      {sub_data?.child_sub_data?.map((child_sub_data) => (
                        <p
                          key={child_sub_data?.id}
                          className="privacy-paragraphOne"
                          style={{
                            marginLeft: "8px",
                          }}
                        >
                          <span className="marker-span">
                            <span className="sub-header-marker" />
                          </span>{" "}
                          {child_sub_data?.child_sub_detail}
                        </p>
                      ))}
                    </>
                  ) : null}
                </>
              ))}
            </li>
          ))}

          <li>
            <h5 className="terms-paragraph-title">
              {privacyContent?.general_term?.length + 1}. Contact Us
            </h5>

            <p className="terms-paragraphOne terms-sub-para">
              <strong className="sub-heading">
                <span className="marker-span">
                  <span className="sub-header-marker" />
                </span>{" "}
                Questions and Feedback:
              </strong>{" "}
              If you have any questions about this Privacy Policy, please
              contact us via Live Chat, E-mail;{" "}
              <Link to="/">care@seazengroup.com</Link>, or one of the below
              phone numbers:
            </p>

            <table>
              <tr className="table-heading">
                <th className="table-data">Service</th>
                <th className="table-data">Contact</th>
              </tr>
              {tableData?.map((service) => (
                <tr key={service.id}>
                  <td className="table-data first-td">{service.service}</td>
                  <td className="table-data second-td">{service.number}</td>
                </tr>
              ))}
            </table>
          </li>
        </ul>
      </div>
      <div className="privacy-policy-footer px-3">
        <Footer showCommentOption={false} path="privacy" />
      </div>
    </div>
  );
};
