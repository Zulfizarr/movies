window.addEventListener("DOMContentLoaded",( )=>{
    let movie=movies.slice(0,50)
    const movies_ul =  document.querySelector(".movies")
    const form=document.querySelector("form")
    let input=document.querySelector(".search")
    let categories_select=document.querySelector(".categories")
    const sort_movie=document.querySelector("#sort_movie")
    let template=document.querySelector("template").content
    const handleRenderMovie=(arr)=>{
        movies_ul.innerHTML=null   
             for(let i=0; i<arr.length; i++){
            let clone=template.cloneNode(true)
            let img=clone.querySelector("img")
            
            if(arr[i].bigPoster){
                img.src=arr[i].bigPoster
            }else{
                img.alt="bu rasm sozlanmagan"
            }
            let name=clone.querySelector("h3")
            name.textContent=arr[i].title
            let discribtion=clone.querySelector(".disc")
            discribtion.textContent=arr[i].sumary
            let year=clone.querySelector(".year")
            year.textContent=arr[i].year
            let trailer=clone.querySelector(".movie_trailer")
            trailer.href=arr[i].trailer
            movies_ul.appendChild(clone)
            
        }



    }
    handleRenderMovie(movie)
    const handleCategories=(movie)=>{
        let result=[]
        for(let i=0; i<movie.length; i++){
            let categories = movie[i].categories
        for(j=0 ;j<categories.length;j++){
            if(!result.includes(categories[j])){
                result.push(categories[j])
            }
        }
        }
    
        return result
    } 
    handleCategories(movie)
    const HandleRenderOption=()=>{
let result=handleCategories(movies)
for(let i=0; i<result.length;i++){
    let option=document.createElement("option")
    option.value=result[i]
    option.textContent=result[i]
    categories_select.appendChild(option)
}
    }
    HandleRenderOption( )
    const handleDate=(date)=>{
        let dates=new Date(date)
        return dates
    }
    const sort_object={
        az(a,b){
            if(a>b){
                return-1
            }else{
                return 1
            }
        },
        za(b,a){
            if(b>a){
                return -1
            }
            else{
                return 1
            }
        },
        rating(a,b){
            if(a.imdbId>b.imdbId){
                return -1
            }else{
                return 1
            }
        },
        year(a,b){
                if(handleDate(a.year)>handleDate(b.year)){
                    return -1
                }else{
                    return 1
                }
        }
    }
    const handleSub=(event)=>{
event.preventDefault()
let rejex=new RegExp(input.value, "gi")
let filter=[]
 filter=movie.filter((item)=>item.title.match(rejex))
 if(categories_select.value==="all"){
  filter=movie  
 }else{
    filter=movie.filter((item)=>item.categories.includes(categories_select.value))
    console.log(filter)
 }
 filter=filter.filter((item)=>item.title.match(rejex))
 filter=filter.sort(sort_object[sort_movie.value])
 handleRenderMovie(filter)
    }
    form.addEventListener("submit",handleSub)

})
