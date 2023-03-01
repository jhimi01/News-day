const fetchcategory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displaycategory(data.data.news_category))
}

// got all nav links
const displaycategory = (menus) => {
let categoriescontainer = document.getElementById('categories-container');
menus.forEach(arrmenu => {
    let p = document.createElement('p');
    p.innerHTML = `<a class="nav-link" onclick="fetchcategoryid('${arrmenu.category_id}', '${arrmenu.category_name}')" >${arrmenu.category_name}</a>`;
    categoriescontainer.appendChild(p);
});
}

// got category_id
const fetchcategoryid = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => itemshow(data.data, category_name))
};

const itemshow = (data, category_name) => {
   document.getElementById('item-news').innerText = data.length;
   document.getElementById('new-section').innerText = `${category_name}`;


   let container = document.getElementById('all-news');
   data.forEach(allnews => {
    console.log(allnews)
    container.innerHTML += `
    <div class="card mb-3" style="width: 100%;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${allnews.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${allnews.title}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
    `
   });
}













// fetchcategory()