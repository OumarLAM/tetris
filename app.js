let frame = document.querySelector(".frame");
for (let i = 0; i < 200; i++) {
  const div = document.createElement("div");
  div.className = "grid";
  frame.append(div);
}
