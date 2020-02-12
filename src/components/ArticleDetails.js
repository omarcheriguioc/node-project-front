import React, {useEffect,  useState} from "react";
import axios from "axios";
import _ from 'lodash';
import  { Component, createRef } from 'react';
import {Checkbox, Grid, Header, Image, Container, Rail, Ref, Segment, Sticky, } from 'semantic-ui-react';

export default function ArticleDetails() {
  const [Articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/articles").then(res => {
      const Articles = res.data;
      setArticles(Articles);
      console.log(Articles);
      
    });
  }, []);
  console.log(Articles["1"].content)
return (
  <Container>
    <p>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
      dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
      viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
      Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
    </p>
  </Container>
)
}
  