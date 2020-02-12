import React, { useState, useEffect } from "react";
import axios from "axios";
import {URL} from '../settings/settings';
import { Button, Icon, Grid, Segment, Image } from "semantic-ui-react";

export default function HomeVisitor() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
      const config = {
        "Content-Type": "application/json"
      };
      axios
        .get(URL+"/articles", config)
          .then(res => {
            console.log("res.data", res.data);
            setArticles(...articles,res.data);
          })
          .catch(err => console.error(err));
    }, []);
  
    return (
    <>
        <h2> Liste des articles </h2>
        {articles.length === 0 ? (
        <div>loading...</div>
        ) : (
            <div>
                <Grid columns={3} doubling stackable>
                    {articles.map(a => (
                        <Grid.Column key={a._id} /*onClick = {e => ArticleDetails(a._id)}*/>
                            <title as='h3' dividing='true'>
                            {a.title}
                            </title>
                            
                            <Segment style={{ height: "26em" }}>
                                <Image src={a.image_path} />
                            </Segment>
                            <div className="ui labeled button" tabIndex="0">
                                <div className="ui button">
                                    <i className="heart icon"></i> Like
                                </div>
                                <a className="ui basic label">
                                    2,048
                                </a>
                                </div>
                                <div className="ui left labeled button" tabIndex="0">
                                <a className="ui basic right pointing label">
                                    2,048
                                </a>
                                <div className="ui button">
                                    <i className="heart icon"></i> Comment
                                </div>
                                </div>
                        </Grid.Column>
                    ))}
                </Grid>
            </div>
            )}
      </>
    );
  }
  