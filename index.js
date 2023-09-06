const loadData = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;
    const tabContainer = document.getElementById('tab-container');
    // console.log(data)
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleCard(${category.category_id})" class="tab text-base font-bold bg-gray-200 px-5 rounded-md">${category.category}</a>`;
        tabContainer.appendChild(div)
    });
}

const convertSeconds = (seconds) => {
    if (seconds === "") {
        return '';
    }
    else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}hrs ${minutes}min ago`;
    }
}

const handleCard = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const cardContainer = document.getElementById('card-container');
    const tabDrawing = document.getElementById('tab-drawing')

    loadView(data.data)

    if (data.status === false) {
        tabDrawing.classList.remove('hidden')
    } else {
        tabDrawing.classList.add('hidden')
    }

    document.getElementById('sortByView').addEventListener('click', function () {
        data.data.sort((a, b) => {
            return parseInt(b.others.views) - parseInt(a.others.views)
        });
        loadView(data.data)
    })

    function loadView(arr) {
        cardContainer.innerHTML = '';
        arr.forEach((element) => {

            const divCard = document.createElement('div');
            divCard.innerHTML = `
        <div class="card bg-base-100 my-2 shadow-sm pb-4">
        <div class="relative">
          <figure><img class="rounded-lg h-40  w-[100%]" src="${element.thumbnail}"/></figure>
          <p class="absolute bottom-2 right-2 bg-black text-white px-2 text-sm rounded"> ${convertSeconds(element.others?.posted_date)}</p>
        </div>
         <div class="mt-3 flex ">
             <div class="w-12 mr-3"> <img class="rounded-full w-12 h-12 " src="${element.authors[0].profile_picture}" > </div>
             <div class="">
                 <h2 class="font-bold ">${element.title}</h2>
                 <span>${element.authors[0].profile_name}</span> 
                 <span>${element.authors[0].verified ? `<img class="h-5 w-5 ml-1 inline" src="image/verified.png">` : ''}</span>
                 <p>${element.others.views} views</p>
             </div>
         </div>
     </div>
        `;
            cardContainer.appendChild(divCard);
        })
    }
}
loadData();
handleCard('1000');

