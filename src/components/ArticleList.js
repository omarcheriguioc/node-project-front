import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Article from "./ArticleCard";
import { Segment, Grid } from 'semantic-ui-react';

export default function ArticleList() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(URL+'/products').then(res => {
            const articles = res.data;
            setArticles(articles);
          });
    }, []);

    return (
        <> 
            <h3>Articles</h3>
                {articles.length === 0 ? (
                    <div>loading...</div>
                ) : (
                    <div>
                        <Grid columns={3} doubling stackable>
                            {articles.map(b => (
                                <Grid.Column key={b.id}>
                                    <Segment style={{ height: "26em" }}>
                                        <Article data={b} />
                                    </Segment>
                                </Grid.Column>
                            ))}
                        </Grid>
                    </div>
                )}
                
        </>
    );
}
