export const Styles = () => {
  // Select all section elements within .skills-container
  let contents = document.querySelectorAll(".skills-container section");
  console.log(contents);

  // Convert NodeList to Array if necessary
  contents = Array.from(contents);

  // Log each element in the array
  contents.forEach(element => {
    console.log(element);
  });

  console.log(contents);
}
