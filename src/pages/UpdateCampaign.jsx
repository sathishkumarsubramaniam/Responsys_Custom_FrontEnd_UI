import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

import store from "../store/index.js";
import { getCampaign } from "../store/entities.js";

import FormInput from "../components/common/FormInput.jsx";
import PageWrapper from "../components/common/PageWrapper.jsx";
import BoxedContent from "../components/common/BoxedContent.jsx";
import { defaultUpdateCampaignInput, checkTokenExist } from "../js/utils.js";

const UpdateCampaign = () => {
  const navigate = useNavigate();

  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleSelections, setSingleSelections] = useState(
    defaultUpdateCampaignInput
  );

  useEffect(() => {
    const tkn = checkTokenExist();
    if (!tkn) {
      navigate("/");
    }
  }, [navigate]);

  const handleSearch = async (query) => {
    setIsLoading(true);

    if (query.length < 50 && query.length >= 3) {
      const res = await store.dispatch(getCampaign(query));

      if (
        res.meta.requestStatus === "fulfilled" &&
        res.payload.campaigns !== undefined
      ) {
        setCampaigns(res.payload.campaigns);
        setIsLoading(false);
      }
    }
  };
  const handleOnChange = (val) =>
    val.length > 0
      ? setSingleSelections(val)
      : setSingleSelections(defaultUpdateCampaignInput);

  const handleOnSave = (e) => {
    e.preventDefault();
    toast.success("Campaign Updated");
  };

  return (
    <PageWrapper>
      <Row>
        <Col md={12}>
          <BoxedContent title="Search Campaign">
            <AsyncTypeahead
              minLength={3}
              labelKey="name"
              options={campaigns}
              filterBy={() => true}
              isLoading={isLoading}
              onSearch={handleSearch}
              id="async_campaign_search"
              name="async_campaign_search"
              onChange={handleOnChange}
              searchText="Searching Campaigns..."
              emptyLabel="No more campaigns found"
              placeholder="Search for a Campaign..."
              renderMenuItemChildren={(option) => (
                <label
                  htmlFor="async_campaign_search"
                  className="text-primary font-bold m-t-xs"
                >
                  {option.name}
                </label>
              )}
            />
          </BoxedContent>
        </Col>
        <Col md={12}>
          <BoxedContent title="Update Campaign Details">
            <Form
              autoComplete="off"
              id="updateCampaignForm"
              onSubmit={handleOnSave}
            >
              <Row>
                <Col md={6}>
                  <FormInput
                    type="text"
                    id="description"
                    onChange={() => {}}
                    label="Description"
                    value={singleSelections[0].description}
                  />
                </Col>
                <Col md={6}>
                  <FormInput
                    type="text"
                    id="Subject"
                    onChange={() => {}}
                    label="Email Subject"
                    value={singleSelections[0].subject}
                  />
                </Col>
                <Col md={6}>
                  <FormInput
                    type="text"
                    onChange={() => {}}
                    id="External Campaign Code"
                    label="External Campaign Code"
                    value={singleSelections[0].externalCampaignCode}
                  />
                </Col>
                <Col md={6}>
                  <FormInput
                    type="file"
                    accept=".csv"
                    id="linkTable"
                    label="Link Table File .csv"
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
                    Update Campaign
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

export default UpdateCampaign;
