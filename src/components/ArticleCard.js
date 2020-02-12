import React, { useContext, useState } from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { useSpring, animated } from "react-spring";
// import { CartContext } from "../App";

export default function ArticleCard({ data }) {
    // const { addToCart } = useContext(CartContext);
    const [anim, setAnim] = useState(false);
    const props = useSpring({ to: { x: anim ? 0 : 1 } });
  
    function handleAddToCart(data) {
      setAnim(!anim);
      // addToCart(data);
    }
  
  return (
    <>
    <Card  style={{ height: "100%" }}>
      <Image src={data.image} wrapped ui={false} style={{ width: 120 }} />
      <Card.Content>
        <Card.Header>{data.title}</Card.Header>
        <Card.Meta>
          <span className="date">publié en {data.year}</span>
        </Card.Meta>
        <Card.Description></Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div class="ui three column grid">
          <div class="column">
            <div class="ui segment">
              <img alt="" src=""></img>
            </div>
            <div class="ui labeled button" tabindex="0">
              <div class="ui button">
                <i class="heart icon"></i> Like
              </div>
              <a class="ui basic label">
                2,048
              </a>
            </div>
            <div class="ui left labeled button" tabindex="0">
              <a class="ui basic right pointing label">
                2,048
              </a>
              <div class="ui button">
                <i class="heart icon"></i> Comment
              </div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
    </>
  );
}