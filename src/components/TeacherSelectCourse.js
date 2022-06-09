import React, {useState, useRef} from "react";

import {useNotices} from "../context/notice-hooks";


export default function TeacherSelectCourse({userId}) {
  const {users, updateLink} = useNotices();
  const [selected, setSelected] = useState("all");
  const replacedLink = useRef();

  const user = users.find(user => user.id === userId);
  const course = user.course.find(course => course.id === selected);

  const submit = event => {
    event.preventDefault();
    const newLink = replacedLink.current.value;
    updateLink(course.id, newLink);
    replacedLink.current.value = "";
  }

  return (
    <>
      <select defaultValue={selected} onChange={event => 
        setSelected(event.target.value)
      }>
        {user.course.map((course, i) => (
          <option value={course.id}>{course.name}</option>
        ))}
      </select>
      <form onSubmit={submit}>
        <input ref={replacedLink} type="text" placeholder="填入新連結" required />
        <button>送出</button>
      </form>
    </>
  );
}