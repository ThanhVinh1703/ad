//  lấy dữ liệu từ local storage
let databaseClass = JSON.parse(localStorage.getItem("dataClass"));

// gọi HTML element
let tbody = document.getElementById("tbody");
let addBtn = document.getElementById("add-btn");
let closeAddBtn = document.querySelector("#add-form .close-add")
let btnCloseA = document.querySelector(".btnCloseForm")
let addForm = document.getElementById("add-form");
let mainAddForm = document.getElementsByClassName("form")[0];

function render(data){
    tbody.innerHTML = "";
    for(let index in databaseClass){  
        let tr = `<tr> 
                    <td>${+index +1}</td>
                    <td>${data[index].maLop}</td>
                    <td>${data[index].tenLop}</td>
                    <td>${data[index].giangVien}</td>
                    <td>${data[index].moTa}</td> 
                    <td>${data[index].siSo}</td> 
                    <td>${data[index].trangThai}</td> 
                    <td>${data[index].khoaHoc}</td> 
                    <td>
                        <button class="update-btn" data-id="${data[index].stt}">Sửa</button>
                        <button class="delete-btn" data-id="${data[index].stt}">Xóa</button>
                    </td>
                    
                  </tr>`;
        tbody.innerHTML= tbody.innerHTML + tr;          
    }
}
render(databaseClass);


// tìm kiếm dữ liệu khóa học
let searchInput = document.getElementById("search-Input");
let searchButton = document.getElementById("search-Button");

searchButton.addEventListener("click", function(){
    let question = searchInput.value.toLowerCase();
    let result = [];
    for( let i = 0; i < databaseClass.length; i++){
        if(
            databaseClass[i].maLop.toLowerCase().indexOf(question) !== -1 ||
            databaseClass[i].tenLop.toLowerCase().indexOf(question) !== -1
        ){
            result.push(databaseClass[i]);
        }
    }
    render(result);
});

// Sắp xếp dữ liệu khóa học
let sortByName = document.getElementById("sortByName");

sortByName.addEventListener("change", function() {
    // Lấy giá trị trạng thái được chọn từ dropdown
    let selectedStatus = sortByName.value;

    // Kiểm tra nếu không phải là giá trị mặc định
    if (selectedStatus === "-Sắp xếp-") {
        // Nếu chọn tùy chọn mặc định, hiển thị lại toàn bộ danh sách lớp học
        render(databaseClass);
    } else {
        // Nếu chọn một trạng thái cụ thể, lọc danh sách lớp học theo trạng thái đó
        let filteredClasses = databaseClass.filter(function(classData) {
            return classData.trangThai === selectedStatus;
        });

        // Hiển thị dữ liệu đã được lọc
        render(filteredClasses);
    }
});

// mở và đóng form thêm mới
addBtn.onclick = function(){
    addForm.classList.remove("add-form")
}
closeAddBtn.onclick = function(){
    addForm.classList.add("add-form")
}
btnCloseA.onclick = function(){
    addForm.classList.add("add-form");
}

//lấy trạng thái người dung

function userStatus(){
    let status = document.querySelector(`input[name="status"]:checked`)
    if(status.id === "waiting"){
        return value;
    }else if (status.id === "active" ){
        return value;
    }else if (status.id === "finish"){
        return value;
    } else {
        return "none";
    }

}
// sự kiện thêm mới nhân viên
mainAddForm.onsubmit = function(event){    
    event.preventDefault();   
    // let statusUser = userStatus();
    let newClass = {
        stt: Math.random(),
        maLop: mainAddForm.maLopHoc.value,
        tenLop: mainAddForm.tenLopHoc.value,
        giangVien: mainAddForm.giangVien.value,
        moTa: mainAddForm.moTa.value,
        siSo: mainAddForm.siSo.value,
        trangThai: userStatus(),
        khoaHoc: mainAddForm.khoaHoc.value,
    };
    databaseClass.push(newClass); 
    render(databaseClass);
    addForm.classList.add("add-form");
    
};


// gọi button
let updateFormBtn = document.getElementById("update-form");
let btnChange = document.querySelectorAll(".update-btn");
let closeUpdateBtn = document.querySelector("#update-form .close-update");
let closeEdit = document.querySelector("#update-form .closeUpdate");
// gọi update-form
let updateForm = document.getElementById("updateNew");
let updateClassIdInput = document.getElementById("updatedClassId")

// mở hàm form cập nhật khóa học
// btnChange.forEach((button) => {
//     button.addEventListener("click",function() {
//         // lấy id của từng buttom
//         let classId = this.getAttribute("data-id");
//         // tìm đối tượng khóa học
//         let classToUpdate = databaseClass.find((classes) => classes.stt == classId); 

//         updateClassIdInput.value = classToUpdate.stt;
//         updateForm.editIdClass.value = classToUpdate.maLopHoc;
//         updateForm.editNameClass.value = classToUpdate.tenLopHoc;
//         updateForm.editTeacherClass.value = classToUpdate.giangVien;
//         updateForm.editNumOfStudent.value = classToUpdate.siSo;
//         updateForm.editMoTa.value = classToUpdate.moTa;
//         updateForm.editKhoaHoc.value = classToUpdate.khoaHoc;
//         if(classToUpdate.trangThai){
//             updateForm.updateStatus[0].checked = true;
//         } else {
//             updateForm.updateStatus[1].checked = true;
//         }
//         // mở form cập nhật
//         updateFormBtn.classList.remove("update-form");
//     });
// });
// Đóng form cập nhật khi bấm nút đóng
closeUpdateBtn.onclick = function () {
    updateFormBtn.classList.add("update-form");
};
closeEdit.onclick = function () {
    updateFormBtn.classList.add("update-form");
};

// hàm update
// updateForm.onsubmit = function(event){
//     event.preventDefault();
//     let updatedClassId = updateClassIdInput.value;
//     let classIndex = databaseClass.findIndex(
//         (classes) => classes.stt == updatedClassId
//     );
//     if (classIndex > -1) {
//         databaseCourse[courseIndex] = {
//           stt: updatedClassId,
//           maLop: updateForm.editIdClass.value,
//           tenLop: updateForm.editNameClass.value,
//           giangVien: updateForm.editTeacherClass.value,
//           moTa: updateForm.editMoTa.value,
//           siSo: updateForm.editNumOfStudent.value,
//           trangThai: updateForm.editTr.value,
//           khoaHoc: updateForm.editKhoaHoc.value,

//            // Assuming the first radio button is for "Hoạt động"
//         };
//         render(databaseClass); // Re-render the table
//         updateFormBtn.classList.add("update-form"); // Close the update form
//       }
// };



let deleteForm = document.getElementById("delete-form");
let deleteMessage = document.getElementById("delete-message");
let classIdToDelete = null;

// Open delete form
tbody.addEventListener("click", function(event){
    if(event.target.classList.contains("delete-btn")){
        classIdToDelete = event.target.getAttribute("data-id");
        let course = databaseClass.find(course => course.stt == classIdToDelete);
        if (course) {
            deleteMessage.textContent = `Bạn có chắc muốn xóa ${course.tenKhoahoc}?`;
            deleteForm.classList.remove("delete-form");
        }
    }
});

// Handle the form close
let closeDeleteBtns = document.querySelectorAll(".close-delete");
closeDeleteBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        deleteForm.classList.add("delete-form");
        classIdToDelete = null; // Reset the id
    });
});

// Handle delete confirmation
let deleteNewForm = document.querySelector(".deleteNew");
deleteNewForm.onsubmit = function(event) {
    event.preventDefault();
    if (classIdToDelete) {
        databaseClass = databaseClass.filter(course => course.stt != classIdToDelete);
        render(databaseClass); // Re-render the table
        deleteForm.classList.add("delete-form"); // Close the form
        classIdToDelete = null; // Reset the id after deletion
    }
};