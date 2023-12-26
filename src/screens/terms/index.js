import React from "react";

import { Footer } from "../../components/footer/footerContent";
import Navbar from "../../components/header";

import { tableData, termsContent } from "./termsData";

import "./style.css";
import { Link } from "react-router-dom";

export const Terms = () => {
  return (
    <div>
      <div className="terms-section px-4">
        <div style={{ padding: "20px 5px 0px 5px" }}>
          <Navbar logo backIcon languageIcon backIconURL={-1} />
        </div>
        <h1>Terms & Conditions</h1>

        <ul className="unorder-list">
          {termsContent.general_term.map((term) => (
            <li key={term?.id}>
              <h5 className="terms-paragraph-title">
                {term.id}. {term?.heading}{" "}
              </h5>

              {term?.detail ? (
                <p className="terms-paragraphOne">{term?.detail}</p>
              ) : null}

              {term?.sub_data?.map((sub_data) => (
                <>
                  <p
                    className="terms-paragraphOne terms-sub-para"
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
                          className="terms-paragraphOne"
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
              {termsContent?.general_term?.length + 1}. Contact
            </h5>

            <p className="terms-paragraphOne terms-sub-para">
              <strong className="sub-heading">
                <span className="marker-span">
                  <span className="sub-header-marker" />
                </span>{" "}
                Contact Information:
              </strong>{" "}
              For any queries, please contact us via Live Chat, E-mail;{" "}
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
      <div className="terms-footer px-3">
        <Footer showCommentOption={false} path="terms" />
      </div>
    </div>
  );
};
