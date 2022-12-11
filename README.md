# 520-Project-Simonelli-Agluba-FernandezCortez

## Project Topic

For the Project we are going to work with the Steam Web API 

## Dataset

For the Dataset we are going to use a csv file from kaggle containing Steam app ids and their genres, plus a dataset we will build containing total positive and negative reviews by genre (by querying the Steam Web API).

Then, on the website, using the steam id of the "highest" reviewed game, we will query the Web API directly to get additional information such as the game's image, title, etc. There are more than 10k Steam games, therefore we will only use the first 10k games fom the kaggle dataset.

## Data Visualization

We plan to display the data in a Column chart which will contain a ratio of the positive and negative reviews sorted by genre tags of all games associated with those genre tags. Additionally, when any column is clicked, more information on the most positively or negatively reviewed game will appear depending on the column's review type. 

## Analyse Performance

- The website loads 2 times faster when it is cached 
- The render time on the website takes a little less time when cached
- when loading this on a mobile device it ends up getting a poor performance of 46, but on a Desktop it gets a performance of 90
- When in the network tab we see that the thing that is being cached in the memory is the plotly graph which help loads the website a lot
- The DomContentLoaded loads after 803ms
- The First Contentful Paint and largest Content Paint both load afer 0.97s which is pretty good for a website's time to load these contents
- While going through the performance insight I see that we get a lot of forced style recalculation, and a little bit of forced layout and long task
