export function showOnScroll(): void {
  const elements = document.getElementsByClassName("show-onscroll");
  for (let i = 0; i < elements.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = elements[i].getBoundingClientRect().top;
    const toDo = elementTop < windowHeight ? "add" : "remove";
    elements[i].classList[toDo]("active");
  }
}
