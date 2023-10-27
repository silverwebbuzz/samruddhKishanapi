const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");
const nodemailer = require("nodemailer");

module.exports.createEnquiry = async (req, res) => {
  try {
    let Enquiry = {
      IId: req.body.IId,
      IName: req.body.IName,
      status: req.body.status,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      fullName: req.body.fullName,
      quantity: req.body.quantity,
      description: req.body.description,
      flag: req.body.flag,
    };
    console.log(Enquiry);
    if (Enquiry) {
      console.log("s");
      await knex("smk_enquiry").insert(Enquiry);
      console.log("22");
      // Sending an email using Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail", // e.g., 'Gmail'
        auth: {
          user: "ashish.swb1234@gmail.com",
          pass: "oveprfbiugcfpoin",
          secure: true,
        },
      });
      console.log(transporter);
      const mailOptions = {
        from: "ashish.swb1234@gmail.com",
        to: Enquiry.email,
        subject: "Enquiry Created",
        html: `
                <!DOCTYPE html>

        <html
          lang="en"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:v="urn:schemas-microsoft-com:vml"
        >
          <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <!--[if mso
              ]><xml
                ><o:OfficeDocumentSettings
                  ><o:PixelsPerInch>96</o:PixelsPerInch
                  ><o:AllowPNG /></o:OfficeDocumentSettings></xml
            ><![endif]-->
            <style>
              * {
                box-sizing: border-box;
              }

              body {
                margin: 0;
                padding: 0;
              }

              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
              }

              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
              }

              p {
                line-height: inherit;
              }

              .desktop_hide,
              .desktop_hide table {
                mso-hide: all;
                display: none;
                max-height: 0px;
                overflow: hidden;
              }

              .image_block img + div {
                display: none;
              }

              @media (max-width: 660px) {
                .social_block.desktop_hide .social-table {
                  display: inline-block !important;
                }

                .mobile_hide {
                  display: none;
                }

                .row-content {
                  width: 100% !important;
                }

                .stack .column {
                  width: 100%;
                  display: block;
                }

                .mobile_hide {
                  min-height: 0;
                  max-height: 0;
                  max-width: 0;
                  overflow: hidden;
                  font-size: 0px;
                }

                .desktop_hide,
                .desktop_hide table {
                  display: table !important;
                  max-height: none !important;
                }

                .row-1 .column-1 .block-1.image_block td.pad {
                  padding: 15px 0 5px !important;
                }

                .row-3 .column-1 .block-2.text_block td.pad {
                  padding: 20px !important;
                }
              }
            </style>
          </head>
          <body
            style="
              background-color: #f3f2f3;
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: none;
              text-size-adjust: none;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="nl-container"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #f3f2f3;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-1"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #fff;
                                color: #000;
                                width: 640px;
                                margin: 0 auto;
                              "
                              width="640"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      padding-top: 10px;
                                      vertical-align: middle;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="image_block block-1"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            width: 100%;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                        >
                                          <div
                                            align="left"
                                            class="alignment"
                                            style="line-height: 10px"
                                          >
                                            <a
                                              href="www.hivecareer.com"
                                              style="outline: none"
                                              tabindex="-1"
                                              target="_blank"
                                              ><img
                                                alt="Brand Logo"
                                                src="https://devapi.hivecareer.com/samruddhKishan/enquiry/uploads/emailImages/logo1234.png"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                  max-width: 180px;
                                                  width: 100%;
                                                "
                                                title="Brand Logo"
                                                width="180"
                                            /></a>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-2"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #f3f2f3;
                                color: #000;
                                width: 640px;
                                margin: 0 auto;
                              "
                              width="640"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <div
                                      class="spacer_block block-1"
                                      style="
                                        height: 1px;
                                        line-height: 1px;
                                        font-size: 1px;
                                      "
                                    >
        
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-3"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #fff;
                                background-image: url('https://devapi.hivecareer.com/samruddhKishan/enquiry/uploads/emailImages/bg-shade.jpg');
                                background-size: contain;
                                background-repeat: repeat;
                                color: #000;
                                width: 640px;
                                margin: 0 auto;
                              "
                              width="640"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      padding-top: 60px;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="paragraph_block block-1"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td class="pad">
                                          <div
                                            style="
                                              color: #49a760;
                                              direction: ltr;
                                              font-family: Helvetica Neue, Helvetica,
                                                Arial, sans-serif;
                                              font-size: 16px;
                                              font-weight: 400;
                                              letter-spacing: 0px;
                                              line-height: 120%;
                                              text-align: center;
                                              mso-line-height-alt: 19.2px;
                                            "
                                          >
                                            <p style="margin: 0">
                                              <strong>Welcome ${Enquiry.fullName} !</strong>
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="20"
                                      cellspacing="0"
                                      class="text_block block-2"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td class="pad">
                                          <div style="font-family: sans-serif">
                                            <div
                                              class=""
                                              style="
                                                font-size: 12px;
                                                text-align: center;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                                mso-line-height-alt: 14.399999999999999px;
                                                color: #1f4e3d;
                                                line-height: 1.2;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  mso-line-height-alt: 14.399999999999999px;
                                                "
                                              >
                                                <span style="font-size: 38px"
                                                  ><strong
                                                    >Thank you for Interest in Our
                                                    Product!</strong
                                                  ></span
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="text_block block-3"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-bottom: 40px;
                                            padding-left: 38px;
                                            padding-right: 38px;
                                            padding-top: 10px;
                                          "
                                        >
                                          <div style="font-family: sans-serif">
                                            <div
                                              class=""
                                              style="
                                                font-size: 12px;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                                mso-line-height-alt: 18px;
                                                color: #555555;
                                                line-height: 1.5;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  text-align: center;
                                                  mso-line-height-alt: 24px;
                                                "
                                              >
                                                <span
                                                  style="
                                                    font-size: 16px;
                                                    color: #2a272b;
                                                  "
                                                  >We truly appreciate your interest in
                                                  our products and the opportunity to
                                                  assist you. At SAMRUDDH KISHAN, we
                                                  are committed to providing top-notch
                                                  products and exceptional customer
                                                  service. Your inquiry is important to
                                                  us, and we are here to address any
                                                  questions or concerns you may have.<br /><br />Our
                                                  team is currently working diligently
                                                  to gather all the necessary
                                                  information you requested about
                                                  ${Enquiry.productName}. We aim to provide you
                                                  with comprehensive and timely answers
                                                  to ensure you have the details you
                                                  need to make an informed decision.<br
                                                /></span>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="image_block block-4"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td class="pad" style="width: 100%">
                                          <div
                                            align="center"
                                            class="alignment"
                                            style="line-height: 10px"
                                          >
                                            <img
                                              alt="Image"
                                              src="https://devapi.hivecareer.com/samruddhKishan/enquiry/uploads/emailImages/samrudh_graph.png"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                max-width: 640px;
                                                width: 100%;
                                              "
                                              title="Image"
                                              width="640"
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-4"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: transparent;
                      "
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                background-color: #fff;
                                color: #000;
                                width: 640px;
                                margin: 0 auto;
                              "
                              width="640"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      padding-bottom: 5px;
                                      padding-top: 5px;
                                      vertical-align: top;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="image_block block-1"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            padding-bottom: 10px;
                                            padding-top: 10px;
                                            width: 100%;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                        >
                                          <div
                                            align="center"
                                            class="alignment"
                                            style="line-height: 10px"
                                          >
                                            <img
                                              src="https://devapi.hivecareer.com/samruddhKishan/enquiry/uploads/emailImages/logo1234.png"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                max-width: 160px;
                                                width: 100%;
                                              "
                                              width="160"
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block block-2"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td class="pad">
                                          <div style="font-family: sans-serif">
                                            <div
                                              class=""
                                              style="
                                                font-size: 12px;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                                mso-line-height-alt: 14.399999999999999px;
                                                color: #555555;
                                                line-height: 1.2;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  font-size: 12px;
                                                  text-align: center;
                                                  mso-line-height-alt: 14.399999999999999px;
                                                "
                                              >
                                                <span style="color: #555555"
                                                  >Follow us on social media:</span
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="social_block block-3"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          class="pad"
                                          style="
                                            text-align: center;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                        >
                                          <div align="center" class="alignment">
                                            <table
                                              border="0"
                                              cellpadding="0"
                                              cellspacing="0"
                                              class="social-table"
                                              role="presentation"
                                              style="
                                                mso-table-lspace: 0pt;
                                                mso-table-rspace: 0pt;
                                                display: inline-block;
                                              "
                                              width="168px"
                                            >
                                              <tr>
                                                <td style="padding: 0 5px 0 5px">
                                                  <a
                                                    href="https://www.facebook.com/"
                                                    target="_blank"
                                                    ><img
                                                      alt="Facebook"
                                                      height="32"
                                                      src="https://devapi.hivecareer.com/samruddhKishan/enquiry/uploads/emailImages/facebook2x.png"
                                                      style="
                                                        display: block;
                                                        height: auto;
                                                        border: 0;
                                                      "
                                                      title="Facebook"
                                                      width="32"
                                                  /></a>
                                                </td>
                                                <td style="padding: 0 5px 0 5px">
                                                  <a
                                                    href="https://twitter.com/"
                                                    target="_blank"
                                                    ><img
                                                      alt="Twitter"
                                                      height="32"
                                                      src="https://devapi.hivecareer.com/samruddhKishan/enquiry/uploads/emailImages/twitter2x.png"
                                                      style="
                                                        display: block;
                                                        height: auto;
                                                        border: 0;
                                                      "
                                                      title="Twitter"
                                                      width="32"
                                                  /></a>
                                                </td>
                                                <td style="padding: 0 5px 0 5px">
                                                  <a
                                                    href="https://instagram.com/"
                                                    target="_blank"
                                                    ><img
                                                      alt="Instagram"
                                                      height="32"
                                                      src="https://devapi.hivecareer.com/samruddhKishan/enquiry/uploads/emailImages/instagram2x.png"
                                                      style="
                                                        display: block;
                                                        height: auto;
                                                        border: 0;
                                                      "
                                                      title="Instagram"
                                                      width="32"
                                                  /></a>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block block-4"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td class="pad">
                                          <div style="font-family: sans-serif">
                                            <div
                                              class=""
                                              style="
                                                font-size: 12px;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                                mso-line-height-alt: 14.399999999999999px;
                                                color: #c0c0c0;
                                                line-height: 1.2;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  font-size: 12px;
                                                  text-align: center;
                                                  mso-line-height-alt: 14.399999999999999px;
                                                "
                                              >
                                                <span style="color: #c0c0c0"
                                                  >*|LIST:COMPANY|* © All rights
                                                  reserved *|CURRENT_YEAR|*</span
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End -->
          </body>
        </html>

                `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.json({
        status: 200,
        data: Enquiry,
        message: "Enquiry Created Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Enquiry Not Created" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateEnquiry = async (req, res) => {
  try {
    const id = req.body.id;
    const UpdateEnquiry = {
      IId: req.body.IId,
      IName: req.body.IName,
      status: req.body.status,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      fullName: req.body.fullName,
      quantity: req.body.quantity,
      description: req.body.description,
      flag: req.body.flag,
    };
    const UpdateEnquirys = await knex("smk_enquiry")
      .update(UpdateEnquiry)
      .where({ id: req.body.id });
    console.log(UpdateEnquirys);
    if (UpdateEnquirys) {
      res.json({
        status: 200,
        data: UpdateEnquirys,
        message: "Update-Enquirys Updated Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Update-Enquiryss Not Updated",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteEnquiry = await knex("smk_enquiry").delete().where({ id });
    console.log(deleteEnquiry);
    if (deleteEnquiry) {
      res.json({
        status: 200,
        data: deleteEnquiry,
        message: "Delete-Enquiry Deleted Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Delete-Enquiry Not Deleted",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleEnquiry = await knex("smk_enquiry")
      .select("*")
      .where({ id });
    console.log(getSingleEnquiry);
    if (getSingleEnquiry.length > 0) {
      res.json({
        status: 200,
        data: getSingleEnquiry,
        message: "Enquiry Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Enquiry Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// module.exports.GetAllEnquiry = async (req, res) => {
//   try {
//     // const userId = req.body.userId;
//     const page = req.body.page; // Default to page 1 if not provided
//     const pageSize = req.body.pageSize; // Default page size of 10 if not provided
//     const totalCountQuery = knex("smk_enquiry").count("* as total");
//     const totalCountResult = await totalCountQuery.first();
//     const totalItems = parseInt(totalCountResult.total);

//     const getFarmerQuery = knex("smk_enquiry")
//       .select("*")
//       .orderBy("createdAt", "desc")
//       .limit(pageSize)
//       .offset((page - 1) * pageSize);
//     const getEnquiry = await getFarmerQuery;

//     if (getEnquiry) {
//       res.json({
//         status: 200,
//         data: getEnquiry,
//         currentPage: page,
//         pageSize: pageSize,
//         totalItems: totalItems,
//         message: "Enquiry Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Enquiry Not Get" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ status: 404, message: "Something Went Wrong !" });
//   }
// };

module.exports.GetAllEnquiry = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page; // Default to page 1 if not provided
    const pageSize = req.body.pageSize; // Default page size of 10 if not provided
    const flag = req.body.flag || "";
    const status = req.body.status || "";
    const IName = req.body.IName || "";
    const totalCountQuery = knex("smk_enquiry").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_enquiry")
      .select("*")
      .andWhere(function () {
        if (flag !== "") {
          this.where({ flag });
        }
      })
      .andWhere(function () {
        if (status !== "") {
          this.where({ status });
        }
      })
      .andWhere(function () {
        if (IName !== "") {
          this.where(function () {
            this.where("IName", "LIKE", `%${IName}%`);
          });
        }
      })
      .orderBy("createdAt", "desc")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getEnquiry = await getFarmerQuery;

    if (getEnquiry) {
      res.json({
        status: 200,
        data: getEnquiry,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Enquiry Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Enquiry Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};


module.exports.multiDeleteEnquiry = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteEnquiry = await knex("smk_enquiry").whereIn("id", ids).delete();
    if (deleteEnquiry) {
      res.json({
        status: 200,
        data: deleteEnquiry,
        message: "Enquiry Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateEnquiryStatus = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const status = req.body.status; // Assuming the new status value is provided in the request body
    const UpdateStatus = await knex("smk_enquiry")
      .whereIn("id", ids)
      .update({ status: status });
    if (UpdateStatus) {
      res.json({
        status: 200,
        data: UpdateStatus,
        message: "Enquiry-Status Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};