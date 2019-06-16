$("btnchoosefile").click(function() {
  const input = document.getElementById("filesToUpload");
  let imgs = document.getElementById("imgs");

  for (var x = 0; x < input.files.length; x++) {
    imgs.value = imgs.value + "," + input.files[x].name;
  }
});
