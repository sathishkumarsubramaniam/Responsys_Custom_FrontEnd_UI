import React, { Fragment } from "react";
import MetisMenu from "@metismenu/react";
import { NavLink } from "react-router-dom";

import "metismenujs/style";

const SideBarNav = () => {
  return (
    <Fragment>
      <MetisMenu>
        <strong className="p-lg">Navigation Menu</strong>
        <hr className="hr-line-solid" />
        <li>
          <NavLink to="/createCampaign" className="font-bold">
            Create Campaign
          </NavLink>
        </li>
        <li>
          <NavLink to="/updateCampaign" className="font-bold">
            Update Campaign
          </NavLink>
        </li>
      </MetisMenu>
    </Fragment>
  );
};

export default SideBarNav;
