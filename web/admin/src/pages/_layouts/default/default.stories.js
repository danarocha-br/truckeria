import React from 'react';


import DefaultLayout  from './index';
import { PanelLeft, PanelRight, Header } from "../../../pages/_layouts/default/styles";
export default {
  title: 'Pages/Layouts',
};

export const Default = () => (
  <DefaultLayout>
    <PanelLeft>
      <Header>
        <h1>Panel Left goes here</h1>
        {/* <Button
          type="button"
          icon={FiPlus}
          action
          onClick={handleOpenModal}
        /> */}
      </Header>
    </PanelLeft>

    <PanelRight>
      <h3 style={{ padding: '24px 30px' }}>Right Panel goes here.</h3>
    </PanelRight>


  </DefaultLayout>);
