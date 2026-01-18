import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../components/layout/NavBar';
import Sidebar from '../components/layout/Sidebar';
import RecentViewedBody from '../components/features/RecentVisit/RecentVisitBody';

const RecentVisit = () => {
  return (
    <>
    <NavBar />
    <Container fluid>
        
    
      <Row>
        {/* Left Sidebar Column - Hidden on small screens if you want responsive behavior */}
        <Col md={3} lg={2} className="p-0 border-end min-vh-100 d-none d-md-block">
          <Sidebar />
        </Col>

        {/* Main Content Column */}
        <Col xs={12} md={9} lg={10} className="p-4">
          <RecentViewedBody />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default RecentVisit;