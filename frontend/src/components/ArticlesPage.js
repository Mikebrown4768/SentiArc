import axios from 'axios';
import { useLocation } from "react-router-dom";
import AppNavbar from './AppNavbar'
import React, { useState, useEffect } from 'react';
import ArticleCard from './ArticleCard';

function ArticlesPage() {
    const [dataReturned, setDataReturned] = useState(false);
    const [listOfArticles, setListOfArticles] = useState([]);
    const location = useLocation();
    const companyName = location.state.companyName;
    useEffect(() => {
      getData(companyName);
    }, []);

    async function getData(input) {
      const response = await axios({method: "GET", url:"/article/", params: { requestType: "articles", companyName: input }});
      var convertedArticles = convertData(response.data)
      // Should give each element a unique "key" prop
      const listOfArticleCards = convertedArticles.map((element, index) =>
      <ArticleCard key={index} title={element.title} author={element.author} time={element.time} fullLink={element.completeLink} imgSource = {element.imgSource}/>)
      setListOfArticles(listOfArticleCards);
      console.log(listOfArticleCards);
      setDataReturned(true);
    }
    
    function convertData(data) {
        var parsed = JSON.parse(data);
        return parsed  
    }
    
    return (
      <div>
      <AppNavbar companyName = {companyName} />
        <div className="ArticlesPage">
          <h2 class="pagesHeader">Top articles about {companyName}</h2>
          <header className="App-header">
          {!dataReturned && <p>loading...</p>}
          {dataReturned && listOfArticles}
          </header>
        </div>
        </div>
    );
  }



// function getData(input) {
//   axios({
//       method: "GET",
//       url:"/article/",
//       params: {
//           companyName: input
//       }
//     }).then((response)=>{
//       const data = response.data
//       const convertedData = convertData(data)
//       return convertedData;       
//     }).catch((error) => {
//       if (error.response) {
//         console.log(error.response);
//         console.log(error.response.status);
//         console.log(error.response.headers);
//         }
//     })}

  // function PostSubmitPage(props) {
  //   const [data, setData] = useState([]);
  //   const location = useLocation();
  //   const companyName = location.state.companyName;
  //   useEffect(() => {
  //     console.log("I fire once");
  //     getData(companyName);
  //   }, []);

  export default ArticlesPage;
