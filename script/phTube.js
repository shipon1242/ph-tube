const buttonContainer=document.getElementById('btn-container')
const CardContainer=document.getElementById('card-container')
const errorElementById=document.getElementById('error-element')
const verifiedById=document.getElementById('verified')
let selectedCategory=1000;
const fetchCategory= async()=>{
    const res= await fetch('https://openapi.programming-hero.com/api/videos/categories')

    const data=await res.json()
    console.log(data.data)

const categoryArray = data.data
// console.log(categoryArray)

categoryArray.forEach((card)=>{
    // console.log(card)
    const newBtn=document.createElement('button')
    newBtn.classList="btn btn-active btn-ghost"
    newBtn.addEventListener('click',()=>fetchDataByCategory(card.category_id))
    newBtn.innerText=card.category
    buttonContainer.appendChild(newBtn)
})
  
}

const fetchDataByCategory=async(categoryId)=>{
    selectedCategory=categoryId;

    
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
        const data=await res.json()
const dataArray=data.data
// console.log(dataArray)
if(dataArray.length===0){
    errorElementById.classList.remove('hidden')
    // CardContainer.classList.add('hidden')
}
else{
    errorElementById.classList.add('hidden')
}
CardContainer.innerHTML=''
dataArray.forEach((videos)=>{
    console.log(videos)
    console.log(videos.authors[0].verified)
    let ve
    // console.log(videos.others.views)

    // if(videos.authors[0].verified === false){
    //     verifiedById.classList.add("hidden")
    // }
    const newCard=document.createElement('div')
    newCard.innerHTML=` <div class="card w-full bg-base-100 shadow-xl">
    <figure class="overflow-hidden h-72">
        <img class="w-full" src="${videos.thumbnail}" alt="Shoes" />
        <h6 class="absolute bottom-[40%] right-12">0 hr</h6>
    </figure>
    <div class="card-body">
        <div class="flex space-x-4 justify-start items-start">
            <div>
                <img class="w-12 h-12 rounded-full" src="${videos.authors[0].profile_picture}" alt="Shoes" />
            </div>
            <div>
                <h2 class="card-title">${videos.title}</h2>
                <div class="flex mt-3">
                    <p class="">${videos.authors[0].profile_name

                    }</p>
                    <div id='verified' class="" >
                    <img  class=" w-6 h-6 " src="./images/verify.png" alt=""></div>
                </div>
                <p class="mt-3">${videos.others.views} Views</p>
            </div>
        </div>
    </div>
</div>
`
  CardContainer.appendChild(newCard)
   
})

        
          
    
}


fetchCategory()
fetchDataByCategory(selectedCategory)