import { gql, useQuery } from "@apollo/client";
import Dishes from "./dishes";
import { useContext, useState } from "react";
import AppContext from "./context";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/Link";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";

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
  NavItem,
} from "reactstrap";
import { render } from "react-dom";

function RestaurantList(props) {
  const [restaurantID, setRestaurantID] = useState(0);
  const { cart } = useContext(AppContext);
  const [state, setState] = useState(cart);
  const [searchField, setSearchField] = useState("");

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
        style={{ margin: "0 0.5rem 10px 0.5rem", padding: 0, marginLeft: 23 }}
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
          <Button
            color="info"
            onClick={() => {
              setRestaurantID(res.id);

              //grab handle on search field to place (res.name) inside input.
              let search = document.querySelector(
                "#__next > div > div > div.search > div > input"
              );

              //safely trigger react re-render through window.HTMLInputElement and create input event
              // that applies restaurant name to search for easier dish viewing.

              var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              ).set;
              nativeInputValueSetter.call(search, res.name);

              var inputEvent = new Event("input", { bubbles: true });
              search.dispatchEvent(inputEvent);
            }}
          >
            {res.name}
          </Button>
        </div>
      </Card>
    ));

    return (
      <Container className="container-fluid" id="container-fluid">
        <Col xs="6" sm="12" className="column" id="column">
          <Row xs="6" sm="6" className="rowRestaurant" id="rowRestaurant">
            {restList}
          </Row>

          <Row xs="6" sm="4" className="rowDish" id="rowDish">
            {renderDishes(restaurantID)}
          </Row>
        </Col>
      </Container>
    );
  } else {
    return <h1> No Restaurants Found</h1>;
  }
}
export default RestaurantList;
