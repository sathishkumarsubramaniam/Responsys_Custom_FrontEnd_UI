import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

import store from "../store/index.js";
import {
  createCampaign,
  loadTemplates,
  createClFolder,
  copyClDoc,
  createLinkTable,
  mergeLinkTable,
} from "../store/entities.js";

import FormInput from "../components/common/FormInput.jsx";
import FormSelect from "../components/common/FormSelect.jsx";
import PageWrapper from "../components/common/PageWrapper.jsx";
import BoxedContent from "../components/common/BoxedContent.jsx";
import {
  campaignInput,
  businessUnits,
  linkTableInput,
  checkTokenExist,
} from "../js/utils.js";

const CreateCampaign = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [formInputs, setFormInputs] = useState(campaignInput);
  const [linkTableData, setLinkTableData] = useState(linkTableInput);

  const buttonStatus = document.getElementById("formButton");

  useEffect(() => {
    const tkn = checkTokenExist();
    if (!tkn) {
      navigate("/");
    } else {
      loadEmailTemplates();
    }
  }, [navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      toast.dismiss();
      loadEmailTemplates();
      toast.info("Fetching updates...");
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const loadEmailTemplates = async () => {
    const templatesArr = [];
    await store.dispatch(loadTemplates());
    const templateData = store.getState().entities.emailTemplates;
    templateData.map((template) =>
      templatesArr.push({
        label: template.documentPath.slice(31),
        value: template.documentPath,
      })
    );
    setTemplates(templatesArr);
  };

  const handleOnSave = async (e) => {
    e.preventDefault();

    const inputPayload = {
      ...formInputs,
      name: e.target.name.value,
      subject: e.target.subject.value,
      description: e.target.description.value || "",
      externalCampaignCode: e.target.externalCampaignCode.value || "",
      linkTablePath: `RPA/${e.target.name.value}_LT`,
      htmlMessagePath: `/contentlibrary/rpa/${
        e.target.name.value
      }/${formInputs.htmlMessagePath.slice(31)}`,
    };

    buttonStatus.disabled = true;

    toast.dismiss();
    const notify = toast.loading("Creating Campaign...");

    const clFolder = {
      folderPath: `/contentlibrary/rpa/${inputPayload.name}`,
    };

    const moveClDoc = {
      destinationPath: `/contentlibrary/rpa/${
        inputPayload.name
      }/${formInputs.htmlMessagePath.slice(31)}`,
      sourcePath: { documentPath: formInputs.htmlMessagePath },
    };

    const linkTableInputData = inputPayload.name;
    const mergeLTInputData = {
      name: inputPayload.name,
      records: linkTableData,
    };
    // const deleteClDoc = formInputs.htmlMessagePath;

    const clFolderCreation = () => store.dispatch(createClFolder(clFolder));
    const clDocCopy = () => store.dispatch(copyClDoc(moveClDoc));
    const ltCreation = () =>
      store.dispatch(createLinkTable(linkTableInputData));
    const mergeLTData = () => store.dispatch(mergeLinkTable(mergeLTInputData));
    const campaignCreation = () => store.dispatch(createCampaign(inputPayload));

    const updateCampaignStatus = (status, message) => {
      toast.update(notify, {
        render: message,
        type: status === "fulfilled" ? "success" : "error",
        isLoading: false,
        autoClose: 2500,
        closeButton: true,
        draggable: true,
      });

      if (status === "fulfilled") {
        setFormInputs(campaignInput);
        e.target.reset();
      }

      buttonStatus.disabled = false;
    };

    const dispatchAction = (action) => store.dispatch(action);

    const makeRequest = async () => {
      const actionsArray = [
        clFolderCreation,
        clDocCopy,
        ltCreation,
        mergeLTData,
        campaignCreation,
      ];

      for (let i = 0; i < actionsArray.length; i++) {
        const req = await dispatchAction(actionsArray[i]);
        const res = req.meta.requestStatus;
        if (res === "fulfilled") {
          if (i + 1 === actionsArray.length) {
            updateCampaignStatus(res, "Campaign Created");
          }
          continue;
        } else if (res === "rejected") {
          updateCampaignStatus(res, req.payload);
          break;
        }
      }
    };

    makeRequest();
  };

  const handleFileInput = ({ target }) => {
    if (target.files.length > 0) {
      const arr = [];
      const input = target.files[0];
      const reader = new FileReader();
      reader.readAsText(input);
      reader.onload = function (event) {
        const csvData = event.target.result;
        const data = csvData.split("\n");
        for (let i = 0; i < data.length; i++) {
          const res = data[i].split(",");
          res.splice(1, 1);
          if (res[1] === "unsub" || res[1] === "Help") {
            res[1] = "";
          }
          data[i] !== "" && arr.push(res);
        }
      };
      setLinkTableData({
        recordData: { ...linkTableData.recordData, records: arr },
      });
    }
  };

  const handleBUChange = (e) => {
    const val = e.target.value !== "" ? true : false;
    return val;
  };

  const handleEmailTemplateChange = ({ target }) => {
    const val = target.value.slice(31);
    setFormInputs({
      ...formInputs,
      name: val.substring(0, val.length - 4),
      htmlMessagePath: target.value,
    });
  };

  return (
    <PageWrapper>
      <Row>
        <Col md={12}>
          <BoxedContent title="New EMD Campaign - Automated Form">
            <Form
              autoComplete="off"
              id="addCampaignForm"
              onSubmit={handleOnSave}
            >
              <Row>
                <Col md={7}>
                  <FormSelect
                    required
                    id="template"
                    options={templates}
                    label="Email Template"
                    onChange={handleEmailTemplateChange}
                  />
                </Col>
                <Col md={5}>
                  <FormInput
                    required
                    type="text"
                    id="subject"
                    label="Email Subject"
                  />
                </Col>
                <Col md={7}>
                  <FormInput
                    required
                    id="name"
                    type="text"
                    onChange={(e) =>
                      setFormInputs({
                        ...formInputs,
                        name: e.currentTarget.value,
                      })
                    }
                    label="Campaign Name"
                    value={formInputs.name}
                  />
                </Col>
                <Col md={5}>
                  <FormInput type="text" id="description" label="Description" />
                </Col>
                <Col md={4}>
                  <FormInput
                    type="text"
                    id="externalCampaignCode"
                    label="External Campaign Code"
                  />
                </Col>
                <Col md={3}>
                  <FormSelect
                    required
                    label="BU Team"
                    id="businessUnit"
                    options={businessUnits}
                    onChange={handleBUChange}
                  />
                </Col>
                <Col md={5}>
                  <FormInput
                    required
                    type="file"
                    accept=".csv"
                    id="linkTable"
                    label="Link Table File .csv"
                    onChange={handleFileInput}
                  />
                </Col>
              </Row>
              <Row>
                <hr className="m-t-sm" />
                <Col>
                  <Button
                    size="md"
                    type="submit"
                    id="formButton"
                    variant="primary"
                    className="btn btn-outline "
                  >
                    Create Campaign
                  </Button>
                </Col>
              </Row>
            </Form>
          </BoxedContent>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default CreateCampaign;
