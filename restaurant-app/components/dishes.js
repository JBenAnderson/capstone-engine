import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { useState, useContext } from "react";
import AppContext from "./context";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
function Dishes({ restId }) {
  const [restaurantID, setRestaurantID] = useState();
  const { addItem } = useContext(AppContext);

  const GET_RESTAURANT_DISHES = gql`
    query ($id: ID!) {
      restaurant(id: $id) {
        id
        name
        dishes {
          id
          name
          description
          price
          image {
            url
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
    variables: { id: restId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR here</p>;
  if (!data) return <p>Not found</p>;

  let restaurant = data.restaurant;

  if (restId > 0) {
    return (
      <>
        {restaurant.dishes.map((res) => (
          <Card
            style={{ margin: "0 0.5rem 10px 0.5rem", padding: "0" }}
            className="dishCard"
          >
            <CardImg top={true} src={`http://localhost:1337${res.image.url}`} />
            <CardBody>
              <CardTitle>
                <a>
                  <h6>{res.name}</h6>
                </a>
              </CardTitle>
              <CardText>
                <small>{res.description}</small>
              </CardText>
            </CardBody>
            <div className="card-footer">
              <Button
                color="info"
                outline
                color="primary"
                onClick={() => addItem(res)}
              >
                + Add To Cart
              </Button>
            </div>
          </Card>
        ))}
      </>
    );
  } else {
    return (
      <a>
        <h1>...</h1>
      </a>
    );
  }
}
export default Dishes;
