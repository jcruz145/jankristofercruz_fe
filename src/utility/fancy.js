export default {
  flowInText: (el) => {
    const words = el.innerText;
    el.classList.add("animated__text");
    let html = '';
    for(let i = 0; i < words.length; i++) {
      if(words[i] == ' ') {
        html += ' '
      } else {
        html += '<span>'+words[i]+"</span>"
      }
    }
    el.innerHTML = html;
  }
}