  // aboutmeDelete 버튼 누를 시 동작
  function deletePost(){
    var id = document.getElementById("postId").value; // delete할 글의 id 가져옴
    if(confirm('정말 삭제하시겠습니까?')){ // modal에서 OK 클릭시에 삭제 동작
      document.getElementById("postProjectForm").action = `/api/deletePost/${id}`; // delete 실행할 api 주소로 form action 주소 변경
      document.getElementById("postProjectForm").submit(); // delete 실행
    }
    // 취소시 do no-op
  }
  // aboutmeInsert 버튼 누를 시 동작
  function editPost(){
    var id = document.getElementById("postId").value;
    document.getElementById("postProjectForm").action = `/api/updatePost/${id}`
    document.getElementById("postProjectForm").submit(); // postId option select시 지정된 form action api 주소로 submit 실행
  }
  
  // delete / insert 버튼 동작
  document.getElementById("projectDelete").addEventListener("click", deletePost);
  document.getElementById("projectEdit").addEventListener("click", editPost);