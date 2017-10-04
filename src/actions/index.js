export const RECEIVE_STAFF_INFO = 'RECEIVE_STAFF_INFO'
export const SELECT_ELEM = 'SELECT_ELEM'
export const REQUEST_STAFF_INFO = 'REQUEST_STAFF_INFO'
export const EDIT_ID = 'EDIT_ID'
export const SEARCH_WORKER_NAME= 'SEARCH_WORKER_NAME'
export const DELETE_WORKER_INFO = 'DELETE_WORKER_INFO'
export const EDIT_WORKER_INFO = 'EDIT_WORKER_INFO'

export const receiveStaffInfo =  (staff,posts) => ({
  type: RECEIVE_STAFF_INFO,
  staff,
  posts
})


export const SearchName = (string) => ({
  type: SEARCH_WORKER_NAME,
  nameOfWorker: string
})

export const requestStaffInfo = () => ({
  type: REQUEST_STAFF_INFO,
})

export const deleteWorkerInfo = (id) => ({
  type: DELETE_WORKER_INFO,
  id
})

export const editWorkerInfo = (id,info) => ({
  type: EDIT_WORKER_INFO,
  id,
  info
})

export const SetEditElementID = (id) =>({
    type: EDIT_ID,
    id
})

const fetchInfo = async api => {
        
       try{
            const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            let response = await fetch(proxyUrl+api)
            let json = response.json()
            return json
        } 
        catch(e){console.log(e.name, e.message)}

}

export const fetchStaffInfo = () => async dispatch => {
    dispatch(requestStaffInfo())
    const API_staff = "http://avengers.view.indev-group.eu/test_api/staff/?query=";
    const API_posts = 'http://avengers.view.indev-group.eu/test_api/posts/'

    let staff = await fetchInfo(API_staff)
    let posts = await fetchInfo(API_posts)

    dispatch(receiveStaffInfo(staff,posts))
 
}




export const getStaffInfo = () => dispatch =>{
    if(!localStorage.getItem('data')) {
        dispatch(fetchStaffInfo()) 
    }else{
    let data = JSON.parse(localStorage.getItem('data'));
        dispatch(receiveStaffInfo(data.workers, data.posts))
    }
}




