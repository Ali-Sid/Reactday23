import useFetchData from "./useFetchData";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button
} from "@mui/material";

export default function MyComponent() {
  const { data, loading, error } = useFetchData(
    "https://newsapi.org/v2/top-headlines?country=in&apiKey=14b1ace4ef6640caaa6fd0b58b63ff47"
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleLink = (url) => {
    window.open(url, '_blank')
  }
  return (
    <>
      <Grid container spacing={3} style={{padding: '100px'}}>
        {Array.isArray(data) ? (
          data.map((item) => (
            <Grid item xs={10} sm={6} md={4} key={item.url}>
              <Card style={{backgroundColor: '#333030', color: '#e0e1e1'}}>
                <CardActionArea onClick={() => handleLink(item.url)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.urlToImage}
                    alt={item.title}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleLink(item.url)}>
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <div>No data available</div>
        )}
      </Grid>
    </>
  );
}
