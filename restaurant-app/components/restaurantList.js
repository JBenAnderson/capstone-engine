import { gql, useQuery } from "@apollo/client";
import Dishes from "./dishes";
import { useContext, useState } from "react";
import AppContext from "./context";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0);
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart);
  const carouselList = [];
  const GET_RESTAURANTS = gql`
    query {
      restaurants {
        id
        name
        description
        image {
          url
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  console.log(`Query Data: ${data.restaurants}`);

  let searchQuery = data.restaurants.filter((res) => {
    return res.name.toLowerCase().includes(props.search);
  });

  let restId = searchQuery[0].id;

  // define renderer for Dishes
  const renderDishes = (restaurantID) => {
    return <Dishes restId={restaurantID}> </Dishes>;
  };

  //Card mapping that takes strapi info and matches it with a bootstrap card.
  if (searchQuery.length > 0) {
    const restList = searchQuery.map((res) => (
      <Card
        style={{ margin: "0 0.5rem 20px 0.5rem", padding: 0 }}
        className="card"
        key={res.id}
      >
        <CardImg
          top={true}
          src={`http://localhost:1337` + res.image.url}
          className="img-fluid"
          alt="Responsive image"
        />
        <CardBody>
          <CardText>{res.description}</CardText>
        </CardBody>
        <div className="card-footer">
          <Button color="info" onClick={() => setRestaurantID(res.id)}>
            {res.name}
          </Button>
        </div>
      </Card>
    ));

    return (
      <Container>
        <Container className="container-fluid" id="container-fluid">
          <Col xs="6" sm="10" className="column" id="column">
            <Row xs="6" sm="4" className="row" id="row" style={{ padding: 20 }}>
              {restList}
            </Row>
            <Row sm="3">{renderDishes(restaurantID)}</Row>
          </Col>
        </Container>
      </Container>
    );
  } else {
    return <h1> No Restaurants Found</h1>;
  }
}
export default RestaurantList;
