// postId option select시 동작
function getValue(){
    var sel = document.getElementById("postId").value;
  
    fetch(`http://localhost:3000/api/aboutme/${sel}`)
    .then((response)=>response.json())
    .then(function(data){
      if(Object.keys(data).length > 0){
        document.getElementById("changeAboutmeForm").action = `/api/updateAboutme/${data[0].id}`; // 기존 data가 있는 경우 update로 form action post 주소 바꿔줌
        if(confirm('원 글을 불러오시겠습니까?')){ // 원래 글 load modal OK 시 동작
          document.getElementById("postTitle").value = data[0].title;
          document.getElementById("postContent").value = data[0].content;
        }
      } else { 
        document.getElementById("changeAboutmeForm").action = `/api/insertAboutme`; // 기존 data 없는 경우 form action insert로 post 주소 바꿔줌
      }
    }
    );
  }
  
  // aboutmeDelete 버튼 누를 시 동작
function deletePost(){
  var sel = document.getElementById("postId").value; // delete할 글의 id 가져옴
  if(confirm('정말 삭제하시겠습니까?')){ // modal에서 OK 클릭시에 삭제 동작
    document.getElementById("changeAboutmeForm").action = `/api/deleteAboutme/${sel}`; // delete 실행할 api 주소로 form action 주소 변경
    document.getElementById("changeAboutmeForm").submit(); // delete 실행
  }
  // 취소시 do no-op
}
// aboutmeInsert 버튼 누를 시 동작
function submitPost(){
  document.getElementById("changeAboutmeForm").submit(); // postId option select시 지정된 form action api 주소로 submit 실행
}

document.getElementById("postId").addEventListener("change", getValue);
// delete / insert 버튼 동작
document.getElementById("aboutmeDelete").addEventListener("click", deletePost);
document.getElementById("aboutmeInsert").addEventListener("click", submitPost);