
// aboutmeInsert 버튼 누를 시 동작
  function submitPost(){
    document.getElementById("postProjectForm").action = `/api/insertPost/`;
    document.getElementById("postProjectForm").submit(); // postId option select시 지정된 form action api 주소로 submit 실행
  }
  
  // delete / insert 버튼 동작
  document.getElementById("projectInsert").addEventListener("click", submitPost);
