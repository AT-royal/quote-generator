const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterbtn= document.getElementById('twitter');
const newQuotebtn= document.getElementById('new-quote');
const loader= document.getElementById('loader');
let apiQuotes=[];
// Show Loading
function loading(){
  loader.hidden= false;
  quoteContainer.hidden=true;
}
//hide LOading
function complete(){
  quoteContainer.hidden=false;
  loader.hidden= true;
}
//show new Quote
function newQuote(){
  loading();
    //pick a random quote from apiQuotes array
    const quote= apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   //check if the Author field is blank and replace it with 'Unknown'
    if(!quote.author){
      authorText.textContent='Unknown';
    }
    else{
      authorText.textContent=quote.author;
    }
    //check Quote length to determine styling
    if(quote.text.length > 120){
      quoteText.classList.add('long-quote');
    }
    else{
       quoteText.classList.remove('long-quote');
    }
    //Set Quote, Hide Loader
   quoteText.textContent=quote.text;
   complete();
    

}
//Get Quotes From API
async function getQuotes(){
  loading();
 const apiUrl="https://type.fit/api/quotes";
   try{
     const response =await fetch(apiUrl);
     apiQuotes=await response.json();
     newQuote();
    }
    catch(error){
    //Catch Error Here
    }

}
//Tweet Quote
function tweetQuote(){
  const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`  ;
  window.open(twitterUrl, '_blank');
}
newQuotebtn.addEventListener('click',newQuote);
twitterbtn.addEventListener('click',tweetQuote);
//On Load
getQuotes();
