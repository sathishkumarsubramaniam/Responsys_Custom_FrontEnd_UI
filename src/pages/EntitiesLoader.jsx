import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import store from "../store/index.js";
import {
  loadCampaigns,
  loadLists,
  loadSuppData,
  loadFilters,
  loadFolders,
  loadTemplates,
} from "../store/entities.js";

import Footer from "../components/common/Footer.jsx";
import BoxedContent from "../components/common/BoxedContent.jsx";
import ProgressBarComp from "../components/common/ProgressBarComp.jsx";

function EntitiesLoader() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntities = async () => {
      const actions = [
        loadCampaigns,
        loadLists,
        loadSuppData,
        loadFilters,
        loadFolders,
        loadTemplates,
      ];
      const promise = await Promise.all(
        actions.map((action) => store.dispatch(action()))
      );

      Promise.allSettled([promise]).then(() => navigate("/actions"));
    };
    fetchEntities();
  }, [navigate]);

  return (
    <div className="loginColumns">
      <Row>
        <Col md={12}>
          <BoxedContent title="Application Entities">
            <ProgressBarComp label={"Loading App Data"} />
          </BoxedContent>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

export default EntitiesLoader;
