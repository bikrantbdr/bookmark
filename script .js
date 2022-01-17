function Book(title, author,genre,pages,read) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
}
let myLibrary=[];
let booksLocal= JSON.parse(localStorage.getItem("books") || "[]");
if(booksLocal.length===0){
    const bookobj1 = new Book ("My love story", " Bikrant Bidari", "Fiction",42,1);
    myLibrary=[bookobj1];
    localStorage.setItem("books", JSON.stringify(myLibrary));
}
else{
    myLibrary= booksLocal.map(a => {return {...a}});
    // console.log(myLibrary);
}

//add a single card
function addcard(i){
    let cardContainer = document.querySelector(".cardContainer");
    let cards= document.createElement("div");
        cards.classList.add("card");
        cards.setAttribute("id",`${i}`);
        cardContainer.appendChild(cards);
        //cancel cards
        let cancelCardsButton =document.createElement("img");
        cancelCardsButton.src="img/blackCross.png";
        //title
        let title= document.createElement("div");
        title.classList.add("title");
        title.innerText= `${capitalize(myLibrary[i].title)}`;

        //author
        let author= document.createElement("div");
        author.classList.add("author");
        author.innerText= `By:\u00A0\u00A0\u00A0\u00A0${capitalize(myLibrary[i].author)}`;
        //genre
        let genre= document.createElement("div");
        genre.classList.add("genre");
        genre.innerText= `Genre: \u00A0\u00A0\u00A0\u00A0${capitalize(myLibrary[i].genre)}`;
        //page
        let page= document.createElement("div");
        page.classList.add("page");
        page.innerText= `Pages: \u00A0\u00A0\u00A0\u00A0${myLibrary[i].pages}`;


        cards.appendChild(cancelCardsButton);
        cards.appendChild(title);
        cards.appendChild(author);
        cards.appendChild(genre);
        cards.appendChild(page);
}

//default cards are added
for(i=0;i<myLibrary.length;i++){
    addcard(i);
}

updateBookLog();

//to capitalize first letter of each word
function capitalize(word) {
    return word.toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
};

//overlay display function
let addCardButton = document.querySelector(".add");
let overlay =document.querySelector(".overlay");
addCardButton.addEventListener("click", function(){
    overlay.style.display="block";
});

//overlay cancel function
let cancel = document.querySelector(".cancel");
cancel.addEventListener("click", function(){
    overlay.style.display="none";
});

//get data from form
let submit = document.querySelector(".submit");
submit.addEventListener("click", function(){
    let title = document.getElementById("formTitle").value;
    let author = document.getElementById("formAuthor").value;
    let genre = document.getElementById("formGenre").value;
    let pages = document.getElementById("formPage").value;
    let read = document.getElementById("status").value;
    if(title!=="" &&author!=="" &&genre!=="" &&pages!==""){
        myLibrary.push(new Book(title, author,genre, pages, read));
        document.querySelectorAll("input").forEach(function(element) {
        element.value = '';
        });
        console.log(myLibrary[myLibrary.length-1]);
    }
    overlay.style.display="none";

    //now add that card to dom
    addcard(myLibrary.length-1);
    localStorage.clear();
    localStorage.setItem("books", JSON.stringify(myLibrary));

    updateBookLog();
});

// delete a card
let deleteCard = document.querySelectorAll("div.card>img");
deleteCard.forEach(eachimg=>{
    eachimg.addEventListener("click", function(e){
        e.target.parentNode.remove();
        if(myLibrary.length!=1){
            console.log(e.target.parentNode.className)
            myLibrary.splice(e.target.parentNode.id, 1);
        }
        else{
            myLibrary=[];
        }

        //delete in local storage
        localStorage.clear();
        localStorage.setItem("books", JSON.stringify(myLibrary));
        console.log(myLibrary);
        updateBookLog();
    });
})

//book log
function updateBookLog(){
    let noOfBook =document.querySelector(".totalBookCount");
    noOfBook.innerText=`${myLibrary.length}`;
    let read=0;
    let readCount =document.querySelector(".readCount");
    for(i=0;i<myLibrary.length;i++){
        if(myLibrary[i].read==1)
        read++;
    }
    readCount.innerText=`${read}`;
    let unreadCount =document.querySelector(".unreadCount");
    unreadCount.innerText=`${myLibrary.length-read}`;
}




