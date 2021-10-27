let headerTitle = document.querySelector('.header__title')
const elUserTemplate = document.querySelector('#user__template').content
const elUserList = document.querySelector('.user__list')
const elPostTemplate = document.querySelector('#post__Template').content
const elPostList = document.querySelector('.post__list')
//commit elements
const elCommitHeaderBox = document.querySelector('.commit__header')
const elCommitHeaderTemplate = document.querySelector('#commit__header--template').content
const elCommitList = document.querySelector('.commit__list')
const elCommitTemplate = document.querySelector('#commit__template').content

async function renderUsers(){
    let userRes = await fetch('https://jsonplaceholder.typicode.com/users')
    let userData = await userRes.json()
    function usersAppend(array, element){
        array.forEach(obj =>{
            const cloneUserTemplate = elUserTemplate.cloneNode(true)
            
            cloneUserTemplate.querySelector('.user__name').textContent = obj.name
            let userEmail = cloneUserTemplate.querySelector('.user__email')
            userEmail.textContent = 'Email: ' + obj.email
            userEmail.setAttribute('href', `mailto: ${obj.email}`)
            cloneUserTemplate.querySelector('.user__address').textContent = 'Address: ' + obj.address.city
            cloneUserTemplate.querySelector('.user__company').textContent = 'Company: ' + obj.company.name
            let userBtn = cloneUserTemplate.querySelector('.user__btn')
            userBtn.dataset.id = obj.id
            
            userBtn.addEventListener('click', (e)=>{
                headerTitle.textContent = 'Posts'
                var userBtnId = e.target.dataset.id
                elUserList.classList.add('user__list--close')
                
                // posts
                async function renderPosts(){
                    let postsArray = []
                    let postsRes = await fetch('https://jsonplaceholder.typicode.com/posts')
                    let postsData = await postsRes.json()
                    postsData.forEach(postobj =>{
                        if(postobj.userId == userBtnId){
                            postsArray.push(postobj)
                        }
                    })
                    function postsAppend(array, element){
                        array.forEach(post =>{
                            const clonePostTemplate = elPostTemplate.cloneNode(true)
                            
                            clonePostTemplate.querySelector('.post__header').textContent = post.userId
                            clonePostTemplate.querySelector('.post__title').textContent = post.title
                            clonePostTemplate.querySelector('.post__text').textContent = post.body
                            let postBtn = clonePostTemplate.querySelector('.post__btn')
                            postBtn.dataset.id = post.id
                            
                            
                            postBtn.addEventListener('click', (e)=>{
                                elPostList.classList.add('post__list--close')
                                let postId = e.target.dataset.id
                                
                                async function renderCommits(){
                                    let commitArray = []
                                    let commitsRes = await fetch('https://jsonplaceholder.typicode.com/comments')
                                    let commitsData = await commitsRes.json()
                                    commitsData.forEach(commits =>{
                                        if(commits.postId == postId){
                                            commitArray.push(commits)
                                        }
                                    })
                                    // commits 
                                    const cloneCommitHeaderTemplate = elCommitHeaderTemplate.cloneNode(true)
                                    cloneCommitHeaderTemplate.querySelector('.commit__user').textContent = post.userId + '-user'
                                    cloneCommitHeaderTemplate.querySelector('.commit__header--title').textContent = post.title
                                    cloneCommitHeaderTemplate.querySelector('.commit__header--text').textContent = post.body
                                   let postCount =  cloneCommitHeaderTemplate.querySelector('.commit__post')
                                   
                                    commitArray.forEach(commit =>{
                                        postCount.textContent = commit.postId +'-post'
                                        
                                        const cloneCommitTemplate = elCommitTemplate.cloneNode(true)
                                        let commitUserEmail = cloneCommitTemplate.querySelector('.commit__email')
                                        commitUserEmail.textContent = commit.email
                                        commitUserEmail.setAttribute('href', `mailto: ${commit.email}`)
                                        cloneCommitTemplate.querySelector('.commit__text').textContent = commit.body
                                        
                                        elCommitList.appendChild(cloneCommitTemplate)
                                        elCommitHeaderBox.appendChild(cloneCommitHeaderTemplate)
                                    })
                                }
                                renderCommits()
                            })
                            
                            
                            element.appendChild(clonePostTemplate)
                        })
                    }
                    postsAppend(postsArray, elPostList)
                }
                renderPosts()
            })
            
            element.appendChild(cloneUserTemplate)
        })
    }
    usersAppend(userData, elUserList)
}
renderUsers()




