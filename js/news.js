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
   document.getElementById('new-section').innerText = `${category_name}`
}













// fetchcategory()