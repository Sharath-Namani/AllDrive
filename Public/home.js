const filelist = document.getElementById('filesUl');
const filesInput = document.getElementById('files');
const uploadBtn = document.getElementById('uploadBtn');
const uploadForm = document.getElementById('uploadForm');
const status = document.getElementById('status');
// status.textContent = '';

async function refreshFileList(){

    const files = await fetch('http://localhost:3000/files',{
        headers:{"Authorization":'Bearer '+ localStorage.getItem('token')}
    }).then(res=>res.json());
    if(res.status === 401){
        localStorage.removeItem('token');
        window.location.href = 'login.html';
        return;
    }
    filelist.innerHTML = '';
    if(!files || files.length ===0){
        filelist.textContent = 'Empty... Upload some files!';
        return;
    }
    files.forEach(file=>{
        const li = document.createElement('li');
        li.textContent = file.filename;
        filelist.appendChild(li);
    });
}

uploadForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    
    const formdata = new FormData(uploadForm);
    // const files = filesInput.files;
    // status.textContent = '';
    // if (!files.length) {
    //     status.textContent = 'Please select files to upload.';
    //     return;
    // }

    // for (let i = 0; i < files.length; i++) {
    //     formdata.append('files', files[i]);
    // }
    const res = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formdata,
        headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    });
    if(res.ok){
        status.textContent = 'Files uploaded successfully';
        uploadForm.reset();
        await refreshFileList();
    }
    else{
        status.textContent = 'Error uploading files3';
    }
    
})

