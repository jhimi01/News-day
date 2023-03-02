let fetchdata = [];

const fetchcategory = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displaycategory(data.data.news_category));
};

// got all nav links
const displaycategory = (menus) => {
  let categoriescontainer = document.getElementById("categories-container");
  menus.forEach((arrmenu) => {
    let p = document.createElement("p");
    p.innerHTML = `<a class="nav-link" onclick="fetchcategoryid('${arrmenu.category_id}', '${arrmenu.category_name}')" >${arrmenu.category_name}</a>`;
    categoriescontainer.appendChild(p);
  });
};

// got category_id
const fetchcategoryid = (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
    fetchdata=data.data, category_name;
    itemshow(data.data, category_name)});
    
};

const itemshow = (data, category_name) => {
  document.getElementById("item-news").innerText = data.length;
  document.getElementById("new-section").innerText = `${category_name}`;

  let container = document.getElementById("all-news");
  container.innerHTML = "";
  data.forEach((allnews) => {
    const { _id, image_url, title, details, author, total_view, rating } =
      allnews;
    // console.log(allnews)
    container.innerHTML += `
    <div class="card mb-3" ">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${image_url}" class="img-fluid h-100" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${details.slice(0, 300)}...</p>
        <hr>
        <div class="card-text d-flex align-items-center justify-content-around">
        
      <div class="fs-6 d-flex align-items-center justify-content-around">
      <img  height="40px" width="40px" style="border-radius: 50%;" src="${
        allnews.author.img
      }" alt="">
     <div> <h6 class="mb-0">${author.name}</h6>
     <p class="text-black-50 mb-0">${author.published_date}</p>
     </div>
    </div>
        <small class="text-muted">ratings : ${rating.badge}</small>
        <small class="text-muted">number : ${rating.number}</small>
        <small class="text-muted">total view : ${
          total_view ? total_view : 0
        }</small>
        <button onclick="detail('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
      </svg></button>
        </div>
      </div>
    </div>
  </div>
</div>
    `;
  });
};

const detail = (newsid) => {
  const url = `https://openapi.programming-hero.com/api/news/${newsid}`;
  //    console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => shownewsdetail(data.data));
};

const shownewsdetail = (newsid) => {
  // console.log(newsid);
  newsid.forEach((itemsdetail) => {
    console.log(itemsdetail);
    document.getElementById("exampleModalLabel").innerText = itemsdetail.title;
    document.getElementById(
      "modall-title"
    ).innerHTML += `${itemsdetail.title} `;
    document.getElementById(
      "modal-img"
    ).innerHTML = `<img class="w-100" src="${itemsdetail.image_url}" alt="">`;
    document.getElementById(
      "modal-body"
    ).innerHTML += `<p class="text-black-50 mb-0">${itemsdetail.details}</p>`;
    document.getElementById("badge").innerHTML = `${
      itemsdetail.others_info.is_trending ? "Trending" : ""
    }`;
  });
};



// trending button
const showtodayspick = () =>{
  let trendingnews = fetchdata.filter(data => data.others_info.is_todays_pick === true); 
  const category_name = document.getElementById('new-section').innerText;
  itemshow(trendingnews, category_name);
}
// todays pick button
const showtrending = () =>{
  let trendingnews = fetchdata.filter(data => data.others_info.is_trending === true); 
  const category_name = document.getElementById('new-section').innerText;
  itemshow(trendingnews, category_name);
}

// fetchcategory()
